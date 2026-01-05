import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoaderProps {
  variant?: 'fullscreen' | 'overlay' | 'inline' | 'spinner'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
}

export function Loader({
  variant = 'inline',
  size = 'md',
  text,
  className
}: LoaderProps) {
  const loaderIcon = (
    <Loader2
      className={cn(
        'animate-spin text-purple-600',
        sizeClasses[size],
        className
      )}
    />
  )

  // Fullscreen loader - Per splash screen iniziale
  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 gradient-purple-fuchsia rounded-full opacity-20 animate-ping absolute"></div>
              <div className="w-20 h-20 gradient-purple-fuchsia rounded-full flex items-center justify-center relative">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
            </div>
          </div>
          {text && (
            <p className="text-gray-600 font-medium animate-pulse">{text}</p>
          )}
          {!text && (
            <p className="text-gray-600 font-medium animate-pulse">Loading...</p>
          )}
        </div>
      </div>
    )
  }

  // Overlay loader - Sopra contenuto esistente
  if (variant === 'overlay') {
    return (
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-40 rounded-2xl">
        <div className="text-center">
          <div className="mb-3 flex justify-center">
            <div className="relative">
              <div className={cn('gradient-purple-fuchsia rounded-full opacity-20 animate-ping absolute', sizeClasses.lg)}></div>
              <div className={cn('gradient-purple-fuchsia rounded-full flex items-center justify-center relative', sizeClasses.lg)}>
                <Loader2 className={cn('text-white animate-spin', sizeClasses[size])} />
              </div>
            </div>
          </div>
          {text && (
            <p className="text-gray-600 text-sm font-medium">{text}</p>
          )}
        </div>
      </div>
    )
  }

  // Inline loader - In linea con contenuto
  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-center gap-2">
        {loaderIcon}
        {text && <span className="text-gray-600 text-sm">{text}</span>}
      </div>
    )
  }

  // Spinner only - Solo icona
  return loaderIcon
}

// Export anche come default
export default Loader
