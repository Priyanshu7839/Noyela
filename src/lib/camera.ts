export type CapturedImage = {
  dataUrl: string
  fileName: string
}

export type CameraFacingMode = 'user' | 'environment'

// Opens the native camera in supported iOS/Android WebViews and mobile browsers,
// with a file-picker fallback on desktop web.
export function captureImage(facingMode: CameraFacingMode = 'environment'): Promise<CapturedImage | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.setAttribute('capture', facingMode)
    input.style.display = 'none'
    document.body.appendChild(input)

    const cleanup = () => input.remove()
    input.addEventListener('change', () => {
      const file = input.files?.[0]
      if (!file) {
        cleanup()
        resolve(null)
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        cleanup()
        resolve({ dataUrl: String(reader.result), fileName: file.name || 'noyela-photo.jpg' })
      }
      reader.onerror = () => {
        cleanup()
        resolve(null)
      }
      reader.readAsDataURL(file)
    }, { once: true })
    input.click()
  })
}
