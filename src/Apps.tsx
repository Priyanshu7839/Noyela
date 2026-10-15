import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams } from 'react-router-dom'
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
import { Mic, Paperclip, Send } from 'lucide-react'
import { NoyelaOrb as NoyelMainOrb } from './components/NoyelaOrb'
import NoyelaSound from './assets/NoyelaSound.mp3'

import QuickActionsImg1 from './assets/QuickActionsImg1.png'
import QuickActionsImg2 from './assets/QuickActionsImg2.png'
import QuickActionsImg3 from './assets/QuickActionsImg3.png'

import { useLegacyNavigate, useLegacyParams, useLegacyScreen } from './legacyNav.js'

const PLAN_SCREENS = ['skin', 'hair', 'jawline', 'sleep', 'nutrition']

function getNavActive(screen: string): string {
  if (screen === 'home') return 'home'
  if (screen === 'ask-noyela' || screen === 'chat-active') return 'home'
  if (PLAN_SCREENS.some(p => screen.startsWith(p))) return 'plan'
  if (screen.startsWith('roadmap')) return 'plan'
  if (['doctors', 'doctor-profile', 'booking', 'booking-confirm', 'booking-review', 'treatment-detail'].includes(screen)) return 'discover'
  if (['profile', 'notifications', 'settings'].includes(screen)) return 'profile'
  if (screen === 'progress') return 'home'
  return 'home'
}

const Typewriter = ({ text, speed = 70, onComplete }: { text: string; speed?: number; onComplete?: () => void }) => {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setDisplay(text.slice(0, i + 1))
      i++
      if (i === text.length) {
        clearInterval(timer)
        onComplete?.()
      }
    }, speed)
    return () => clearInterval(timer)
  }, [])

  return (
    <h1 className="tracking-tight leading-tight whitespace-pre text-[#1F1F24] text-[22px] font-medium">
      {display}
      <span className="animate-pulse">|</span>
    </h1>
  )
}

// ─── Layout: Auth screens (no chrome) ───────────────────────────────
function AuthLayout() {
  return (
    <div className="app-shell">
      <Outlet />
    </div>
  )
}

function AuthSplashRoute() {
  const navigate = useLegacyNavigate()
  return <Auth screen="splash" navigate={navigate} />
}
function AuthOnboardingRoute() {
  const navigate = useLegacyNavigate()
  const { sub } = useParams()
  return <Auth screen={`onboarding-${sub}`} navigate={navigate} />
}
function AuthMainRoute() {
  const navigate = useLegacyNavigate()
  return <Auth screen="auth" navigate={navigate} />
}
function PersonalizationRoute() {
  const navigate = useLegacyNavigate()
  return <Auth screen="personalization" navigate={navigate} />
}

// ─── Layout: Ask Noyela (fullscreen) ─────────────────────────────────
function AskNoyelaLayout() {
  const navigate = useLegacyNavigate()
  return (
    <div style={{ paddingTop: 'env(safe-area-inset-top)' }} className="app-shell">
      <AskNoyela navigate={navigate} />
    </div>
  )
}

// ─── Layout: Face screens ────────────────────────────────────────────
function FaceLayout() {
  const navigate = useLegacyNavigate()
  const screen = useLegacyScreen('face')
  return (
    <div style={{ paddingTop: 'env(safe-area-inset-top)', background: 'var(--bg)' }} className="app-shell pb-[90px]">
      <div className="screen">
        <Face screen={screen} navigate={navigate} />
      </div>
    </div>
  )
}

// ─── Layout: Doctors standalone screens ──────────────────────────────
function DoctorsStandaloneLayout({ screenOverride }: { screenOverride: string }) {
  const navigate = useLegacyNavigate()
  const params = useLegacyParams()
  return (
    <div style={{ paddingTop: 'env(safe-area-inset-top)' }} className="app-shell">
      <Doctors screen={screenOverride} navigate={navigate} params={params} />
    </div>
  )
}

// ─── Route-level wrapper components (bridge path -> old `screen` prop) ─
function HomeRoute() {
  const navigate = useLegacyNavigate()
  return <Home navigate={navigate} />
}
function ProgressRoute() {
  const navigate = useLegacyNavigate()
  return <Progress navigate={navigate} />
}
function DoctorsRoute() {
  const navigate = useLegacyNavigate()
  const params = useLegacyParams()
  return <Doctors screen="doctors" navigate={navigate} params={params} />
}
function AccountRoute({ screen }: { screen: string }) {
  const navigate = useLegacyNavigate()
  return <Account screen={screen} navigate={navigate} />
}
function SkinRoute() {
  const navigate = useLegacyNavigate()
  const screen = useLegacyScreen('skin', 'overview')
  const [activeModule, setActiveModule] = useState('skin')
  return (
    <Skin
      screen={screen}
      navigate={navigate}
      activeModule={activeModule}
      onModuleChange={setActiveModule}
      onHamburger={() => {}}
      onNotif={() => navigate('notifications')}
    />
  )
}
function HairRoute() {
  const navigate = useLegacyNavigate()
  const screen = useLegacyScreen('hair', 'overview')
  const [activeModule, setActiveModule] = useState('hair')
  return <Hair screen={screen} navigate={navigate} activeModule={activeModule} onModuleChange={setActiveModule} />
}
function JawlineRoute() {
  const navigate = useLegacyNavigate()
  const screen = useLegacyScreen('jawline', 'overview')
  const [activeModule, setActiveModule] = useState('jawline')
  return <Jawline screen={screen} navigate={navigate} activeModule={activeModule} onModuleChange={setActiveModule} />
}
function SleepNutritionRoute({ screen }: { screen: string }) {
  const navigate = useLegacyNavigate()
  const [activeModule, setActiveModule] = useState('sleep')
  return <SleepNutrition screen={screen} navigate={navigate} activeModule={activeModule} onModuleChange={setActiveModule} />
}
function RoadmapRoute() {
  const navigate = useLegacyNavigate()
  const screen = useLegacyScreen('roadmap', 'today')
  return <Roadmap screen={screen} navigate={navigate} />
}

// ─── Layout: Main app shell (header + bottom nav + AI popup) ─────────
function MainLayout() {
  const navigate = useLegacyNavigate()
  const [AIPopup, setAIPopup] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioCompleted, setAudioCompleted] = useState(false)
  const [variableTimer, setVariableTimer] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const Subs = [
    "I'll get to know your skin…",
    'your hair… your face… your routines…',
    'and what you want to improve —',
    "then I'll build a plan around you…",
    'and guide you through it, step by step.',
    "You don't need to figure out what to do next.",
    "That's my job.",
    "Let's start by getting to know you —",
    "and let's begin… with a scan.",
  ]

  useEffect(() => {
    const unlockAudio = () => {
      const silence = new Audio()
      silence.play().catch(() => {})
      document.removeEventListener('touchstart', unlockAudio)
    }
    document.addEventListener('touchstart', unlockAudio, { once: true })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setAIPopup(true), 16000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (AIPopup && audioRef.current) {
      audioRef.current.play().catch((err) => console.log('Autoplay blocked:', err))
      const handleEnded = () => setAudioCompleted(true)
      audioRef.current.addEventListener('ended', handleEnded)
      return () => audioRef.current?.removeEventListener('ended', handleEnded)
    }
  }, [AIPopup])

  useEffect(() => {
    if (!AIPopup || !audioRef.current) return
    const audio = audioRef.current
    const handleTimeUpdate = () => {
      const t = audio.currentTime
      if (t >= 4 && variableTimer < 1) setVariableTimer(1)
      if (t >= 5.5 && variableTimer < 2) setVariableTimer(2)
      if (t >= 8.5 && variableTimer < 3) setVariableTimer(3)
      if (t >= 10.5 && variableTimer < 4) setVariableTimer(4)
      if (t >= 12.5 && variableTimer < 5) setVariableTimer(5)
      if (t >= 15.8 && variableTimer < 6) setVariableTimer(6)
      if (t >= 17.25 && variableTimer < 7) setVariableTimer(7)
      if (t >= 19.5 && variableTimer < 8) setVariableTimer(8)
      if (t >= 20.9 && variableTimer < 9) setVariableTimer(9)
    }
    audio.addEventListener('timeupdate', handleTimeUpdate)
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate)
  }, [AIPopup, variableTimer])

  const location = window.location.pathname
  const isPlanScreen = ['/skin', '/hair', '/jawline', '/sleep', '/nutrition'].some((p) => location.startsWith(p))
  const isAccount = ['/notifications', '/profile', '/settings'].includes(location)
  const isDoctors = location === '/doctors'
  const noHeader = isAccount || isDoctors
  const showBottomNav = true
  const screenForNav = location.replace('/', '') || 'home'

  const handleNavNavigate = (id: string) => {
    if (id === 'home') navigate('home')
    else if (id === 'plan') navigate('skin-overview')
    else if (id === 'discover') navigate('doctors')
    else if (id === 'profile') navigate('profile')
  }

  const Buttons = [
    { id: 'face-intro', img: QuickActionsImg1, head: 'Understand my face', para: 'Get a personalized assessment of your facial structure and features.' },
    { id: 'hair-overview', img: QuickActionsImg3, head: 'Explore hair health', para: 'Assess your scalp and hair to understand balance and strength.' },
    { id: 'roadmap-today', img: QuickActionsImg2, head: 'Build my roadmap', para: 'Create a personalized plan tailored to your goals and lifestyle.' },
  ]

  return (
    <div style={{ paddingTop: 'env(safe-area-inset-top)', background: 'var(--bg)' }} className="app-shell real pb-[90px]">
      {!isPlanScreen && !noHeader && (
        <NoyelaHeader onHamburger={() => setDrawerOpen(true)} onNotif={() => navigate('notifications')} showSubtitle={false} />
      )}

      {AIPopup && (
        <div onClick={() => setAIPopup(false)} className="w-full h-full bg-black/30 absolute bottom-0 z-[999] flex items-end">
          <audio ref={audioRef} src={NoyelaSound} />
          <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center w-full bg-[#FAF8FC] rounded-t-[50px] relative">
            <div onClick={() => setAIPopup(false)} className="mt-[-30px] flex flex-col items-center drop-shadow-2xl drop-shadow-purple-200">
              <NoyelaOrb pulse={true} size="md" />
              {!audioCompleted && (
                <div className="mt-[-20px]">
                  <NoyelMainOrb state="speaking" size={0} variant="lilac" />
                </div>
              )}
            </div>

            <div className="w-full h-full p-6 pt-0">
              <div className="flex-col gap-[3px] flex items-center justify-center py-[20px] pt-0">
                <Typewriter text="Hi Alex, I'm Noyela." />
                {variableTimer > 0 && !audioCompleted && (
                  <p className="text-[#7048EC] text-[15px] text-center">
                    <h1>{Subs[variableTimer - 1]}</h1>
                  </p>
                )}
                {audioCompleted && <p className="text-[#8E8D98] text-[13px]">I'll guide your aesthetic journey from here.</p>}
              </div>

              <div className="w-full h-full bg-[#FFFFFF] border-1 border-[#00000008] shadow-sm shadow-[#7048EC08] p-3 rounded-[24px] flex flex-col gap-3">
                <h1 className="text-[#7048EC] text-[10px] font-bold px-3">HERE'S HOW WE CAN BEGIN TODAY</h1>
                <div>
                  {Buttons.map((item, i) => (
                    <div
                      key={item.id}
                      onClick={() => { navigate(item.id); setAIPopup(false) }}
                      className={`cursor-pointer p-3 flex items-center justify-between gap-[14px] border-[#F0EBF5] ${i !== 2 ? 'border-b' : ''}`}
                    >
                      <div className="h-11 w-11 rounded-full bg-[white] shrink-0 overflow-hidden flex items-center justify-center">
                        <img src={item.img} alt="" className="objct-cover w-[50%]" />
                      </div>
                      <div className="flex flex-col gap-[3px]">
                        <h1 className="text-[#1F1F24] text-[14px] font-semibold">{item.head}</h1>
                        <p className="text-[#8E8D98] text-[11px]">{item.para}</p>
                      </div>
                      <ChevronRight size={16} color="#8E8D98" />
                    </div>
                  ))}
                </div>

                <div style={{ padding: '0 0px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="w-full h-full relative">
                    <div className="absolute top-[50%] translate-y-[-50%] left-4 z-10">
                      <Paperclip color="#4F33E2" size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder="Ask Noyela ... "
                      className="w-full outline-none py-[12px] pr-[35px] pl-[55px]"
                      style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, background: 'white', border: '1px solid var(--border)', borderRadius: 50, cursor: 'pointer' }}
                    />
                  </div>
                  <div className="absolute right-11 flex items-center gap-1">
                    <Mic size={18} />
                    <div className="p-2 rounded-full bg-[#4F33E2] flex items-center justify-center">
                      <Send onClick={() => navigate('ask-noyela')} color="#fff" size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </div>

      {showBottomNav && <BottomNav active={getNavActive(screenForNav)} onNavigate={handleNavNavigate} onOrb={() => navigate('ask-noyela')} />}

      {drawerOpen && (
        <HamburgerDrawer onClose={() => setDrawerOpen(false)} onNavigate={(s) => { navigate(s); setDrawerOpen(false) }} />
      )}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth flow — no shared layout chrome */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<AuthSplashRoute />} />
          <Route path="/onboarding/:sub" element={<AuthOnboardingRoute />} />
          <Route path="/auth" element={<AuthMainRoute />} />
          <Route path="/personalization" element={<PersonalizationRoute />} />
        </Route>

        {/* Fullscreen chat */}
        <Route path="/ask-noyela" element={<AskNoyelaLayout />} />

        {/* Face capture flow */}
        <Route path="/face/:sub" element={<FaceLayout />} />

        {/* Doctors standalone screens (own internal nav, no bottom nav) */}
        <Route path="/doctors/profile" element={<DoctorsStandaloneLayout screenOverride="doctor-profile" />} />
        <Route path="/booking" element={<DoctorsStandaloneLayout screenOverride="booking" />} />
        <Route path="/booking/confirm" element={<DoctorsStandaloneLayout screenOverride="booking-confirm" />} />
        <Route path="/booking/review" element={<DoctorsStandaloneLayout screenOverride="booking-review" />} />
        <Route path="/treatment-detail" element={<DoctorsStandaloneLayout screenOverride="treatment-detail" />} />

        {/* Main app shell — header + bottom nav + AI popup */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomeRoute />} />
          <Route path="/skin/:sub" element={<SkinRoute />} />
          <Route path="/hair/:sub" element={<HairRoute />} />
          <Route path="/jawline/:sub" element={<JawlineRoute />} />
          <Route path="/sleep" element={<SleepNutritionRoute screen="sleep" />} />
          <Route path="/nutrition" element={<SleepNutritionRoute screen="nutrition" />} />
          <Route path="/supplements" element={<SleepNutritionRoute screen="supplements" />} />
          <Route path="/roadmap/:sub" element={<RoadmapRoute />} />
          <Route path="/progress" element={<ProgressRoute />} />
          <Route path="/doctors" element={<DoctorsRoute />} />
          <Route path="/notifications" element={<AccountRoute screen="notifications" />} />
          <Route path="/profile" element={<AccountRoute screen="profile" />} />
          <Route path="/settings" element={<AccountRoute screen="settings" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
