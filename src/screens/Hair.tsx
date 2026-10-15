import { useState } from 'react'
import { ModuleTabs, AIInsight, ScoreRing, StatTile, ProgressBar, NoyelaOrb, TierBadge, MatchBadge, StepCircle } from '../components/ui'
import SkinIconPack5 from '../assets/SkinIconPack5.png'
import SkinIconPack6 from '../assets/SkinIconPack6.png'
import SkinIconPack7 from '../assets/SkinIconPack7.png'
import SkinIconPack9 from '../assets/SkinIconPack9.png'
import SkinIconPack10 from '../assets/SkinIconPack10.png'
import SkinIconPack11 from '../assets/SkinIconPack11.png'
import SkinIconPack13 from '../assets/SkinIconPack13.jpeg'
import SkinIconPack14 from '../assets/SkinIconPack14.jpeg'
import { Bell, HardHat, Pipette, Syringe } from 'lucide-react'
import HairBanner from '../assets/HairBanner.jpeg'


type NavigateFn = (screen: string) => void

const HAIR_TABS = [
  { id: 'overview', label: 'Overview', img:SkinIconPack5 },
  { id: 'products', label: 'Products',  img:SkinIconPack6 },
  { id: 'morning', label: 'Morning', img:SkinIconPack7 },
  { id: 'night', label: 'Night', img:SkinIconPack9},
  { id: 'professional', label: 'Treatments', img: SkinIconPack13 },
  { id: 'devices', label: 'Devices', img: SkinIconPack14},
  { id: 'progress', label: 'Progress', img:SkinIconPack10  },
]




const HAIR_PRODUCTS = [
  {
    step: 1, category: 'Shampoo', desc: 'Cleanse scalp without stripping natural oils.',
    options: [
      { tier: 'premium' as const, brand: 'Kérastase', name: 'Densifique Bain Densité Shampoo', price: '$52', size: '250 ml', tag: 'Noyela\'s Pick', tagDetail: 'Hyaluronic acid + density complex' },
      { tier: 'value' as const, brand: 'Nizoral', name: 'Anti-Dandruff Shampoo 1% Ketoconazole', price: '$18', size: '200 ml', tag: 'Clinically proven', tagDetail: 'Reduces DHT impact on scalp' },
      { tier: 'budget' as const, brand: "Dove Men+Care", name: 'Fortifying 2-in-1 Shampoo', price: '$8', size: '355 ml', tag: 'Accessible', tagDetail: 'Strengthens and hydrates' },
    ]
  },
  {
    step: 2, category: 'Scalp Serum', desc: 'Target scalp health and follicle stimulation.',
    options: [
      { tier: 'premium' as const, brand: 'The INKEY List', name: 'Peptide Scalp Treatment', price: '$26', size: '100 ml', tag: 'Best for follicles', tagDetail: 'Peptides + caffeine, stimulates growth' },
      { tier: 'value' as const, brand: 'Minoxidil 5%', name: 'Topical Solution', price: '$25', size: '60 ml × 3', tag: 'Clinically proven', tagDetail: 'FDA-approved hair regrowth' },
      { tier: 'budget' as const, brand: 'Vatika', name: 'Naturals Coconut Hair Oil', price: '$7', size: '300 ml', tag: 'Accessible', tagDetail: 'Nourishes scalp, reduces breakage' },
    ]
  },
]

const PROFESSIONAL_TREATMENTS = [
  { name: 'PRP Therapy', match: 94, why: 'Highest match for temporal hair thinning', desc: 'Uses your own platelet-rich plasma to stimulate dormant follicles.', timeline: '3–6 sessions', downtime: 'None', invasiveness: 'Low', price: '$600–900/session' },
  { name: 'Scalp Microneedling', match: 87, why: 'Enhances topical absorption by 40–80%', desc: 'Creates micro-channels to amplify minoxidil and serum effectiveness.', timeline: '4–8 sessions', downtime: '24–48h redness', invasiveness: 'Minimal', price: '$200–400/session' },
  { name: 'Low Level Laser Therapy (LLLT)', match: 82, why: 'Noninvasive, good for diffuse thinning', desc: 'Photobiomodulation stimulates follicle energy (ATP) production.', timeline: '3–6 months', downtime: 'None', invasiveness: 'None', price: 'Included in devices' },
  { name: 'Hair Transplant (FUE)', match: 45, why: 'Not recommended at this stage', desc: 'Permanent solution, but premature at current loss level.', timeline: 'One session', downtime: '7–14 days', invasiveness: 'High', price: '$4,000–12,000' },
]

const AT_HOME_DEVICES = [
  { name: 'iRestore Essential Laser Hair Growth System', type: 'LLLT Cap', match: 91, price: '$695', desc: '51 medical-grade lasers. FDA cleared. 25-min sessions 3x/week.', img: '🔴' },
  { name: 'HairMax LaserComb Advanced 7', type: 'Laser Comb', match: 78, price: '$199', desc: '7-laser comb. 11 min/session. Good for targeted areas.', img: '🔦' },
  { name: 'Theradome EVO LH80 PRO', type: 'LLLT Helmet', match: 85, price: '$895', desc: '80 proprietary lasers. Full coverage. 20-min sessions 2x/week.', img: '⛑' },
]

export function HairOverview({ navigate }: { navigate: NavigateFn }) {
  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--purple-light), white)', borderRadius: 20, padding: '20px', marginBottom: 16, border: '1px solid rgba(107,53,200,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            {/* <ScoreRing score={68} size={80} label="/100" /> */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--purple)' }}>HAIR HEALTH</div>
              <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 700, margin: '4px 0 6px', color: 'var(--text)' }}>Early intervention pays off</h3>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--amber)', background: 'var(--amber-bg)', padding: '3px 10px', borderRadius: 50 }}>Shedding -18% this week</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
            {[
              { label: 'Density', value: '68%' },
              { label: 'Scalp', value: '74%' },
              { label: 'Shedding', value: '↓18%' },
              { label: 'Hairline', value: 'M1' },
            ].map(m => (
              <div key={m.label} style={{ textAlign: 'center', background: 'white', borderRadius: 10, padding: '8px 4px' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--purple)' }}>{m.value}</div>
                <div style={{ fontSize: 10, color: 'var(--text-2)' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <StatTile label="Weekly Shed Count" value="68" unit="/day" trend="↓18% vs last week" />
          <StatTile label="Protocol Adherence" value="82" unit="%" trend="+4% this week" />
        </div>

        <AIInsight
          text="Your hair shedding has reduced by 18% this week. Continue with the current protocol. Your next PRP session should be in 3 weeks."
          action="View Hair Protocol"
          onAction={() => navigate('hair-professional')}
        />

        <div style={{ marginTop: 16, background: 'white', borderRadius: 18, border: '1px solid var(--border)', overflow: 'hidden' }}>
          {[
            { label: 'Next action', value: 'Apply minoxidil tonight', icon: <Pipette color='#6B35C8' strokeWidth={1}/> },
            { label: 'PRP Session', value: 'Sep 2, 2026 · Dr. Torres', icon: <Syringe color='black' strokeWidth={1}/> },
            { label: 'Device session', value: 'iRestore · 25 min tonight', icon: <HardHat color='#F44336' strokeWidth={1}/>},
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
               <div className='p-2' style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, margin: '0 auto 6px', border: '1px solid rgba(107,53,200,0.15)' }}>
                {item.icon}
                  </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{item.value}</div>
              </div>
              <span style={{ color: 'var(--text-3)', fontSize: 16 }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function HairProducts() {
  const [selected, setSelected] = useState<Record<number, number>>({ 1: 1, 2: 1 })
  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 4px', color: 'var(--text)' }}>Hair Products</h2>
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 16px' }}>Evidence-based recommendations. Pick one from each step.</p>
        {HAIR_PRODUCTS.map(group => (
          <div key={group.step} style={{ background: 'white', borderRadius: 20, padding: '16px', marginBottom: 16, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--purple-light)', border: '2px solid var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--purple)', flexShrink: 0 }}>{group.step}</div>
              <h3 style={{ fontWeight: 700, fontSize: 15, margin: 0, color: 'var(--text)' }}>{group.category}</h3>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-2)', margin: '0 0 12px' }}>{group.desc}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {group.options.map((o, i) => (
                <div key={i} onClick={() => setSelected(prev => ({ ...prev, [group.step]: i }))} style={{ flex: 1, padding: '10px 8px', borderRadius: 14, border: `1.5px solid ${selected[group.step] === i ? 'var(--purple)' : 'var(--border)'}`, background: selected[group.step] === i ? 'var(--purple-pale)' : 'white', cursor: 'pointer' }}>
                  <TierBadge tier={o.tier} />
                  <div style={{ fontWeight: 700, fontSize: 11, color: 'var(--text)', marginTop: 8 }}>{o.brand}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-2)', margin: '4px 0 6px', lineHeight: 1.3 }}>{o.name}</div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{o.price}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{o.size}</div>
                  <div style={{ marginTop: 6, fontSize: 10, fontWeight: 600, color: o.tier === 'premium' ? 'var(--purple)' : o.tier === 'value' ? 'var(--green)' : 'var(--amber)' }}>{o.tag}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <AIInsight text="Your current shampoo fits this step well. Noyela hasn't recommended a replacement — keep using it." />
      </div>
    </div>
  )
}

export function HairMorning() {
  const steps = [
    { n: 1, title: 'Scalp Check', desc: 'Assess shedding — count hairs on pillow.' },
    { n: 2, title: 'Gentle Shampoo', desc: '3× per week only. Over-washing strips scalp oils.' },
    { n: 3, title: 'Scalp Massage', desc: '5 minutes. Increases blood flow to follicles.', note: "Noyela's Pick: With Kérastase Densifique serum" },
    { n: 4, title: 'Styling', desc: 'Avoid tight hairstyles. Use heat protectant if styling.', note: 'Not recommended: dry shampoo daily' },
  ]
  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 4px' }}>Hair Morning</h2>
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 16px' }}>Start the day with a healthy scalp foundation.</p>
        {steps.map(s => (
          <div key={s.n} style={{ background: 'white', borderRadius: 16, padding: '14px 16px', marginBottom: 10, border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <StepCircle n={s.n} active />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.4 }}>{s.desc}</div>
              {s.note && <div style={{ fontSize: 11, color: 'var(--purple)', fontWeight: 500, marginTop: 6 }}>✦ {s.note}</div>}
            </div>
          </div>
        ))}
        <button className="btn-primary" style={{ marginTop: 8 }}>Save Hair Morning Routine</button>
      </div>
    </div>
  )
}

export function HairNight() {
  const steps = [
    { n: 1, title: 'Minoxidil Application', desc: 'Apply 1ml to dry scalp. Massage in. Leave on overnight.', note: 'Critical: do not skip. Consistency = results.' },
    { n: 2, title: 'Scalp Serum', desc: 'Apply The INKEY List Peptide Treatment. Focus on temples.', note: "✦ Noyela's Pick for your profile" },
    { n: 3, title: 'Silk Pillowcase', desc: 'Reduces friction breakage. Highly recommended.' },
  ]
  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 4px' }}>Hair Night</h2>
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 16px' }}>Overnight treatments when follicles are most receptive.</p>
        {steps.map(s => (
          <div key={s.n} style={{ background: 'white', borderRadius: 16, padding: '14px 16px', marginBottom: 10, border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <StepCircle n={s.n} active />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4, lineHeight: 1.4 }}>{s.desc}</div>
              {s.note && <div style={{ fontSize: 11, color: 'var(--purple)', fontWeight: 500, marginTop: 6 }}>{s.note}</div>}
            </div>
          </div>
        ))}
        <AIInsight text="Minoxidil is 82% of your nightly routine's effectiveness. Never skip it." />
        <button className="btn-primary" style={{ marginTop: 16 }}>Save Night Routine</button>
      </div>
    </div>
  )
}

export function HairProfessional({ navigate }: { navigate: NavigateFn }) {
  const [treatmentTab, setTreatmentTab] = useState('Recommended')
  const tabs = ['Recommended', 'Non-invasive', 'Clinical']
  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 4px' }}>Professional Treatments</h2>
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 14px' }}>Clinician-led procedures for accelerated results.</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTreatmentTab(t)} style={{ padding: '8px 16px', borderRadius: 50, border: `1.5px solid ${treatmentTab === t ? 'var(--purple)' : 'var(--border)'}`, background: treatmentTab === t ? 'var(--purple-pale)' : 'white', color: treatmentTab === t ? 'var(--purple)' : 'var(--text-2)', fontSize: 13, fontWeight: treatmentTab === t ? 600 : 400, cursor: 'pointer' }}>
              {t}
            </button>
          ))}
        </div>
        {PROFESSIONAL_TREATMENTS.filter(t => {
          if (treatmentTab === 'Recommended') return t.match >= 80
          if (treatmentTab === 'Non-invasive') return t.invasiveness === 'None' || t.invasiveness === 'Minimal'
          return t.invasiveness === 'Low' || t.invasiveness === 'High'
        }).map((t, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 18, padding: '16px', marginBottom: 12, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <h3 style={{ fontWeight: 700, fontSize: 15, margin: 0 }}>{t.name}</h3>
              <MatchBadge pct={t.match} />
            </div>
            <p style={{ fontSize: 13, color: 'var(--purple)', fontWeight: 500, margin: '0 0 8px' }}>Why: {t.why}</p>
            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 12px', lineHeight: 1.5 }}>{t.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[
                { label: 'Timeline', value: t.timeline },
                { label: 'Downtime', value: t.downtime },
                { label: 'Invasiveness', value: t.invasiveness },
                { label: 'Cost', value: t.price },
              ].map(m => (
                <div key={m.label} style={{ background: 'var(--bg)', borderRadius: 10, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 500 }}>{m.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginTop: 2 }}>{m.value}</div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('doctors')} className="btn-secondary" style={{ width: '100%', padding: '12px', fontSize: 14 }}>
              Find Doctors for {t.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function HairDevices() {
  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 4px' }}>At-Home Devices</h2>
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 16px' }}>FDA-cleared consumer devices for home use.</p>
        <AIInsight text="LLLT devices work best alongside minoxidil. Noyela recommends combining both for your profile." />
        <div style={{ marginTop: 16 }}>
          {AT_HOME_DEVICES.map((d, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 18, padding: '16px', marginBottom: 12, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--purple-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>{d.img}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, marginBottom: 2 }}>{d.type}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', lineHeight: 1.3 }}>{d.name}</div>
                </div>
                <MatchBadge pct={d.match} />
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 8px', lineHeight: 1.5 }}>{d.desc}</p>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>{d.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function HairProgress() {
  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 16px' }}>Hair Progress</h2>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <StatTile label="Density Score" value="68" unit="%" trend="+4% this month" />
          <StatTile label="Daily Shedding" value="68" unit="hairs" trend="↓18% vs baseline" />
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: '16px', marginBottom: 16, border: '1px solid var(--border)' }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, margin: '0 0 12px' }}>Density Trend</h3>
          <div style={{ position: 'relative', height: 80, display: 'flex', alignItems: 'flex-end', gap: 8, paddingLeft: 4 }}>
            {[62, 60, 63, 64, 65, 66, 68].map((v, i) => (
              <div key={i} style={{ flex: 1, background: i === 6 ? 'var(--purple)' : 'var(--purple-light)', borderRadius: '4px 4px 0 0', height: `${(v / 80) * 100}%`, transition: 'height 0.5s ease' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            {['Jun', '', 'Jul', '', '', 'Aug', ''].map((m, i) => <span key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'var(--text-3)' }}>{m}</span>)}
          </div>
        </div>
        <AIInsight text="Density is trending upward — you're in the top 20% for 8-week improvement on this protocol." />
        <div style={{ marginTop: 16 }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, margin: '0 0 12px' }}>Milestones</h3>
          {[
            { date: 'Jun 14', label: 'Started hair protocol', done: true },
            { date: 'Jul 2', label: 'Shedding reduction noticed', done: true },
            { date: 'Jul 28', label: 'First PRP session', done: true },
            { date: 'Sep 2', label: 'Second PRP session', done: false },
            { date: 'Oct 15', label: 'Density photo assessment', done: false },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: m.done ? 'var(--purple)' : 'var(--border)', flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: 'var(--text-3)', width: 44 }}>{m.date}</div>
              <div style={{ fontSize: 14, color: m.done ? 'var(--text)' : 'var(--text-2)', fontWeight: m.done ? 600 : 400 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Hair({ screen, navigate, activeModule, onModuleChange, onHamburger, onNotif }: {
  screen: string; navigate: NavigateFn; activeModule: string; onModuleChange: (m: string) => void;
  onHamburger: () => void; onNotif: () => void
}) {
  const tab = screen.replace('hair-', '')
  const setTab = (t: string) => navigate(`hair-${t}`)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 8px', background: 'white' }}>
        <div style={{ width: 44 }}>
          <button onClick={onHamburger} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><rect y="0" width="22" height="2" rx="1" fill="var(--text)" /><rect y="7" width="16" height="2" rx="1" fill="var(--text)" /><rect y="14" width="22" height="2" rx="1" fill="var(--text)" /></svg>
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: '0.22em', color: 'var(--text)', lineHeight: 1 }}>NOYELA</div>
          <div style={{ fontFamily: "'Playfair Display'", fontStyle: 'italic', fontSize: 10, color: 'var(--text-2)', letterSpacing: '0.01em', marginTop: 2 }}>Your Personalized Aesthetic Intelligence</div>
        </div>
        <div style={{ width: 44, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10 }}>
       

          <Bell color='#000' size={24} />
          
        </div>
      </div>
      <ModuleTabs active={activeModule} onChange={m => { onModuleChange(m); navigate(`${m}-overview`) }} />
        <img src={HairBanner} alt="" />
      <div style={{ display: 'flex', gap: 0, overflowX: 'auto', background: 'white', borderBottom: '1px solid var(--border)' }}>
        {HAIR_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`feature-tab ${tab === t.id ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
             <img src={t.img} alt=""  className='w-[25%]'/> {t.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 16 }}>
        {tab === 'overview' && <HairOverview navigate={navigate} />}
        {tab === 'products' && <HairProducts />}
        {tab === 'morning' && <HairMorning />}
        {tab === 'night' && <HairNight />}
        {tab === 'professional' && <HairProfessional navigate={navigate} />}
        {tab === 'devices' && <HairDevices />}
        {tab === 'progress' && <HairProgress />}
      </div>
    </div>
  )
}
