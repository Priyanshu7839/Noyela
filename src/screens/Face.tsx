import { useState, useEffect, useRef } from 'react'
import { BackHeader, NoyelaOrb, AIInsight, ProgressBar, ScoreRing, StepCircle, GhostPill } from '../components/ui'
import CaptureFaceImg from '../assets/CaptureFace.png'
import AnalyzeSectionImg1 from '../assets/AnalyzeSectionImg1.png'
import AnalyzeSectionImg2 from '../assets/AnalyzeSectionImg2.png'
import AnalyzeSectionImg3 from '../assets/AnalyzeSectionImg3.png'
import AnalyzeSectionImg4 from '../assets/AnalyzeSectionImg4.png'
import ScanFace from '../assets/ScanFace.png'
import { Camera, CheckCircle2, ChevronRight, CircleAlert, LoaderCircle, Mic, Send, Shield, Sun } from 'lucide-react'
import FaceScanImg1 from '../assets/FaceScanImg1.png'
import FaceScanImg2 from '../assets/FaceScanImg2.png'
import FaceScanImg3 from '../assets/FaceScanImg3.png'
import FaceScanImg4 from '../assets/FaceScanImg4.png'
import FaceScanImg5 from '../assets/FaceScanImg5.png'
import FaceProfileImg2 from '../assets/FaceProfileImg2.png'
import FaceProfileImg3 from '../assets/FaceProfileImg3.png'
import FaceProfileImg5 from '../assets/FaceProfileImg5.png'
import RoadmapBanner from '../assets/RoadmapBanner.jpeg'
import ScanResultImg from '../assets/ScanResultImg.jpeg'
import type { CapturedImage } from '../lib/camera'
import { getFaceVideoFrame, getYawRange, isYawInTargetRange, validateFacePhoto, type FaceAngle, type FaceLandmark } from '../lib/faceValidation'

import ResultIcon1 from '../assets/ResultIcon1.png'
import ResultIcon2 from '../assets/ResultIcon2.png'
import ResultIcon3 from '../assets/ResultIcon3.png'
import {analyzeFaceAPI} from '../../ApiCalls.tsx'



type NavigateFn = (screen: string) => void

type AssessmentMetric = {
  parameter: string
  label: string
  score: number
  rating: string
  description: string
}

type AssessmentFailure = {
  code?: string
  message?: string
  failed_images?: Array<{ image: string; reason: string; retake_instruction: string }>
}

type AssessmentResponse = {
  status: 'success' | 'error'
  error: AssessmentFailure | null
  summary: string | null
  overall_score: number | null
  results: AssessmentMetric[]
}

const ASSESSMENT_STORAGE_KEY = 'noyela.face-assessment'

function saveAssessment(assessment: AssessmentResponse) {
  sessionStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(assessment))
}

function readAssessment(): AssessmentResponse | null {
  try {
    const saved = sessionStorage.getItem(ASSESSMENT_STORAGE_KEY)
    return saved ? JSON.parse(saved) as AssessmentResponse : null
  } catch {
    return null
  }
}

type FaceCameraProps = {
  onCapture: (image: CapturedImage & { angle: number }) => void
  onComplete: () => void
  onClose: () => void
}

type CaptureWorkflow = 'initializing' | 'awaiting_front' | 'capturing_front' | 'awaiting_left' | 'capturing_left' | 'awaiting_right' | 'capturing_right' | 'completed' | 'error'
type GuidanceDirection = 'center' | 'left' | 'right' | 'none'

const AUTO_CAPTURE_STEPS: Array<{ workflow: CaptureWorkflow; angle: FaceAngle; fileAngle: number; label: string; instruction: string }> = [
  { workflow: 'awaiting_front', angle: 'front', fileAngle: 0, label: 'Front', instruction: 'Look straight at the camera' },
  { workflow: 'awaiting_left', angle: 'left-45', fileAngle: -45, label: 'Left 45°', instruction: 'Great! Now turn left' },
  { workflow: 'awaiting_right', angle: 'right-45', fileAngle: 45, label: 'Right 45°', instruction: 'Great! Now turn right' },
]

const wait = (milliseconds: number) => new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds))

const FACE_MESH_PATHS = [
  [10, 109, 67, 103, 54, 21, 162, 127, 234, 93, 132, 58, 172, 136, 150, 149, 176, 148, 152, 377, 400, 378, 379, 365, 397, 288, 361, 323, 454, 356, 389, 251, 284, 332, 297, 338, 10],
  [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246, 33],
  [263, 249, 390, 373, 374, 380, 381, 382, 362, 398, 384, 385, 386, 387, 388, 466, 263],
  [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78, 61],
  [168, 6, 197, 195, 5, 4, 1, 19, 94, 2, 98, 327, 2],
]

function drawFaceMesh(canvas: HTMLCanvasElement, landmarks: FaceLandmark[] | null, color: string, sourceWidth: number, sourceHeight: number) {
  const context = canvas.getContext('2d')
  if (!context) return
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  if (!width || !height) return
  const pixelRatio = window.devicePixelRatio || 1
  if (canvas.width !== width * pixelRatio || canvas.height !== height * pixelRatio) {
    canvas.width = width * pixelRatio
    canvas.height = height * pixelRatio
  }
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  context.clearRect(0, 0, width, height)
  if (!landmarks) return
  const sourceAspect = sourceWidth / sourceHeight
  const canvasAspect = width / height
  const drawnWidth = sourceAspect > canvasAspect ? height * sourceAspect : width
  const drawnHeight = sourceAspect > canvasAspect ? height : width / sourceAspect
  const offsetX = (width - drawnWidth) / 2
  const offsetY = (height - drawnHeight) / 2
  const position = (point: FaceLandmark) => ({ x: offsetX + point.x * drawnWidth, y: offsetY + point.y * drawnHeight })
  context.strokeStyle = color
  context.fillStyle = color
  context.globalAlpha = 0.9
  context.lineWidth = 1.15
  for (const path of FACE_MESH_PATHS) {
    context.beginPath()
    path.forEach((index, pointIndex) => {
      const point = landmarks[index]
      if (!point) return
      const { x, y } = position(point)
      if (pointIndex === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    })
    context.stroke()
  }
  for (const index of [10, 33, 263, 1, 61, 291, 152, 234, 454]) {
    const point = landmarks[index]
    if (!point) continue
    context.beginPath()
    const { x, y } = position(point)
    context.arc(x, y, 1.8, 0, Math.PI * 2)
    context.fill()
  }
  context.globalAlpha = 1
}

function FaceCamera({ onCapture, onComplete, onClose }: FaceCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const meshCanvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const checkingRef = useRef(false)
  const stepRef = useRef(0)
  const stableSinceRef = useRef<number | null>(null)
  const captureLockedRef = useRef(false)
  const completeRef = useRef(false)
  const cancelledRef = useRef(false)
  const feedbackRef = useRef('Starting camera…')
  const smoothedLandmarksRef = useRef<FaceLandmark[] | null>(null)
  const filteredYawRef = useRef<number | null>(null)
  const lastReliableFrameAtRef = useRef(0)
  const meshColorRef = useRef('#36DDF5')
  const debugStateRef = useRef('')
  const guidanceDirectionRef = useRef<GuidanceDirection>('center')
  const [error, setError] = useState<string | null>(null)
  const [workflow, setWorkflow] = useState<CaptureWorkflow>('initializing')
  const [status, setStatus] = useState('Starting camera…')
  const [meshColor, setMeshColor] = useState('#36DDF5')
  const [guidanceDirection, setGuidanceDirection] = useState<GuidanceDirection>('center')

  const setFeedback = (message: string, color: string, direction?: GuidanceDirection) => {
    if (feedbackRef.current !== message) {
      feedbackRef.current = message
      setStatus(message)
    }
    meshColorRef.current = color
    setMeshColor((current) => current === color ? current : color)
    if (direction && guidanceDirectionRef.current !== direction) {
      guidanceDirectionRef.current = direction
      setGuidanceDirection(direction)
    }
  }

  useEffect(() => {
    let active = true
    cancelledRef.current = false
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } },
        })
        if (!active) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
          setWorkflow('awaiting_front')
          setFeedback(AUTO_CAPTURE_STEPS[0].instruction, '#36DDF5', 'center')
        }
      } catch {
        setError('Camera access is required. Allow camera access, then try again.')
      }
    }
    void start()
    return () => {
      active = false
      cancelledRef.current = true
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  const captureCurrentFrame = async () => {
    const video = videoRef.current
    const step = AUTO_CAPTURE_STEPS[stepRef.current]
    if (!video || !step || captureLockedRef.current || completeRef.current || cancelledRef.current) return
    captureLockedRef.current = true
    stableSinceRef.current = null
    setWorkflow(step.workflow.replace('awaiting', 'capturing') as CaptureWorkflow)
    setFeedback('Hold still.', '#55E59B', step.angle === 'left-45' ? 'left' : step.angle === 'right-45' ? 'right' : 'center')

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const context = canvas.getContext('2d')
    if (!context) {
      captureLockedRef.current = false
      setWorkflow(step.workflow)
      setFeedback(step.instruction, '#36DDF5')
      return
    }
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    const image = { angle: step.fileAngle, dataUrl: canvas.toDataURL('image/jpeg', 0.92), fileName: `noyela-${step.label.toLowerCase().replace(/\s/g, '-')}-${Date.now()}.jpg` }
    const quality = await validateFacePhoto(image.dataUrl, step.angle)
    if (!quality.valid || completeRef.current || cancelledRef.current) {
      captureLockedRef.current = false
      setWorkflow(step.workflow)
      setFeedback(step.instruction, '#36DDF5')
      return
    }

    // Keep the accepted frame while the visual scan completes, so users get a
    // calm confirmation before the UI progresses to the next angle.
    await wait(1000)
    if (completeRef.current || cancelledRef.current) return
    onCapture(image)
    stepRef.current += 1
    captureLockedRef.current = false
    if (stepRef.current === AUTO_CAPTURE_STEPS.length) {
      completeRef.current = true
      setWorkflow('completed')
      setFeedback('Your scan is complete', '#55E59B', 'none')
      streamRef.current?.getTracks().forEach((track) => track.stop())
      window.setTimeout(onComplete, 850)
      return
    }
    const next = AUTO_CAPTURE_STEPS[stepRef.current]
    setWorkflow(next.workflow)
    setFeedback(next.instruction, '#36DDF5', next.angle === 'left-45' ? 'left' : 'right')
  }

  useEffect(() => {
    let active = true
    const validateFrame = async () => {
      const video = videoRef.current
      const step = AUTO_CAPTURE_STEPS[stepRef.current]
      if (!video || !step || checkingRef.current || captureLockedRef.current || completeRef.current || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return
      checkingRef.current = true
      const result = await getFaceVideoFrame(video, step.angle)
      checkingRef.current = false
      if (!active) return
      const yaw = result.yaw
      if (yaw !== null) {
        filteredYawRef.current = filteredYawRef.current === null ? yaw : filteredYawRef.current + (yaw - filteredYawRef.current) * 0.32
      }
      const filteredYaw = filteredYawRef.current
      const poseReady = result.qualityValid && filteredYaw !== null && isYawInTargetRange(filteredYaw, step.angle, 2)
      let color = '#36DDF5'
      let message = step.instruction
      let direction: GuidanceDirection = step.angle === 'front' ? 'center' : step.angle === 'left-45' ? 'left' : 'right'
      if (!result.landmarks || result.faceCount !== 1) {
        color = performance.now() - lastReliableFrameAtRef.current < 350 ? meshColorRef.current : 'transparent'
        message = 'Position your face in the frame.'
        direction = 'none'
      } else if (filteredYaw === null) {
        color = 'transparent'
        message = 'Position your face in the frame.'
        direction = 'none'
      } else {
        lastReliableFrameAtRef.current = performance.now()
        const [minimumYaw, maximumYaw] = getYawRange(step.angle)
        const overshotLeft = filteredYaw < minimumYaw
        const overshotRight = filteredYaw > maximumYaw
        if (poseReady) {
          color = '#55E59B'
          message = 'Hold still.'
          direction = 'none'
        } else if (overshotLeft) {
          color = '#6B35C8'
          message = 'Turn your head slightly back to the right.'
          direction = 'right'
        } else if (overshotRight) {
          color = '#6B35C8'
          message = 'Turn your head slightly back to the left.'
          direction = 'left'
        } else if (!result.qualityValid) {
          color = '#6B35C8'
          message = 'Position your face in the frame.'
          direction = 'none'
        } else {
          color = '#36DDF5'
          message = step.angle === 'front' ? 'Look straight at the camera.' : step.angle === 'left-45' ? 'Turn your head to the left.' : 'Turn your head to the right.'
        }
      }
      const debugState = `${step.angle}|${Math.round(filteredYaw ?? 999)}|${result.qualityValid}|${poseReady}|${message}`
      if (import.meta.env.DEV && debugStateRef.current !== debugState) {
        debugStateRef.current = debugState
        console.debug('[face-scan]', { step: step.angle, yaw, filteredYaw, qualityValid: result.qualityValid, poseReady, reason: message })
      }
      const smoothed = result.landmarks?.map((point, index) => {
        const previous = smoothedLandmarksRef.current?.[index]
        if (!previous) return point
        const smoothing = 0.38
        return {
          x: previous.x + (point.x - previous.x) * smoothing,
          y: previous.y + (point.y - previous.y) * smoothing,
          z: (previous.z ?? 0) + ((point.z ?? 0) - (previous.z ?? 0)) * smoothing,
        }
      }) ?? null
      if (smoothed) smoothedLandmarksRef.current = smoothed
      else if (performance.now() - lastReliableFrameAtRef.current >= 350) smoothedLandmarksRef.current = null
      if (meshCanvasRef.current) drawFaceMesh(meshCanvasRef.current, smoothedLandmarksRef.current, color, video.videoWidth, video.videoHeight)
      setFeedback(message, color, direction)
      if (!poseReady) {
        stableSinceRef.current = null
        return
      }
      const now = performance.now()
      stableSinceRef.current ??= now
      if (now - stableSinceRef.current >= 400) void captureCurrentFrame()
    }
    const interval = window.setInterval(() => { void validateFrame() }, 100)
    void validateFrame()
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [])

  return (
    <div role="dialog" aria-modal="true" aria-label="Automatic face capture" style={{ position: 'fixed', inset: 0, zIndex: 100, padding: 'max(18px, env(safe-area-inset-top)) 16px max(24px, env(safe-area-inset-bottom))', display: 'flex', flexDirection: 'column', background: '#17121E' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Capture your face</div>
          <div style={{ marginTop: 3, fontSize: 12, color: 'rgba(255,255,255,0.72)' }}>We’ll capture each angle automatically.</div>
        </div>
        <button onClick={onClose} aria-label="Close camera" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.24)', background: 'rgba(255,255,255,0.14)', color: 'white', fontSize: 22, cursor: 'pointer' }}>×</button>
      </div>
      <div style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden', borderRadius: 28, background: '#2A2032' }}>
        {error ? <div style={{ padding: 24, color: 'white', textAlign: 'center', lineHeight: 1.5 }}>{error}</div> : <>
          <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
          <canvas ref={meshCanvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', transform: 'scaleX(-1)' }} />
          {(workflow === 'capturing_front' || workflow === 'capturing_left' || workflow === 'capturing_right') && (
            <div aria-hidden="true" style={{ position: 'absolute', left: '20%', right: '20%', top: '14%', bottom: '14%', overflow: 'hidden', pointerEvents: 'none' }}>
              <div className="face-scan-beam" style={{ height: 2, width: '100%', background: '#36DDF5', boxShadow: '0 0 8px 3px rgba(54,221,245,0.42)' }} />
            </div>
          )}
          {guidanceDirection === 'center' && (
            <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', width: 22, height: 22, transform: 'translate(-50%, -50%)', border: `1.5px solid ${meshColor}`, borderRadius: '50%', boxShadow: `0 0 10px ${meshColor}80`, pointerEvents: 'none' }} />
          )}
          {(guidanceDirection === 'left' || guidanceDirection === 'right') && (
            <div aria-hidden="true" className="face-guidance-arrow" style={{ position: 'absolute', top: 'calc(50% - 21px)', [guidanceDirection === 'left' ? 'left' : 'right']: 20, '--arrow-shift': guidanceDirection === 'left' ? '-7px' : '7px', color: meshColor, fontSize: 42, fontWeight: 300, lineHeight: 1, textShadow: `0 0 12px ${meshColor}99`, pointerEvents: 'none' } as React.CSSProperties}>{guidanceDirection === 'left' ? '←' : '→'}</div>
          )}
        </>}
      </div>
      {!error && <div role="status" style={{ minHeight: 20, margin: '12px 4px 0', textAlign: 'center', color: meshColor === 'transparent' ? 'rgba(255,255,255,0.82)' : meshColor, fontSize: 13, fontWeight: workflow === 'completed' ? 600 : 400 }}>{status}</div>}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 18 }}>
        <div aria-hidden="true" style={{ width: 70, height: 70, borderRadius: '50%', opacity: workflow === 'completed' ? 1 : 0.7, border: '5px solid rgba(255,255,255,0.32)', boxShadow: '0 0 0 2px white', background: 'white' }}><span style={{ display: 'block', width: 52, height: 52, margin: 'auto', borderRadius: '50%', background: 'var(--purple)' }} /></div>
      </div>
    </div>
  )
}

const CAPTURE_ANGLES = [
  { img:FaceProfileImg5, n: 1, label: 'Front View', sub: 'Straight face', angle: 'front' as FaceAngle, captureAngle: 0 },
  { img:FaceProfileImg3, n: 2, label: 'Left 45° View', sub: 'Turn your head', angle: 'left-45' as FaceAngle, captureAngle: -45 },
  { img:FaceProfileImg2, n: 3, label: 'Right 45° View', sub: 'Turn your head', angle: 'right-45' as FaceAngle, captureAngle: 45 },
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
  { img:ResultIcon1, label: 'Skin texture', detail: 'Mild uneven texture on cheeks and forehead. Treatable with targeted actives.', score: 72, delta: '+18 potential' },
  { img:ResultIcon2, label: 'Hair density', detail: 'Slight temporal recession. Early intervention highly effective.', score: 68, delta: '+24 potential' },
  { img:ResultIcon3, label: 'Jaw definition', detail: 'Moderate softness along jawline. Combination approach recommended.', score: 64, delta: '+28 potential' },
]

// ─── Face Intro ──────────────────────────────────────────────────────────────
export function FaceIntro({ navigate }: { navigate: NavigateFn }) {
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
          <p className='flex items-center justify-center gap-1' style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-3)', margin: '12px 0 0' }}>    <Shield color='#6B35C8' size={14} /> Your photos are private, encrypted and never shared.</p>
        </div>
      </div>
    </div>
  )
}

// ─── Face Capture ─────────────────────────────────────────────────────────────
export function FaceCapture({ navigate }: { navigate: NavigateFn }) {
  const [currentAngle, setCurrentAngle] = useState(0)
  const [captured, setCaptured] = useState<Array<{ angle: number; dataUrl: string; fileName: string }>>([])
  const [isCapturing, setIsCapturing] = useState(false)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [validationMessage, setValidationMessage] = useState<string | null>(null)
  const [validationError, setValidationError] = useState(false)

  const storeAutomaticCapture = (image: CapturedImage & { angle: number }) => {
    setCaptured((previous) => [...previous, image])
    setCurrentAngle(image.angle === 0 ? 1 : image.angle === -45 ? 2 : CAPTURE_ANGLES.length)
    setValidationError(false)
  }

  const captureAngle = () => {
    if (currentAngle >= CAPTURE_ANGLES.length) {
      void handleAnalyze()
      return
    }

    setValidationMessage(null)
    setValidationError(false)
    setCameraOpen(true)
  }

  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")


const handleAnalyze = async () => {
  try {
    setLoading(true);
    setError("");
    const response = await analyzeFaceAPI(captured);
    const assessment = response.data as AssessmentResponse;

    if (assessment?.status === "error") {
      saveAssessment(assessment);
      setError(assessment.error?.message || "Image validation failed.");
      navigate('face-result');
      return;
    }

    saveAssessment(assessment);
    navigate('face-processing');
  } catch (error: any) {
    const failedAssessment = error.response?.data?.data as AssessmentResponse | undefined
    if (failedAssessment?.status === 'error') {
      saveAssessment(failedAssessment)
      navigate('face-result')
      return
    }
    setError(
      failedAssessment?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      "Facial analysis failed."
    )
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div className="screen" style={{ paddingBottom: 24 }}>
      {cameraOpen && currentAngle < CAPTURE_ANGLES.length && (
        <FaceCamera
          onClose={() => {
            setCameraOpen(false)
            setValidationMessage('No photo was taken. You can try again whenever you are ready.')
            setValidationError(true)
          }}
          onCapture={(image) => {
            storeAutomaticCapture(image)
          }}
          onComplete={() => {
            setCameraOpen(false)
            setCurrentAngle(CAPTURE_ANGLES.length)
            setValidationMessage('Your scan is complete')
          }}
        />
      )}
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
            {CAPTURE_ANGLES.map((a, i) => {
              const capturedPhoto = captured.find((photo) => photo.angle === a.captureAngle)
              const complete = Boolean(capturedPhoto)
              return (
                <div key={i} style={{ flexShrink: 0, width: 90 }}>
                  <div style={{
                    borderRadius: 16, overflow: 'hidden', position: 'relative', height: 100,
                    border: i === currentAngle ? '2.5px solid var(--purple)' : complete ? '2px solid var(--green)' : '1.5px solid var(--border)',
                    background: 'var(--bg)',
                  }}>
                    <img src={capturedPhoto?.dataUrl || a.img} alt={a.label} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: complete ? 1 : 0.78 }} />
                    <div style={{ position: 'absolute', top: 6, left: 6, width: 22, height: 22, borderRadius: '50%', background: i === currentAngle ? 'var(--purple)' : complete ? 'var(--green)' : 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'white', fontSize: 11, fontWeight: 700 }}>{complete ? '✓' : a.n}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', textAlign: 'center', marginTop: 6 }}>{a.label}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-2)', textAlign: 'center', lineHeight: 1.3 }}>{a.sub}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <button disabled={isCapturing || loading} className="flex items-center justify-center gap-2 py-3 px-6 rounded-[12px] w-full bg-[#6B35C8] text-white disabled:opacity-60" onClick={captureAngle}>
            {isCapturing || loading ? <LoaderCircle size={18} className="animate-spin" /> : <Camera size={18} />}
            {isCapturing ? 'Validating photo…' : loading ? 'Analyzing photos…' : captured.length === 0 ? 'Open camera — Front' : captured.length < CAPTURE_ANGLES.length ? `Open camera — ${CAPTURE_ANGLES[currentAngle]?.label}` : 'Analyze 3 photos'}
          </button>
          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3)', marginTop: 10 }}>{captured.length}/{CAPTURE_ANGLES.length} photos accepted locally — nothing has been uploaded.</p>
        </div>

        {validationMessage && (
          <div role="status" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', marginBottom: 12, borderRadius: 14, background: validationError ? '#FFF4F3' : '#F1FBF6', border: `1px solid ${validationError ? '#F4C7C2' : '#BCE8D1'}`, color: validationError ? '#9F3328' : '#18784A' }}>
            {validationError ? <CircleAlert size={18} style={{ flexShrink: 0, marginTop: 1 }} /> : <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 1 }} />}
            <span style={{ fontSize: 12, lineHeight: 1.45 }}>{validationMessage}</span>
          </div>
        )}

        {error && (
          <div role="alert" style={{ padding: '12px 14px', marginBottom: 12, borderRadius: 14, background: '#FFF4F3', border: '1px solid #F4C7C2', color: '#9F3328', fontSize: 12, lineHeight: 1.45 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'white', borderRadius: 14, border: '1px solid var(--border)' }}>

           

            <div  className='p-2 shrink-0' style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, margin: '0 auto 6px', border: '1px solid rgba(107,53,200,0.15)' ,color: 'var(--purple)'}}>
                               <Shield size={24} />

                  </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>Your privacy is our priority</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Your images are private, encrypted and used only for your analysis.</div>
          </div>
          {/* <span style={{ color: 'var(--text-3)', fontSize: 16 }}>›</span> */}
        </div>
      </div>
    </div>
  )
}

// ─── Face Processing ──────────────────────────────────────────────────────────
export function FaceProcessing({ navigate }: { navigate: NavigateFn }) {
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
          <img src={RoadmapBanner} alt="Analyzing" style={{ position: 'absolute', right: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          {/* <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(237,233,248,0.95) 40%, transparent 75%)' }} /> */}
          {/* Scan animation */}
          <div style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(107,53,200,0.8), transparent)', animation: 'processing-scan 2s ease-in-out infinite', top: `${progress}%` }} />
            {/* Mesh dots */}
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: 'rgba(107,53,200,0.5)', left: `${10 + (i % 4) * 25}%`, top: `${10 + Math.floor(i / 4) * 30}%`, boxShadow: '0 0 4px rgba(107,53,200,0.6)' }} />
            ))}
          </div>
          <div style={{ position: 'relative', padding: '45px 20px' }}>
            <h2 className='capitalize w-[50%]'  style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 500, color: 'var(--text)', margin: '0 0 6px', lineHeight: 1.2 }}>
              Noyela is analyzing your <span style={{ color: 'var(--purple)', fontStyle: 'italic' }}>facial harmony</span>
            </h2>
            <p style={{ fontSize: 11, color: 'var(--text-2)', margin: '0 0 14px', maxWidth: '50%', lineHeight: 1.5 }}>This may take 15–30 seconds. Our AI evaluates 100+ data points across 5 core dimensions.</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', borderRadius: 8, padding: '6px 12px' }}>
              {/* <NoyelaOrb size="xs" /> */}
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
                 <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, margin: '0 auto 6px' }}>
                  <img src={w.img} alt="" />
                </div>
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
export function FaceResult({ navigate }: { navigate: NavigateFn }) {
  const assessment = readAssessment()
  const fallbackMetrics = [
    { label: 'Facial Symmetry', score: 82, detail: 'Left-right balance — above average' },
    { label: 'Proportions', score: 76, detail: 'Golden ratio proximity — good' },
    { label: 'Skin Quality', score: 72, detail: 'Mild texture irregularity — improvable' },
    { label: 'Jawline Definition', score: 64, detail: 'Moderate softness — good potential' },
    { label: 'Eye Area', score: 85, detail: 'Strong periorbital structure — excellent' },
    { label: 'Hair Density', score: 68, detail: 'Early temporal thinning — treatable' },
    { label: 'Lip Proportion', score: 79, detail: 'Well-balanced — above average' },
    { label: 'Nose Harmony', score: 83, detail: 'Proportionate to facial width — good' },
  ]
  const metrics = assessment?.status === 'success'
    ? assessment.results.map(({ label, score, description }) => ({ label, score, detail: description }))
    : fallbackMetrics
  return (
    <div className="screen" style={{ paddingBottom: 32 }}>
      {/* <BackHeader onBack={() => navigate('face-processing')} title="Your Harmony Score" subtitle="Visual AI assessment complete" /> */}
      <div >
        {/* Score hero */}
        <div className='overflow-hidden' style={{ background: 'linear-gradient(135deg, var(--purple-light) 0%, white 100%)', borderRadius: 24,  marginBottom: 16, border: '1px solid rgba(107,53,200,0.12)', display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* <ScoreRing score={78} size={100} label="Score" />
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--purple)', marginBottom: 6 }}>HARMONY SCORE</div>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: '0 0 8px', lineHeight: 1.2 }}>Good foundation<br />with clear opportunity.</h2>
            <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>Your facial harmony is above average. Three targeted areas can meaningfully elevate your results.</p>
          </div> */}

          <img src={ScanResultImg} alt="" />
        </div>

        {/* Top opportunities */}
          {/* <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', margin: '0 0 12px' }}>Top Opportunities</h3>
          {OPPORTUNITIES.map((o, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 16, padding: '14px 16px', marginBottom: 10, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className='p-2' style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, margin: '0 auto 6px', border: '1px solid rgba(107,53,200,0.15)' }}>
                <img src={o.img} alt=""  className='scale-150'/>
                  </div>
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
        </div> */}
        


         <div 
      onClick={()=>{
        // setAIPopup(false)
      }}
      className='h-full w-full bg-black/30 absolute bottom-0 z-[999] flex items-end '>
           
      <div 
      onClick={(e) => e.stopPropagation()} 
      className="flex flex-col items-center w-full  bg-[#FAF8FC] rounded-t-[50px] relative">
      <div 
       onClick={()=>{
        // setAIPopup(false)
      }}
      className='mt-[-30px] flex flex-col items-center drop-shadow-2xl drop-shadow-purple-200'>
          <NoyelaOrb pulse={true} size='md'/>
         
      </div>


      <div className='w-full h-full p-6 '>


        <div className=' flex-col gap-[3px] flex items-start justify-start py-[20px] pt-0 overflow-y-scroll h-[300px] w-full '>
           
        {assessment?.status === 'error' ? (
          <div role="alert" className="w-full" style={{ background: '#FFF4F3', border: '1px solid #F4C7C2', borderRadius: 14, padding: '14px 16px', color: '#9F3328' }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 5 }}>We need a clearer photo</div>
            <p style={{ fontSize: 12, lineHeight: 1.45, margin: '0 0 12px' }}>{assessment.error?.message || 'Your photos could not be assessed reliably.'}</p>
            {assessment.error?.failed_images?.map((failed) => (
              <div key={failed.image} style={{ paddingTop: 10, marginTop: 10, borderTop: '1px solid #F4C7C2', fontSize: 12, lineHeight: 1.45 }}>
                <div style={{ fontWeight: 700 }}>{failed.reason}</div>
                <div style={{ marginTop: 4 }}>{failed.retake_instruction}</div>
              </div>
            ))}
            <button onClick={() => navigate('face-capture')} className="btn-primary" style={{ marginTop: 14 }}>Retake photos</button>
          </div>
        ) : <>
          {assessment?.summary && (
            <div className="w-full" style={{ background: 'var(--purple-pale)', border: '1px solid rgba(107,53,200,0.12)', borderRadius: 14, padding: '14px 16px', marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>Your assessment</span>
                {assessment.overall_score !== null && <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--purple)' }}>{assessment.overall_score}/100</span>}
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5, margin: 0 }}>{assessment.summary}</p>
            </div>
          )}
       {metrics.map((m, i) => (
          <div key={i} className='w-full '  style={{ background: 'white', borderRadius: 14, padding: '14px 16px', marginBottom: 10, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{m.label}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: m.score >= 80 ? 'var(--green)' : m.score >= 70 ? 'var(--purple)' : 'var(--amber)' }}>{m.score}/100</span>
            </div>
            <ProgressBar value={m.score} />
            <p style={{ fontSize: 12, color: 'var(--text-2)', margin: '6px 0 0' }}>{m.detail}</p>
          </div>
        ))}
        </>}
          
           
         

        </div>


        <div className='w-full h-full bg-[#FFFFFF] border-1 border-[#00000008] shadow-sm shadow-[#7048EC08] p-3 rounded-[24px] flex flex-col gap-3'>

          <h1 className='text-[#7048EC] text-[10px] font-bold px-3'>Ask Anything about your facial analysis</h1>


        


           
       <div 
        
       style={{ padding: '0 0px', display: 'flex', alignItems: 'center', gap: 10 }}>
       
        <div className='w-full h-full relative'>
        <div className="absolute top-[50%] translate-y-[-50%] left-4 z-10">
        {/* <Orb state={'idle'}  width={40} height={40}/> */}

      <button type="button" aria-label="Take a photo" className="flex items-center justify-center">
        <Camera color='#4F33E2' size={18}/>
      </button>
      </div>
         <input type="text" 
        placeholder='Ask Noyela ... '
        className='w-full outline-none py-[12px] pr-[35px] pl-[55px]' style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, background: 'white', border: '1px solid var(--border)', borderRadius: 50, cursor: 'pointer' }}/>
       </div>

      <div className='absolute right-11 flex items-center gap-1'>
         <Mic  size={18}/>

     <div className='p-2 rounded-full bg-[#4F33E2] flex items-center justify-center'>
        <Send  onClick={() => navigate('ask-noyela')}  color='#fff' size={18} />
     </div>
      </div>
      </div>

     
    

        </div>
      </div>

        

      </div>




      </div>
{/* 
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <button onClick={() => navigate('face-analysis')} className="btn-secondary" style={{ width: 'auto', flex: 1, fontSize: 14 }}>View Full Analysis</button>
        </div>

        <button className="btn-primary" onClick={() => navigate('roadmap-today')}>
          Build My Transformation Plan
        </button> */}

        <div style={{ marginTop: 16 }} className='px-5'>
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
export function FaceAnalysis({ navigate }: { navigate: NavigateFn }) {
  const assessment = readAssessment()
  const fallbackMetrics = [
    { label: 'Facial Symmetry', score: 82, detail: 'Left-right balance — above average' },
    { label: 'Proportions', score: 76, detail: 'Golden ratio proximity — good' },
    { label: 'Skin Quality', score: 72, detail: 'Mild texture irregularity — improvable' },
    { label: 'Jawline Definition', score: 64, detail: 'Moderate softness — good potential' },
    { label: 'Eye Area', score: 85, detail: 'Strong periorbital structure — excellent' },
    { label: 'Hair Density', score: 68, detail: 'Early temporal thinning — treatable' },
    { label: 'Lip Proportion', score: 79, detail: 'Well-balanced — above average' },
    { label: 'Nose Harmony', score: 83, detail: 'Proportionate to facial width — good' },
  ]
  const metrics = assessment?.status === 'success'
    ? assessment.results.map(({ label, score, description }) => ({ label, score, detail: description }))
    : fallbackMetrics
  return (
    <div className="screen" style={{ paddingBottom: 24 }}>
      <BackHeader onBack={() => navigate('face-result')} title="Full Analysis" subtitle="127 data points across 8 dimensions" />
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: 'var(--purple-pale)', borderRadius: 18, padding: '14px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <ScoreRing score={assessment?.overall_score ?? 78} size={72} label="Overall" />
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Harmony Score: {assessment?.overall_score ?? 78}/100</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>{assessment?.summary || 'Your detailed facial assessment'}</div>
          </div>
        </div>
        {assessment?.status === 'error' ? (
          <div role="alert" style={{ background: '#FFF4F3', borderRadius: 14, padding: '14px 16px', border: '1px solid #F4C7C2', color: '#9F3328', fontSize: 13, lineHeight: 1.5 }}>
            {assessment.error?.message || 'Your photos could not be assessed reliably.'}
          </div>
        ) : metrics.map((m, i) => (
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
