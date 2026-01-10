export default function Testimonials() {
  const testimonials = [
    {
      content: 'Saved me $500/month on photo editing. ROI was immediate.',
      name: 'David Park',
      role: 'Electronics Store',
    },
    {
      content: 'Automated the most tedious part of my workflow.',
      name: 'Emma Thompson',
      role: 'Jewelry Brand',
    },
    {
      content: 'Nails it every time, even with complex packaging.',
      name: 'Alessandro Rossi',
      role: 'Fragrance House',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
          What People Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-xl"
            >
              <p className="text-gray-700 mb-6">
                "{testimonial.content}"
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
