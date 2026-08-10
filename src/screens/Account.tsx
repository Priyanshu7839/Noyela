import { useState } from 'react'
import { BackHeader, NoyelaOrb, AIInsight, InfoRow, ChevronRight } from '../components/ui'

type NavigateFn = (screen: string) => void

const NOTIFICATIONS_DATA = [
  { icon: '☀', time: '7:00 AM', title: 'Morning routine due', body: 'Start your 5-step skin morning routine.', unread: true, color: '#F59E0B' },
  { icon: '☀', time: '10:30 AM', title: 'SPF Reminder', body: "It's been 2 hours since your morning sunscreen. Reapply if outdoors.", unread: true, color: '#F59E0B' },
  { icon: '📸', time: '9:00 AM', title: 'Progress photo due', body: 'Take your 8-week progress photo for skin and hair comparison.', unread: true, color: '#8B5CF6' },
  { icon: '⟆', time: 'Yesterday', title: 'Hair treatment tonight', body: 'Apply minoxidil before 10 PM. Consistency is key.', unread: false, color: '#3B82F6' },
  { icon: '🌙', time: 'Yesterday', title: 'Sleep target not met', body: 'You slept 6h 42m — below your 7h 30m target. Try tonight.', unread: false, color: '#8B5CF6' },
  { icon: '📅', time: '2 days ago', title: 'Appointment reminder', body: 'Dr. Michael Torres — PRP Session #2 in 25 days.', unread: false, color: '#10B981' },
  { icon: '✦', time: '3 days ago', title: 'Noyela updated your roadmap', body: 'Vitamin C serum introduction moved up by 5 days based on your progress.', unread: false, color: '#6B35C8' },
]

function Notifications({ navigate }: { navigate: NavigateFn }) {
  const unread = NOTIFICATIONS_DATA.filter(n => n.unread).length
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <BackHeader onBack={() => navigate('home')} title="Notifications" subtitle={`${unread} unread`} />
      <div className="screen" style={{ paddingBottom: 24 }}>
        <div style={{ padding: '0 16px' }}>
          {NOTIFICATIONS_DATA.map((n, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: i < NOTIFICATIONS_DATA.length - 1 ? '1px solid var(--border)' : 'none', position: 'relative' }}>
              {n.unread && <div style={{ position: 'absolute', left: -8, top: 18, width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)' }} />}
              <div style={{ width: 44, height: 44, borderRadius: 14, background: `${n.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontWeight: n.unread ? 700 : 600, fontSize: 14, color: 'var(--text)' }}>{n.title}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{n.time}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0, lineHeight: 1.45 }}>{n.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Profile({ navigate }: { navigate: NavigateFn }) {
  const SECTIONS = [
    {
      title: 'My Journey',
      items: [
        { icon: '◎', label: 'Assessment History', nav: 'face-result' },
        { icon: '📊', label: 'Progress Photos', nav: 'progress' },
        { icon: '📋', label: 'Reports & Documents', nav: null },
        { icon: '⚑', label: 'Overall Roadmap', nav: 'roadmap-today' },
      ]
    },
    {
      title: 'Products & Routines',
      items: [
        { icon: '🧴', label: 'Saved Products', nav: 'skin-products' },
        { icon: '☀', label: 'My Routines', nav: 'skin-morning' },
        { icon: '💊', label: 'Supplements', nav: 'nutrition' },
      ]
    },
    {
      title: 'Professional Care',
      items: [
        { icon: '🏥', label: 'Doctors & Consultations', nav: 'doctors' },
        { icon: '📅', label: 'Appointments', nav: 'doctors' },
        { icon: '📄', label: 'Treatment History', nav: null },
      ]
    },
    {
      title: 'Account',
      items: [
        { icon: '📱', label: 'Connected Devices', nav: null },
        { icon: '🔔', label: 'Notifications', nav: 'notifications' },
        { icon: '💎', label: 'Subscription · Pro', nav: null },
        { icon: '🔒', label: 'Privacy & Data', nav: null },
        { icon: '⚙', label: 'Settings', nav: null },
        { icon: '❓', label: 'Help & Support', nav: null },
      ]
    },
  ]

  return (
    <div className="screen" style={{ paddingBottom: 24 }}>
      {/* Profile header */}
      <div style={{ background: 'linear-gradient(135deg, var(--purple-light) 0%, white 100%)', padding: '24px 16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--purple-light)', flexShrink: 0 }}>
            <img src="https://images.unsplash.com/photo-1652373723215-be4fa1a2c061?w=150&h=150&fit=crop&auto=format" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700, margin: '0 0 3px', color: 'var(--text)' }}>Alex Chen</h2>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 6 }}>alex.chen@email.com</div>
            <span style={{ background: 'var(--purple)', color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 50 }}>NOYELA PRO</span>
          </div>
          <button style={{ marginLeft: 'auto', background: 'none', border: '1px solid var(--border)', borderRadius: 50, padding: '6px 12px', fontSize: 13, color: 'var(--text)', cursor: 'pointer' }}>Edit</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: 'Harmony Score', value: '78' },
            { label: 'Days Active', value: '55' },
            { label: 'Phase', value: '2/4' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', background: 'white', borderRadius: 14, padding: '12px 8px', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 800, fontSize: 22, color: 'var(--purple)' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 16px 0' }}>
        <AIInsight text="Your profile is 78% complete. Adding your goals and uploading a recent photo will improve Noyela's recommendations." action="Complete profile" />

        {SECTIONS.map(section => (
          <div key={section.title} style={{ marginTop: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em', marginBottom: 8, paddingLeft: 4 }}>{section.title.toUpperCase()}</div>
            <div style={{ background: 'white', borderRadius: 18, border: '1px solid var(--border)', overflow: 'hidden' }}>
              {section.items.map((item, i) => (
                <button key={item.label} onClick={() => item.nav && navigate(item.nav)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'none', border: 'none', borderBottom: i < section.items.length - 1 ? '1px solid var(--border)' : 'none', width: '100%', cursor: item.nav ? 'pointer' : 'default', textAlign: 'left', fontFamily: "'Inter', sans-serif" }}>
                  <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{item.icon}</span>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{item.label}</span>
                  {item.nav && <ChevronRight size={16} />}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button onClick={() => navigate('auth')} style={{ width: '100%', marginTop: 24, padding: '15px', background: 'none', border: '1.5px solid #EF4444', borderRadius: 14, color: '#EF4444', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
          Sign Out
        </button>

        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3)', margin: '20px 0' }}>NOYELA v2.0 · Made for you</p>
      </div>
    </div>
  )
}

export default function Account({ screen, navigate }: { screen: string; navigate: NavigateFn }) {
  if (screen === 'notifications') return <Notifications navigate={navigate} />
  return <Profile navigate={navigate} />
}
