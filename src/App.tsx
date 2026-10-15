import { useState, useEffect, useRef } from 'react'
import { BottomNav, NoyelaHeader, HamburgerDrawer, NoyelaOrb, ChevronRight } from './components/ui'
import Auth from './screens/Auth'
import Home from './screens/Home'
import AskNoyela from './screens/AskNoyela'
import Face from './screens/Face'
import Skin from './screens/Skin'
import Hair from './screens/Hair'
import Jawline from './screens/Jawline'
import SleepNutrition from './screens/SleepNutrition'
import Roadmap from './screens/Roadmap'
import Progress from './screens/Progress'
import Doctors from './screens/Doctors'
import Account from './screens/Account'
import { getCurrentUser, needsProfileCompletion } from './lib/auth'
import { Mic, Paperclip, Send } from 'lucide-react'
import { WaveformBars } from './components/NoyelaOrb'

import QuickActionsImg1 from './assets/QuickActionsImg1.png'
import QuickActionsImg2 from './assets/QuickActionsImg2.png'
import QuickActionsImg3 from './assets/QuickActionsImg3.png'
import QuickActionsImg4 from './assets/QuickActionsImg4.png'



type Screen = string

const AUTH_SCREENS = ['splash', 'onboarding-1', 'onboarding-2', 'onboarding-3', 'auth', 'profile-completion', 'personalization']
const PLAN_SCREENS = ['skin', 'hair', 'jawline', 'sleep', 'nutrition']

function getNavActive(screen: Screen): string {
  if (screen === 'home') return 'home'
  if (screen === 'ask-noyela' || screen === 'chat-active') return 'home'
  if (PLAN_SCREENS.some(p => screen.startsWith(p))) return 'plan'
  if (screen === 'roadmap-today' || screen === 'roadmap-journey' || screen === 'roadmap-timeline') return 'plan'
  if (screen === 'doctors' || screen === 'doctor-profile' || screen === 'booking' || screen === 'booking-confirm' || screen === 'booking-review' || screen === 'treatment-detail') return 'discover'
  if (screen === 'profile' || screen === 'notifications' || screen === 'settings') return 'profile'
  if (screen === 'progress') return 'home'
  return 'home'
}



export default function App() {


  const [screen, setScreen] = useState<Screen>('splash')
  const [params, setParams] = useState<Record<string, unknown>>({})
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeModule, setActiveModule] = useState('skin')

  

  useEffect(() => {
    let active = true

    const restoreAuthenticatedSession = async () => {
      try {
        // getUser validates/refreshes the persisted Supabase token with Auth.
        const user = await getCurrentUser()
        if (!user || !active) return
        try {
          const profileIncomplete = await needsProfileCompletion(user)
          if (active) setScreen(profileIncomplete ? 'profile-completion' : 'home')
        } catch {
          // A session remains valid even if the profile migration has not yet
          // been applied; do not strand an authenticated user on the auth page.
          if (active) setScreen('home')
        }
      } catch {
        // No valid saved session: leave the splash/auth journey unchanged.
      }
    }

    void restoreAuthenticatedSession()
    return () => { active = false }
  }, [])

  const navigate = (s: Screen, newParams?: Record<string, unknown>) => {
    setScreen(s)
    if (newParams) setParams(newParams)
    // Update module when navigating to a plan screen
    if (PLAN_SCREENS.some(p => s.startsWith(p))) {
      const mod = PLAN_SCREENS.find(p => s.startsWith(p))
      if (mod) setActiveModule(mod)
    }
  }

  const isAuthScreen = AUTH_SCREENS.includes(screen)
  const isFullscreenScreen = ['ask-noyela', 'face-capture', 'face-processing'].includes(screen)
  const showBottomNav = !isAuthScreen
  const showHeader = !isAuthScreen && !PLAN_SCREENS.some(p => screen.startsWith(p)) && !screen.startsWith('roadmap') && screen !== 'ask-noyela' && screen !== 'progress'
  const showPlanHeader = PLAN_SCREENS.some(p => screen.startsWith(p))

  

  const handleNavNavigate = (id: string) => {
    if (id === 'home') navigate('home')
    else if (id === 'plan') navigate(`${activeModule}-overview`)
    else if (id === 'discover') navigate('doctors')
    else if (id === 'profile') navigate('profile')
  }

  // Render screens that have their own full-page layout
  if (isAuthScreen) {
    return (
      <div
      
     className="app-shell ">
    
        <Auth screen={screen} navigate={navigate} />
      </div>
    )
  }

  if (screen === 'ask-noyela') {
    return (
      <div 
      style={{
    paddingTop: 'env(safe-area-inset-top)'
  }}
      className="app-shell">

       
        <AskNoyela navigate={navigate} params={params} />
      </div>
    )
  }

  // Face screens
  if (screen.startsWith('face-')) {
    return (
      <div 
      style={{
    paddingTop: 'env(safe-area-inset-top)',background: 'var(--bg)'
  }}
      className="app-shell pb-[90px]">
        <div className="screen">
          <Face screen={screen} navigate={navigate} />
        </div>
      </div>
    )
  }

  // Booking/doctors that have their own internal nav
  if (['doctor-profile', 'booking', 'booking-confirm', 'booking-review', 'treatment-detail'].includes(screen)) {
    return (
      <div 
      style={{
    paddingTop: 'env(safe-area-inset-top)'
  }}
      className="app-shell">
        <Doctors screen={screen} navigate={navigate} params={params} />
      </div>
    )
  }

  // Main app shell with header + bottom nav




  const renderScreen = () => {
    // Plan screens
    if (screen.startsWith('skin-')) return <Skin screen={screen} navigate={navigate} activeModule={activeModule} onModuleChange={setActiveModule} onHamburger={() => setDrawerOpen(true)} onNotif={() => navigate('notifications')} />
    if (screen.startsWith('hair-')) return <Hair screen={screen} navigate={navigate} activeModule={activeModule} onModuleChange={setActiveModule} onHamburger={() => setDrawerOpen(true)} onNotif={() => navigate('notifications')}/>
    if (screen.startsWith('jawline-')) return <Jawline screen={screen} navigate={navigate} activeModule={activeModule} onModuleChange={setActiveModule} onHamburger={() => setDrawerOpen(true)} onNotif={() => navigate('notifications')}/>
    if (screen === 'sleep' || screen === 'nutrition' || screen === 'supplements') return <SleepNutrition screen={screen} navigate={navigate} activeModule={activeModule} onModuleChange={setActiveModule} />

    if (screen === 'home') return <Home navigate={navigate} />
    if (screen.startsWith('roadmap')) return <Roadmap screen={screen} navigate={navigate} />
    if (screen === 'progress') return <Progress navigate={navigate} />
    if (screen === 'doctors') return <Doctors screen={screen} navigate={navigate} params={params} />
    if (screen === 'notifications' || screen === 'profile' || screen === 'settings') return <Account screen={screen} navigate={navigate} />

    return <Home navigate={navigate} />
  }

  const isPlanScreen = PLAN_SCREENS.some(p => screen.startsWith(p))
  const isRoadmap = screen.startsWith('roadmap')
  const isProgress = screen === 'progress'
  const isDoctors = screen === 'doctors'
  const isAccount = ['notifications', 'profile', 'settings'].includes(screen)

  // Screens that handle their own header via BackHeader inside
  const noHeader = isAccount || isDoctors





  return (
    <div 
    style={{
    paddingTop: 'env(safe-area-inset-top)',background: 'var(--bg)'
  }}
    className="app-shell real pb-[90px]">
      {/* Global header — only on home and plan screens with no back button */}
      {!isPlanScreen && !noHeader && (
        <NoyelaHeader
          onHamburger={() => setDrawerOpen(true)}
          onNotif={() => navigate('notifications')}
          showSubtitle={false}
        />
      )}



      {/* Screen content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {renderScreen()}
      </div>

      {/* Bottom navigation */}
      {showBottomNav && (
        <BottomNav
          active={getNavActive(screen)}
          onNavigate={handleNavNavigate}
          onOrb={() => navigate('ask-noyela')}
        />
      )}

      {/* Hamburger drawer */}
      {drawerOpen && (
        <HamburgerDrawer
          onClose={() => setDrawerOpen(false)}
          onNavigate={(s) => { navigate(s); setDrawerOpen(false) }}
        />
      )}
    </div>
  )
}
