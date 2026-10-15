import { Bell } from 'lucide-react';
import { type ReactNode, type CSSProperties } from 'react'
import Orb from './Orb';
import OrbImg from '../assets/NoyelaOrbImg.png'
import OrbImg2 from '../assets/OrbImg2.png'
import SkinIconPack11 from '../assets/SkinIconPack11.png'
import SkinIconPack4 from '../assets/SkinIconPack4.png'
import SkinIconPack3 from '../assets/SkinIconPack3.png'
import SkinIconPack2 from '../assets/SkinIconPack2.png'
import SkinIconPack1 from '../assets/SkinIconPack1.png'


// ─── Noyela Orb ────────────────────────────────────────────────────────────
type OrbSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
const ORB_SIZES: Record<OrbSize, number> = { xs: 36, sm: 48, md: 72, lg: 120, xl: 160 }

export function NoyelaOrb({ size = 'md', pulse = false, className = '' }: {
  size?: OrbSize; pulse?: boolean; className?: string
}) {
  const s = ORB_SIZES[size]
  const iconSize = Math.round(s * 0.32)
  return (
    <div
      className={`animate-orb-breathe overflow-hidden ${className}`}
      style={{
        width: s, height: s, borderRadius: '50%', flexShrink: 0,
        background: 'radial-gradient(circle at 32% 28%, #D8C8F4 0%, #9B6DD4 42%, #5E28B8 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: pulse ? 'orb-pulse 1s ease-in-out infinite' : 'orb-breathe 3.5s ease-in-out infinite',
        cursor: 'pointer',
      }}
    >
      {/* <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: iconSize, lineHeight: 1 }}>✦</span> */}

      <img src={OrbImg2} alt="" />
    </div>
  )
}

// ─── Header ────────────────────────────────────────────────────────────────
export function Header({
  left, title, subtitle, right,
}: {
  left?: ReactNode; title?: ReactNode; subtitle?: string; right?: ReactNode
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 16px 10px', background: 'var(--bg)',
    }}>
      <div style={{ width: 80, display: 'flex', alignItems: 'center' }}>{left}</div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        {title && <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text)', letterSpacing: 0 }}>{title}</div>}
        {subtitle && <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 1 }}>{subtitle}</div>}
      </div>
      <div style={{ width: 80, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>{right}</div>
    </div>
  )
}

export function NoyelaHeader({ onHamburger, onNotif, showProfile = true, showSubtitle = false }: {
  onHamburger: () => void; onNotif?: () => void; showProfile?: boolean; showSubtitle?: boolean
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px 10px', background: 'var(--bg)',
    }}>
      <div style={{ width: 44 }}>
        <button onClick={onHamburger} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <HamburgerIcon />
        </button>
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Elms Sans', sans-serif", fontWeight: 600, fontSize: 16, letterSpacing: '0.22em', color: '#565758', lineHeight: 1 }}>NOYELA</div>
        {showSubtitle && <div style={{ fontFamily: "'Playfair Display'", fontStyle: 'italic', fontSize: 10.5, color: 'var(--text-2)', letterSpacing: '0.02em', marginTop: 2 }}>Your Personalized Aesthetic Intelligence</div>}
      </div>
      <div style={{ width: 44, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10 }}>
        <button onClick={onNotif} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, position: 'relative' }}>
        <Bell/>
          <div style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, borderRadius: '50%', background: '#7C3AED', border: '1.5px solid var(--bg)' }} />
        </button>
        {/* {showProfile && (
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--purple-light)', overflow: 'hidden', flexShrink: 0 }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )} */}
      </div>
    </div>
  )
}

export function BackHeader({ onBack, title, subtitle, right }: {
  onBack: () => void; title?: string; subtitle?: string; right?: ReactNode
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 16px 10px', background: 'var(--bg)',
    }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text)', padding: 4 }}>
        <ChevronLeft size={22} />
      </button>
      <div style={{ flex: 1, paddingLeft: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 1 }}>{subtitle}</div>}
      </div>
      {right}
    </div>
  )
}

// ─── Bottom Navigation ──────────────────────────────────────────────────────
export function BottomNav({ active, onNavigate, onOrb }: {
  active: string; onNavigate: (screen: string) => void; onOrb: () => void
}) {
  const items = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'plan', label: 'Plan', icon: <PlanIcon /> },
  ]
  const items2 = [
    { id: 'discover', label: 'Discover', icon: <DiscoverIcon /> },
    { id: 'profile', label: 'Profile', icon: <ProfileIcon /> },
  ]
  return (
    <div className="bottom-nav rounded-t-[50px] w-full ">
      {items.map(i => (
        <button  key={i.id} onClick={() => onNavigate(i.id)} className={`nav-item ${active === i.id ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          {i.icon}
          <span style={{ fontSize: 10, fontWeight: active === i.id ? 600 : 400 }}>{i.label}</span>
        </button>
      ))}
      <button className='w-fit  justify-center ' onClick={onOrb} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, marginTop: -50,marginLeft:10 }}>
      {/* <Orb width={80} height={80}/> */}
      <NoyelaOrb size='md'/>
      </button>
      {items2.map(i => (
        <button key={i.id} onClick={() => onNavigate(i.id)} className={`nav-item ${active === i.id ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          {i.icon}
          <span style={{ fontSize: 10, fontWeight: active === i.id ? 600 : 400 }}>{i.label}</span>
        </button>
      ))}
    </div>
  )
}

// ─── Hamburger Drawer ───────────────────────────────────────────────────────
const DRAWER_ITEMS = [
  { section: null, items: ['Home', 'My Profile', 'My Journey'] },
  { section: 'PROGRESS', items: ['Overall Roadmap', 'My Assessments', 'Progress', 'Progress Photos'] },
  { section: 'PRODUCTS & ROUTINES', items: ['Saved Products', 'My Routines'] },
  { section: 'PROFESSIONAL CARE', items: ['Doctors & Consultations', 'Reports', 'Documents'] },
  { section: 'SETTINGS', items: ['Connected Devices', 'Notifications', 'Subscription', 'Privacy & Data', 'Settings', 'Help & Support'] },
  { section: null, items: ['Sign Out'] },
]

const DRAWER_NAV: Record<string, string> = {
  'Home': 'home',
  'My Profile': 'profile',
  'My Journey': 'roadmap-today',
  'Overall Roadmap': 'roadmap-today',
  'My Assessments': 'face-result',
  'Progress': 'progress',
  'Progress Photos': 'progress',
  'Saved Products': 'skin-products',
  'My Routines': 'skin-morning',
  'Doctors & Consultations': 'doctors',
  'Reports': 'profile',
  'Documents': 'profile',
  'Connected Devices': 'profile',
  'Notifications': 'notifications',
  'Subscription': 'profile',
  'Privacy & Data': 'profile',
  'Settings': 'profile',
  'Help & Support': 'profile',
  'Sign Out': 'auth',
}

export function HamburgerDrawer({ onClose, onNavigate }: {
  onClose: () => void; onNavigate: (screen: string) => void
}) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div style={{ padding: '52px 24px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <OrbLogoSmall />
            <div>
              <div style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: 14, letterSpacing: '0.1em' }}>NOYELA</div>
              <div style={{ fontSize: 11, color: 'var(--text-2)' }}>Alex Chen</div>
            </div>
          </div>
          {DRAWER_ITEMS.map((group, gi) => (
            <div key={gi} style={{ marginBottom: 20 }}>
              {group.section && (
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em', marginBottom: 8, paddingLeft: 4 }}>
                  {group.section}
                </div>
              )}
              {group.items.map(item => (
                <button
                  key={item}
                  onClick={() => { onNavigate(DRAWER_NAV[item] || 'home'); onClose(); }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '11px 12px', borderRadius: 12, border: 'none', background: 'none',
                    fontSize: 14, fontWeight: item === 'Sign Out' ? 600 : 400,
                    color: item === 'Sign Out' ? '#EF4444' : 'var(--text)', cursor: 'pointer',
                    marginBottom: 2, transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--purple-pale)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                >
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Module Tabs ────────────────────────────────────────────────────────────
const MODULES = [
  { id: 'skin', label: 'Skin', img:SkinIconPack1 },
  { id: 'hair', label: 'Hair',  img:SkinIconPack2},
  { id: 'jawline', label: 'Jawline',  img:SkinIconPack4 },
  { id: 'sleep', label: 'Sleep', img:SkinIconPack3},
  { id: 'nutrition', label: 'Nutrition',  img:SkinIconPack11 },
]

export function ModuleTabs({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: 0, overflowX: 'auto', padding: '10px 16px', background: 'white', borderBottom: '1px solid var(--border)' }}>
      {MODULES.map(m => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          className={`w-[100px] module-tab ${active === m.id ? 'active' : ''}`}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <img src={m.img} alt=""  className='w-[20%]'/> {m.label}
        </button>
      ))}
    </div>
  )
}

// ─── Score Card ─────────────────────────────────────────────────────────────
export function ScoreRing({ score, size = 80, label }: { score: number; size?: number; label?: string }) {
  const r = (size - 10) / 2
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border)" strokeWidth={6} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#purpleGrad)" strokeWidth={6}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
        <defs>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9B6DD4" />
            <stop offset="100%" stopColor="#6B35C8" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontWeight: 700, fontSize: size * 0.28, color: 'var(--text)', lineHeight: 1 }}>{score}</span>
        {label && <span style={{ fontSize: size * 0.14, color: 'var(--text-2)', marginTop: 1 }}>{label}</span>}
      </div>
    </div>
  )
}

// ─── AI Insight Card ────────────────────────────────────────────────────────
export function AIInsight({ text, action, onAction }: { text: string; action?: string; onAction?: () => void }) {
  return (
    <div className="ai-insight-strip">
      {/* <Orb state={'idle'}  width={50} height={50}/> */}
      {/* <NoyelaOrb size='sm'/> */}
      <img src={OrbImg} className='w-[10%]' alt="" />
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', margin: 0, lineHeight: 1.45 }}>{text}</p>
        {action && (
          <button onClick={onAction} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--purple)', fontSize: 12, fontWeight: 600, padding: 0, marginTop: 4 }}>
            {action} →
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Progress Bar ───────────────────────────────────────────────────────────
export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`progress-bar-track ${className}`}>
      <div className="progress-bar-fill" style={{ width: `${value}%` }} />
    </div>
  )
}

// ─── Segment Control ────────────────────────────────────────────────────────
export function SegmentControl({ options, active, onChange }: {
  options: string[]; active: string; onChange: (v: string) => void
}) {
  return (
    <div className="segment-control">
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)} className={`segment-btn ${active === o ? 'active' : ''}`}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
          {o}
        </button>
      ))}
    </div>
  )
}

// ─── Pill Tabs ──────────────────────────────────────────────────────────────
export function PillTabs({ options, active, onChange }: {
  options: string[]; active: string; onChange: (v: string) => void
}) {
  return (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)} style={{
          padding: '7px 16px', borderRadius: 50, border: `1.5px solid ${active === o ? 'var(--purple)' : 'var(--border)'}`,
          background: active === o ? 'var(--purple-pale)' : 'white',
          color: active === o ? 'var(--purple)' : 'var(--text-2)',
          fontSize: 13, fontWeight: active === o ? 600 : 400, whiteSpace: 'nowrap', cursor: 'pointer',
          fontFamily: "'Inter', sans-serif", transition: 'all 0.2s', flexShrink: 0,
        }}>
          {o}
        </button>
      ))}
    </div>
  )
}

// ─── Section Header ─────────────────────────────────────────────────────────
export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--text)', fontFamily:"'Elms Sans'" }}>{title}</h3>
      {action && (
        <button onClick={onAction} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--purple)', fontSize: 13, fontWeight: 500,fontFamily:"'Elms Sans'" }}>
          {action}
        </button>
      )}
    </div>
  )
}

// ─── Divider ────────────────────────────────────────────────────────────────
export function Divider() {
  return <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
}

// ─── Icons ──────────────────────────────────────────────────────────────────
function OrbLogoSmall() {
  return (
    <div style={{
      width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
      background: 'radial-gradient(circle at 32% 28%, #D8C8F4 0%, #9B6DD4 42%, #5E28B8 100%)',
      boxShadow: '0 0 8px rgba(107,53,200,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 10 }}>✦</span>
    </div>
  )
}

export function HamburgerIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
      <rect y="0" width="22" height="2" rx="1" fill="var(--text)" />
      <rect y="7" width="16" height="2" rx="1" fill="var(--text)" />
      <rect y="14" width="22" height="2" rx="1" fill="var(--text)" />
    </svg>
  )
}

export function BellIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
      <path d="M10 1C10 1 4 3.5 4 10V16H2V17.5H18V16H16V10C16 3.5 10 1 10 1Z" stroke="var(--text)" strokeWidth="1.5" fill="none" />
      <path d="M8 17.5C8 18.6 8.9 19.5 10 19.5C11.1 19.5 12 18.6 12 17.5" stroke="var(--text)" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export function ChevronLeft({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HomeIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 9L11 2L19 9V20H14V14H8V20H3V9Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" /></svg>
}
function PlanIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="5" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" fill="none" /><path d="M3 9H19" stroke="currentColor" strokeWidth="1.4" /><path d="M8 3V7M14 3V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
}
function DiscoverIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" fill="none" /><path d="M15.5 15.5L19 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
}
function ProfileIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" fill="none" /><path d="M3 20C3 16.13 6.58 13 11 13C15.42 13 19 16.13 19 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" /></svg>
}

// ─── Misc helpers ────────────────────────────────────────────────────────────
export function CheckCircleIcon({ color = '#15803D' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" fill={color} opacity="0.15" />
      <circle cx="9" cy="9" r="8" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M5.5 9L7.8 11.5L12.5 6.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill={filled ? '#F59E0B' : 'none'}>
      <path d="M6 1L7.5 4.5L11 5L8.5 7.3L9.1 11L6 9.2L2.9 11L3.5 7.3L1 5L4.5 4.5L6 1Z" stroke="#F59E0B" strokeWidth="1" />
    </svg>
  )
}

// ─── Product tier badge ─────────────────────────────────────────────────────
export function TierBadge({ tier }: { tier: 'premium' | 'value' | 'budget' }) {
  const map = {
    premium: { label: "Noyela's Pick", cls: 'badge-noyela', icon: '✦' },
    value: { label: 'Best Value', cls: 'badge-value', icon: '◎' },
    budget: { label: 'Budget', cls: 'badge-budget', icon: '◇' },
  }
  const t = map[tier]
  return <span className={`whitespace-nowrap pill-badge ${t.cls}`}>{t.icon} {t.label}</span>
}

// ─── Match badge ─────────────────────────────────────────────────────────────
export function MatchBadge({ pct }: { pct: number }) {
  const color = pct >= 90 ? 'var(--green)' : pct >= 75 ? 'var(--purple)' : 'var(--amber)'
  const bg = pct >= 90 ? 'var(--green-bg)' : pct >= 75 ? 'var(--purple-light)' : 'var(--amber-bg)'
  const label = pct >= 90 ? 'Excellent Match' : pct >= 75 ? 'Good Match' : 'Possible Option'
  return (
    <span style={{ padding: '4px 10px', borderRadius: 50, background: bg, color, fontSize: 11, fontWeight: 600 }}>
      {pct}% · {label}
    </span>
  )
}

// ─── Input ──────────────────────────────────────────────────────────────────
export function InputField({
  icon, placeholder, type = 'text', value, onChange, rightIcon,
}: {
  icon?: ReactNode; placeholder: string; type?: string; value?: string; onChange?: (v: string) => void; rightIcon?: ReactNode
}) {
  return (
    <div className="input-field">
      {icon && <span style={{ color: 'var(--text-3)', flexShrink: 0 }}>{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, color: '#8E8A9A', background: 'transparent', fontFamily: "'Inter', sans-serif" }}
      />
      {rightIcon && <span style={{ color: 'var(--text-3)', flexShrink: 0 }}>{rightIcon}</span>}
    </div>
  )
}

// ─── Bottom sheet wrapper ────────────────────────────────────────────────────
export function BottomSheet({ onClose, children, title }: {
  onClose: () => void; children: ReactNode; title?: string
}) {
  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 150 }} onClick={onClose} />
      <div className="bottom-sheet" style={{ zIndex: 200 }}>
        <div style={{ width: 40, height: 4, background: 'var(--border)', borderRadius: 2, margin: '0 auto 16px' }} />
        {title && <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700 }}>{title}</h3>}
        {children}
      </div>
    </>
  )
}

// ─── Stat tile ───────────────────────────────────────────────────────────────
export function StatTile({ label, value, unit, trend }: { label: string; value: string; unit?: string; trend?: string }) {
  return (
    <div style={{ background: 'white', borderRadius: 16, padding: '14px 16px', border: '1px solid var(--border)', flex: 1 }}>
      <div style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 500, marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>{value}</span>
        {unit && <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{unit}</span>}
      </div>
      {trend && <div style={{ fontSize: 11, color: trend.startsWith('+') ? 'var(--green)' : 'var(--text-2)', marginTop: 3, fontWeight: 500 }}>{trend}</div>}
    </div>
  )
}

// ─── Photo comparison slider ──────────────────────────────────────────────────
export function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  return (
    <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 200, background: 'var(--border)' }}>
      <img src={after} alt="After" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <img src={before} alt="Before" style={{ position: 'absolute', inset: 0, width: '50%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: 'white', transform: 'translateX(-50%)' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
        <span style={{ fontSize: 12, color: 'var(--text)' }}>⇄</span>
      </div>
      <span style={{ position: 'absolute', bottom: 8, left: 10, background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 10, padding: '2px 8px', borderRadius: 50 }}>Before</span>
      <span style={{ position: 'absolute', bottom: 8, right: 10, background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 10, padding: '2px 8px', borderRadius: 50 }}>After</span>
    </div>
  )
}

// ─── Chat elements ────────────────────────────────────────────────────────────
export function ChatBubble({ text, isUser = false, time }: { text: string; isUser?: boolean; time?: string }) {
  return (
    <div style={{
      display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 10, paddingLeft: isUser ? 40 : 0, paddingRight: isUser ? 0 : 40,
    }}>
      <div style={{
        background: isUser ? 'var(--purple)' : 'white',
        color: isUser ? 'white' : 'var(--text)',
        padding: '11px 15px', borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        fontSize: 14, lineHeight: 1.45, border: isUser ? 'none' : '1px solid var(--border)',
        boxShadow: isUser ? 'none' : '0 2px 8px rgba(0,0,0,0.05)',
      }}>
        {text}
        {time && <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4, textAlign: 'right' }}>{time}</div>}
      </div>
    </div>
  )
}

// ─── Ghost pill button ────────────────────────────────────────────────────────
export function GhostPill({ children, onClick, active = false }: { children: ReactNode; onClick?: () => void; active?: boolean }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '8px 16px', borderRadius: 50, border: `1.5px solid ${active ? 'var(--purple)' : 'var(--border)'}`,
      background: active ? 'var(--purple-pale)' : 'transparent',
      color: active ? 'var(--purple)' : 'var(--text-2)', fontSize: 13, fontWeight: active ? 600 : 400,
      cursor: 'pointer', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {children}
    </button>
  )
}

// ─── Compact info row ─────────────────────────────────────────────────────────
export function InfoRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontSize: 14, color: 'var(--text-2)' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: valueColor || 'var(--text)' }}>{value}</span>
    </div>
  )
}

// ─── Step number circle ────────────────────────────────────────────────────────
export function StepCircle({ n, active = false, completed = false }: { n: number; active?: boolean; completed?: boolean }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
      background: completed ? 'var(--purple)' : active ? 'var(--purple-light)' : 'var(--bg)',
      border: `2px solid ${completed || active ? 'var(--purple)' : 'var(--border)'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, color: completed ? 'white' : active ? 'var(--purple)' : 'var(--text-2)',
    }}>
      {completed ? '✓' : n}
    </div>
  )
}
