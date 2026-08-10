import { useState } from 'react'
import { AIInsight, ScoreRing, StatTile, ProgressBar } from '../components/ui'

type NavigateFn = (screen: string) => void

const MODULE_PROGRESS = [
  { id: 'skin', label: 'Skin', score: 78, delta: '+12%', icon: '✦', color: 'var(--purple)', navigate: 'skin-progress' },
  { id: 'hair', label: 'Hair', score: 68, delta: '+4%', icon: '⟆', color: '#3B82F6', navigate: 'hair-progress' },
  { id: 'jawline', label: 'Jawline', score: 64, delta: '+6pt', icon: '◎', color: '#8B5CF6', navigate: 'jawline-progress' },
  { id: 'sleep', label: 'Sleep', score: 74, delta: '+2%', icon: '◗', color: '#0EA5E9', navigate: 'sleep' },
  { id: 'nutrition', label: 'Nutrition', score: 71, delta: 'stable', icon: '❋', color: '#10B981', navigate: 'nutrition' },
]

export default function Progress({ navigate }: { navigate: NavigateFn }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="screen" style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 28, fontWeight: 700, margin: '0 0 4px', color: 'var(--text)' }}>Your Progress</h2>
            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0 }}>8 weeks into your transformation.</p>
          </div>
          <ScoreRing score={78} size={80} label="Overall" />
        </div>

        {/* Overall harmony trend */}
        <div style={{ background: 'white', borderRadius: 20, padding: '16px', marginBottom: 16, border: '1px solid var(--border)' }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Harmony Evolution</div>
          <div style={{ fontSize: 13, color: 'var(--purple)', fontWeight: 600, marginBottom: 12 }}>+6 points since start</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>
            {[72, 71, 73, 74, 75, 76, 78].map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                <div style={{ width: '100%', background: i === 6 ? 'var(--purple)' : 'var(--purple-light)', borderRadius: '4px 4px 0 0', height: `${(v / 85) * 100}%`, position: 'relative' }}>
                  {i === 6 && <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: 10, fontWeight: 700, color: 'var(--purple)', whiteSpace: 'nowrap' }}>{v}</div>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            {['Jun', '', 'Jul', '', '', 'Aug', 'Now'].map((m, i) => <span key={i} style={{ flex: 1, textAlign: 'center', fontSize: 9, color: 'var(--text-3)' }}>{m}</span>)}
          </div>
        </div>

        {/* Before/after comparison */}
        <div style={{ background: 'white', borderRadius: 20, padding: '16px', marginBottom: 16, border: '1px solid var(--border)' }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Before & After · 8 Weeks</div>
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 200, background: 'var(--border)' }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=220&fit=crop&auto=format" alt="After" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=220&fit=crop&auto=format" alt="Before" style={{ position: 'absolute', inset: 0, width: '50%', height: '100%', objectFit: 'cover', filter: 'brightness(0.82) saturate(0.7)' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 3, background: 'white', boxShadow: '0 0 6px rgba(0,0,0,0.2)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>⇄</div>
            <div style={{ position: 'absolute', bottom: 10, left: 12 }}>
              <span style={{ background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 11, padding: '3px 10px', borderRadius: 50 }}>Jun 14 · Score 72</span>
            </div>
            <div style={{ position: 'absolute', bottom: 10, right: 12 }}>
              <span style={{ background: 'rgba(107,53,200,0.85)', color: 'white', fontSize: 11, padding: '3px 10px', borderRadius: 50 }}>Aug 8 · Score 78</span>
            </div>
          </div>
        </div>

        {/* Milestone */}
        <div style={{ background: 'linear-gradient(135deg, var(--purple-light), var(--purple-pale))', borderRadius: 18, padding: '16px', marginBottom: 16, border: '1px solid rgba(107,53,200,0.15)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 22 }}>🏆</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--purple)', letterSpacing: '0.1em' }}>CURRENT MILESTONE</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Phase 2: Elevate · 27% complete</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>Next: 40% — unlocks advanced protocol</div>
            <ProgressBar value={27} className="mt-2" />
          </div>
        </div>

        {/* Module progress cards */}
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>By Module</div>
        {MODULE_PROGRESS.map(m => (
          <div key={m.id}>
            <div onClick={() => setExpanded(expanded === m.id ? null : m.id)} style={{ background: 'white', borderRadius: expanded === m.id ? '16px 16px 0 0' : 16, padding: '14px 16px', marginBottom: expanded === m.id ? 0 : 10, border: `1px solid ${expanded === m.id ? 'var(--purple)' : 'var(--border)'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${m.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{m.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{m.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                  <ProgressBar value={m.score} className="flex-1" />
                  <span style={{ fontSize: 12, fontWeight: 600, color: m.color, flexShrink: 0 }}>{m.score}/100</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--green)' }}>{m.delta}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{expanded === m.id ? '▲' : '▼'}</div>
              </div>
            </div>
            {expanded === m.id && (
              <div style={{ background: 'var(--purple-pale)', borderRadius: '0 0 16px 16px', padding: '14px 16px', marginBottom: 10, border: '1px solid var(--purple-light)', borderTop: 'none' }}>
                <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 10px' }}>View detailed {m.label.toLowerCase()} progress, including historical data and trend analysis.</p>
                <button onClick={() => navigate(m.navigate)} style={{ background: 'var(--purple)', color: 'white', border: 'none', borderRadius: 50, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  View {m.label} Progress →
                </button>
              </div>
            )}
          </div>
        ))}

        <AIInsight text="Remarkable 8-week progress. Your skin and jawline show the most improvement. Continue current protocols through Phase 2." />
      </div>
    </div>
  )
}
