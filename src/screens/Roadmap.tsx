import { useState } from 'react'
import { BackHeader, NoyelaOrb, AIInsight, ProgressBar, ScoreRing } from '../components/ui'
import RoadmapBanner from '../assets/RoadmapBanner.jpeg'
import RoadmapImg1 from '../assets/RoadmapImg1.jpeg'
import RoadmapImg2 from '../assets/RoadmapImg2.jpeg'
import RoadmapImg3 from '../assets/RoadmapImg3.jpeg'
import RoadmapImg4 from '../assets/RoadmapImg4.jpeg'
import RoadmapImg5 from '../assets/RoadmapImg5.jpeg'

type NavigateFn = (screen: string) => void

const ROADMAP_TABS = ['Today', 'Journey', 'Timeline']

const TODAY_ACTIONS = [
  { priority: 1, img: RoadmapImg3, label: 'Complete morning skin routine', module: 'Skin', done: true, time: '5 min', navigate: 'skin-morning' },
  { priority: 2,  img: RoadmapImg2,label: 'Jawline exercises · 3 sets', module: 'Jawline', done: false, time: '15 min', navigate: 'jawline-exercises' },
  { priority: 3,  img: RoadmapImg4, label: 'Apply minoxidil (evening)', module: 'Hair', done: false, time: '2 min', navigate: 'hair-night' },
  { priority: 4,  img: RoadmapImg5, label: 'Target bedtime: 10:45 PM', module: 'Sleep', done: false, time: 'Reminder', navigate: 'sleep' },
  { priority: 5,  img: RoadmapImg1,label: 'Reach 160g protein target', module: 'Nutrition', done: false, time: 'Ongoing', navigate: 'nutrition' },
]

const JOURNEY_PHASES = [
  {
    phase: 1, name: 'Foundation', status: 'completed', dateRange: 'Aug 16 – Sep 16',
    desc: 'Establish baseline routines and complete initial assessments.',
    milestones: ['Face harmony assessment', 'Skin routine established', 'Hair protocol started', 'First PRP consultation'],
  },
  {
    phase: 2, name: 'Elevate', status: 'active', dateRange: 'Sep 16 – Oct 16',
    desc: 'Introduce advanced treatments and optimize existing protocols.',
    milestones: ['First PRP session ✓', 'Jawline exercise protocol', 'Introduce retinol', 'Vitamin C serum →'],
    progress: 27,
  },
  {
    phase: 3, name: 'Refine', status: 'upcoming', dateRange: 'Oct 16 – Nov 16',
    desc: 'Fine-tune results and address remaining opportunities.',
    milestones: ['Advanced assessment', 'Treatment evaluation', 'Routine optimization', 'Progress photography'],
  },
  {
    phase: 4, name: 'Master', status: 'future', dateRange: 'Jan 2027+',
    desc: 'Maintain and sustain your optimized aesthetic state.',
    milestones: ['Maintenance protocols', 'Annual planning', 'Lifestyle integration'],
  },
]

const TIMELINE_ITEMS = [
  { date: 'Aug 15', label: 'Noyela journey started', type: 'completed', items: ['Face scan', 'Skin assessment', 'Hair protocol'] },
  { date: 'Aug 16', label: 'Today', type: 'today', items: ['Morning routine', 'Jawline exercises', 'Minoxidil PM'] },
  { date: 'Aug 30', label: 'Vitamin C serum intro', type: 'upcoming', items: ['Add C-vitamin to AM routine'] },
  { date: 'Sep 15', label: 'Skin photo assessment', type: 'upcoming', items: ['8-week progress photo'] },
  { date: 'Sep 28', label: 'PRP Session #1', type: 'completed', items: ['Dr. Michael Torres · successful'] },
  { date: 'Nov 12', label: 'PRP Session #2', type: 'upcoming', items: ['Dr. Michael Torres · 10:00 AM'] },
  { date: 'Nov 16', label: 'Phase 3 started', type: 'completed', items: ['Jawline protocol began', 'Retinol introduced'] },
]

export default function Roadmap({ screen, navigate }: { screen: string; navigate: NavigateFn }) {
  const activeTab = screen === 'roadmap-today' ? 'Today' : screen === 'roadmap-journey' ? 'Journey' : 'Timeline'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ background: 'var(--bg)', padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 28, fontWeight: 500, margin: 0, color: 'var(--text)' }}>Your Roadmap</h2>
            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '4px 0 0' }}>Phase 2 · Enhancement · Day 24</p>
          </div>
          <ScoreRing score={35} size={80} label="%" />
        </div>
        <div style={{ display: 'flex', background: 'var(--purple-pale)', borderRadius: 50, padding: 3, marginBottom: 12 }}>
          {ROADMAP_TABS.map(t => (
            <button key={t} onClick={() => navigate(`roadmap-${t.toLowerCase()}`)} style={{ flex: 1, padding: '9px 12px', borderRadius: 50, background: activeTab === t ? 'white' : 'transparent', color: activeTab === t ? 'var(--purple)' : 'var(--text-2)', fontSize: 13, fontWeight: activeTab === t ? 700 : 400, border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: activeTab === t ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="screen" style={{ paddingBottom: 24 }}>
        {activeTab === 'Today' && (
          <div style={{ padding: '0 16px' }}>
            {/* Transformation hero */}
            <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', height: 160, marginBottom: 16, background: 'linear-gradient(135deg, #EDE9F8, #F5F2FF)' }}>
              <img src={RoadmapBanner} alt="Transformation" style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '60%', objectFit: 'cover', objectPosition: 'top' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(237,233,248,1) 40%, transparent 70%)' }} />
              <div style={{ position: 'absolute', padding: '20px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--purple)', marginBottom: 6 }}>TODAY'S FOCUS</div>
                <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 24, fontWeight: 500, color: 'var(--text)', margin: '0 0 6px', lineHeight: 1.2 }}>Consistency Builds<br />Transformation.</h3>
                <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0 }}>3 of 5 actions remaining.</p>
              </div>
            </div>

            {/* Today's actions */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>Today's Actions</span>
                <span style={{ fontSize: 13, color: 'var(--purple)', fontWeight: 600 }}>{TODAY_ACTIONS.filter(a => a.done).length}/{TODAY_ACTIONS.length} done</span>
              </div>
              {TODAY_ACTIONS.map((a, i) => (
                <div key={i} onClick={() => navigate(a.navigate)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', background: 'white', borderRadius: 14, marginBottom: 8, border: `1.5px solid ${a.done ? 'var(--green)' : 'var(--border)'}`, cursor: 'pointer', transition: 'border-color 0.2s', opacity: a.done ? 0.7 : 1 }}>
                  <div className='p-2' style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, margin: '0 auto 6px', border:a.done?'1px solid rgba(107,53,200,0.15)': '1px solid rgba(107,53,200,0.15)' }}>
                <img src={a.img} alt="" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, textDecoration: a.done ? 'line-through' : 'none', color: a.done ? 'var(--text-3)' : 'var(--text)' }}>{a.label}</div>
                    <div style={{ fontSize: 11, color:a.done ?'var(--text-3)': 'var(--text-3)' }}>{a.module} · {a.time}</div>
                  </div>
                  {a.done ? <span style={{ color: 'var(--green)', fontSize: 18 }}>✓</span> : <span style={{ color: 'var(--text-3)', fontSize: 16 }}>›</span>}
                </div>
              ))}
            </div>

            <AIInsight text="Based on your progress, I've moved the advanced retinol introduction to next month — your barrier needs 2 more weeks." action="See why" onAction={() => navigate('ask-noyela')} />

            <div style={{ marginTop: 16, background: 'white', borderRadius: 18, padding: '16px', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Next Milestone</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--purple-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 22 }}>🏆</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Phase 2 — 40% complete</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 6 }}>6 days at current pace</div>
                  <ProgressBar value={35} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Journey' && (
          <div style={{ padding: '0 16px' }}>
            <div style={{ marginBottom: 20 }}>
              {JOURNEY_PHASES.map((p, i) => (
                <div key={i} style={{ position: 'relative', paddingLeft: 24, marginBottom: 16 }}>
                  {/* Connector line */}
                  {i < JOURNEY_PHASES.length - 1 && (
                    <div style={{ position: 'absolute', left: 9, top: 28, bottom: -16, width: 2, background: p.status === 'completed' ? 'var(--purple)' : 'var(--border)' }} />
                  )}
                  {/* Phase dot */}
                  <div style={{ position: 'absolute', left: 0, top: 12, width: 20, height: 20, borderRadius: '50%', background: p.status === 'completed' ? 'var(--purple)' : p.status === 'active' ? 'var(--purple)' : 'var(--border)', border: p.status === 'active' ? '3px solid var(--purple-light)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                    {p.status === 'completed' && <span style={{ color: 'white', fontSize: 10 }}>✓</span>}
                    {p.status === 'active' && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'white' }} />}
                  </div>
                  <div style={{ background: 'white', borderRadius: 18, padding: '16px', border: `1.5px solid ${p.status === 'active' ? 'var(--purple)' : 'var(--border)'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: p.status === 'active' ? 'var(--purple)' : 'var(--text-3)' }}>PHASE {p.phase} {p.status === 'active' ? '· CURRENT' : p.status === 'completed' ? '· DONE' : ''}</div>
                        <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 700, margin: '4px 0 0', color: p.status === 'future' ? 'var(--text-3)' : 'var(--text)' }}>{p.name}</h3>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', textAlign: 'right' }}>{p.dateRange}</div>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '6px 0 10px', lineHeight: 1.5 }}>{p.desc}</p>
                    {p.progress !== undefined && (
                      <div style={{ marginBottom: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Progress</span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--purple)' }}>{p.progress}%</span>
                        </div>
                        <ProgressBar value={p.progress} />
                      </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {p.milestones.map((m, j) => (
                        <div key={j} style={{ fontSize: 12, color: p.status === 'completed' ? 'var(--text-2)' : 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ color: p.status === 'completed' ? 'var(--green)' : p.status === 'active' ? 'var(--purple)' : 'var(--text-3)' }}>
                            {p.status === 'completed' ? '✓' : '·'}
                          </span>
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Timeline' && (
          <div style={{ padding: '0 16px' }}>
            {TIMELINE_ITEMS.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 44, flexShrink: 0, textAlign: 'right', paddingTop: 2 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: item.type === 'today' ? 'var(--purple)' : item.type === 'upcoming' ? 'var(--text-2)' : 'var(--text-3)' }}>{item.date}</div>
                </div>
                <div style={{ position: 'relative', paddingLeft: 18 }}>
                  {i < TIMELINE_ITEMS.length - 1 && (
                    <div style={{ position: 'absolute', left: 6, top: 14, bottom: -12, width: 2, background: 'var(--border)' }} />
                  )}
                  <div style={{ position: 'absolute', left: 0, top: 4, width: 14, height: 14, borderRadius: '50%', background: item.type === 'completed' ? 'var(--purple)' : item.type === 'today' ? 'var(--purple)' : 'var(--border)', border: item.type === 'upcoming' ? '2px solid var(--purple-mid)' : 'none' }} />
                  <div style={{ background: 'white', borderRadius: 14, padding: '12px 14px', border: `1px solid ${item.type === 'today' ? 'var(--purple)' : 'var(--border)'}` }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: item.type === 'today' ? 'var(--purple)' : 'var(--text)', marginBottom: 4 }}>{item.label}</div>
                    {item.items.map((s, j) => (
                      <div key={j} style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 2 }}>· {s}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
