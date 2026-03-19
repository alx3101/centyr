'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslations, useLanguage } from '@/contexts/LanguageContext'
import { useRouter } from 'next/navigation'
import { User, Mail, Lock, Save, Shield, Download, Trash2, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '@/lib/api'

export default function SettingsPage() {
  const { user, refreshUser } = useAuth()
  const t = useTranslations()
  const s = t.settings
  const { language } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')

  // Form states
  const [username, setUsername] = useState(user?.username || '')
  const [email, setEmail] = useState(user?.email || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const confirmWord = language === 'it' ? 'ELIMINA' : 'DELETE'

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await refreshUser()
      toast.success(s.toastProfileSuccess)
    } catch {
      toast.error(s.toastProfileError)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) { toast.error(s.toastPasswordMismatch); return }
    if (newPassword.length < 8) { toast.error(s.toastPasswordTooShort); return }
    setIsLoading(true)
    try {
      toast.success(s.toastPasswordSuccess)
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('')
    } catch {
      toast.error(s.toastPasswordError)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = async () => {
    setIsExporting(true)
    try {
      const data = await api.exportUserData()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `centyr-data-export-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      toast.success(s.exportDataSuccess)
    } catch {
      toast.error(s.exportDataError)
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== confirmWord) return
    setIsDeleting(true)
    try {
      await api.deleteAccount()
      localStorage.clear()
      toast.success(s.deleteAccountSuccess)
      setTimeout(() => router.push('/'), 2000)
    } catch {
      toast.error(s.deleteAccountError)
      setIsDeleting(false)
      setShowDeleteModal(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-8 px-4 md:px-8 overflow-hidden relative">
      <div className="absolute top-20 right-10 w-72 h-72 bg-fuchsia-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4 border border-purple-100">
            <User className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-gray-700">{s.badge}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">{s.title}</span>
          </h1>
          <p className="text-lg text-gray-600">{s.subtitle}</p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 gradient-purple-fuchsia rounded-xl flex items-center justify-center shadow-md">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{s.profileSection}</h2>
            </div>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{s.usernameLabel}</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  placeholder={s.usernamePlaceholder} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{s.emailLabel}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                    placeholder="your@email.com" />
                </div>
                {user.email_verified ? (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-600 rounded-full" />{s.emailVerified}
                  </p>
                ) : (
                  <p className="text-sm text-orange-600 mt-2">{s.emailNotVerified}</p>
                )}
              </div>
              <button type="submit" disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 gradient-purple-fuchsia text-white rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple disabled:opacity-50 disabled:cursor-not-allowed">
                <Save size={18} />
                {isLoading ? s.savingButton : s.saveButton}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{s.passwordSection}</h2>
            </div>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{s.currentPassword}</label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  placeholder={s.currentPasswordPlaceholder} required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{s.newPassword}</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  placeholder={s.newPasswordPlaceholder} required minLength={8} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{s.confirmPassword}</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  placeholder={s.confirmPasswordPlaceholder} required />
              </div>
              <button type="submit" disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 gradient-purple-fuchsia text-white rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple disabled:opacity-50 disabled:cursor-not-allowed">
                <Lock size={18} />
                {isLoading ? s.changingButton : s.changePasswordButton}
              </button>
            </form>
          </div>

          {/* Account Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{s.accountSection}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-4 border border-purple-100">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{s.userId}</p>
                <p className="font-mono text-sm text-gray-900 break-all">{user.user_id}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-4 border border-purple-100">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{s.accountStatus}</p>
                <span className="inline-flex px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-sm">
                  {user.subscription.status}
                </span>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-4 border border-purple-100">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{s.currentPlan}</p>
                <p className="text-lg font-bold text-gradient">{user.subscription.plan_name.toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* Privacy & Data (GDPR) */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{s.gdprSection}</h2>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">GDPR</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed">{s.gdprDescription}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Export Data */}
              <button
                onClick={handleExportData}
                disabled={isExporting}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 text-blue-700 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={18} />
                {isExporting ? s.exportDataLoading : s.exportDataButton}
              </button>

              {/* Delete Account */}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-red-50 hover:bg-red-100 border-2 border-red-200 text-red-700 rounded-xl font-semibold transition-all"
              >
                <Trash2 size={18} />
                {s.deleteAccountButton}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-red-500 to-rose-600" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{s.deleteAccountConfirmTitle}</h3>
              </div>

              <p className="text-sm text-gray-600 mb-5 leading-relaxed">{s.deleteAccountConfirmMsg}</p>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {s.deleteAccountConfirmInput}{' '}
                  <span className="font-mono font-bold text-red-600">"{confirmWord}"</span>
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition-all font-mono"
                  placeholder={confirmWord}
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setShowDeleteModal(false); setDeleteConfirmText('') }}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
                >
                  {t.common.cancel}
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmText !== confirmWord || isDeleting}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  {isDeleting ? '...' : s.deleteAccountConfirmBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
