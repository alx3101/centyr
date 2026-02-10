import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Product */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="hover:text-white transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  API Docs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Video Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  GDPR Compliance
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  SLA
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8">
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium">SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium">SSL/TLS Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="text-sm font-medium">Stripe Secure</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">99.9% Uptime SLA</span>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Centyr. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition">
                Twitter
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                LinkedIn
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                YouTube
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
