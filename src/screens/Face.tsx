import { useState, useEffect } from 'react'
import { BackHeader, NoyelaOrb, AIInsight, ProgressBar, ScoreRing, StepCircle, GhostPill } from '../components/ui'
import CaptureFaceImg from '../assets/CaptureFace.png'
import AnalyzeSectionImg1 from '../assets/AnalyzeSectionImg1.png'
import AnalyzeSectionImg2 from '../assets/AnalyzeSectionImg2.png'
import AnalyzeSectionImg3 from '../assets/AnalyzeSectionImg3.png'
import AnalyzeSectionImg4 from '../assets/AnalyzeSectionImg4.png'
import ScanFace from '../assets/ScanFace.png'
import { Sun } from 'lucide-react'
import FaceScanImg1 from '../assets/FaceScanImg1.png'
import FaceScanImg2 from '../assets/FaceScanImg2.png'
import FaceScanImg3 from '../assets/FaceScanImg3.png'
import FaceScanImg4 from '../assets/FaceScanImg4.png'
import FaceScanImg5 from '../assets/FaceScanImg5.png'
import FaceProfileImg1 from '../assets/FaceProfileImg1.png'
import FaceProfileImg2 from '../assets/FaceProfileImg2.png'
import FaceProfileImg3 from '../assets/FaceProfileImg3.png'
import FaceProfileImg4 from '../assets/FaceProfileImg4.png'
import FaceProfileImg5 from '../assets/FaceProfileImg5.png'


type NavigateFn = (screen: string) => void

const CAPTURE_ANGLES = [
  { img:FaceProfileImg1, n: 1, label: 'Front', sub: 'Straight face', active: true },
  { img:FaceProfileImg2, n: 2, label: 'Right 45°', sub: 'Turn your head', active: false },
  { img:FaceProfileImg3, n: 3, label: 'Left 45°', sub: 'Turn your head', active: false },
  { img:FaceProfileImg4, n: 4, label: 'Right Profile', sub: 'Full side view', active: false },
  { img:FaceProfileImg5, n: 5, label: 'Left Profile', sub: 'Full side view', active: false },
]

const HOW_TO = [
  { img:FaceScanImg1, label: 'Face the camera', sub: 'Look straight at the lens' },
  { img:FaceScanImg2, label: 'Good lighting', sub: 'Use natural daylight' },
  { img:FaceScanImg3, label: 'Clear background', sub: 'Plain background works best' },
  { img:FaceScanImg4, label: 'Remove accessories', sub: 'No glasses, hats or jewelry' },
  { img:FaceScanImg5, label: 'Neutral expression', sub: 'Relax your face and stay natural' },
]

const ANALYSIS_STEPS = [
  { n: 1, label: 'Face Detection', done: true },
  { n: 2, label: 'Feature Mapping', active: true },
  { n: 3, label: 'Data Extraction', active: false },
  { n: 4, label: 'Ratio Analysis', active: false },
  { n: 5, label: 'Harmony Scoring', active: false },
]

const WHAT_ANALYZING = [
  { img:AnalyzeSectionImg4, label: 'Proportions', sub: 'Facial ratios & measurements' },
  { img:AnalyzeSectionImg3, label: 'Symmetry', sub: 'Left-right balance analysis' },
  { img:AnalyzeSectionImg2, label: 'Skin Quality', sub: 'Texture, clarity & overall condition' },
  { img:AnalyzeSectionImg1, label: 'Definition', sub: 'Contours & facial structure' }
]

const OPPORTUNITIES = [
  { icon: '✦', label: 'Skin texture', detail: 'Mild uneven texture on cheeks and forehead. Treatable with targeted actives.', score: 72, delta: '+18 potential' },
  { icon: '⟆', label: 'Hair density', detail: 'Slight temporal recession. Early intervention highly effective.', score: 68, delta: '+24 potential' },
  { icon: '◎', label: 'Jaw definition', detail: 'Moderate softness along jawline. Combination approach recommended.', score: 64, delta: '+28 potential' },
]

// ─── Face Intro ──────────────────────────────────────────────────────────────
function FaceIntro({ navigate }: { navigate: NavigateFn }) {
  return (
    <div className="screen" style={{ paddingBottom: 32 }}>
      <BackHeader onBack={() => navigate('home')} title="Understand My Face" subtitle="Visual AI assessment" />
      <div style={{ padding: '0 16px' }}>
        <div style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', height: 260, background: 'var(--purple-light)', marginBottom: 20 }}>
          <img
            src={CaptureFaceImg}
            alt="Face assessment"
            style={{ width: '60%', height: '100%', objectFit: 'cover', objectPosition: 'top', marginLeft: '40%' }}
          />
          {/* <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(237,233,248,1) 35%, transparent 65%)' }} /> */}
          <div style={{ position: 'absolute', top: 25, left: 0, padding: '24px 20px' }}>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 24, fontWeight: 500, color: 'var(--text)', margin: '0 0 8px', lineHeight: 1.2 }}>Understand your<br /><span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>facial harmony</span></h2>
            <p style={{ fontSize: 11, color: 'var(--text-2)', margin: '0 0 14px', maxWidth: '45%', lineHeight: 1.5 }}>Noyela analyzes 100+ data points to create your personalized transformation plan.</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'white', borderRadius: 50, padding: '6px 12px' }}>
              <span style={{ fontSize: 14 }}>☀</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--purple)' }}>Good lighting is key</span>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 20, padding: '18px 16px', marginBottom: 16, border: '1px solid var(--border)' }}>
          <h3 style={{ fontWeight: 500, fontSize: 15, color: 'var(--text)', margin: '0 0 16px' }}>What we analyze</h3>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
            {WHAT_ANALYZING.map(w => (
              <div key={w.label} style={{ flexShrink: 0, textAlign: 'center', width: 80 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, margin: '0 auto 6px' }}>
                  <img src={w.img} alt="" />
                </div>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{w.label}</div>
                <div style={{ fontSize: 10, color: 'var(--text-2)', marginTop: 2, lineHeight: 1.3 }}>{w.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <AIInsight text="Noyela uses visual AI assessment. Professional imaging may be recommended for precise anatomical measurements." />

        <div style={{ marginTop: 20 }}>
          <button className="flex items-center justify-center py-3 px-6 rounded-[12px] w-full bg-[#6B35C8] text-white" onClick={() => navigate('face-capture')}>
            {/* <NoyelaOrb size="xs" /> */}
             Start Capture
          </button>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-3)', margin: '12px 0 0' }}>🔒 Your photos are private, encrypted and never shared.</p>
        </div>
      </div>
    </div>
  )
}

// ─── Face Capture ─────────────────────────────────────────────────────────────
function FaceCapture({ navigate }: { navigate: NavigateFn }) {
  const [currentAngle, setCurrentAngle] = useState(0)
  const [captured, setCaptured] = useState<number[]>([])

  const captureAngle = () => {
    const newCaptured = [...captured, currentAngle]
    setCaptured(newCaptured)
    if (currentAngle < 4) {
      setCurrentAngle(currentAngle + 1)
    } else {
      setTimeout(() => navigate('face-processing'), 500)
    }
  }

  return (
    <div className="screen" style={{ paddingBottom: 24 }}>
      <BackHeader
        onBack={() => navigate('face-intro')}
        title="Capture Your Face"
        subtitle="Accurate scans lead to better insights"
        right={
          <button style={{ background: 'var(--purple-pale)', border: '1px solid var(--purple-light)', borderRadius: 50, padding: '6px 12px', color: 'var(--purple)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            💡 Tips
          </button>
        }
      />
      <div style={{ padding: '0 16px' }}>
        {/* Hero guide */}
        <div className="hero-card" style={{ marginBottom: 20, padding: '20px 16px 20px', background: 'var(--purple-light)' }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 24, fontWeight: 500, color: 'var(--text)', margin: '0 0 6px', lineHeight: 1.2 }}>
                Let's get the <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>Best Scan</span>
              </h2>
              <p className='w-[70%]' style={{ fontSize: 12, color: 'var(--text-2)', margin: '0 0 14px', lineHeight: 1.5 }}>Follow the steps to help Noyela analyze your facial harmony with precision.</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'white', borderRadius: 16, padding: '6px 12px' }}>
                <span style={{ fontSize: 12 }}>
                  <Sun/>
                </span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--purple)' }}>Good lighting is key</div>
                  <div style={{ fontSize: 10, color: 'var(--text-2)' }}>Natural light works best</div>
                </div>
              </div>
            </div>
            <div style={{ width: 120, position: 'relative' }}>
              <img src={ScanFace} alt="Face guide" className='scale-140 mt-7' />
              {/* Overlay grid lines */}
             
            </div>
          </div>
        </div>

        {/* How to capture */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontWeight: 500, fontSize: 15, color: 'var(--text)', margin: '0 0 12px' }}>How to capture</h3>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {HOW_TO.map((h, i) => (
              <div key={i} style={{ flexShrink: 0, textAlign: 'center', width: 80 }}>
                <div className='p-2' style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, margin: '0 auto 6px', border: '1px solid rgba(107,53,200,0.15)' }}>
                <img src={h.img} alt="" />
                  </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{h.label}</div>
                <div style={{ fontSize: 10, color: 'var(--text-2)', marginTop: 2, lineHeight: 1.3 }}>{h.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Capture angles */}
        <div style={{ marginBottom: 20 }}>
          <h3 className='capitalize' style={{ fontWeight: 500, fontSize: 15, color: 'var(--text)', margin: '0 0 12px' }}>Capture all required angles</h3>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {CAPTURE_ANGLES.map((a, i) => (
              <div key={i} style={{ flexShrink: 0, width: 90 }}>
                <div style={{
                  borderRadius: 16, overflow: 'hidden', position: 'relative', height: 100,
                  border: i === currentAngle ? '2.5px solid var(--purple)' : captured.includes(i) ? '2px solid var(--green)' : '1.5px solid var(--border)',
                  background: 'var(--bg)',
                }}>
                  <img src={a.img} alt={a.label} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: captured.includes(i) ? 0.6 : 1 }} />
                  <div style={{ position: 'absolute', top: 6, left: 6, width: 22, height: 22, borderRadius: '50%', background: i === currentAngle ? 'var(--purple)' : captured.includes(i) ? 'var(--green)' : 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>{captured.includes(i) ? '✓' : a.n}</span>
                  </div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', textAlign: 'center', marginTop: 6 }}>{a.label}</div>
                <div style={{ fontSize: 10, color: 'var(--text-2)', textAlign: 'center', lineHeight: 1.3 }}>{a.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <button className="flex items-center justify-center py-3 px-6 rounded-[12px] w-full bg-[#6B35C8] text-white" onClick={captureAngle}>
            {/* <NoyelaOrb size="xs" /> */}
            {captured.length === 0 ? 'Start Capture' : captured.length < 5 ? `Capture ${CAPTURE_ANGLES[currentAngle]?.label}` : 'Process Scan'}
          </button>
          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3)', marginTop: 10 }}>We'll guide you through each step</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'white', borderRadius: 14, border: '1px solid var(--border)' }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>🔒</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>Your privacy is our priority</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Your images are private, encrypted and used only for your analysis.</div>
          </div>
          <span style={{ color: 'var(--text-3)', fontSize: 16 }}>›</span>
        </div>
      </div>
    </div>
  )
}

// ─── Face Processing ──────────────────────────────────────────────────────────
function FaceProcessing({ navigate }: { navigate: NavigateFn }) {
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const steps = [20, 40, 63, 80, 100]
    let step = 0
    const interval = setInterval(() => {
      if (step < steps.length) {
        setProgress(steps[step])
        setActiveStep(Math.min(step, 4))
        step++
      } else {
        clearInterval(interval)
        setTimeout(() => navigate('face-result'), 600)
      }
    }, 800)
    return () => clearInterval(interval)
  }, [navigate])

  return (
    <div className="screen" style={{ paddingBottom: 24 }}>
      <BackHeader onBack={() => navigate('face-capture')} title="Analyzing Your Face" subtitle="Noyela is processing your scan"
        right={
          <button style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 50, padding: '6px 12px', color: 'var(--text-2)', fontSize: 13, cursor: 'pointer' }}>
            ✕ Cancel
          </button>
        }
      />
      <div style={{ padding: '0 16px' }}>
        <div className="hero-card" style={{ marginBottom: 20, background: 'var(--purple-light)', position: 'relative', overflow: 'hidden', height: 260 }}>
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=280&fit=crop&auto=format&crop=faces" alt="Analyzing" style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(237,233,248,0.95) 40%, transparent 75%)' }} />
          {/* Scan animation */}
          <div style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(107,53,200,0.8), transparent)', animation: 'processing-scan 2s ease-in-out infinite', top: `${progress}%` }} />
            {/* Mesh dots */}
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: 'rgba(107,53,200,0.5)', left: `${10 + (i % 4) * 25}%`, top: `${10 + Math.floor(i / 4) * 30}%`, boxShadow: '0 0 4px rgba(107,53,200,0.6)' }} />
            ))}
          </div>
          <div style={{ position: 'relative', padding: '24px 20px' }}>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 24, fontWeight: 700, color: 'var(--text)', margin: '0 0 6px', lineHeight: 1.2 }}>
              Noyela is analyzing your <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>facial harmony</span>
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 14px', maxWidth: '55%', lineHeight: 1.5 }}>This may take 15–30 seconds. Our AI evaluates 100+ data points across 5 core dimensions.</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', borderRadius: 50, padding: '6px 12px' }}>
              <NoyelaOrb size="xs" />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--purple)' }}>Your data is private & secure</span>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 20, padding: '18px 16px', marginBottom: 16, border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>Analysis in progress...</span>
            <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--purple)' }}>{progress}%</span>
          </div>
          <ProgressBar value={progress} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
            {ANALYSIS_STEPS.map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', margin: '0 auto 6px',
                  background: i < activeStep ? 'var(--purple)' : i === activeStep ? 'var(--purple-light)' : 'var(--bg)',
                  border: `2px solid ${i <= activeStep ? 'var(--purple)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                }}>
                  {i < activeStep ? <span style={{ color: 'white' }}>✓</span> : <span style={{ fontSize: 12, color: i === activeStep ? 'var(--purple)' : 'var(--text-3)' }}>{s.n}</span>}
                </div>
                <div style={{ fontSize: 9, color: i <= activeStep ? 'var(--purple)' : 'var(--text-3)', fontWeight: i <= activeStep ? 600 : 400, lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 20, padding: '18px 16px', marginBottom: 16, border: '1px solid var(--border)' }}>
          <h3 style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', margin: '0 0 12px' }}>What we're analyzing</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {WHAT_ANALYZING.map(w => (
              <div key={w.label} style={{ flex: '1 1 80px', textAlign: 'center', padding: '10px 4px' }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{w.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)' }}>{w.label}</div>
                <div style={{ fontSize: 10, color: 'var(--text-2)', lineHeight: 1.3 }}>{w.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'var(--purple-pale)', borderRadius: 16, border: '1px solid rgba(107,53,200,0.12)' }}>
          <NoyelaOrb size="sm" />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 2 }}>AI-Powered. Human-Centric.</div>
            <p style={{ fontSize: 12, color: 'var(--text-2)', margin: '0 0 8px', lineHeight: 1.4 }}>Noyela combines advanced AI with aesthetic science to give you insights you can trust.</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['Advanced AI', 'Aesthetic Science', 'Expert Validated'].map(t => (
                <span key={t} style={{ fontSize: 10, fontWeight: 600, color: 'var(--purple)' }}>✓ {t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Face Result / Harmony ────────────────────────────────────────────────────
function FaceResult({ navigate }: { navigate: NavigateFn }) {
  return (
    <div className="screen" style={{ paddingBottom: 32 }}>
      <BackHeader onBack={() => navigate('face-processing')} title="Your Harmony Score" subtitle="Visual AI assessment complete" />
      <div style={{ padding: '0 16px' }}>
        {/* Score hero */}
        <div style={{ background: 'linear-gradient(135deg, var(--purple-light) 0%, white 100%)', borderRadius: 24, padding: '24px 20px', marginBottom: 16, border: '1px solid rgba(107,53,200,0.12)', display: 'flex', alignItems: 'center', gap: 20 }}>
          <ScoreRing score={78} size={100} label="Score" />
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--purple)', marginBottom: 6 }}>HARMONY SCORE</div>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: '0 0 8px', lineHeight: 1.2 }}>Good foundation<br />with clear opportunity.</h2>
            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>Your facial harmony is above average. Three targeted areas can meaningfully elevate your results.</p>
          </div>
        </div>

        {/* Top opportunities */}
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', margin: '0 0 12px' }}>Top Opportunities</h3>
          {OPPORTUNITIES.map((o, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 16, padding: '14px 16px', marginBottom: 10, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--purple-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{o.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 2 }}>Improve {o.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.4, marginBottom: 6 }}>{o.detail}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 2 }}>
                    <div style={{ width: `${o.score}%`, height: '100%', background: 'var(--purple)', borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--purple)', flexShrink: 0 }}>{o.delta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <button onClick={() => navigate('face-analysis')} className="btn-secondary" style={{ width: 'auto', flex: 1, fontSize: 14 }}>View Full Analysis</button>
        </div>

        <button className="btn-primary" onClick={() => navigate('roadmap-today')}>
          Build My Transformation Plan
        </button>

        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13, color: 'var(--text-2)', flex: 1 }}>Analysis date</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Aug 8, 2026</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0' }}>
            <span style={{ fontSize: 13, color: 'var(--text-2)', flex: 1 }}>Data points analyzed</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>127</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Full Analysis ────────────────────────────────────────────────────────────
function FaceAnalysis({ navigate }: { navigate: NavigateFn }) {
  const metrics = [
    { label: 'Facial Symmetry', score: 82, detail: 'Left-right balance — above average' },
    { label: 'Proportions', score: 76, detail: 'Golden ratio proximity — good' },
    { label: 'Skin Quality', score: 72, detail: 'Mild texture irregularity — improvable' },
    { label: 'Jawline Definition', score: 64, detail: 'Moderate softness — good potential' },
    { label: 'Eye Area', score: 85, detail: 'Strong periorbital structure — excellent' },
    { label: 'Hair Density', score: 68, detail: 'Early temporal thinning — treatable' },
    { label: 'Lip Proportion', score: 79, detail: 'Well-balanced — above average' },
    { label: 'Nose Harmony', score: 83, detail: 'Proportionate to facial width — good' },
  ]
  return (
    <div className="screen" style={{ paddingBottom: 24 }}>
      <BackHeader onBack={() => navigate('face-result')} title="Full Analysis" subtitle="127 data points across 8 dimensions" />
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: 'var(--purple-pale)', borderRadius: 18, padding: '14px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <ScoreRing score={78} size={72} label="Overall" />
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Harmony Score: 78/100</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>Top 30% of similar profiles</div>
            <div style={{ fontSize: 12, color: 'var(--purple)', fontWeight: 600, marginTop: 4 }}>Potential: 94/100 with optimization</div>
          </div>
        </div>
        {metrics.map((m, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 14, padding: '14px 16px', marginBottom: 10, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{m.label}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: m.score >= 80 ? 'var(--green)' : m.score >= 70 ? 'var(--purple)' : 'var(--amber)' }}>{m.score}/100</span>
            </div>
            <ProgressBar value={m.score} />
            <p style={{ fontSize: 12, color: 'var(--text-2)', margin: '6px 0 0' }}>{m.detail}</p>
          </div>
        ))}
        <div style={{ marginTop: 8 }}>
          <button className="btn-primary" onClick={() => navigate('roadmap-today')}>Build Transformation Plan</button>
        </div>
      </div>
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function Face({ screen, navigate }: { screen: string; navigate: NavigateFn }) {
  if (screen === 'face-intro') return <FaceIntro navigate={navigate} />
  if (screen === 'face-capture') return <FaceCapture navigate={navigate} />
  if (screen === 'face-processing') return <FaceProcessing navigate={navigate} />
  if (screen === 'face-result') return <FaceResult navigate={navigate} />
  if (screen === 'face-analysis') return <FaceAnalysis navigate={navigate} />
  return <FaceIntro navigate={navigate} />
}
