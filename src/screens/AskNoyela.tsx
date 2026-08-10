import { useState, useRef, useEffect } from 'react'
import {  BackHeader, ChatBubble, BottomSheet } from '../components/ui'
import { NoyelaOrb } from '../components/NoyelaOrb'
type NavigateFn = (screen: string) => void

const SUGGESTIONS = [
  { text: 'Review today\'s roadmap', screen: 'roadmap-today' },
  { text: 'Analyze my skin', screen: 'skin-overview' },
  { text: 'Ask about my hair', screen: 'hair-overview' },
  { text: 'Check my progress', screen: 'progress' },
]

const INITIAL_MESSAGES = [
  { text: "Good morning, Alex! How can I help you today?", isUser: false, time: '9:41 AM' },
]

const NOYELA_RESPONSES: Record<string, string> = {
  default: "Based on your current routine and progress, I'd recommend focusing on your morning SPF application — you've been consistent, and your skin barrier metrics are improving. Want me to review your full plan?",
  skin: "Your skin barrier health score is 78/100 — up from 71 last week. Your hydration levels are improving. I'd suggest introducing a Vitamin C serum to your morning routine now that your barrier is stronger. Ready to see which ones I recommend?",
  hair: "Your hair density scan from last week shows early improvement — shedding has reduced by 18%. Continue with the minoxidil and add a scalp massage 3x/week. Your next PRP session should be in 3 weeks based on your protocol.",
  progress: "You're 35% through Phase 2 — Enhancement. Your biggest wins this month: skin texture (+12%), sleep consistency (+8%), and routine adherence (92%). Your next milestone is at 40%, which unlocks your personalized Phase 3 plan.",
}

export default function AskNoyela({ navigate }: { navigate: NavigateFn }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [showSheet, setShowSheet] = useState(false)
  const [hasChat, setHasChat] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setHasChat(true)
    setMessages(prev => [...prev, { text, isUser: true, time: '9:41 AM' }])
    setInput('')
    setIsThinking(true)
    setTimeout(() => {
      const lower = text.toLowerCase()
      const reply = lower.includes('skin') ? NOYELA_RESPONSES.skin
        : lower.includes('hair') ? NOYELA_RESPONSES.hair
        : lower.includes('progress') ? NOYELA_RESPONSES.progress
        : NOYELA_RESPONSES.default
      setMessages(prev => [...prev, { text: reply, isUser: false, time: '9:41 AM' }])
      setIsThinking(false)
    }, 1500)
  }

  const SHEET_OPTIONS = [
    { icon: '📷', label: 'Take Photo' },
    { icon: '🖼', label: 'Upload Photo' },
    { icon: '📄', label: 'Upload Report' },
    { icon: '🎙', label: 'Voice Note' },
    { icon: '🔍', label: 'Scan Product' },
    { icon: '❤', label: 'Import Health Data' },
  ]

  return (
    <div style={{ background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <BackHeader onBack={() => navigate('home')} title="Ask Noyela" subtitle="AI-powered aesthetic intelligence" />

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {!hasChat ? (
          /* Initial state */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', gap: 20, textAlign: 'center' }}>
            <NoyelaOrb state='listening'/>
            
            <div>
              <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 500, color: 'var(--text)', margin: '0 0 8px' }}>Good Morning, Alex.</h2>
              <p style={{ fontSize: 15, color: 'var(--text-2)', margin: 0 }}>How can I help you today?</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 8 }}>
              {SUGGESTIONS.map(s => (
                <button
                  key={s.text}
                  onClick={() => { sendMessage(s.text) }}
                  style={{
                    padding: '14px 20px', borderRadius: 50, border: '1.5px solid var(--border)',
                    background: 'white', color: 'var(--text)', fontSize: 14, fontWeight: 500,
                    cursor: 'pointer', fontFamily: "'Inter', sans-serif", textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 10, transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--purple)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
                >
                  <span style={{ fontSize: 16, flexShrink: 0 }}>✦</span>
                  {s.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Active chat */
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            {/* Small orb in top-center */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <NoyelaOrb size="sm" />
            </div>
            {messages.map((m, i) => (
              <ChatBubble key={i} text={m.text} isUser={m.isUser} time={m.time} />
            ))}
            {isThinking && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <NoyelaOrb size="xs" pulse />
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '18px 18px 18px 4px', padding: '11px 15px', display: 'flex', gap: 5 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--purple-mid)', animation: `orb-pulse ${0.6 + i * 0.2}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Input bar */}
        <div style={{ padding: '12px 16px 20px', background: 'white', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => setShowSheet(true)} style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--purple-light)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>+</button>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg)', borderRadius: 50, padding: '10px 14px', gap: 8 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask Noyela..."
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, background: 'transparent', fontFamily: "'Inter', sans-serif", color: 'var(--text)' }}
              />
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--text-2)' }}>🎙</button>
            </div>
            <button
              onClick={() => sendMessage(input)}
              style={{ width: 40, height: 40, borderRadius: '50%', background: input.trim() ? 'var(--purple)' : 'var(--border)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'white', flexShrink: 0, transition: 'background 0.2s' }}
            >
              ↑
            </button>
          </div>
        </div>
      </div>

      {showSheet && (
        <BottomSheet onClose={() => setShowSheet(false)} title="Add to conversation">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {SHEET_OPTIONS.map(o => (
              <button key={o.label} onClick={() => setShowSheet(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'var(--bg)', borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>
                <span style={{ fontSize: 22 }}>{o.icon}</span>
                {o.label}
              </button>
            ))}
          </div>
        </BottomSheet>
      )}
    </div>
  )
}
