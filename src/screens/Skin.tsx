import { useState } from 'react'
import { BackHeader, ModuleTabs, AIInsight, ScoreRing, StatTile, ProgressBar, NoyelaOrb, TierBadge, CheckCircleIcon, StepCircle } from '../components/ui'
import { Bell, Droplets, Sun } from 'lucide-react'
import SkinIconPack5 from '../assets/SkinIconPack5.png'
import SkinIconPack6 from '../assets/SkinIconPack6.png'
import SkinIconPack7 from '../assets/SkinIconPack7.png'
import SkinIconPack8 from '../assets/SkinIconPack8.png'
import SkinIconPack9 from '../assets/SkinIconPack9.png'
import SkinIconPack10 from '../assets/SkinIconPack10.png'

import SkinBanner from '../assets/SkinBanner.jpeg'

type NavigateFn = (screen: string, params?: Record<string, unknown>) => void

const SKIN_TABS = [
  { id: 'overview', label: 'Overview',   img:SkinIconPack5 },
  { id: 'products', label: 'Products',   img:SkinIconPack6 },
  { id: 'morning', label: 'Morning',     img:SkinIconPack7 },
  { id: 'afternoon', label: 'Afternoon', img:SkinIconPack8 },
  { id: 'night', label: 'Night',         img:SkinIconPack9 },
  { id: 'progress', label: 'Progress',   img:SkinIconPack10 },
]

const CLEANSER_OPTIONS = [
  {
    tier: 'premium' as const, brand: 'SkinCeuticals', name: 'LHA Cleanser with Glycolic Acid', price: '$38', size: '150 ml',
    img: 'https://images.unsplash.com/photo-1616750819456-5cdee9b85d22?w=80&h=100&fit=crop&auto=format',
    tag: 'Best for your skin', tagDetail: 'Non-stripping, clears pores, smooth texture', tagColor: 'var(--purple)',
  },
  {
    tier: 'value' as const, brand: 'CeraVe', name: 'Hydrating Cream-to-Foam Cleanser', price: '$14', size: '236 ml',
    img: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=80&h=100&fit=crop&auto=format',
    tag: 'Great balance', tagDetail: 'Ceramides + Hyaluronic Acid, hydrating', tagColor: 'var(--green)',
  },
  {
    tier: 'budget' as const, brand: 'Cetaphil', name: 'Gentle Skin Cleanser', price: '$6.50', size: '250 ml',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=100&fit=crop&auto=format',
    tag: 'Effective & gentle', tagDetail: 'Dermatologist tested, suitable for daily use', tagColor: 'var(--amber)',
  },
]

const SERUM_OPTIONS = [
  {
    tier: 'premium' as const, brand: 'SkinCeuticals', name: 'Discoloration Defense Serum', price: '$62', size: '30 ml',
    img: 'https://images.unsplash.com/photo-1613803745799-ba6c10aace85?w=80&h=100&fit=crop&auto=format',
    tag: 'Best for your concerns', tagDetail: 'Targets dark spots, post-acne marks', tagColor: 'var(--purple)',
  },
  {
    tier: 'value' as const, brand: 'The Ordinary', name: 'Niacinamide 10% + Zinc 1%', price: '$7', size: '30 ml',
    img: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=80&h=100&fit=crop&auto=format',
    tag: 'High performance', tagDetail: 'Reduces oil, minimizes pores, brightens', tagColor: 'var(--green)',
  },
  {
    tier: 'budget' as const, brand: 'Minimalist', name: 'Niacinamide 10% Serum', price: '$5', size: '30 ml',
    img: 'https://images.unsplash.com/photo-1616750819456-5cdee9b85d22?w=80&h=100&fit=crop&auto=format',
    tag: 'Affordable & effective', tagDetail: 'Improves texture, controls oil, evens tone', tagColor: 'var(--amber)',
  },
]

const MORNING_STEPS = [
  {
    n: 1, category: 'Cleanser', desc: 'Remove overnight buildup without stripping.',
    product: 'CeraVe Hydrating Cream-to-Foam Cleanser', selected: true,
    img: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=60&h=70&fit=crop&auto=format',
  },
  {
    n: 2, category: 'Treatment Serum', desc: 'Target concerns and support your skin goals.',
    product: 'The Ordinary Niacinamide 10% + Zinc 1%', selected: true,
    img: 'https://images.unsplash.com/photo-1613803745799-ba6c10aace85?w=60&h=70&fit=crop&auto=format',
  },
  {
    n: 3, category: 'Moisturizer', desc: 'Hydrate and strengthen your skin barrier.',
    product: 'CeraVe PM Facial Moisturizing Lotion', selected: true,
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=60&h=70&fit=crop&auto=format',
  },
  {
    n: 4, category: 'Sunscreen', desc: 'Protect from UV rays and prevent damage.',
    product: 'La Roche-Posay Anthelios UVMune 400 SPF 50+', selected: true,
    img: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=60&h=70&fit=crop&auto=format',
  },
  {
    n: 5, category: 'Optional: Face Mist', desc: 'Refresh and hydrate throughout the day.',
    product: null, selected: false,
    img: null,
  },
]

const NIGHT_STEPS = [
  { n: 1, category: 'Double Cleanse', desc: 'Remove sunscreen and buildup thoroughly.', product: 'CeraVe Hydrating Cream-to-Foam Cleanser', selected: true },
  { n: 2, category: 'Treatment: Retinol', desc: 'Accelerate cell turnover and collagen production.', product: 'Granactive Retinoid 2% Emulsion', selected: true },
  { n: 3, category: 'Treatment Serum', desc: 'Target dark spots overnight.', product: 'The Ordinary Alpha Arbutin 2% + HA', selected: true },
  { n: 4, category: 'Night Moisturizer', desc: 'Deep hydration for overnight recovery.', product: 'Neutrogena Hydro Boost Water Gel', selected: true },
]

// ─── Overview ─────────────────────────────────────────────────────────────────
function SkinOverview({ navigate }: { navigate: NavigateFn }) {
  return (
    <div className="screen bg-[white]" style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: 'none', borderRadius: 20, padding: '20px', marginBottom: 16, border: '1px solid rgba(107,53,200,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <ScoreRing score={78} size={80} label="/100" />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--purple)' }}>SKIN HEALTH</div>
              <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 500, margin: '4px 0 4px', color: 'var(--text)' }}>Improving Steadily</h3>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'green' }}>+12% Improvement this month</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { label: 'Hydration', value: '82%', good: true },
              { label: 'Texture', value: '74%', good: true },
              { label: 'Clarity', value: '70%', good: false },
            ].map(m => (
              <div key={m.label} style={{ textAlign: 'center', background: 'white', borderRadius: 12, padding: '10px 4px' }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: m.good ? 'var(--purple)' : '#FFA000' }}>{m.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 18, padding: '16px', marginBottom: 16, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-3)', marginBottom: 10 }}>YOUR GOAL</div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Reduce hyperpigmentation & improve texture</div>
          <ProgressBar value={42} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Started: Jun 14</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--purple)' }}>42% complete</span>
          </div>
        </div>

        <AIInsight
          text="Your skin barrier has improved enough to introduce a Vitamin C serum this week. I've added 3 options to your product list."
          action="View recommendations"
          onAction={() => navigate('skin-products')}
        />

        <div style={{ marginTop: 16, background: 'white', borderRadius: 18, border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Next action</div>
          </div>
          <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--purple-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20 }}>☀</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Complete your morning routine</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)' }}>4 steps · ~5 minutes</div>
            </div>
            <button onClick={() => navigate('skin-morning')} style={{ background: 'var(--purple)', color: 'white', border: 'none', borderRadius: 50, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Start</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Products ──────────────────────────────────────────────────────────────────
function SkinProducts() {
  const [selected, setSelected] = useState<Record<string, number>>({ cleanser: 1, serum: 1 })

  const ProductGroup = ({ title, desc, stepN, options, key: groupKey }: {
    title: string; desc: string; stepN: number; options: typeof CLEANSER_OPTIONS; key: string
  }) => (
    <div style={{ background: 'white', borderRadius: 20, padding: '16px', marginBottom: 16, border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--purple-light)', border: '2px solid var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--purple)', flexShrink: 0 }}>{stepN}</div>
            <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0, color: 'var(--text)' }}>{title}</h3>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-2)', margin: '4px 0 0 34px' }}>{desc}</p>
        </div>
        <button style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 50, padding: '4px 12px', fontSize: 12, color: 'var(--purple)', cursor: 'pointer', whiteSpace: 'nowrap' }}>Why this step? ⓘ</button>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {options.map((o, i) => (
          <div
            key={i}
            onClick={() => setSelected(prev => ({ ...prev, [groupKey]: i }))}
            className="product-card-col"
            style={{ flex: 1, minWidth: 0, background: selected[groupKey] === i ? 'var(--purple-pale)' : 'white', border: `1.5px solid ${selected[groupKey] === i ? 'var(--purple)' : 'var(--border)'}`, borderRadius: 14, padding: '10px 8px', cursor: 'pointer' }}
          >
            <div className='w-full flex items-center justify-center'
            >
              <TierBadge  tier={o.tier} />
            </div>
            <div style={{ height: 90, borderRadius: 10, overflow: 'hidden', marginTop: 8, marginBottom: 8, background: 'var(--bg)' }}>
              <img src={o.img} alt={o.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{o.brand}</div>
            <div style={{ fontSize: 10, color: 'var(--text-2)', marginBottom: 6, lineHeight: 1.3 }}>{o.name}</div>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>{o.price}</div>
            <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{o.size}</div>
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: o.tier === 'premium' ? 'var(--purple)' : o.tier === 'value' ? 'var(--green)' : 'var(--amber)' }}>
                {o.tier === 'premium' ? '✓ ' : o.tier === 'value' ? '◎ ' : '◇ '}{o.tag}
              </div>
              <div style={{ fontSize: 9, color: 'var(--text-2)', marginTop: 2, lineHeight: 1.3 }}>{o.tagDetail}</div>
            </div>
          </div>
        ))}
      </div>
      <button style={{ width: '100%', marginTop: 10, padding: '10px', background: 'none', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text-2)', fontSize: 13, cursor: 'pointer' }}>
        I already have a {title.toLowerCase()} →
      </button>
    </div>
  )

  return (
    <div className="screen" style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 500, margin: '0 0 4px', color: 'var(--text)' }}>Skin Products</h2>
            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0 }}>Smart recommendations. You choose.<br />Pick one product from each step.</p>
          </div>
          <button style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 50, padding: '6px 12px', fontSize: 12, color: 'var(--purple)', cursor: 'pointer', whiteSpace: 'nowrap' }}>How recommendations work ⓘ</button>
        </div>

        {/* Filter legend */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 50,  border: '1px solid rgba(107,53,200,0.2)', fontSize: 12, fontWeight: 500, color: 'var(--purple)', whiteSpace: 'nowrap', flexShrink: 0 }}>✦ Noyela's Pick</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 50,  border: '1px solid rgba(22,163,74,0.2)', fontSize: 12, fontWeight: 500, color: 'var(--green)', whiteSpace: 'nowrap', flexShrink: 0 }}>◎ Best Value</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 50, border: '1px solid rgba(217,119,6,0.2)', fontSize: 12, fontWeight: 500, color: 'var(--amber)', whiteSpace: 'nowrap', flexShrink: 0 }}>◇ Budget Friendly</span>
        </div>

        <ProductGroup key="cleanser" title="Cleanser" desc="Gently cleanse without stripping your skin barrier." stepN={1} options={CLEANSER_OPTIONS} />
        <ProductGroup key="serum" title="Treatment Serum" desc="Target concerns and improve skin texture." stepN={2} options={SERUM_OPTIONS} />

        <AIInsight text="Noyela adapts as you progress. Your plan evolves with your skin." action="Chat with Noyela" />
      </div>
    </div>
  )
}

// ─── Morning Routine ──────────────────────────────────────────────────────────
function SkinMorning({ navigate }: { navigate: NavigateFn }) {
  const [completed, setCompleted] = useState<number[]>([])
  const toggle = (n: number) => setCompleted(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])

  return (
    <div className="screen" style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 500, margin: '0 0 4px', color: 'var(--text)' }}>Morning Routine</h2>
            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0 }}>Protect, hydrate and prepare your skin.</p>
          </div>
          <button style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 50, padding: '6px 12px', fontSize: 12, color: 'var(--purple)', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif" }}>Why this? ⓘ</button>
        </div>

        {/* Step progress dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 16, marginTop: 12, overflowX: 'auto' }}>
          {MORNING_STEPS.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: completed.includes(s.n) ? 'var(--purple)' : 'var(--purple-pale)', border: `1.5px solid ${completed.includes(s.n) ? 'var(--purple)' : 'rgba(107,53,200,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px' }}>
                  {completed.includes(s.n) ? <svg width="14" height="10" viewBox="0 0 14 10"><polyline points="1,5 5.5,9 13,1" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
                    : <span style={{ fontSize: 11, fontWeight: 700, color: completed.includes(s.n) ? 'white' : 'var(--purple)' }}>{s.n}</span>}
                </div>
                <div style={{ fontSize: 9, color: 'var(--text-3)', fontWeight: 500, whiteSpace: 'nowrap' }}>{s.category.split(' ')[0]}</div>
              </div>
              {i < MORNING_STEPS.length - 1 && <div style={{ width: 16, height: 1, background: 'var(--border)', margin: '0 3px 10px', flexShrink: 0 }} />}
            </div>
          ))}
        </div>

        {/* Steps list — single white card with dividers */}
        <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 14 }}>
          {MORNING_STEPS.map((step, i) => (
            <div key={step.n}>
              {i > 0 && <div style={{ height: 1, background: 'var(--border)', marginLeft: 16 }} />}
              {!step.selected ? (
                /* Optional step row */
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--purple-pale)', border: '1.5px dashed rgba(107,53,200,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--purple)' }}>{step.n}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)', marginBottom: 2 }}>{step.category}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Noyela will recommend the best options for you.</div>
                  </div>
                  <button style={{ flexShrink: 0, background: 'var(--purple-pale)', border: '1px solid rgba(107,53,200,0.25)', borderRadius: 50, padding: '7px 14px', fontSize: 13, fontWeight: 600, color: 'var(--purple)', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                    Add +
                  </button>
                </div>
              ) : (
                /* Regular step row */
                <div onClick={() => toggle(step.n)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', cursor: 'pointer' }}>
                  {/* Purple circle number */}
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: completed.includes(step.n) ? 'var(--purple)' : 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {completed.includes(step.n)
                      ? <svg width="16" height="12" viewBox="0 0 16 12"><polyline points="1,6 6,11 15,1" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" /></svg>
                      : <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{step.n}</span>}
                  </div>
                  {/* Product image */}
                  {step.img ? (
                    <div style={{ width: 46, height: 60, borderRadius: 10, overflow: 'hidden', background: '#F8F5FF', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={step.img} alt={step.category} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
                    </div>
                  ) : (
                    <div style={{ width: 46, height: 60, borderRadius: 10, background: 'var(--bg)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border)' }}>
                      <span style={{ fontSize: 18, color: 'var(--text-3)' }}>?</span>
                    </div>
                  )}
                  {/* Text middle */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)', marginBottom: 2 }}>{step.category}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 5, lineHeight: 1.3 }}>{step.desc}</div>
                    <span style={{ fontSize: 10, color: 'var(--purple)', fontWeight: 500, letterSpacing: '0.02em' }}>◆ Noyela's Pick</span>
                  </div>
                  {/* Right: selected pill + product name */}
                  <div style={{ flexShrink: 0, textAlign: 'right', maxWidth: 110 }}>
                    <span className='border-[1px] border-[#16A34A1a]' style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'none', color: '#16A34A', padding: '4px 10px', borderRadius: 50, fontSize: 10, fontWeight: 700, marginBottom: 4, whiteSpace: 'nowrap' }}>
                      Selected ✓
                    </span>
                    <div style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.3 }}>{step.product}</div>
                  </div>
                  {/* Chevron */}
                  <svg width="8" height="13" viewBox="0 0 8 13" fill="none" style={{ flexShrink: 0, marginLeft: 2 }}>
                    <polyline points="1,1 7,6.5 1,12" stroke="var(--text-3)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI insight — inline row style */}
        <div style={{ background: 'var(--purple-pale)', borderRadius: 16, padding: '12px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--purple)', letterSpacing: '0.08em', marginBottom: 2 }}>NOYELA INSIGHT</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.4 }}>Consistency in the morning sets the tone for your best skin days.</div>
          </div>
          <button onClick={() => navigate('ask-noyela')} style={{ flexShrink: 0, background: 'white', border: '1px solid rgba(107,53,200,0.2)', borderRadius: 50, padding: '7px 12px', fontSize: 11, fontWeight: 600, color: 'var(--purple)', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif" }}>
            Tips for Best Results &rsaquo;
          </button>
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-primary" style={{ flex: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14 }}>
            ✓ Save Morning Routine
          </button>
          <button style={{ flex: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '14px 10px', background: 'white', border: '1.5px solid var(--border)', borderRadius: 50, fontSize: 13, fontWeight: 500, cursor: 'pointer', color: 'var(--text)', fontFamily: "'Inter', sans-serif" }}>
            ≡ Reorder
          </button>
        </div>

        {/* Ask Noyela pill */}
        <button onClick={() => navigate('ask-noyela')} style={{ width: '100%', marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, background: 'white', border: '1.5px solid var(--border)', borderRadius: 50, padding: '12px 18px', cursor: 'pointer', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #B06AFF, #6B35C8 70%)', flexShrink: 0 }} />
          <span style={{ flex: 1, textAlign: 'left', fontSize: 13, color: 'var(--text-3)', fontFamily: "'Inter', sans-serif" }}>Ask Noyela about your routine...</span>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--purple-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none"><ellipse cx="7" cy="7" rx="4.5" ry="6" stroke="var(--purple)" strokeWidth="1.5" /><line x1="7" y1="13" x2="7" y2="17" stroke="var(--purple)" strokeWidth="1.5" strokeLinecap="round" /><line x1="4" y1="17" x2="10" y2="17" stroke="var(--purple)" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </div>
        </button>
      </div>
    </div>
  )
}

// ─── Afternoon ────────────────────────────────────────────────────────────────
function SkinAfternoon() {
  return (
    <div className="screen" style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 4px', color: 'var(--text)' }}>Afternoon Routine</h2>
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 16px' }}>Keep your skin protected and hydrated mid-day.</p>
        <AIInsight text="Your afternoon routine is minimal by design. Noyela keeps it simple so you actually do it." />
        <div style={{ marginTop: 16 }}>
          {[
            { icon: <Sun strokeWidth={1} color='#6B35C8'/>, step: 1, title: 'SPF Reapplication', desc: 'Reapply sunscreen every 2 hours outdoors.', product: 'Neutrogena Ultra Sheer SPF 50 — Spray for convenience' },
            { icon: <Droplets strokeWidth={1} color='#6B35C8'/>, step: 2, title: 'Hydration Check', desc: 'Drink 500ml water and apply mist if needed.', product: 'Optional: Avène Thermal Spring Water Mist' },
          ].map(s => (
            <div key={s.step} style={{ background: 'white', borderRadius: 16, padding: '14px 16px', marginBottom: 10, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0, border: '1px solid rgba(107,53,200,0.15)' }}>{s.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 4 }}>{s.desc}</div>
                <div style={{ fontSize: 11, color: 'var(--purple)', fontWeight: 500 }}>{s.product}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Night Routine ────────────────────────────────────────────────────────────
function SkinNight() {
  const [completed, setCompleted] = useState<number[]>([])
  const toggle = (n: number) => setCompleted(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])

  return (
    <div className="screen" style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 4px', color: 'var(--text)' }}>Night Routine</h2>
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 16px' }}>Repair, renew and restore while you sleep.</p>
        {NIGHT_STEPS.map((step) => (
          <div key={step.n} onClick={() => toggle(step.n)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'white', borderRadius: 16, border: `1.5px solid ${completed.includes(step.n) ? 'var(--green)' : 'var(--border)'}`, marginBottom: 10, cursor: 'pointer' }}>
            <StepCircle n={step.n} active={!completed.includes(step.n)} completed={completed.includes(step.n)} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{step.category}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 4 }}>{step.desc}</div>
              <div style={{ fontSize: 11, color: 'var(--purple)', fontWeight: 500 }}>{step.product}</div>
            </div>
            {completed.includes(step.n) && <CheckCircleIcon />}
          </div>
        ))}
        <AIInsight text="Retinol takes 8–12 weeks to show full results. Your consistency score is 87% — keep going." />
        <button className="btn-primary" style={{ marginTop: 16 }}>✓ Save Night Routine</button>
      </div>
    </div>
  )
}

// ─── Progress ──────────────────────────────────────────────────────────────────
function SkinProgress() {
  return (
    <div className="screen" style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, margin: '0 0 16px', color: 'var(--text)' }}>Skin Progress</h2>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <StatTile label="Hydration" value="82" unit="%" trend="+6% this month" />
          <StatTile label="Texture" value="74" unit="%" trend="+12% this month" />
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <StatTile label="Clarity" value="70" unit="%" trend="+4% this month" />
          <StatTile label="Consistency" value="87" unit="%" trend="+5% vs last month" />
        </div>
        <div style={{ background: 'white', borderRadius: 20, padding: '16px', marginBottom: 16, border: '1px solid var(--border)' }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, margin: '0 0 12px' }}>Before & After</h3>
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 180, background: 'var(--border)' }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&auto=format" alt="After" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&auto=format&bri=-20&sat=-30" alt="Before" style={{ position: 'absolute', inset: 0, width: '50%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) saturate(0.7)' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: 'white' }} />
            <span style={{ position: 'absolute', bottom: 8, left: 10, background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 10, padding: '2px 8px', borderRadius: 50 }}>Jun 14</span>
            <span style={{ position: 'absolute', bottom: 8, right: 10, background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 10, padding: '2px 8px', borderRadius: 50 }}>Aug 8</span>
          </div>
        </div>
        <AIInsight text="Remarkable progress. Your skin barrier score has improved 12 points in 8 weeks — top 15% adherence." />
      </div>
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
const FEATURE_TABS = ['overview', 'products', 'morning', 'afternoon', 'night', 'progress']

export default function Skin({ screen, navigate, activeModule, onModuleChange, onHamburger, onNotif }: {
  screen: string; navigate: NavigateFn; activeModule: string; onModuleChange: (m: string) => void;
  onHamburger: () => void; onNotif: () => void
}) {
  const tab = screen.replace('skin-', '')
  const setTab = (t: string) => navigate(`skin-${t}`)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Plan header with subtitle */}
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
       

          <Bell color='#000' size={24} onClick={onNotif}/>
          
        </div>
      </div>
      <ModuleTabs active={activeModule} onChange={m => { onModuleChange(m); navigate(`${m}-overview`) }} />
        <div className=''>

            <img src={SkinBanner} alt="" />
        </div>
      <div style={{ display: 'flex', gap: 0, overflowX: 'auto', background: 'white', borderBottom: '1px solid var(--border)' }}>
        {SKIN_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={` feature-tab ${tab === t.id ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
            <img src={t.img} alt=""  className='w-[25%]'/>
            {t.label}
          </button>
        ))}
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '16px 0 0' }}>
          {tab === 'overview' && <SkinOverview navigate={navigate} />}
          {tab === 'products' && <SkinProducts />}
          {tab === 'morning' && <SkinMorning navigate={navigate} />}
          {tab === 'afternoon' && <SkinAfternoon />}
          {tab === 'night' && <SkinNight />}
          {tab === 'progress' && <SkinProgress />}
        </div>
      </div>
    </div>
  )
}
