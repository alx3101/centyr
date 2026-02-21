import { Shield, Lock, Server, Eye, FileCheck, RefreshCw } from 'lucide-react'

export default function Security() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All images are encrypted in transit (TLS 1.3) and at rest (AES-256).',
      color: 'purple'
    },
    {
      icon: Server,
      title: 'Server EU',
      description: 'Your data stays in Europe. AWS infrastructure with ISO 27001 certification.',
      color: 'fuchsia'
    },
    {
      icon: Eye,
      title: 'Privacy by Design',
      description: 'We never use your images for training. Your products remain yours.',
      color: 'purple'
    },
    {
      icon: FileCheck,
      title: 'GDPR Compliant',
      description: 'Full GDPR compliance. DPA available for enterprise clients.',
      color: 'fuchsia'
    },
    {
      icon: RefreshCw,
      title: 'Auto-deletion',
      description: 'Images are automatically deleted after 30 days.',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'SOC 2 Type II',
      description: 'Annual independent audits to ensure the highest security standards.',
      color: 'fuchsia'
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500 rounded-full filter blur-3xl opacity-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full mb-6 border border-green-500/30">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold text-sm">Enterprise-Grade Security</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Data Is Safe
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Security and privacy are our top priority. Here's how we protect your images.
          </p>
        </div>

        {/* Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  feature.color === 'purple' ? 'bg-purple-500/20' : 'bg-fuchsia-500/20'
                }`}>
                  <IconComponent className={`w-6 h-6 ${
                    feature.color === 'purple' ? 'text-purple-400' : 'text-fuchsia-400'
                  }`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">SOC 2</p>
              <p className="text-xs text-gray-500">Type II Certified</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">GDPR</p>
              <p className="text-xs text-gray-500">EU Compliant</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">SSL/TLS</p>
              <p className="text-xs text-gray-500">256-bit Encrypted</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">ISO 27001</p>
              <p className="text-xs text-gray-500">AWS Infrastructure</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
