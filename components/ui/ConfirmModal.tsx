'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ConfirmOptions {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>
}

const ConfirmContext = createContext<ConfirmContextType | null>(null)

export function useConfirm() {
  const context = useContext(ConfirmContext)
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider')
  }
  return context.confirm
}

interface ConfirmProviderProps {
  children: ReactNode
}

export function ConfirmProvider({ children }: ConfirmProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions | null>(null)
  const [resolveRef, setResolveRef] = useState<((value: boolean) => void) | null>(null)

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions(opts)
      setResolveRef(() => resolve)
      setIsOpen(true)
    })
  }, [])

  const handleConfirm = useCallback(() => {
    setIsOpen(false)
    resolveRef?.(true)
    setResolveRef(null)
  }, [resolveRef])

  const handleCancel = useCallback(() => {
    setIsOpen(false)
    resolveRef?.(false)
    setResolveRef(null)
  }, [resolveRef])

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {/* Modal Overlay */}
      {isOpen && options && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          aria-describedby="confirm-message"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCancel}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Icon */}
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4",
              options.variant === 'destructive' ? 'bg-red-100' : 'bg-purple-100'
            )}>
              {options.variant === 'destructive' ? (
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>

            {/* Title */}
            {options.title && (
              <h3
                id="confirm-title"
                className="text-lg font-bold text-gray-900 text-center mb-2"
              >
                {options.title}
              </h3>
            )}

            {/* Message */}
            <p
              id="confirm-message"
              className="text-gray-600 text-center mb-6"
            >
              {options.message}
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                {options.cancelText || 'Cancel'}
              </button>
              <button
                onClick={handleConfirm}
                className={cn(
                  "flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors",
                  options.variant === 'destructive'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                )}
              >
                {options.confirmText || 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  )
}
