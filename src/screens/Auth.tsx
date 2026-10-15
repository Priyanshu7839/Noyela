import { useEffect, useState } from 'react'
import { InputField } from '../components/ui'
import NoyelaOrbImg from '../assets/NoyelaOrbImg.png'
import LoginHomeImg from '../assets/LoginHomeBg.png'
import { NoyelaOrb } from '../components/NoyelaOrb'
import SignInBg from '../assets/SignInBg.png'
import { Lock, Mail, User } from 'lucide-react'

import GoogleLogo from '../assets/GoogleLogo.png'
import AppleLogo from '../assets/AppleLogo.png'
import { getCurrentUser, needsProfileCompletion, signInWithEmail, signInWithProvider, signUpWithEmail, subscribeToOAuthCallback, updateProfile, type AuthProvider } from '../lib/auth'

type NavigateFn = (screen: string) => void

// ─── Splash ─────────────────────────────────────────────────────────────────
function Splash({ navigate }: { navigate: NavigateFn }) {
  return (
    <div 
    
    className='bg-[#F0EDE8] flex-1 min-h-[100vh]' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px 50px', position: 'relative', overflow: 'hidden', paddingTop: 'env(safe-area-inset-top)' }}>
      
      <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent:'center' , gap: 0, zIndex: 1 }}>
        {/* <img src={NoyelaOrbImg} alt="" className='w-[15%]'/> */}
        <NoyelaOrb  size={200} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(155,109,212,0.15) 0%, transparent 60%)' }} />
        <div className='w-full' style={{ textAlign: 'center', marginTop: 8 }} >
          <div className='text-center w-full  ' style={{ fontFamily: "'Elms Sans'", fontWeight: 400, fontSize: 34, letterSpacing: '0.5em', color: '#595758',textShadow:'3px 3px 5px #59575833' }}>NOYELA</div>
          <div className='text-center w-full text-[#6C3EC1] font-medium uppercase' style={{ fontFamily: "'Elms Sans'", fontSize: 13, marginTop: 6 }}> Personalized Aesthetic Intelligence</div>
        </div>
      </div>

      <div className='flex items-center justify-center flex-col'>
          <img src={LoginHomeImg} alt="" className='w-[90%] mt-5 drop-shadow-sm'/>



        <div style={{ zIndex: 1, width: '100%' }}>
          <button className="px-5 py-3 w-full rounded-[16px] border-[1px] border-[#6C3EC1] bg-transparent hover:bg-[#6C3EC1] text-[16px] font-semibold hover:text-white text-[#6C3EC1]" onClick={() => navigate('auth')}>Begin With Noyela</button>
          {/* <button className="px-5 py-3 w-full rounded-[16px] border-[1px] border-[#6C3EC1] bg-transparent text-[16px] font-semibold text-[#6C3EC1]" onClick={() => navigate('auth')} style={{ marginTop: 12, width: '100%' }}>Sign In</button> */}
        </div>
      </div>
    </div>
  )
}

// ─── Onboarding ──────────────────────────────────────────────────────────────
const ONBOARDING = [
  {
    title: 'Every face tells\na story.',
    titlePurple: '',
    subtitle: 'Noyela reads yours through advanced visual AI — understanding what makes you uniquely you.',
    img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&h=400&fit=crop&auto=format',
    next: 'onboarding-2',
  },
  {
    title: 'Your plan should\nbe',
    titlePurple: 'uniquely yours.',
    subtitle: 'No generic advice. Noyela builds a personalized transformation plan around your specific goals, skin, hair, and lifestyle.',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=400&fit=crop&auto=format',
    next: 'onboarding-3',
  },
  {
    title: 'Noyela',
    titlePurple: 'remembers you.',
    subtitle: 'Your AI partner learns, adapts, and evolves your plan as you progress. The longer you use it, the smarter it gets.',
    img: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=600&h=400&fit=crop&auto=format',
    next: 'auth',
  },
]

function OnboardingScreen({ slide, navigate }: { slide: 0 | 1 | 2; navigate: NavigateFn }) {
  const d = ONBOARDING[slide]
  return (
    <div style={{ height: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', paddingTop: 'env(safe-area-inset-top)' }}>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <img src={d.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(247,245,242,0.95) 75%, var(--bg) 100%)' }} />
      </div>
      <div style={{ padding: '24px 28px 48px' }}>
        <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 34, fontWeight: 700, color: 'var(--text)', margin: '0 0 6px', lineHeight: 1.18, whiteSpace: 'pre-line' }}>
          {d.title} {d.titlePurple && <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>{d.titlePurple}</span>}
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.6, margin: '12px 0 28px' }}>{d.subtitle}</p>
        <div style={{ display: 'flex', gap: 6, marginBottom: 24, justifyContent: 'center' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: i === slide ? 20 : 6, height: 6, borderRadius: 3, background: i === slide ? 'var(--purple)' : 'var(--border)', transition: 'all 0.3s' }} />
          ))}
        </div>
        <button className="btn-primary" onClick={() => navigate(d.next)}>
          {slide === 2 ? 'Get Started' : 'Continue'}
        </button>
        {slide < 2 && (
          <button onClick={() => navigate('auth')} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 14, padding: '12px 0 0', cursor: 'pointer' }}>
            Skip
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Auth (Sign In / Sign Up) ────────────────────────────────────────────────
export function AuthScreen({ navigate }: { navigate: NavigateFn }) {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [socialProvider, setSocialProvider] = useState<AuthProvider | null>(null)
  const [authError, setAuthError] = useState('')
  const [emailSubmitting, setEmailSubmitting] = useState(false)
  const [emailNotice, setEmailNotice] = useState('')

  const routeSignedInUser = async (user: Parameters<typeof needsProfileCompletion>[0]) => {
    try {
      if (await needsProfileCompletion(user)) navigate('profile-completion')
      else navigate('home')
    } catch {
      // Do not block a valid session while the profile migration is being applied.
      navigate('home')
    }
  }

  useEffect(() => {
    const unsubscribe = subscribeToOAuthCallback(
      (user) => { void routeSignedInUser(user) },
      (message) => setAuthError(message),
    )
    return () => unsubscribe()
  }, [navigate])

  const handleSocialSignIn = async (provider: AuthProvider) => {
    setAuthError('')
    setSocialProvider(provider)

    try {
      const user = await signInWithProvider(provider)
      if (user) await routeSignedInUser(user)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to sign in. Please try again.'
      // Closing a native sheet or browser popup is an expected action, not an error state.
      if (!/cancel|closed|abort/i.test(message)) setAuthError(message)
    } finally {
      setSocialProvider(null)
    }
  }

  const handleEmailAuth = async () => {
    setAuthError('')
    setEmailNotice('')
    if (!email.trim() || !password) {
      setAuthError('Enter your email address and password.')
      return
    }
    if (tab === 'signup' && !name.trim()) {
      setAuthError('Enter your full name to create an account.')
      return
    }

    setEmailSubmitting(true)
    try {
      if (tab === 'signin') {
        await routeSignedInUser(await signInWithEmail(email.trim(), password))
      } else {
        const { user, session } = await signUpWithEmail(email.trim(), password, name)
        if (session && user) await routeSignedInUser(user)
        else setEmailNotice('Check your inbox to confirm your email, then return and sign in.')
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Unable to continue with email.')
    } finally {
      setEmailSubmitting(false)
    }
  }

  return (
    <div style={{ paddingTop: 'env(safe-area-inset-top)', minHeight: '100vh', background: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '80%', height: '60%' }}>
        <img
          src={SignInBg}
          alt="Sculptural figure"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          className='drop-shadow-2xl'
        />
        <div style={{ position: 'absolute', inset: 0, }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, padding: '20px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
        <img src={NoyelaOrbImg} alt="" className='w-[8%]'/>
          <span style={{ fontFamily: "'Elms Sans'", fontWeight: 700, fontSize: 14, letterSpacing: '0.15em' }} className='text-[#565758]'>NOYELA</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 34, fontWeight: 500, color: 'var(--text)', margin: '0 0 4px', lineHeight: 1.2 }}>Welcome to</h1>
        <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 34, fontWeight: 500, color: 'var(--purple)', margin: '0 0 8px' }}>NOYELA</h1>
        <p  style={{ fontSize: 15, color: 'var(--text-2)', margin: '0 0 36px', fontFamily:'Elms Sans' }} className='capitalize w-[50%]'>Your private partner in aesthetic intelligence.</p>
      </div>
      <div style={{ position: 'relative', zIndex: 1, borderRadius: '24px 24px 0 0', padding: '10px 24px 40px', marginTop: 20 }}>
        <div style={{ display: 'flex', marginBottom: 24, borderBottom: '1.5px solid var(--border)' }}>
          {(['signin', 'signup'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '12px 0', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 600,
              color: tab === t ? 'var(--purple)' : 'var(--text-2)',
              borderBottom: `2.5px solid ${tab === t ? 'var(--purple)' : 'transparent'}`,
              marginBottom: -1.5, fontFamily: "'Inter', sans-serif",
            }}>
              {t === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          
       <button
       type="button"
       onClick={() => handleSocialSignIn('apple')}
       disabled={socialProvider !== null}
       className="px-5 py-3 bg-[#ffffff] font-semibold text-[16px] text-[#111827] w-full rounded-[16px] border border-[#E5E7EB] shadow-sm flex items-center justify-center gap-2">
        <img src={AppleLogo} alt="" className='w-[45px]' />
        {socialProvider === 'apple' ? 'Connecting to Apple…' : 'Continue With Apple'}
      </button>
      {/* ------------------------------------------------------------------------------------------------------------- */}
       <button
       type="button"
       onClick={() => handleSocialSignIn('google')}
       disabled={socialProvider !== null}
       className="px-5 py-3 bg-[#ffffff] font-semibold text-[16px] text-[#111827] w-full rounded-[16px] border border-[#E5E7EB] shadow-sm flex items-center justify-center gap-2">
        <img src={GoogleLogo} alt="" className='w-[25px]' />
        {socialProvider === 'google' ? 'Connecting to Google…' : 'Continue With Google'}
      </button>
          {authError && (
            <p role="alert" style={{ color: '#B42318', fontSize: 13, lineHeight: 1.4, margin: '0 2px' }}>
              {authError}
            </p>
          )}
          {emailNotice && <p role="status" style={{ color: '#166534', fontSize: 13, lineHeight: 1.4, margin: '0 2px' }}>{emailNotice}</p>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#E5E2E8' }} />
            <span style={{ fontSize: 13, color: 'var(--text-3)' }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#E5E2E8' }} />
          </div>
          {tab === 'signup' && (
            <InputField
              icon={<span ><User size={16}/></span>}
              placeholder="Full name"
              value={name}
              onChange={setName}
            />
          )}
          <InputField
            icon={<span ><Mail size={16}/></span>}
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <InputField
            icon={<span ><Lock size={16}/></span>}
            placeholder="Enter your password"
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={setPassword}
            rightIcon={
              <button onClick={() => setShowPass(!showPass)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, color: 'var(--text-3)' }}>
                {showPass ? '👁' : '👁‍🗨'}
              </button>
            }
          />
          {tab === 'signin' && (
            <button style={{ background: 'none', border: 'none', color: 'var(--purple)', fontSize: 13, fontWeight: 600, textAlign: 'left', cursor: 'pointer', padding: '2px 4px' }}>
              Forgot password?
            </button>
          )}
          <div style={{ marginTop: 6 }}>
            <button type="button" disabled={emailSubmitting || socialProvider !== null} className="px-5 py-3 w-full text-center text-white text-[16px] font-medium bg-[#6C3EC1] rounded-[16px]" onClick={() => void handleEmailAuth()}>
              {emailSubmitting ? 'Please wait…' : tab === 'signin' ? 'Continue with Email' : 'Create Account'}
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3)', margin: '8px 0 0' }}>
            By continuing, you agree to our{' '}
            <span style={{ color: 'var(--purple)', cursor: 'pointer' }}>Terms of Service</span> and{' '}
            <span style={{ color: 'var(--purple)', cursor: 'pointer' }}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  )
}

function ProfileCompletion({ navigate }: { navigate: NavigateFn }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    void getCurrentUser().then((user) => {
      if (!user) {
        navigate('auth')
        return
      }
      setFullName(String(user.user_metadata.full_name ?? user.user_metadata.name ?? ''))
      setEmail(user.email ?? '')
    }).catch(() => navigate('auth'))
  }, [navigate])

  const save = async () => {
    if (!email.trim() || !phone.trim()) {
      setError('Please provide both an email address and phone number.')
      return
    }
    setSaving(true)
    setError('')
    try {
      await updateProfile({ fullName, email, phone })
      navigate('personalization')
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save your details. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', padding: 'calc(env(safe-area-inset-top) + 48px) 24px 40px' }}>
      <p style={{ color: 'var(--purple)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 12 }}>ONE LAST STEP</p>
      <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 32, fontWeight: 500, color: 'var(--text)', margin: '0 0 10px' }}>Complete your profile</h1>
      <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.5, margin: '0 0 30px' }}>
        Apple only shares your name and email the first time you sign in. Please confirm your contact details now.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <InputField icon={<User size={16} />} placeholder="Full name" value={fullName} onChange={setFullName} />
        <InputField icon={<Mail size={16} />} placeholder="Email address" type="email" value={email} onChange={setEmail} />
        <InputField icon={<span style={{ fontSize: 16 }}>☎</span>} placeholder="Phone number" type="tel" value={phone} onChange={setPhone} />
        {error && <p role="alert" style={{ color: '#B42318', fontSize: 13, margin: '2px 0' }}>{error}</p>}
        <button type="button" className="px-5 py-3 w-full text-center text-white text-[16px] font-medium bg-[#6C3EC1] rounded-[16px]" onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Continue'}
        </button>
      </div>
    </div>
  )
}

// ─── Personalization ──────────────────────────────────────────────────────────
function Personalization({ navigate }: { navigate: NavigateFn }) {
  const [goals, setGoals] = useState<string[]>([])
  const options = ['Improve skin texture', 'Hair health & density', 'Jawline definition', 'Overall harmony', 'Anti-aging', 'Reduce hyperpigmentation', 'Better sleep quality', 'Nutrition & supplements']
  const toggle = (g: string) => setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '56px 24px 32px', paddingTop: 'env(safe-area-inset-top)' }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--purple)', letterSpacing: '0.1em', marginBottom: 8 }}>STEP 1 OF 3</p>
        <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 28, fontWeight: 700, color: 'var(--text)', margin: '0 0 8px' }}>What are your main goals?</h1>
        <p style={{ fontSize: 15, color: 'var(--text-2)', margin: 0 }}>Select all that apply. Noyela will personalize your plan.</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
        {options.map(o => (
          <button key={o} onClick={() => toggle(o)} style={{
            padding: '10px 16px', borderRadius: 50, border: `1.5px solid ${goals.includes(o) ? 'var(--purple)' : 'var(--border)'}`,
            background: goals.includes(o) ? 'var(--purple-pale)' : 'white',
            color: goals.includes(o) ? 'var(--purple)' : 'var(--text)', fontSize: 14, fontWeight: goals.includes(o) ? 600 : 400,
            cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s',
          }}>
            {o}
          </button>
        ))}
      </div>
      <button className="btn-primary" onClick={() => navigate('home')} disabled={goals.length === 0} style={{ opacity: goals.length === 0 ? 0.5 : 1 }}>
        Continue
      </button>
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function Auth({ screen, navigate }: { screen: string; navigate: NavigateFn }) {
  if (screen === 'splash') return <Splash navigate={navigate} />
  if (screen === 'onboarding-1') return <OnboardingScreen slide={0} navigate={navigate} />
  if (screen === 'onboarding-2') return <OnboardingScreen slide={1} navigate={navigate} />
  if (screen === 'onboarding-3') return <OnboardingScreen slide={2} navigate={navigate} />
  if (screen === 'auth') return <AuthScreen navigate={navigate} />
  if (screen === 'profile-completion') return <ProfileCompletion navigate={navigate} />
  if (screen === 'personalization') return <Personalization navigate={navigate} />
  return <AuthScreen navigate={navigate} />
}
