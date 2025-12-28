export default function ValueProposition() {
  const benefits = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Process 1,000 images in under 10 minutes. What used to take 6 hours now takes 6 minutes.',
    },
    {
      icon: '🎯',
      title: 'Pixel Perfect',
      description: 'Our AI understands YOUR product—not just the image. Perfect centering every time, even with accessories.',
    },
    {
      icon: '💰',
      title: 'Save Thousands',
      description: 'Stop paying $5-15 per image to editors. Get unlimited professional results for a flat monthly fee.',
    },
  ]

  const stats = [
    { value: '95%', label: 'time saved' },
    { value: '$12,000', label: 'avg. annual savings' },
    { value: '<5 sec', label: 'per image' },
    { value: '99.8%', label: 'accuracy rate' },
  ]

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-100 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional Product Photos.{' '}
            <span className="text-gradient">No Skills Required.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-6xl mb-4 inline-block group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gradient transition-all">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 gradient-animated rounded-2xl p-10 text-white shadow-2xl glow-purple animate-scale-in">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-110 transition-transform duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:animate-bounce-slow">
                {stat.value}
              </div>
              <div className="text-purple-100 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
