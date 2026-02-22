export default function TrustedBy() {
  const companies = [
    { name: 'ModaStyle', category: 'Fashion' },
    { name: 'TechGadget', category: 'Electronics' },
    { name: 'CasaBella', category: 'Home & Living' },
    { name: 'SportMax', category: 'Sports' },
    { name: 'BeautyLab', category: 'Cosmetics' },
    { name: 'GourmetItalia', category: 'Food' },
  ]

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Trusted by 12,000+ e-commerce stores
          </p>
          <h3 className="text-2xl font-bold text-gray-900">
            Brands that trust us
          </h3>
        </div>

        {/* Company Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company, index) => (
            <div
              key={company.name}
              className="flex flex-col items-center justify-center group"
            >
              <div className="h-12 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                {/* Stylized text logo */}
                <div className="text-center">
                  <span
                    className="text-xl font-bold tracking-tight"
                    style={{
                      background: `linear-gradient(135deg, ${
                        index % 2 === 0 ? '#7c3aed, #c026d3' : '#2563eb, #7c3aed'
                      })`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {company.name}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-400 mt-1">{company.category}</span>
            </div>
          ))}
        </div>

        {/* Testimonial Quote */}
        <div className="mt-12 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-8 border border-purple-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xl">
                MR
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <blockquote className="text-lg text-gray-700 italic mb-3">
                "Centyr revolutionized our workflow. We used to spend 2 hours a day aligning photos — now it's 5 minutes. The ROI was immediate."
              </blockquote>
              <div>
                <p className="font-bold text-gray-900">Marco Rossi</p>
                <p className="text-sm text-gray-500">CEO, ModaStyle - Milano</p>
              </div>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Verified
              </div>
              <div className="flex items-center justify-center gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
