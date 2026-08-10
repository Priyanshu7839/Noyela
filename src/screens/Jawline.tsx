import { useState } from 'react'
import { ModuleTabs, AIInsight, ScoreRing, StatTile, ProgressBar, MatchBadge, StepCircle } from '../components/ui'

type NavigateFn = (screen: string) => void

const JAWLINE_TABS = [
  { id: 'overview', label: 'Overview', icon: '📋' },
  { id: 'plan', label: 'Plan', icon: '🎯' },
  { id: 'treatments', label: 'Treatments', icon: '💉' },
  { id: 'exercises', label: 'Exercises', icon: '🏋' },
  { id: 'progress', label: 'Progress', icon: '📈' },
]

const TREATMENTS = [
  { name: 'Jaw Filler (Radiesse)', match: 91, type: 'Non-invasive', why: 'Best match for soft jawline definition', timeline: '2–4 weeks onset', downtime: '24–48h swelling', invasiveness: 'Low', price: '$800–1,500', longevity: '12–18 months', pain: 'Minimal' },
  { name: 'Kybella (Deoxycholic Acid)', match: 84, type: 'Non-invasive', why: 'Reduces submental fullness effectively', timeline: '6–8 weeks per session', downtime: '3–5 days swelling', invasiveness: 'Minimal', price: '$1,200–1,800/series', longevity: 'Permanent', pain: 'Moderate' },
  { name: 'Botox Masseter', match: 78, type: 'Non-invasive', why: 'Slims wide jawline if masseter enlarged', timeline: '4–6 weeks onset', downtime: 'None', invasiveness: 'Minimal', price: '$400–700', longevity: '4–6 months', pain: 'Minimal' },
  { name: 'Kybella Buccal Fat', match: 65, type: 'Non-invasive', why: 'Possible for cheek fullness reduction', timeline: '6 weeks', downtime: '2–3 days', invasiveness: 'Low', price: '$1,500–2,500', longevity: 'Long-lasting', pain: 'Low' },
  { name: 'Jaw Implants', match: 40, type: 'Surgical', why: 'Not recommended — premature at current status', timeline: '3–6 months recovery', downtime: '2–4 weeks', invasiveness: 'High', price: '$4,000–8,000', longevity: 'Permanent', pain: 'High' },
]

const EXERCISES = [
  { n: 1, name: 'Jaw Clench & Release', sets: '3 sets × 15 reps', duration: '30 sec hold', desc: 'Clench jaw firmly for 30 sec, release. Targets masseter and pterygoid muscles.' },
  { n: 2, name: 'Tongue Posture Training', sets: '3× daily', duration: '10 min each', desc: 'Rest tongue on roof of mouth, teeth lightly together, lips sealed. Builds resting muscle tone.' },
  { n: 3, name: 'Neck Extension', sets: '2 sets × 12 reps', duration: '20 sec hold', desc: 'Look up, push chin forward. Activates submental muscles, improves definition.' },
  { n: 4, name: 'Chin Lift', sets: '3 sets × 10 reps', duration: '15 sec hold', desc: 'Tilt head back, push lower lip over upper. Stretches platysma and defines jawline.' },
  { n: 5, name: 'Mewing (Orthotropics)', sets: 'Continuous', duration: 'All day', desc: 'Proper oral posture for long-term facial structure support. Controversial — discuss with your dentist.' },
]

function JawlineOverview({ navigate }: { navigate: NavigateFn }) {
  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--purple-light), white)', borderRadius: 20, padding: '20px', marginBottom: 16, border: '1px solid rgba(107,53,200,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <ScoreRing score={64} size={80} label="/100" />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--purple)' }}>JAWLINE DEFINITION</div>
              <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 700, margin: '4px 0 6px', color: 'var(--text)' }}>Moderate softness detected</h3>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--purple)', background: 'var(--purple-light)', padding: '3px 10px', borderRadius: 50 }}>+28 improvement potential</span>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>Your jawline has good bone structure with soft tissue obscuring natural definition. A combination of targeted exercises and optional clinical treatments can significantly improve results.</p>
        </div>

        <AIInsight
          text="Based on your scan, jaw filler combined with a 90-day exercise protocol could improve your score to 88/100. That's your realistic ceiling without surgery."
          action="View full plan"
          onAction={() => navigate('jawline-plan')}
        />

        <div style={{ marginTop: 16, background: 'white', borderRadius: 18, border: '1px solid var(--border)', overflow: 'hidden' }}>
          {[
            { label: "Today's exercises", value: '3 sets jaw clenching + neck extension', icon: '🏋' },
            { label: 'Consultation', value: 'Book jaw assessment with Dr. Chen', icon: '📅' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < 1 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: 22, width: 28, textAlign: 'center' }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginTop: 2 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function JawlinePlan({ navigate }: { navigate: NavigateFn }) {
  const [day, setDay] = useState(0)
  const todayActions = [
    { done: false, label: 'Jaw clenching exercises · 3 sets', nav: 'jawline-exercises', icon: '🏋' },
    { done: true, label: 'Morning tongue posture', nav: 'jawline-exercises', icon: '👅' },
    { done: false, label: 'Log today\'s meals (chin fat)', nav: 'nutrition', icon: '🥗' },
  ]
  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 4px', color: 'var(--text)' }}>Jawline Plan</h2>
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 16px' }}>Your 90-day definition protocol.</p>

        <div style={{ background: 'white', borderRadius: 18, padding: '16px', marginBottom: 16, border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>GOAL</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginTop: 2 }}>Increase jaw definition</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>DAY</div>
              <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--purple)', marginTop: 2 }}>24/90</div>
            </div>
          </div>
          <ProgressBar value={27} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Phase 1: Exercise Foundation</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--purple)' }}>27%</span>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Today's Actions</div>
          {todayActions.map((a, i) => (
            <div key={i} onClick={() => navigate(a.nav)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', background: 'white', borderRadius: 14, marginBottom: 8, border: `1.5px solid ${a.done ? 'var(--green)' : 'var(--border)'}`, cursor: 'pointer' }}>
              <span style={{ fontSize: 20 }}>{a.icon}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: a.done ? 'var(--text-3)' : 'var(--text)', textDecoration: a.done ? 'line-through' : 'none' }}>{a.label}</span>
              {a.done && <span style={{ fontSize: 14, color: 'var(--green)' }}>✓</span>}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('jawline-exercises')} className="btn-secondary" style={{ flex: 1, padding: '12px' }}>Exercises</button>
          <button onClick={() => navigate('jawline-treatments')} className="btn-secondary" style={{ flex: 1, padding: '12px' }}>Treatments</button>
          <button onClick={() => navigate('jawline-progress')} className="btn-secondary" style={{ flex: 1, padding: '12px' }}>Progress</button>
        </div>
      </div>
    </div>
  )
}

function JawlineTreatments({ navigate }: { navigate: NavigateFn }) {
  const [treatTab, setTreatTab] = useState('Recommended')
  const tabs = ['Recommended', 'Non-invasive', 'Clinical', 'Surgical']
  const filtered = TREATMENTS.filter(t => {
    if (treatTab === 'Recommended') return t.match >= 75
    if (treatTab === 'Non-invasive') return t.type === 'Non-invasive'
    if (treatTab === 'Clinical') return ['Low', 'Minimal'].includes(t.invasiveness)
    return t.type === 'Surgical'
  })
  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 4px', color: 'var(--text)' }}>Jawline Treatments</h2>
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 14px' }}>Noyela selected these based on your scan and goals.</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTreatTab(t)} style={{ padding: '7px 14px', borderRadius: 50, border: `1.5px solid ${treatTab === t ? 'var(--purple)' : 'var(--border)'}`, background: treatTab === t ? 'var(--purple-pale)' : 'white', color: treatTab === t ? 'var(--purple)' : 'var(--text-2)', fontSize: 13, fontWeight: treatTab === t ? 600 : 400, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {t}
            </button>
          ))}
        </div>
        {filtered.map((t, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 18, padding: '16px', marginBottom: 12, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <h3 style={{ fontWeight: 700, fontSize: 15, margin: 0 }}>{t.name}</h3>
              <MatchBadge pct={t.match} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--purple)', fontWeight: 500, margin: '0 0 8px' }}>Why: {t.why}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[
                { label: 'Timeline', value: t.timeline },
                { label: 'Downtime', value: t.downtime },
                { label: 'Pain Level', value: t.pain },
                { label: 'Longevity', value: t.longevity },
                { label: 'Invasiveness', value: t.invasiveness },
                { label: 'Estimate', value: t.price },
              ].map(m => (
                <div key={m.label} style={{ background: 'var(--bg)', borderRadius: 10, padding: '8px 8px' }}>
                  <div style={{ fontSize: 9, color: 'var(--text-3)', fontWeight: 600 }}>{m.label}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginTop: 2 }}>{m.value}</div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('doctors')} style={{ width: '100%', padding: '10px', background: 'var(--purple-pale)', border: '1px solid var(--purple-light)', borderRadius: 12, color: 'var(--purple)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Find Doctors for This Treatment
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function JawlineExercises() {
  const [active, setActive] = useState<number | null>(null)
  const [done, setDone] = useState<number[]>([])

  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 4px', color: 'var(--text)' }}>Jawline Exercises</h2>
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 4px' }}>Daily guided routine · ~15 minutes total.</p>
        <div style={{ fontSize: 13, color: 'var(--purple)', fontWeight: 600, marginBottom: 16 }}>Completed {done.length}/{EXERCISES.length} today</div>
        <ProgressBar value={(done.length / EXERCISES.length) * 100} />
        <div style={{ marginTop: 16 }}>
          {EXERCISES.map((ex, i) => (
            <div key={i}>
              <div onClick={() => setActive(active === i ? null : i)} style={{ background: 'white', borderRadius: 16, padding: '14px 16px', marginBottom: 8, border: `1.5px solid ${done.includes(i) ? 'var(--green)' : active === i ? 'var(--purple)' : 'var(--border)'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                <StepCircle n={ex.n} active={active === i} completed={done.includes(i)} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{ex.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{ex.sets} · {ex.duration}</div>
                </div>
                <span style={{ color: 'var(--text-3)', fontSize: 16 }}>{active === i ? '▲' : '▼'}</span>
              </div>
              {active === i && (
                <div style={{ background: 'var(--purple-pale)', borderRadius: '0 0 16px 16px', padding: '14px 16px', marginTop: -8, marginBottom: 8, border: '1px solid var(--purple-light)', borderTop: 'none' }}>
                  <p style={{ fontSize: 13, color: 'var(--text)', margin: '0 0 12px', lineHeight: 1.5 }}>{ex.desc}</p>
                  <button onClick={() => { setDone(prev => [...prev, i]); setActive(null) }} style={{ background: 'var(--purple)', color: 'white', border: 'none', borderRadius: 50, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    Mark Complete ✓
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <AIInsight text="Consistency is everything. 3 weeks of daily exercises are required before visible changes begin." />
      </div>
    </div>
  )
}

function JawlineProgress() {
  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 16px', color: 'var(--text)' }}>Jawline Progress</h2>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <StatTile label="Definition Score" value="64" unit="/100" trend="+6 since start" />
          <StatTile label="Exercise Days" value="24" unit="/90" trend="27% complete" />
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: '16px', marginBottom: 16, border: '1px solid var(--border)' }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, margin: '0 0 12px' }}>Score Progress</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, paddingLeft: 4 }}>
            {[58, 59, 60, 61, 61, 63, 64].map((v, i) => (
              <div key={i} style={{ flex: 1, background: i === 6 ? 'var(--purple)' : 'var(--purple-light)', borderRadius: '4px 4px 0 0', height: `${(v / 100) * 100}%`, transition: 'height 0.5s' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            {['Jun', '', 'Jul', '', '', 'Aug', ''].map((m, i) => <span key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'var(--text-3)' }}>{m}</span>)}
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, margin: '0 0 12px' }}>Before & After</h3>
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 180, background: 'var(--border)' }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&auto=format" alt="After" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&auto=format" alt="Before" style={{ position: 'absolute', inset: 0, width: '50%', height: '100%', objectFit: 'cover', filter: 'brightness(0.9) saturate(0.8)' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: 'white' }} />
            <span style={{ position: 'absolute', bottom: 8, left: 10, background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 10, padding: '2px 8px', borderRadius: 50 }}>Jun 14</span>
            <span style={{ position: 'absolute', bottom: 8, right: 10, background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 10, padding: '2px 8px', borderRadius: 50 }}>Aug 8</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Jawline({ screen, navigate, activeModule, onModuleChange }: {
  screen: string; navigate: NavigateFn; activeModule: string; onModuleChange: (m: string) => void
}) {
  const tab = screen.replace('jawline-', '')
  const setTab = (t: string) => navigate(`jawline-${t}`)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ModuleTabs active={activeModule} onChange={m => { onModuleChange(m); navigate(`${m}-overview`) }} />
      <div style={{ display: 'flex', gap: 0, overflowX: 'auto', background: 'white', borderBottom: '1px solid var(--border)' }}>
        {JAWLINE_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`feature-tab ${tab === t.id ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 16 }}>
        {tab === 'overview' && <JawlineOverview navigate={navigate} />}
        {tab === 'plan' && <JawlinePlan navigate={navigate} />}
        {tab === 'treatments' && <JawlineTreatments navigate={navigate} />}
        {tab === 'exercises' && <JawlineExercises />}
        {tab === 'progress' && <JawlineProgress />}
      </div>
    </div>
  )
}
