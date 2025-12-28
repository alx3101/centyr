export default function WhoItsFor() {
  const personas = [
    {
      icon: '🛍',
      title: 'Online Store Owners',
      quote: '"I used to spend 8 hours every week aligning product photos. Now it\'s done in 10 minutes."',
      name: 'Sarah Chen',
      role: 'Fashion Boutique Owner',
    },
    {
      icon: '📸',
      title: 'Product Photographers',
      quote: '"Centyr 10x\'d my productivity. I can serve 5x more clients with the same team."',
      name: 'Marcus Rodriguez',
      role: 'Studio Owner',
    },
    {
      icon: '🏢',
      title: 'E-commerce Agencies',
      quote: '"We white-label Centyr for all our clients. It\'s become essential to our service offering."',
      name: 'Jennifer Lee',
      role: 'Agency Director',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Built for Every E-commerce Business
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personas.map((persona, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100 rounded-2xl p-8 hover:shadow-2xl hover:border-fuchsia-400 transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="text-6xl mb-6">{persona.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {persona.title}
              </h3>
              <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">
                {persona.quote}
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-gray-900">{persona.name}</p>
                <p className="text-gray-600 text-sm">{persona.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
