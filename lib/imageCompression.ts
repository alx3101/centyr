// Downscale + recompress images client-side before upload to cut bandwidth.
// Bails out (returns original file) on any unsupported format / error.

const MAX_DIMENSION = 3000
const JPEG_QUALITY = 0.85
const MIN_SIZE_TO_COMPRESS = 800 * 1024 // skip files already small

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

    ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight)
    bitmap.close()

    // Preserve PNG (possible transparency), re-encode everything else as JPEG.
    const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, outputType, JPEG_QUALITY)
    )

    if (!blob || blob.size >= file.size) {
      return file
    }

    const newName = outputType === 'image/jpeg'
      ? file.name.replace(/\.[^.]+$/, '.jpg')
      : file.name

    return new File([blob], newName, { type: outputType, lastModified: file.lastModified })
  } catch {
    return file
  }
}

export async function compressImageFiles(files: File[]): Promise<File[]> {
  return Promise.all(files.map(compressImageFile))
}
