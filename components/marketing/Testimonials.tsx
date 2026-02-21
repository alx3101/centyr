export default function Testimonials() {
  const testimonials = [
    {
      content: 'We save €500/month on photo editing. The ROI was immediate. Centyr completely transformed our workflow.',
      name: 'Marco Bianchi',
      role: 'CEO & Founder',
      company: 'TechStyle Store',
      rating: 5,
      result: 'ROI 15x in 3 months',
    },
    {
      content: 'I used to spend 3 hours a day aligning product photos. Now I upload everything and in 5 minutes my catalog is ready.',
      name: 'Emma Thompson',
      role: 'E-commerce Manager',
      company: 'Luxe Jewelry Co.',
      rating: 5,
      result: '90% time saved',
    },
    {
      content: 'Works perfectly even with complex packaging. The quality is professional — customers notice the difference.',
      name: 'Alessandro Rossi',
      role: 'Marketing Director',
      company: 'Fragranze Italia',
      rating: 5,
      result: '+40% conversions',
    },
    {
      content: 'I manage 5 online stores with over 2000 products. Centyr let me standardize the entire catalog in a weekend.',
      name: 'Sofia Martinez',
      role: 'Operations Manager',
      company: 'MultiStore Group',
      rating: 5,
      result: '2000+ photos processed',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6">
            <span className="text-green-600 font-semibold text-sm">12,000+ satisfied e-commerce stores</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of e-commerce stores choose Centyr for their product photos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-100 p-8 rounded-2xl hover:border-purple-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Result badge */}
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {testimonial.result}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <p className="text-purple-600 text-sm font-medium">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl p-8 text-center text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-bold">12,000+</p>
              <p className="text-purple-100 text-sm">Active e-commerce stores</p>
            </div>
            <div>
              <p className="text-4xl font-bold">5M+</p>
              <p className="text-purple-100 text-sm">Photos processed</p>
            </div>
            <div>
              <p className="text-4xl font-bold">99.9%</p>
              <p className="text-purple-100 text-sm">Guaranteed uptime</p>
            </div>
            <div>
              <p className="text-4xl font-bold">4.9/5</p>
              <p className="text-purple-100 text-sm">Customer rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
