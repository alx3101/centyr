export default function BeforeAfter() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See The Difference
          </h2>
          <p className="text-xl text-gray-600">
            Professional results in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Before</h3>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Misaligned Image</span>
            </div>
            <p className="text-gray-600 mt-4">
              Crooked, misaligned images that need manual correction
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">After</h3>
            <div className="aspect-video bg-gradient-to-br from-purple-100 to-fuchsia-50 rounded-lg flex items-center justify-center border-2 border-fuchsia-300 glow-purple">
              <span className="text-gradient font-bold text-xl">Perfectly Aligned ✨</span>
            </div>
            <p className="text-gray-600 mt-4">
              Automatically aligned with pixel-perfect precision
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
