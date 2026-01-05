'use client'

import { AuthGuard } from '@/components/guards/AuthGuard'

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  )
}
