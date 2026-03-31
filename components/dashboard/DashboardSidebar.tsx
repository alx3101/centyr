'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Upload, Settings, CreditCard, Menu, X, LogOut } from 'lucide-react'
import { useTranslations } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'

export function DashboardSidebar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useTranslations()
  const { user, logout } = useAuth()

  const menuItems = [
    { href: '/dashboard', label: t.nav.overview, icon: LayoutDashboard },
    { href: '/upload', label: t.nav.upload, icon: Upload },
    { href: '/dashboard/settings', label: t.nav.settings, icon: Settings },
    { href: '/dashboard/billing', label: t.nav.billing, icon: CreditCard },
  ]

  const displayName = user?.name || user?.email || ''
  const truncatedEmail = displayName.length > 24 ? displayName.slice(0, 24) + '…' : displayName

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#7c3aed] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#6d28d9] transition-colors"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 w-64 bg-white border-r border-[#f0f0f0] min-h-screen z-40 transition-transform duration-300 flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0f0f0]">
          <Link href="/" className="text-xl font-bold text-[#7c3aed]" style={{ fontFamily: 'Onest, sans-serif' }}>
            Centyr
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden p-1.5 rounded-lg hover:bg-[#f9fafb] text-[#6b7280] hover:text-[#111827] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-150 ${
                  isActive
                    ? 'bg-[#faf5ff] text-[#7c3aed] font-semibold'
                    : 'text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#111827]'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User footer */}
        <div className="border-t border-[#f0f0f0] px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-[#6b7280]">
                {displayName.slice(0, 1).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#111827] truncate">{truncatedEmail}</p>
              <p className="text-xs text-[#9ca3af]">{user?.subscription?.plan_name || 'Free'}</p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg hover:bg-[#f9fafb] text-[#9ca3af] hover:text-[#6b7280] transition-colors flex-shrink-0"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
