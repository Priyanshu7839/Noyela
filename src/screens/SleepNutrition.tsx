import { useState } from 'react'
import { ModuleTabs, AIInsight, ScoreRing, StatTile, ProgressBar } from '../components/ui'

type NavigateFn = (screen: string) => void

function SleepOverview({ navigate, activeModule, onModuleChange }: { navigate: NavigateFn; activeModule: string; onModuleChange: (m: string) => void }) {
  const [sleepTab, setSleepTab] = useState('Overview')
  const tabs = ['Overview', 'Routine', 'Insights', 'Progress']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ModuleTabs active={activeModule} onChange={m => { onModuleChange(m); navigate(`${m}-overview`) }} />
      <div style={{ display: 'flex', gap: 0, overflowX: 'auto', background: 'white', borderBottom: '1px solid var(--border)' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setSleepTab(t)} className={`feature-tab ${sleepTab === t ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 24px' }}>
        {sleepTab === 'Overview' && (
          <>
            <div style={{ background: 'linear-gradient(135deg, var(--purple-light), white)', borderRadius: 20, padding: '20px', marginBottom: 16, border: '1px solid rgba(107,53,200,0.1)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <ScoreRing score={74} size={84} label="/100" />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--purple)' }}>SLEEP SCORE</div>
                <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 700, margin: '4px 0 6px', color: 'var(--text)' }}>Good, but improvable</h3>
                <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0 }}>Last night: 7h 12m total sleep</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <StatTile label="Total Sleep" value="7h 12m" trend="-18m vs target" />
              <StatTile label="Deep Sleep" value="1h 24m" trend="+12m vs avg" />
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <StatTile label="Awake Time" value="22m" trend="-8m vs avg" />
              <StatTile label="Recommended" value="10:45 PM" unit=" bedtime" />
            </div>

            <div style={{ background: 'white', borderRadius: 18, padding: '16px', marginBottom: 16, border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Sleep & Aesthetic Connection</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Skin Recovery', value: 78, color: 'var(--purple)' },
                  { label: 'Collagen Synthesis', value: 65, color: 'var(--amber)' },
                  { label: 'Hair Growth', value: 72, color: 'var(--purple)' },
                ].map(m => (
                  <div key={m.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{m.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: m.color }}>{m.value}%</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${m.value}%`, height: '100%', background: m.color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <AIInsight text="You slept poorly last night — below target by 18 minutes of deep sleep. I've adjusted today's recovery recommendations slightly." action="See adjustments" />

            <div style={{ marginTop: 16, background: 'white', borderRadius: 18, padding: '16px', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Connect for Better Insights</div>
              {['Apple Health', 'Oura Ring', 'WHOOP', 'Fitbit'].map(d => (
                <div key={d} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 14 }}>{d}</span>
                  <button style={{ background: 'var(--purple-pale)', border: '1px solid var(--purple-light)', borderRadius: 50, padding: '5px 14px', color: 'var(--purple)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Connect</button>
                </div>
              ))}
            </div>
          </>
        )}
        {sleepTab === 'Routine' && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Sleep Routine</h3>
            {[
              { time: '8:00 PM', label: 'Dim lights', desc: 'Reduce blue light exposure. Triggers melatonin production.' },
              { time: '9:30 PM', label: 'Night skincare routine', desc: 'Complete night routine while skin recovery begins. ~10 min.' },
              { time: '10:00 PM', label: 'Wind down', desc: 'No screens. Reading, light stretching, or meditation.' },
              { time: '10:30 PM', label: 'Sleep supplements', desc: 'Magnesium Glycinate 400mg + Ashwagandha 600mg.' },
              { time: '10:45 PM', label: 'Target bedtime', desc: 'Optimal for peak HGH release during sleep phase.' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--purple)', width: 52, flexShrink: 0, paddingTop: 2 }}>{s.time}</div>
                <div style={{ background: 'white', borderRadius: 14, padding: '12px 14px', flex: 1, border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.4 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {(sleepTab === 'Insights' || sleepTab === 'Progress') && (
          <AIInsight text="Connect your wearable device to unlock detailed sleep insights and 30-day trend tracking." action="Connect Device" />
        )}
      </div>
    </div>
  )
}

function NutritionOverview({ navigate, activeModule, onModuleChange }: { navigate: NavigateFn; activeModule: string; onModuleChange: (m: string) => void }) {
  const [nutrTab, setNutrTab] = useState('Overview')
  const tabs = ['Overview', 'Supplements']

  const SUPPLEMENTS = {
    Skin: [
      { name: 'Vitamin C', dose: '1000mg', timing: 'Morning with food', why: 'Collagen synthesis, antioxidant protection, brightens skin', caution: null },
      { name: 'Zinc', dose: '15mg', timing: 'Evening with food', why: 'Acne control, wound healing, sebum regulation', caution: 'Take with food to avoid nausea' },
      { name: 'Collagen Peptides', dose: '10g', timing: 'Morning in beverage', why: 'Supports skin elasticity, hydration, and firmness', caution: null },
      { name: 'Omega-3 (DHA/EPA)', dose: '2g', timing: 'With largest meal', why: 'Reduces inflammation, strengthens skin barrier', caution: null },
    ],
    Hair: [
      { name: 'Biotin', dose: '5000mcg', timing: 'Morning', why: 'Keratin production, hair follicle support', caution: 'May affect lab results — inform your doctor' },
      { name: 'Iron', dose: '18mg', timing: 'Morning on empty stomach', why: 'Deficiency is a leading cause of hair loss', caution: 'Only if bloodwork confirms deficiency' },
      { name: 'Vitamin D3', dose: '5000 IU', timing: 'Morning with fat', why: 'Critical for follicle cycling and hair growth', caution: null },
    ],
    Overall: [
      { name: 'Magnesium Glycinate', dose: '400mg', timing: 'Evening', why: 'Sleep quality, muscle recovery, stress reduction', caution: null },
      { name: 'Ashwagandha', dose: '600mg', timing: 'Evening', why: 'Cortisol control — high cortisol accelerates hair loss', caution: 'Consult doctor if thyroid condition present' },
      { name: 'Creatine', dose: '5g', timing: 'Post workout', why: 'Muscle recovery, overall aesthetics', caution: 'Slightly increases DHT — monitor with hair protocol' },
    ],
  }
  const [suppTab, setSuppTab] = useState<keyof typeof SUPPLEMENTS>('Skin')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ModuleTabs active={activeModule} onChange={m => { onModuleChange(m); navigate(`${m}-overview`) }} />
      <div style={{ display: 'flex', gap: 0, background: 'white', borderBottom: '1px solid var(--border)' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setNutrTab(t)} className={`feature-tab ${nutrTab === t ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 24px' }}>
        {nutrTab === 'Overview' && (
          <>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 4px' }}>Nutrition</h2>
            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 16px' }}>Supporting your aesthetic goals through evidence-based nutrition.</p>
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <StatTile label="Protein Today" value="142" unit="g" trend="Target: 160g" />
              <StatTile label="Hydration" value="2.1" unit="L" trend="Target: 2.8L" />
            </div>
            <AIInsight text="You're meeting your protein target most days — great for skin and hair repair. Increase water intake by 700ml to reach your optimal hydration for skin quality." />
            <div style={{ marginTop: 16, background: 'white', borderRadius: 18, padding: '16px', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Today's Priorities</div>
              {[
                { icon: '🥩', label: 'Protein', value: '142g / 160g target', pct: 89 },
                { icon: '💧', label: 'Hydration', value: '2.1L / 2.8L target', pct: 75 },
                { icon: '🥑', label: 'Healthy Fats', value: '62g / 80g target', pct: 78 },
              ].map(n => (
                <div key={n.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}><span>{n.icon}</span>{n.label}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{n.value}</span>
                  </div>
                  <ProgressBar value={n.pct} />
                </div>
              ))}
            </div>
          </>
        )}
        {nutrTab === 'Supplements' && (
          <>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 4px' }}>Supplements</h2>
            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 14px' }}>Noyela's personalized supplement protocol.</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {(['Skin', 'Hair', 'Overall'] as const).map(t => (
                <button key={t} onClick={() => setSuppTab(t)} style={{ padding: '8px 16px', borderRadius: 50, border: `1.5px solid ${suppTab === t ? 'var(--purple)' : 'var(--border)'}`, background: suppTab === t ? 'var(--purple-pale)' : 'white', color: suppTab === t ? 'var(--purple)' : 'var(--text-2)', fontSize: 13, fontWeight: suppTab === t ? 600 : 400, cursor: 'pointer' }}>
                  {t}
                </button>
              ))}
            </div>
            {SUPPLEMENTS[suppTab].map((s, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 16, padding: '14px 16px', marginBottom: 10, border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--purple)', fontWeight: 600 }}>{s.dose} · {s.timing}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '6px 0 0', lineHeight: 1.5 }}>{s.why}</p>
                {s.caution && (
                  <div style={{ marginTop: 8, padding: '8px 12px', background: 'var(--amber-bg)', borderRadius: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 14 }}>⚠</span>
                    <span style={{ fontSize: 12, color: 'var(--amber)', fontWeight: 500 }}>{s.caution}</span>
                  </div>
                )}
              </div>
            ))}
            <p style={{ fontSize: 11, color: 'var(--text-3)', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>Always consult a healthcare professional before starting any supplement regimen.</p>
          </>
        )}
      </div>
    </div>
  )
}

export default function SleepNutrition({ screen, navigate, activeModule, onModuleChange }: {
  screen: string; navigate: NavigateFn; activeModule: string; onModuleChange: (m: string) => void
}) {
  if (activeModule === 'sleep') return <SleepOverview navigate={navigate} activeModule={activeModule} onModuleChange={onModuleChange} />
  return <NutritionOverview navigate={navigate} activeModule={activeModule} onModuleChange={onModuleChange} />
}
