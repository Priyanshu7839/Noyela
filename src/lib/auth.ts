import { App } from '@capacitor/app'
import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'
import { SocialLogin } from '@capgo/capacitor-social-login'
import type { User } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from './supabase'

export type AuthProvider = 'apple' | 'google'

const mobileRedirectUrl = 'com.noyela.app://auth/callback'
let nativeLoginInitialized = false

function requireSupabaseConfig() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.')
  }
}

async function initializeNativeLogin() {
  if (nativeLoginInitialized) return
  const webClientId = import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID
  const iosClientId = import.meta.env.VITE_GOOGLE_IOS_CLIENT_ID
  if (!webClientId || (Capacitor.getPlatform() === 'ios' && !iosClientId)) {
    throw new Error('Native Google sign-in needs VITE_GOOGLE_WEB_CLIENT_ID and VITE_GOOGLE_IOS_CLIENT_ID in .env.')
  }

  await SocialLogin.initialize({
    google: {
      webClientId,
      iOSClientId: iosClientId,
      iOSServerClientId: webClientId,
      mode: 'online',
    },
    // Apple is native on iOS. Android falls back to Supabase OAuth below.
    apple: Capacitor.getPlatform() === 'ios' ? { redirectUrl: '' } : undefined,
  })
  nativeLoginInitialized = true
}

async function signInWithNativeGoogle() {
  await initializeNativeLogin()
  const login = await SocialLogin.login({ provider: 'google', options: { forcePrompt: true } })
  if (login.result.responseType !== 'online' || !login.result.idToken) {
    throw new Error('Google did not return an identity token.')
  }

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: login.result.idToken,
  })
  if (error) throw error
  if (!data.user) throw new Error('No user was returned after Google sign-in.')
  return data.user
}

async function signInWithNativeApple() {
  await initializeNativeLogin()
  const nonce = crypto.randomUUID()
  const login = await SocialLogin.login({ provider: 'apple', options: { scopes: ['name', 'email'], nonce } })
  if (!login.result.idToken) throw new Error('Apple did not return an identity token.')

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'apple',
    token: login.result.idToken,
    nonce,
  })
  if (error) throw error
  if (!data.user) throw new Error('No user was returned after Apple sign-in.')

  const fullName = [login.result.profile.givenName, login.result.profile.familyName].filter(Boolean).join(' ')
  if (fullName) await supabase.auth.updateUser({ data: { full_name: fullName } })
  return data.user
}

async function startBrowserOAuth(provider: AuthProvider) {
  const isNative = Capacitor.isNativePlatform()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: isNative ? mobileRedirectUrl : window.location.origin,
      skipBrowserRedirect: isNative,
      scopes: provider === 'apple' ? 'name email' : undefined,
      queryParams: provider === 'google' ? { prompt: 'select_account' } : undefined,
    },
  })
  if (error) throw error
  if (isNative && data.url) await Browser.open({ url: data.url })
}

export async function signInWithProvider(provider: AuthProvider) {
  requireSupabaseConfig()
  if (!Capacitor.isNativePlatform()) return startBrowserOAuth(provider)
  if (provider === 'google') return signInWithNativeGoogle()
  if (Capacitor.getPlatform() === 'ios') return signInWithNativeApple()
  // Android has no native Apple account picker; use Apple's secure OAuth page.
  return startBrowserOAuth('apple')
}

export async function signInWithEmail(email: string, password: string) {
  requireSupabaseConfig()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  if (!data.user) throw new Error('No user was returned after email sign-in.')
  return data.user
}

export async function signUpWithEmail(email: string, password: string, fullName: string) {
  requireSupabaseConfig()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName.trim() },
      emailRedirectTo: Capacitor.isNativePlatform() ? mobileRedirectUrl : window.location.origin,
    },
  })
  if (error) throw error
  return data
}

async function completeNativeOAuth(url: string) {
  if (!url.startsWith(mobileRedirectUrl)) return
  const callbackUrl = new URL(url)
  const callbackError = callbackUrl.searchParams.get('error_description') ?? callbackUrl.searchParams.get('error')
  if (callbackError) throw new Error(callbackError)
  const code = callbackUrl.searchParams.get('code')
  if (!code) throw new Error('The sign-in response did not include an authorization code.')
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) throw error
  if (!data.user) throw new Error('No user was returned after sign-in.')
  await Browser.close()
  return data.user
}

export function subscribeToOAuthCallback(onSuccess: (user: User) => void, onError: (message: string) => void) {
  let active = true
  const cleanups: Array<() => void | Promise<void>> = []
  const complete = async (url: string | undefined) => {
    if (!url || !active) return
    try {
      const user = await completeNativeOAuth(url)
      if (user && active) onSuccess(user)
    } catch (error) {
      if (active) onError(error instanceof Error ? error.message : 'Sign-in could not be completed.')
    }
  }

  if (Capacitor.isNativePlatform()) {
    void App.addListener('appUrlOpen', ({ url }) => complete(url)).then((handle) => cleanups.push(() => handle.remove()))
    void App.getLaunchUrl().then((launchUrl) => complete(launchUrl?.url))
  } else {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user && active) onSuccess(session.user)
    })
    cleanups.push(() => data.subscription.unsubscribe())
  }

  return () => {
    active = false
    void Promise.all(cleanups.map((cleanup) => cleanup()))
  }
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user
}

type UserProfile = {
  onboarding_complete: boolean
  phone: string | null
  welcome_popup_seen: boolean
}

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const user = await getCurrentUser()
  if (!user) return null
  const { data, error } = await supabase
    .from('user_profiles')
    .select('onboarding_complete, phone, welcome_popup_seen')
    .eq('user_id', user.id)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function needsProfileCompletion(user?: User | null) {
  const currentUser = user ?? await getCurrentUser()
  if (!currentUser) return true
  const { data, error } = await supabase
    .from('user_profiles')
    .select('onboarding_complete, phone')
    .eq('user_id', currentUser.id)
    .maybeSingle()
  if (error) throw error
  // A missing row means this account predates the profile migration. New users
  // receive a row from the auth trigger with onboarding_complete set to false.
  return Boolean(data && (!data.onboarding_complete || !data.phone))
}

export async function showWelcomePopupOnThisLogin() {
  const profile = await getCurrentUserProfile()
  return Boolean(profile && !profile.welcome_popup_seen)
}

export async function markWelcomePopupSeen() {
  const user = await getCurrentUser()
  if (!user) return
  const { error } = await supabase
    .from('user_profiles')
    .update({ welcome_popup_seen: true })
    .eq('user_id', user.id)
  if (error) throw error
}

export async function updateProfile({ fullName, email, phone }: { fullName: string; email: string; phone: string }) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Your session has expired. Please sign in again.')
  const { error } = await supabase.from('user_profiles').upsert({
    user_id: user.id,
    full_name: fullName.trim() || null,
    contact_email: email.trim().toLowerCase(),
    phone: phone.trim(),
    onboarding_complete: true,
  }, { onConflict: 'user_id' })
  if (error) throw error
}
