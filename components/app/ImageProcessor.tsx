'use client'

import { useState } from 'react'

interface ProcessedImage {
  id: string
  originalUrl: string
  processedUrl: string
  status: 'processing' | 'completed' | 'failed'
}

export default function ImageProcessor() {
  const [images, setImages] = useState<ProcessedImage[]>([])

  return (
    <div className="space-y-4">
      {images.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No images to process</p>
        </div>
      ) : (
        images.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Original</h3>
                <div className="aspect-video bg-gray-200 rounded"></div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Processed</h3>
                <div className="aspect-video bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  image.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : image.status === 'processing'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {image.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
