/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' js.stripe.com vercel.live *.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com data:",
              "img-src 'self' data: blob: centry-prod.s3.eu-west-3.amazonaws.com centry-images-dev.s3.eu-west-3.amazonaws.com",
              "frame-src js.stripe.com",
              "connect-src 'self' api.stripe.com vitals.vercel-insights.com *.amazonaws.com",
            ].join('; '),
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'centry-prod.s3.eu-west-3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'centry-images-dev.s3.eu-west-3.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
