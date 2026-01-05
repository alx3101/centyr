import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('file') as File

    if (!image) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // TODO: Send image to Python service for processing
    const pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000'

    // Get auth token from request headers
    const authHeader = request.headers.get('authorization')

    // Convert File to Blob for proper FormData handling
    const fileBlob = await image.arrayBuffer()
    const processFormData = new FormData()
    processFormData.append('file', new Blob([fileBlob], { type: image.type }), image.name)

    const headers: HeadersInit = {}
    if (authHeader) {
      headers['Authorization'] = authHeader
    }

    const response = await fetch(`${pythonServiceUrl}/api/v1/upload`, {
      method: 'POST',
      headers,
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
