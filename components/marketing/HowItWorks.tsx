import Link from 'next/link'

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Upload',
      description: 'Drag & drop your product images or sync directly from Shopify, WooCommerce, or any platform.',
    },
    {
      number: '2',
      title: 'AI Magic',
      description: 'Our smart algorithm detects your product, removes shadows and reflections, and centers it perfectly.',
    },
    {
      number: '3',
      title: 'Download',
      description: 'Get perfectly aligned images ready for your store. Bulk download or auto-sync to your catalog.',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Three Steps to Perfect Product Photos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full hover:scale-105 border-2 border-purple-100 hover:border-fuchsia-400 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-center justify-center w-16 h-16 gradient-purple-fuchsia text-white rounded-full text-2xl font-bold mb-6 glow-purple">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Step {step.number}: {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-4xl text-gradient animate-pulse-slow">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/upload"
            className="inline-block gradient-purple-fuchsia text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple hover:glow-purple-strong animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            Try It Free - No Credit Card Required
          </Link>
        </div>
      </div>
    </section>
  )
}
