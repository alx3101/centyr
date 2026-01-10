import Link from 'next/link'

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-fuchsia-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-fuchsia-200 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-4">
          <div className="inline-block bg-gradient-to-r from-purple-100 to-fuchsia-100 px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">
              SO SIMPLE IT FEELS LIKE MAGIC
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Three Steps to Perfection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16">
            Seriously, it's this easy. No training, no complex settings, no headaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-all h-full">
              <div className="w-16 h-16 gradient-purple-fuchsia text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                1
              </div>
              <div className="mb-4">
                <svg className="w-12 h-12 text-purple-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Upload Your Images</h3>
              <p className="text-gray-600">
                Drag & drop your product photos. One or one thousand, we don't judge.
              </p>
            </div>
            {/* Arrow connector for desktop */}
            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
              <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-fuchsia-100 hover:border-fuchsia-300 transition-all h-full">
              <div className="w-16 h-16 gradient-purple-fuchsia text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                2
              </div>
              <div className="mb-4">
                <svg className="w-12 h-12 text-fuchsia-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Does Its Thing</h3>
              <p className="text-gray-600">
                Grab a coffee. Actually, don't. It'll be done before you finish pouring.
              </p>
            </div>
            {/* Arrow connector for desktop */}
            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
              <svg className="w-8 h-8 text-fuchsia-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-all h-full">
              <div className="w-16 h-16 gradient-purple-fuchsia text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                3
              </div>
              <div className="mb-4">
                <svg className="w-12 h-12 text-purple-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Download & Ship</h3>
              <p className="text-gray-600">
                Get perfectly centered images ready for your store. That's it. Really.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-purple-50 to-fuchsia-50 p-8 rounded-2xl border border-purple-100">
          <p className="text-lg text-gray-700 mb-6 font-semibold">
            No Photoshop. No design skills. No waiting around.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 gradient-purple-fuchsia text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            See It In Action
          </Link>
        </div>
      </div>
    </section>
  )
}
