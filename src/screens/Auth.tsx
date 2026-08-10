import { useState } from 'react'
import { InputField } from '../components/ui'
import NoyelaOrbImg from '../assets/NoyelaOrbImg.png'
import LoginHomeImg from '../assets/LoginHomeBg.png'
import { NoyelaOrb } from '../components/NoyelaOrb'
import SignInBg from '../assets/SignInBg.png'
import { Lock, Mail, User } from 'lucide-react'

import GoogleLogo from '../assets/GoogleLogo.png'
import AppleLogo from '../assets/AppleLogo.png'

type NavigateFn = (screen: string) => void

// ─── Splash ─────────────────────────────────────────────────────────────────
function Splash({ navigate }: { navigate: NavigateFn }) {
  return (
    <div style={{ height: '100vh', background: '#F0EDE8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px 50px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(155,109,212,0.15) 0%, transparent 60%)' }} />
      <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent:'center' , gap: 0, zIndex: 1 }}>
        {/* <img src={NoyelaOrbImg} alt="" className='w-[15%]'/> */}
        <NoyelaOrb size={120} />
       
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
    <div style={{ height: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
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

  return (
    <div style={{ minHeight: '100vh', background: '#fff', position: 'relative', overflow: 'hidden' }}>
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
       className="px-5 py-3 bg-[#ffffff] font-semibold text-[16px] text-[#111827] w-full rounded-[16px] border border-[#E5E7EB] shadow-sm flex items-center justify-center gap-2">
        <img src={AppleLogo} alt="" className='w-[45px]' />
        Continue With Apple
      </button>
      {/* ------------------------------------------------------------------------------------------------------------- */}
       <button 
        
       className="px-5 py-3 bg-[#ffffff] font-semibold text-[16px] text-[#111827] w-full rounded-[16px] border border-[#E5E7EB] shadow-sm flex items-center justify-center gap-2">
        <img src={GoogleLogo} alt="" className='w-[25px]' />
        Continue With Google
      </button>
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
            <button className="px-5 py-3 w-full text-center text-white text-[16px] font-medium bg-[#6C3EC1] rounded-[16px]" onClick={() => navigate('home')}>
              {tab === 'signin' ? 'Continue' : 'Create Account'}
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

// ─── Personalization ──────────────────────────────────────────────────────────
function Personalization({ navigate }: { navigate: NavigateFn }) {
  const [goals, setGoals] = useState<string[]>([])
  const options = ['Improve skin texture', 'Hair health & density', 'Jawline definition', 'Overall harmony', 'Anti-aging', 'Reduce hyperpigmentation', 'Better sleep quality', 'Nutrition & supplements']
  const toggle = (g: string) => setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '56px 24px 32px' }}>
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
  if (screen === 'personalization') return <Personalization navigate={navigate} />
  return <AuthScreen navigate={navigate} />
}
