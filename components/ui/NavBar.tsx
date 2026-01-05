'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clearAuth, getStoredUser } from '@/lib/auth'
import { LogOut, Upload, LayoutDashboard, User } from 'lucide-react'
import toast from 'react-hot-toast'
import LanguageSelector from '@/components/common/LanguageSelector'
import { useTranslations } from '@/contexts/LanguageContext'

export default function UploadLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const user = getStoredUser()
    const t = useTranslations()

    const handleLogout = () => {
        clearAuth()
        toast.success(t.auth.logoutSuccess)
        router.push('/login')
    }

    const navItems = [
        { href: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
        { href: '/upload', label: t.nav.upload, icon: Upload },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
            {/* Navigation Bar */}
            <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link href="/dashboard" className="flex items-center space-x-2">
                            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                                Centyr
                            </div>
                        </Link>

                        <div className="flex items-center space-x-6">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white'
                                            : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                                            }`}
                                    >
                                        <Icon size={18} />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                )
                            })}

                            {/* Language Selector */}
                            <LanguageSelector />

                            {user && (
                                <div className="flex items-center space-x-4 pl-4 border-l border-purple-200">
                                    <div className="flex items-center space-x-2">
                                        <User size={18} className="text-purple-600" />
                                        <span className="text-sm font-medium text-gray-700">
                                            {user.username || user.email}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                                    >
                                        <LogOut size={18} />
                                        <span className="font-medium">{t.common.logout}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>


        </div>
    )
}
