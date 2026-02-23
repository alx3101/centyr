'use client'

import { AuthGuard } from '@/components/guards/AuthGuard'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <DashboardSidebar />
        <main className="flex-1 min-w-0 overflow-hidden">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}
