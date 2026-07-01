// Downscale + recompress images client-side before upload to cut bandwidth.
// Bails out (returns original file) on any unsupported format / error.

const MAX_DIMENSION = 2400
const QUALITY = 0.8
const MIN_SIZE_TO_COMPRESS = 400 * 1024 // skip files already small

export async function compressImageFile(file: File): Promise<File> {
  if (!file.type.startsWith('image/') || file.size < MIN_SIZE_TO_COMPRESS) {
    return file
  }

  try {
    // imageOrientation: 'from-image' bakes EXIF rotation into the pixels,
    // so the re-encoded output needs no orientation tag.
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })

    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
    const targetWidth = Math.round(bitmap.width * scale)
    const targetHeight = Math.round(bitmap.height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = targetWidth
    canvas.height = targetHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      bitmap.close()
      return file
    }

    // Flatten onto white first: job images don't need transparency (background
    // gets replaced server-side), and forcing JPEG output is what actually
    // shrinks PNG screenshots/graphics.
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, targetWidth, targetHeight)
    ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight)
    bitmap.close()

    // Prefer WebP (smaller than JPEG at equal quality), fall back to JPEG
    // if the browser can't encode WebP via canvas.
    let blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/webp', QUALITY)
    )
    let ext = 'webp'
    let mime = 'image/webp'

    if (!blob) {
      blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg', QUALITY)
      )
      ext = 'jpg'
      mime = 'image/jpeg'
    }

    if (!blob || blob.size >= file.size) {
      return file
    }

    const newName = file.name.replace(/\.[^.]+$/, `.${ext}`)

    return new File([blob], newName, { type: mime, lastModified: file.lastModified })
  } catch {
    return file
  }
}

export async function compressImageFiles(files: File[]): Promise<File[]> {
  return Promise.all(files.map(compressImageFile))
}
