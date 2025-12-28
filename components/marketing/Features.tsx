export default function Features() {
  const features = [
    {
      title: 'Smart Visual Centering',
      description: 'Unlike generic tools, Centyr centers the PRODUCT, not the image-ignoring tags, shadows, and accessories.',
      icon: '🎯',
    },
    {
      title: 'Shadow & Reflection Removal',
      description: 'AI-powered detection automatically removes unwanted shadows and reflections from product bases.',
      icon: '🌟',
    },
    {
      title: 'Bulk Processing',
      description: 'Upload 1,000+ images at once. Process entire catalogs in minutes, not days.',
      icon: '📦',
    },
    {
      title: 'Auto-Sync',
      description: 'Connect your store and let Centyr automatically align new products as you add them.',
      icon: '🔄',
    },
    {
      title: 'Custom Templates',
      description: 'Set alignment rules once, apply to thousands. Perfect for consistent brand aesthetics.',
      icon: '🎨',
    },
    {
      title: 'API Access',
      description: 'Integrate Centyr into your workflow with our powerful REST API. Perfect for agencies and developers.',
      icon: '⚙️',
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-40 left-1/4 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-fuchsia-200 rounded-full filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '3s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need for Perfect Product Photos
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features to streamline your image processing workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl hover:shadow-2xl hover:border-fuchsia-400 transition-all duration-300 hover:scale-105 float-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl mb-6 inline-block group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gradient transition-all">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
