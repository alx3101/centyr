import Link from 'next/link'

export const metadata = {
  title: 'Security - Centyr',
  description: 'How Centyr protects your data and images with enterprise-grade security.',
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">
            Centyr
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Security</h1>
          <p className="text-gray-500 text-sm">Last updated: February 22, 2026</p>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Security is built into every layer of the Centyr platform — from the infrastructure we run on to the way your images are stored and deleted.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { icon: '🔒', label: 'TLS 1.3 Encrypted' },
            { icon: '🇪🇺', label: 'EU Infrastructure' },
            { icon: '🛡️', label: 'Cloudflare WAF' },
            { icon: '🗑️', label: 'Auto-Delete 30d' },
          ].map(({ icon, label }) => (
            <div key={label} className="bg-white border-2 border-purple-100 rounded-xl p-4 text-center shadow-sm">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-xs font-semibold text-gray-700">{label}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

          <Section title="Infrastructure">
            <p>Centyr runs on AWS in the <strong>eu-west-3 (Paris)</strong> region. All user data stays within the EU.</p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              <li>API server on AWS EC2 behind Nginx reverse proxy</li>
              <li>Image processing on AWS ECS Fargate (isolated containers per workload)</li>
              <li>Image storage on Amazon S3 with private ACLs and server-side encryption (AES-256)</li>
              <li>Database on Amazon DynamoDB with encryption at rest</li>
              <li>All services run inside an AWS VPC with strict security groups</li>
            </ul>
          </Section>

          <Section title="Encryption">
            <ul className="list-disc ml-6 mt-2 space-y-2 text-sm">
              <li><strong>In transit:</strong> TLS 1.2/1.3 enforced on all connections. HTTP is permanently redirected to HTTPS. Cipher suites restricted to ECDHE with AES-GCM and ChaCha20-Poly1305.</li>
              <li><strong>At rest:</strong> S3 objects encrypted with AES-256 (SSE-S3). DynamoDB tables encrypted at rest. Backups encrypted.</li>
              <li><strong>Presigned URLs:</strong> Temporary access URLs for images expire after 1 hour. No image is ever publicly accessible.</li>
            </ul>
          </Section>

          <Section title="Network Security">
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              <li><strong>Cloudflare:</strong> All traffic passes through Cloudflare for DDoS protection, Web Application Firewall (WAF), and rate limiting before reaching our servers</li>
              <li><strong>Security groups:</strong> EC2 and ECS instances only accept traffic from Cloudflare IP ranges and internal services</li>
              <li><strong>No public S3 access:</strong> S3 buckets have public access fully blocked. Files are accessible only via authenticated presigned URLs</li>
              <li><strong>CORS:</strong> Cross-Origin Resource Sharing is restricted to centyr.tech only</li>
            </ul>
          </Section>

          <Section title="Authentication & Access Control">
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              <li>User authentication managed by <strong>AWS Cognito</strong> — we never store passwords directly</li>
              <li>JWTs signed with RS256; public keys verified from Cognito's JWKS endpoint (refreshed hourly)</li>
              <li>OAuth 2.0 supported (Google, Apple) for passwordless sign-in</li>
              <li>All API endpoints require a valid Bearer token; no sensitive endpoint is publicly accessible</li>
              <li>AWS IAM roles follow least-privilege principle — each service has only the permissions it needs</li>
              <li>Internal AWS credentials use IAM instance roles; no long-lived access keys in application code</li>
            </ul>
          </Section>

          <Section title="Data Isolation">
            <p>Your data is fully isolated from other users:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              <li>Every S3 object is stored under a path scoped to your user ID</li>
              <li>All API endpoints validate that the requesting user owns the resource before serving it</li>
              <li>Job IDs are UUIDs; sequential enumeration is not possible</li>
              <li>Processing containers (ECS Fargate) are ephemeral and isolated — they do not share memory or storage across jobs</li>
            </ul>
          </Section>

          <Section title="Data Retention & Deletion">
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              <li>Uploaded images are <strong>automatically deleted after 30 days</strong> via S3 lifecycle policy</li>
              <li>Processed output images are <strong>automatically deleted after 30 days</strong></li>
              <li>Account data is deleted within 30 days of an account deletion request</li>
              <li>Billing records are retained for 7 years as required by Italian tax law</li>
              <li>You can request immediate deletion of your data by emailing <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a></li>
            </ul>
          </Section>

          <Section title="Application Security">
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              <li>HTTP security headers on all responses: <code className="bg-gray-100 px-1 rounded text-xs">X-Frame-Options: DENY</code>, <code className="bg-gray-100 px-1 rounded text-xs">X-Content-Type-Options: nosniff</code>, <code className="bg-gray-100 px-1 rounded text-xs">HSTS</code>, <code className="bg-gray-100 px-1 rounded text-xs">Content-Security-Policy</code></li>
              <li>File uploads validated by MIME type (magic bytes), not just file extension</li>
              <li>Maximum upload size enforced at both the API and Nginx levels</li>
              <li>All user-supplied path parameters (job IDs) validated as UUIDs to prevent injection</li>
              <li>Internal error details never exposed in API responses</li>
              <li>Payment processing handled exclusively by <strong>Stripe</strong> — card data never touches our servers</li>
            </ul>
          </Section>

          <Section title="Payments Security">
            <p>
              All payment processing is handled by <strong>Stripe</strong>, a PCI DSS Level 1 certified payment provider. Centyr never stores, transmits, or has access to your card number, CVV, or full billing details. Stripe's security practices are documented at{' '}
              <a href="https://stripe.com/docs/security" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">stripe.com/docs/security</a>.
            </p>
          </Section>

          <Section title="Vulnerability Disclosure">
            <p>
              We take security vulnerabilities seriously. If you discover a security issue in the Centyr platform, please report it responsibly:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              <li>Email: <a href="mailto:security@centyr.tech" className="text-purple-600 hover:underline">security@centyr.tech</a></li>
              <li>Please include a description of the vulnerability and steps to reproduce it</li>
              <li>We will acknowledge your report within 48 hours and aim to resolve critical issues within 7 days</li>
              <li>We request that you do not publicly disclose the vulnerability until we have had the opportunity to address it</li>
            </ul>
          </Section>

          <Section title="Incident Response">
            <p>
              In the event of a security incident affecting your personal data, we will:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              <li>Notify affected users within 72 hours if required under GDPR Art. 34</li>
              <li>Report the incident to the Italian DPA (Garante) within 72 hours as required by GDPR Art. 33</li>
              <li>Provide details on the nature of the breach, data affected, and steps taken to mitigate it</li>
            </ul>
          </Section>

        </div>

        {/* Footer links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/privacy" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link href="/gdpr-compliance" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">GDPR & Cookies</Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-purple-100">
        {title}
      </h2>
      <div className="space-y-2 text-sm">{children}</div>
    </section>
  )
}
