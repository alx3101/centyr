export default function Testimonials() {
  const testimonials = [
    {
      title: 'Game changer for my Shopify store',
      content: 'I was spending $500/month on photo editing. Centyr costs $19 and does a better job. ROI was immediate.',
      name: 'David Park',
      role: 'Electronics Store',
      rating: 5,
    },
    {
      title: 'Saved me 10 hours every week',
      content: 'As a solo founder, time is everything. Centyr automated the most tedious part of my workflow.',
      name: 'Emma Thompson',
      role: 'Jewelry Brand',
      rating: 5,
    },
    {
      title: 'Perfect for our luxury perfume brand',
      content: 'Bottles need to be perfectly centered. Centyr nails it every time, even with complex packaging.',
      name: 'Alessandro Rossi',
      role: 'Fragrance House',
      rating: 5,
    },
    {
      title: '10x\'d our agency productivity',
      content: 'We process 50+ client catalogs monthly. Centyr made us way more profitable.',
      name: 'Chris Johnson',
      role: 'E-commerce Agency',
      rating: 5,
    },
    {
      title: 'Wish I found this sooner',
      content: 'Spent 2 years doing this manually. Centyr pays for itself in the first hour.',
      name: 'Lisa Wang',
      role: 'Home Decor Store',
      rating: 5,
    },
    {
      title: 'Essential for dropshipping',
      content: 'Supplier photos are always inconsistent. Centyr makes them look professional instantly.',
      name: 'Ahmed Hassan',
      role: 'Dropshipper',
      rating: 5,
    },
  ]

  const trustLogos = ['Shopify', 'WooCommerce', 'BigCommerce', 'Stripe', 'AWS']

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by 1,000+ E-commerce Stores
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 p-8 rounded-xl hover:shadow-2xl hover:border-fuchsia-400 transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-[#F59E0B] text-xl">⭐</span>
                ))}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                "{testimonial.title}"
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {testimonial.content}
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Logos */}
        <div className="border-t border-gray-200 pt-12">
          <p className="text-center text-gray-500 mb-8 font-semibold">TRUSTED BY LEADING PLATFORMS</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {trustLogos.map((logo, index) => (
              <div key={index} className="text-gray-400 font-bold text-xl">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
