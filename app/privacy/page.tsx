import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy - Centyr',
  description: 'How Centyr collects, uses, and protects your personal data.',
}

export default function PrivacyPage() {
  const lastUpdated = 'February 22, 2026'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">
            Centyr
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <p>
              Centyr ("<strong>we</strong>", "<strong>our</strong>", or "<strong>us</strong>")
              is committed to protecting your personal data. This Privacy Policy explains how
              we collect, use, and protect your information when you use our service at{' '}
              <strong>centyr.tech</strong>, in accordance with the EU General Data Protection
              Regulation (GDPR).
            </p>
          </section>

          <Section title="1. Data Controller">
            <p>
              The data controller responsible for your personal data is <strong>Centyr</strong>,
              reachable at:{' '}
              <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">
                privacy@centyr.tech
              </a>
            </p>
          </Section>

          <Section title="2. Data We Collect">
            <p>We collect the following categories of personal data:</p>

            <div className="mt-4 space-y-4">
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <p className="font-bold text-gray-900 mb-1">Account Data</p>
                <p className="text-sm">
                  Full name, email address, and authentication credentials. Collected when
                  you register or sign in via Google, Apple, or GitHub OAuth.
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <p className="font-bold text-gray-900 mb-1">Uploaded Images</p>
                <p className="text-sm">
                  Product photos you upload for processing. These are stored temporarily
                  on AWS S3 (EU region) and automatically deleted after 30 days.
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <p className="font-bold text-gray-900 mb-1">Usage Data</p>
                <p className="text-sm">
                  Number of jobs processed, timestamps, processing time, and subscription
                  plan. Used to enforce quotas and improve the service.
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <p className="font-bold text-gray-900 mb-1">Billing Data</p>
                <p className="text-sm">
                  Payment information is processed exclusively by <strong>Stripe, Inc.</strong>{' '}
                  We never store your card details. We receive only a Stripe customer ID
                  and subscription status.
                </p>
              </div>
            </div>
          </Section>

          <Section title="3. Legal Basis for Processing">
            <p>We process your data on the following legal bases:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Contract performance</strong> — to provide the service you subscribed to</li>
              <li><strong>Legitimate interest</strong> — to improve the service, prevent fraud, and ensure security</li>
              <li><strong>Legal obligation</strong> — to comply with applicable laws (e.g. tax records)</li>
              <li><strong>Consent</strong> — for optional communications such as product updates</li>
            </ul>
          </Section>

          <Section title="4. How We Use Your Data">
            <ul className="list-disc ml-6 space-y-1">
              <li>To authenticate you and manage your account</li>
              <li>To process your uploaded images using our AI pipeline</li>
              <li>To track your usage and enforce subscription limits</li>
              <li>To manage billing and subscription through Stripe</li>
              <li>To send transactional emails (account verification, receipts)</li>
              <li>To detect and prevent abuse or unauthorized access</li>
            </ul>
            <p className="mt-3">
              We do not use your uploaded images to train AI models. We do not sell your
              data to third parties.
            </p>
          </Section>

          <Section title="5. Data Storage and Infrastructure">
            <p>Your data is stored and processed on the following infrastructure:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>AWS (eu-west-3, Paris)</strong> — image storage (S3), job database (DynamoDB), compute (ECS)</li>
              <li><strong>AWS Cognito (eu-west-3)</strong> — user authentication and identity management</li>
              <li><strong>Stripe</strong> — payment processing (PCI-DSS compliant)</li>
              <li><strong>Vercel</strong> — web application hosting</li>
            </ul>
            <p className="mt-3">
              All data remains within the European Economic Area (EEA) or is transferred
              with appropriate safeguards in place.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Images</strong> — automatically deleted after 30 days</li>
              <li><strong>Account data</strong> — retained for the duration of your account, deleted within 30 days of account closure</li>
              <li><strong>Billing records</strong> — retained for 7 years to comply with Italian tax law</li>
              <li><strong>Logs</strong> — retained for 90 days for security and debugging purposes</li>
            </ul>
          </Section>

          <Section title="7. Your Rights (GDPR)">
            <p>As an EU resident, you have the right to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Access</strong> — request a copy of your personal data</li>
              <li><strong>Rectification</strong> — correct inaccurate data</li>
              <li><strong>Erasure</strong> — request deletion of your data ("right to be forgotten")</li>
              <li><strong>Portability</strong> — receive your data in a structured, machine-readable format</li>
              <li><strong>Restriction</strong> — request limited processing of your data</li>
              <li><strong>Objection</strong> — object to processing based on legitimate interest</li>
              <li><strong>Withdraw consent</strong> — at any time, where processing is based on consent</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">
                privacy@centyr.tech
              </a>
              . We will respond within 30 days. You also have the right to lodge a complaint
              with your national data protection authority.
            </p>
          </Section>

          <Section title="8. Cookies">
            <p>
              Centyr uses only technically necessary cookies for authentication and session
              management. We do not use tracking cookies or third-party advertising cookies.
              No cookie consent banner is required for strictly necessary cookies under GDPR.
            </p>
          </Section>

          <Section title="9. Third-Party Services">
            <p>We share data with the following sub-processors:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Stripe</strong> — payment processing. <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Stripe Privacy Policy</a></li>
              <li><strong>Amazon Web Services</strong> — infrastructure. <a href="https://aws.amazon.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">AWS Privacy Policy</a></li>
              <li><strong>Vercel</strong> — frontend hosting. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Vercel Privacy Policy</a></li>
            </ul>
          </Section>

          <Section title="10. Security">
            <p>
              We implement appropriate technical and organizational measures to protect
              your data, including TLS encryption in transit, encryption at rest on AWS S3,
              and access controls. However, no method of transmission over the internet is
              100% secure.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              significant changes via email or a notice on the platform. The updated policy
              will be effective as of the date indicated at the top of this page.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              For privacy-related inquiries or to exercise your rights, contact us at:{' '}
              <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">
                privacy@centyr.tech
              </a>
            </p>
          </Section>
        </div>

        {/* Footer links */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/terms" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">
            Terms of Service
          </Link>
          <span className="hidden sm:inline">·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors">
            ← Back to Home
          </Link>
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
      <div className="space-y-2">{children}</div>
    </section>
  )
}
