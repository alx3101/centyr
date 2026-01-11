'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { User, Mail, Lock, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const { user, refreshUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Form states
  const [username, setUsername] = useState(user?.username || '')
  const [email, setEmail] = useState(user?.email || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implementare API call per aggiornare profilo
      // const response = await api.updateProfile({ username, email })

      await refreshUser()
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    try {
      // TODO: Implementare API call per cambiare password Cognito
      // const response = await api.changePassword(currentPassword, newPassword)

      toast.success('Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      toast.error('Failed to change password')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-8 px-4 md:px-8 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-fuchsia-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4 border border-purple-100">
            <User className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-gray-700">Account Management</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">Account Settings</span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage your account details and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 gradient-purple-fuchsia rounded-xl flex items-center justify-center shadow-md">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                {user.email_verified ? (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Email verified
                  </p>
                ) : (
                  <p className="text-sm text-orange-600 mt-2">Email not verified</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 gradient-purple-fuchsia text-white rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={18} />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  placeholder="Enter new password (min 8 characters)"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 gradient-purple-fuchsia text-white rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock size={18} />
                {isLoading ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>

          {/* Account Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Account Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-4 border border-purple-100">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">User ID</p>
                <p className="font-mono text-sm text-gray-900 break-all">{user.user_id}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-4 border border-purple-100">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Account Status</p>
                <span className="inline-flex px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-sm">
                  {user.subscription.status}
                </span>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-4 border border-purple-100">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Current Plan</p>
                <p className="text-lg font-bold text-gradient">{user.subscription.plan_name.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
