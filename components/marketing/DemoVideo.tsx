import Link from 'next/link'

export default function DemoVideo() {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            See Centyr in Action
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl aspect-video flex items-center justify-center mb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-opacity-30 cursor-pointer transition">
                <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-2"></div>
              </div>
              <p className="text-white text-lg">2-minute Product Demo</p>
              <p className="text-gray-400 text-sm mt-2">See real-time processing & before/after examples</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl text-gray-700 mb-6 font-semibold">
              Ready to transform your product photos?
            </p>
            <Link
              href="/upload"
              className="inline-block gradient-purple-fuchsia text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple hover:glow-purple-strong"
            >
              Start Your Free Trial →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
