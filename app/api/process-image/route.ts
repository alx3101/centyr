import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // TODO: Send image to Python service for processing
    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000'

    const processFormData = new FormData()
    processFormData.append('file', image)

    const response = await fetch(`${pythonServiceUrl}/align`, {
      method: 'POST',
      body: processFormData,
    })

    if (!response.ok) {
      throw new Error('Image processing failed')
    }

    const result = await response.json()

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    )
  }
}
