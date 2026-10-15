import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'

export type FaceAngle = 'front' | 'right-45' | 'left-45'

export type FacePhotoValidation = {
  valid: boolean
  message: string
}

export type FaceLandmark = { x: number; y: number; z?: number }

export type FaceVideoFrame = FacePhotoValidation & {
  landmarks: FaceLandmark[] | null
  yaw: number | null
  faceCount: number
  qualityValid: boolean
}

let imageLandmarkerPromise: Promise<FaceLandmarker> | null = null
let videoLandmarkerPromise: Promise<FaceLandmarker> | null = null

async function getImageLandmarker() {
  if (!imageLandmarkerPromise) {
    imageLandmarkerPromise = FilesetResolver.forVisionTasks('/mediapipe/wasm').then((vision) =>
      FaceLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: '/models/face_landmarker.task' },
        runningMode: 'IMAGE',
        numFaces: 2,
      }),
    )
  }
  return imageLandmarkerPromise
}

async function getVideoLandmarker() {
  if (!videoLandmarkerPromise) {
    videoLandmarkerPromise = FilesetResolver.forVisionTasks('/mediapipe/wasm').then((vision) =>
      FaceLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: '/models/face_landmarker.task' },
        runningMode: 'VIDEO',
        numFaces: 2,
      }),
    )
  }
  return videoLandmarkerPromise
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('We could not read that photo. Please try again.'))
    image.src = dataUrl
  })
}

function getLighting(source: CanvasImageSource, sourceWidth: number, sourceHeight: number) {
  const longestEdge = 320
  const scale = Math.min(1, longestEdge / Math.max(sourceWidth, sourceHeight))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(sourceWidth * scale))
  canvas.height = Math.max(1, Math.round(sourceHeight * scale))
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) return { brightness: 128, contrast: 50 }
  context.drawImage(source, 0, 0, canvas.width, canvas.height)
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
  let total = 0
  let totalSquared = 0
  const count = pixels.length / 4
  for (let i = 0; i < pixels.length; i += 4) {
    const luminance = 0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2]
    total += luminance
    totalSquared += luminance * luminance
  }
  const brightness = total / count
  return { brightness, contrast: Math.sqrt(Math.max(0, totalSquared / count - brightness * brightness)) }
}

export function getYawRange(angle: FaceAngle): [number, number] {
  switch (angle) {
    case 'front': return [-12, 12]
    case 'left-45': return [-55, -30]
    case 'right-45': return [30, 55]
  }
}

export function isYawInTargetRange(yaw: number, angle: FaceAngle, hysteresis = 0) {
  const [minimum, maximum] = getYawRange(angle)
  return yaw >= minimum - hysteresis && yaw <= maximum + hysteresis
}

function estimateYaw(points: FaceLandmark[]) {
  const leftContour = points[234]
  const rightContour = points[454]
  const nose = points[1]
  if (!leftContour || !rightContour || !nose) return null
  const width = rightContour.x - leftContour.x
  if (!Number.isFinite(width) || Math.abs(width) < 0.001) return null
  // Raw (unmirrored) camera convention: negative is the user's left, positive is right.
  return (0.5 - ((nose.x - leftContour.x) / width)) * 180
}

export async function validateFacePhoto(dataUrl: string, angle: FaceAngle): Promise<FacePhotoValidation> {
  try {
    const image = await loadImage(dataUrl)
    const lighting = getLighting(image, image.naturalWidth, image.naturalHeight)
    const landmarker = await getImageLandmarker()
    const result = landmarker.detect(image)
    return validateDetectedFace(result.faceLandmarks, lighting, angle)
  } catch (error) {
    console.error('Face photo validation failed:', error)
    return { valid: false, message: 'We could not validate that photo. Check camera access and try again.' }
  }
}

function validateDetectedFace(faceLandmarks: FaceLandmark[][], lighting: { brightness: number; contrast: number }, angle: FaceAngle): FacePhotoValidation {
    const quality = validateFaceQuality(faceLandmarks, lighting)
    if (!quality.valid) return quality
    const yaw = estimateYaw(faceLandmarks[0])
    if (yaw === null || !isYawInTargetRange(yaw, angle)) {
      const guidance: Record<FaceAngle, string> = {
        front: 'Look straight at the camera with your shoulders square.',
        'right-45': 'Turn your face a little more to your right — about 45°.',
        'left-45': 'Turn your face a little more to your left — about 45°.',
      }
      return { valid: false, message: guidance[angle] }
    }
    return { valid: true, message: 'Photo looks good.' }
}

function validateFaceQuality(faceLandmarks: FaceLandmark[][], lighting: { brightness: number; contrast: number }): FacePhotoValidation {
    if (lighting.brightness < 42) {
      return { valid: false, message: 'This photo is too dark. Move into brighter, even light and try again.' }
    }
    if (lighting.brightness > 240) {
      return { valid: false, message: 'This photo is overexposed. Avoid direct light behind or in front of you.' }
    }
    if (lighting.contrast < 8) {
      return { valid: false, message: 'The lighting is too flat to read your facial details. Try a brighter area.' }
    }

    if (faceLandmarks.length === 0) {
      return { valid: false, message: 'No face was detected. Center your face in the camera and try again.' }
    }
    if (faceLandmarks.length > 1) {
      return { valid: false, message: 'More than one face was detected. Make sure only you are in the photo.' }
    }

    const points = faceLandmarks[0]
    const xs = points.map((point) => point.x)
    const ys = points.map((point) => point.y)
    const faceWidth = Math.max(...xs) - Math.min(...xs)
    const faceHeight = Math.max(...ys) - Math.min(...ys)
    if (faceWidth < 0.18 || faceHeight < 0.22) {
      return { valid: false, message: 'Move closer so your face fills the guide, then take the photo again.' }
    }
    if (Math.min(...xs) < 0.005 || Math.max(...xs) > 0.995 || Math.min(...ys) < 0.005 || Math.max(...ys) > 0.995) {
      return { valid: false, message: 'Keep your full face inside the frame, with a little space around it.' }
    }
    return { valid: true, message: 'Photo looks good.' }
}

export async function validateFaceVideoFrame(video: HTMLVideoElement, angle: FaceAngle): Promise<FacePhotoValidation> {
  const frame = await getFaceVideoFrame(video, angle)
  return { valid: frame.valid, message: frame.message }
}

export async function getFaceVideoFrame(video: HTMLVideoElement, angle: FaceAngle): Promise<FaceVideoFrame> {
  try {
    if (!video.videoWidth || !video.videoHeight) {
      return { valid: false, message: 'Starting camera…', landmarks: null, yaw: null, faceCount: 0, qualityValid: false }
    }
    const [landmarker, lighting] = await Promise.all([
      getVideoLandmarker(),
      Promise.resolve(getLighting(video, video.videoWidth, video.videoHeight)),
    ])
    const result = landmarker.detectForVideo(video, performance.now())
    const quality = validateFaceQuality(result.faceLandmarks, lighting)
    const validation = validateDetectedFace(result.faceLandmarks, lighting, angle)
    const landmarks = result.faceLandmarks.length === 1 ? result.faceLandmarks[0] : null
    return { ...validation, landmarks, yaw: landmarks ? estimateYaw(landmarks) : null, faceCount: result.faceLandmarks.length, qualityValid: quality.valid }
  } catch (error) {
    console.error('Live face validation failed:', error)
    return { valid: false, message: 'Preparing face detection…', landmarks: null, yaw: null, faceCount: 0, qualityValid: false }
  }
}
