import { useState } from 'react'
import { BackHeader, NoyelaOrb, AIInsight, MatchBadge, StarIcon, InfoRow } from '../components/ui'

type NavigateFn = (screen: string, params?: Record<string, unknown>) => void

const DOCTORS = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    verified: true,
    specialty: 'Aesthetic Dermatologist',
    location: 'Beverly Hills, CA · 3.2 mi',
    rating: 4.9,
    reviews: 142,
    experience: '14 years',
    match: 96,
    expertise: ['Skin rejuvenation', 'PRP therapy', 'Filler corrections'],
    why: 'Specializes in your exact skin concerns. High patient satisfaction for texture improvement.',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&auto=format',
    price: '$250 consultation',
    procedures: ['Botox', 'Fillers', 'PRP', 'Chemical Peels', 'Microneedling'],
    bio: 'Board-certified dermatologist with subspecialty training in aesthetic procedures. Trained at UCLA and Johns Hopkins. Published researcher in skin rejuvenation.',
  },
  {
    id: 2,
    name: 'Dr. Michael Torres',
    verified: true,
    specialty: 'Hair Restoration Specialist',
    location: 'West Hollywood, CA · 5.1 mi',
    rating: 4.8,
    reviews: 89,
    experience: '11 years',
    match: 94,
    expertise: ['PRP for hair loss', 'Scalp microneedling', 'Hair transplant (FUE)'],
    why: 'Top-rated for early-stage hair restoration matching your profile. Pioneered combined PRP + microneedling protocol.',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&auto=format',
    price: '$300 consultation',
    procedures: ['PRP Therapy', 'Scalp Microneedling', 'FUE Transplant', 'LLLT'],
    bio: 'Fellowship-trained hair restoration surgeon. Creator of the Torres Enhanced PRP Protocol, achieving 40% better density outcomes. Published in JAMA Dermatology.',
  },
  {
    id: 3,
    name: 'Dr. James Park',
    verified: true,
    specialty: 'Facial Plastic Surgeon',
    location: 'Santa Monica, CA · 7.8 mi',
    rating: 4.7,
    reviews: 203,
    experience: '18 years',
    match: 82,
    expertise: ['Jawline contouring', 'Non-surgical rhinoplasty', 'Facial harmony'],
    why: 'Strong match for jawline assessment and filler recommendations. Known for conservative, natural results.',
    img: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&auto=format',
    price: '$350 consultation',
    procedures: ['Jaw Filler', 'Kybella', 'Rhinoplasty', 'Botox Masseter'],
    bio: 'Double board-certified in Plastic Surgery and Otolaryngology. Known for facial harmony-first approach. Trains other physicians in advanced filler techniques.',
  },
]

// ─── Doctor Discovery ──────────────────────────────────────────────────────────
function DoctorDiscovery({ navigate }: { navigate: NavigateFn }) {
  const [saved, setSaved] = useState<number[]>([])
  return (
    <div className="screen" style={{ paddingBottom: 24 }}>
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: 'var(--purple-pale)', borderRadius: 20, padding: '18px 16px', marginBottom: 20, border: '1px solid rgba(107,53,200,0.12)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <NoyelaOrb size="sm" />
          <div>
            <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 700, margin: '0 0 6px', color: 'var(--text)' }}>Doctors Recommended for You</h3>
            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>Noyela selected these doctors based on your goals, roadmap, treatment needs, and location.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
          {['All', 'Dermatology', 'Hair', 'Facial'].map(f => (
            <button key={f} style={{ padding: '7px 16px', borderRadius: 50, border: `1.5px solid ${f === 'All' ? 'var(--purple)' : 'var(--border)'}`, background: f === 'All' ? 'var(--purple-pale)' : 'white', color: f === 'All' ? 'var(--purple)' : 'var(--text-2)', fontSize: 13, fontWeight: f === 'All' ? 600 : 400, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {f}
            </button>
          ))}
        </div>

        {DOCTORS.map(d => (
          <div key={d.id} style={{ background: 'white', borderRadius: 20, padding: '16px', marginBottom: 14, border: '1px solid var(--border)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, overflow: 'hidden', flexShrink: 0, background: 'var(--bg)' }}>
                <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{d.name}</span>
                  {d.verified && <span style={{ fontSize: 12, background: 'var(--green-bg)', color: 'var(--green)', padding: '1px 6px', borderRadius: 50, fontWeight: 600 }}>✓ Verified</span>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 4 }}>{d.specialty}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>📍 {d.location}</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= Math.floor(d.rating)} />)}
                    <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{d.rating} ({d.reviews})</span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-3)' }}>· {d.experience}</span>
                </div>
              </div>
              <button onClick={() => setSaved(prev => prev.includes(d.id) ? prev.filter(x => x !== d.id) : [...prev, d.id])} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: saved.includes(d.id) ? '#EF4444' : 'var(--text-3)', flexShrink: 0, alignSelf: 'flex-start' }}>
                {saved.includes(d.id) ? '♥' : '♡'}
              </button>
            </div>

            <MatchBadge pct={d.match} />

            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '10px 0 12px', lineHeight: 1.5 }}>
              <span style={{ color: 'var(--purple)', fontWeight: 600 }}>Why Noyela recommends: </span>{d.why}
            </p>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
              {d.expertise.map(e => (
                <span key={e} style={{ padding: '4px 10px', borderRadius: 50, background: 'var(--purple-light)', color: 'var(--purple)', fontSize: 11, fontWeight: 500 }}>{e}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => navigate('doctor-profile', { doctorId: d.id })} className="btn-primary" style={{ flex: 1, padding: '12px', fontSize: 14 }}>
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Doctor Profile ────────────────────────────────────────────────────────────
function DoctorProfile({ navigate, doctorId }: { navigate: NavigateFn; doctorId: number }) {
  const d = DOCTORS.find(d => d.id === doctorId) || DOCTORS[0]
  const [tab, setTab] = useState('Overview')
  const tabs = ['Overview', 'Procedures', 'Reviews']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <BackHeader onBack={() => navigate('doctors')} title={d.name} subtitle={d.specialty} />
      <div className="screen" style={{ paddingBottom: 100 }}>
        {/* Hero */}
        <div style={{ position: 'relative', height: 200, background: 'var(--purple-light)' }}>
          <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(247,245,242,0.9) 100%)' }} />
        </div>
        <div style={{ padding: '0 16px 16px', marginTop: -12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--text)' }}>{d.name}</h2>
                {d.verified && <span style={{ fontSize: 11, background: 'var(--green-bg)', color: 'var(--green)', padding: '2px 8px', borderRadius: 50, fontWeight: 600 }}>✓ Verified</span>}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>{d.specialty} · {d.experience} experience</div>
            </div>
            <MatchBadge pct={d.match} />
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <div style={{ flex: 1, background: 'white', borderRadius: 14, padding: '10px', textAlign: 'center', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= Math.floor(d.rating)} />)}
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, marginTop: 2 }}>{d.rating}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{d.reviews} reviews</div>
            </div>
            <div style={{ flex: 1, background: 'white', borderRadius: 14, padding: '10px', textAlign: 'center', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 20 }}>🏥</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginTop: 2 }}>{d.experience}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Experience</div>
            </div>
            <div style={{ flex: 1, background: 'white', borderRadius: 14, padding: '10px', textAlign: 'center', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 20 }}>📍</div>
              <div style={{ fontWeight: 700, fontSize: 12, marginTop: 2 }}>{d.location.split('·')[0]}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{d.location.split('·')[1]?.trim()}</div>
            </div>
          </div>

          <div style={{ display: 'flex', background: 'var(--purple-pale)', borderRadius: 50, padding: 3, marginBottom: 16 }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '8px', borderRadius: 50, background: tab === t ? 'white' : 'transparent', color: tab === t ? 'var(--purple)' : 'var(--text-2)', fontSize: 13, fontWeight: tab === t ? 700 : 400, border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                {t}
              </button>
            ))}
          </div>

          {tab === 'Overview' && (
            <>
              <AIInsight text={`Why Noyela recommends Dr. ${d.name.split(' ')[1]}: ${d.why}`} />
              <div style={{ background: 'white', borderRadius: 18, padding: '16px', marginTop: 16, border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>About</div>
                <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 12px', lineHeight: 1.6 }}>{d.bio}</p>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Expertise</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {d.expertise.map(e => <span key={e} style={{ padding: '4px 10px', borderRadius: 50, background: 'var(--purple-light)', color: 'var(--purple)', fontSize: 12, fontWeight: 500 }}>{e}</span>)}
                </div>
              </div>
              <div style={{ background: 'white', borderRadius: 18, padding: '16px', marginTop: 12, border: '1px solid var(--border)' }}>
                <InfoRow label="Consultation price" value={d.price} valueColor="var(--purple)" />
                <InfoRow label="Location" value={d.location} />
                <InfoRow label="Accepts virtual" value="Yes — Telehealth available" valueColor="var(--green)" />
              </div>
            </>
          )}
          {tab === 'Procedures' && (
            <div style={{ background: 'white', borderRadius: 18, padding: '16px', border: '1px solid var(--border)' }}>
              {d.procedures.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < d.procedures.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: 14, color: 'var(--text)' }}>{p}</span>
                  <span style={{ fontSize: 12, color: 'var(--purple)', fontWeight: 600 }}>View →</span>
                </div>
              ))}
            </div>
          )}
          {tab === 'Reviews' && (
            <div>
              {[
                { name: 'Jordan M.', rating: 5, text: 'Dr. Chen completely transformed my skin. 6 months of PRP and the texture improvement is remarkable. Highly recommended.' },
                { name: 'Alex R.', rating: 5, text: 'Professional, thorough, and delivered exactly what she promised. My go-to for any aesthetic treatment.' },
                { name: 'Sam T.', rating: 4, text: 'Very knowledgeable. Takes time to explain everything. Results took 3 months but were worth the wait.' },
              ].map((r, i) => (
                <div key={i} style={{ background: 'white', borderRadius: 14, padding: '14px 16px', marginBottom: 10, border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                    <div style={{ display: 'flex', gap: 2 }}>{[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= r.rating} />)}</div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{ position: 'sticky', bottom: 0, background: 'white', padding: '12px 16px 24px', borderTop: '1px solid var(--border)', zIndex: 10 }}>
        <button className="btn-primary" onClick={() => navigate('booking', { doctorId: d.id })}>
          Book Consultation · {d.price}
        </button>
      </div>
    </div>
  )
}

// ─── Booking ──────────────────────────────────────────────────────────────────
function Booking({ navigate, doctorId }: { navigate: NavigateFn; doctorId: number }) {
  const d = DOCTORS.find(d => d.id === doctorId) || DOCTORS[0]
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [consultType, setConsultType] = useState<'in-person' | 'virtual'>('in-person')

  const DATES = [
    { day: 'Mon', date: 11 }, { day: 'Tue', date: 12 }, { day: 'Wed', date: 13 },
    { day: 'Thu', date: 14 }, { day: 'Fri', date: 15 }, { day: 'Sat', date: 16 },
  ]
  const TIMES = ['9:00 AM', '10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '4:30 PM']

  const stepLabels = ['Type', 'Date', 'Time', 'Review']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <BackHeader onBack={() => step > 1 ? setStep(step - 1) : navigate('doctor-profile', { doctorId: d.id })} title="Book Consultation" subtitle={`Step ${step} of 4`} />

      {/* Step progress */}
      <div style={{ padding: '0 16px 16px', background: 'var(--bg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {stepLabels.map((l, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: i + 1 <= step ? 'var(--purple)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {i + 1 < step ? <span style={{ color: 'white', fontSize: 11 }}>✓</span> : <span style={{ fontSize: 11, color: i + 1 === step ? 'white' : 'var(--text-3)', fontWeight: 700 }}>{i + 1}</span>}
              </div>
              {i < stepLabels.length - 1 && <div style={{ flex: 1, height: 2, background: i + 1 < step ? 'var(--purple)' : 'var(--border)' }} />}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          {stepLabels.map((l, i) => <span key={i} style={{ fontSize: 10, color: i + 1 === step ? 'var(--purple)' : 'var(--text-3)', fontWeight: i + 1 === step ? 700 : 400, textAlign: 'center', flex: 1 }}>{l}</span>)}
        </div>
      </div>

      <div className="screen" style={{ paddingBottom: 100 }}>
        <div style={{ padding: '0 16px' }}>
          {/* Doctor mini card */}
          <div style={{ background: 'white', borderRadius: 16, padding: '12px 14px', marginBottom: 16, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
              <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{d.specialty}</div>
            </div>
          </div>

          {step === 1 && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Consultation Type</div>
              {(['in-person', 'virtual'] as const).map(t => (
                <div key={t} onClick={() => setConsultType(t)} style={{ padding: '16px', borderRadius: 16, border: `2px solid ${consultType === t ? 'var(--purple)' : 'var(--border)'}`, background: consultType === t ? 'var(--purple-pale)' : 'white', cursor: 'pointer', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 28 }}>{t === 'in-person' ? '🏥' : '💻'}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{t === 'in-person' ? 'In-Person Visit' : 'Virtual Consultation'}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>{t === 'in-person' ? 'Full examination and treatment available' : 'Assessment and planning — no procedures'}</div>
                  </div>
                </div>
              ))}
              <div style={{ background: 'var(--purple-pale)', borderRadius: 14, padding: '12px 14px', marginTop: 16, border: '1px solid rgba(107,53,200,0.12)' }}>
                <div style={{ fontSize: 12, color: 'var(--text-2)' }}>📋 Optional: Upload photos or documents for the doctor to review before your appointment.</div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Select a Date</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
                {DATES.map(d => (
                  <div key={d.date} onClick={() => setSelectedDate(d.date)} style={{ flexShrink: 0, width: 56, padding: '10px 0', borderRadius: 14, textAlign: 'center', border: `2px solid ${selectedDate === d.date ? 'var(--purple)' : 'var(--border)'}`, background: selectedDate === d.date ? 'var(--purple)' : 'white', cursor: 'pointer' }}>
                    <div style={{ fontSize: 11, color: selectedDate === d.date ? 'rgba(255,255,255,0.8)' : 'var(--text-3)', marginBottom: 4 }}>{d.day}</div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: selectedDate === d.date ? 'white' : 'var(--text)' }}>{d.date}</div>
                    <div style={{ fontSize: 10, color: selectedDate === d.date ? 'rgba(255,255,255,0.7)' : 'var(--text-3)', marginTop: 2 }}>Aug</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Select a Time</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {TIMES.map(t => (
                  <button key={t} onClick={() => setSelectedTime(t)} style={{ padding: '12px 8px', borderRadius: 14, border: `2px solid ${selectedTime === t ? 'var(--purple)' : 'var(--border)'}`, background: selectedTime === t ? 'var(--purple)' : 'white', color: selectedTime === t ? 'white' : 'var(--text)', fontSize: 13, fontWeight: selectedTime === t ? 700 : 400, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Review Booking</div>
              <div style={{ background: 'white', borderRadius: 18, border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 16 }}>
                <InfoRow label="Doctor" value={d.name} />
                <InfoRow label="Specialty" value={d.specialty} />
                <InfoRow label="Type" value={consultType === 'in-person' ? 'In-Person Visit' : 'Virtual Consultation'} />
                <InfoRow label="Date" value={selectedDate ? `August ${selectedDate}, 2026` : 'Not selected'} />
                <InfoRow label="Time" value={selectedTime || 'Not selected'} />
                <InfoRow label="Cost" value={d.price} valueColor="var(--purple)" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ position: 'sticky', bottom: 0, background: 'white', padding: '12px 16px 24px', borderTop: '1px solid var(--border)' }}>
        <button className="btn-primary" onClick={() => step < 4 ? setStep(step + 1) : navigate('booking-confirm', { doctorId: d.id, date: selectedDate, time: selectedTime, type: consultType })}>
          {step < 4 ? 'Continue' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  )
}

// ─── Booking Confirmation ─────────────────────────────────────────────────────
function BookingConfirm({ navigate, doctorId }: { navigate: NavigateFn; doctorId: number }) {
  const d = DOCTORS.find(d => d.id === doctorId) || DOCTORS[0]
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px 40px' }}>
      {/* Success animation */}
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--green-bg)', border: '3px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 20, animation: 'fade-up 0.4s ease-out' }}>
        ✓
      </div>
      <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 28, fontWeight: 700, color: 'var(--text)', margin: '0 0 6px', textAlign: 'center' }}>Booking Confirmed!</h2>
      <p style={{ fontSize: 15, color: 'var(--text-2)', textAlign: 'center', margin: '0 0 32px' }}>Your appointment has been scheduled.</p>

      <div style={{ background: 'white', borderRadius: 20, padding: '20px', width: '100%', border: '1px solid var(--border)', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, overflow: 'hidden' }}>
            <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{d.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{d.specialty}</div>
          </div>
        </div>
        <InfoRow label="Clinic" value="Aesthetic Medical Group Beverly Hills" />
        <InfoRow label="Date" value="August 13, 2026" />
        <InfoRow label="Time" value="10:00 AM" />
        <InfoRow label="Type" value="In-Person Consultation" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
        {[
          { icon: '📅', label: 'Add to Calendar' },
          { icon: '📋', label: 'Prepare for Appointment' },
          { icon: '📄', label: 'Upload Documents' },
          { icon: '💬', label: 'Message Clinic' },
        ].map(a => (
          <button key={a.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'white', border: '1px solid var(--border)', borderRadius: 14, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>
            <span style={{ fontSize: 20 }}>{a.icon}</span>
            {a.label}
          </button>
        ))}
      </div>

      <button onClick={() => navigate('home')} style={{ marginTop: 24, background: 'none', border: 'none', color: 'var(--purple)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
        Back to Home
      </button>
    </div>
  )
}

// ─── Treatment Detail ─────────────────────────────────────────────────────────
function TreatmentDetail({ navigate }: { navigate: NavigateFn }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <BackHeader onBack={() => navigate('jawline-treatments')} title="Jaw Filler" subtitle="Treatment detail" />
      <div className="screen" style={{ paddingBottom: 100 }}>
        <div style={{ height: 200, background: 'var(--purple-light)', position: 'relative', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=430&h=200&fit=crop&auto=format" alt="Treatment" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 28, fontWeight: 700, color: 'white', textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>Jaw Filler</h2>
          </div>
        </div>
        <div style={{ padding: '16px 16px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>Radiesse / Juvederm</div>
            <MatchBadge pct={91} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
            {[
              { label: 'Procedure', value: '30–45 min' },
              { label: 'Downtime', value: '24–48h' },
              { label: 'Pain', value: 'Minimal' },
              { label: 'Longevity', value: '12–18 mo' },
              { label: 'Risk', value: 'Low' },
              { label: 'Est. Price', value: '$800–1,500' },
            ].map(m => (
              <div key={m.label} style={{ background: 'white', borderRadius: 12, padding: '10px 8px', textAlign: 'center', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 9, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.05em' }}>{m.label.toUpperCase()}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginTop: 4 }}>{m.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'white', borderRadius: 18, padding: '16px', marginBottom: 12, border: '1px solid var(--border)' }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>What it does</div>
            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0, lineHeight: 1.6 }}>Hyaluronic acid or calcium hydroxylapatite filler is injected along the jawline to add structure, definition, and projection. Creates a sharper, more angular appearance without surgery.</p>
          </div>
          <AIInsight text="Based on your scan, you'd benefit most from filler at the angle and body of the jaw — approximately 2–3ml total. This is a conservative approach that can be refined over time." />
          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Recommended Doctors</div>
            {DOCTORS.filter(d => d.procedures.includes('Jaw Filler') || d.procedures.includes('Fillers')).map(d => (
              <div key={d.id} onClick={() => navigate('doctor-profile', { doctorId: d.id })} style={{ background: 'white', borderRadius: 14, padding: '12px 14px', marginBottom: 10, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}><img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{d.specialty}</div>
                </div>
                <MatchBadge pct={d.match} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: 'sticky', bottom: 0, background: 'white', padding: '12px 16px 24px', borderTop: '1px solid var(--border)' }}>
        <button className="btn-primary" onClick={() => navigate('booking', { doctorId: 3 })}>Book Consultation</button>
      </div>
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function Doctors({ screen, navigate, params }: {
  screen: string; navigate: NavigateFn; params?: Record<string, unknown>
}) {
  const doctorId = (params?.doctorId as number) || 1
  if (screen === 'doctors') return <DoctorDiscovery navigate={navigate} />
  if (screen === 'doctor-profile') return <DoctorProfile navigate={navigate} doctorId={doctorId} />
  if (screen === 'booking') return <Booking navigate={navigate} doctorId={doctorId} />
  if (screen === 'booking-confirm') return <BookingConfirm navigate={navigate} doctorId={doctorId} />
  if (screen === 'treatment-detail') return <TreatmentDetail navigate={navigate} />
  return <DoctorDiscovery navigate={navigate} />
}
