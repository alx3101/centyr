import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service - Centyr',
  description: 'Terms and conditions for using Centyr AI product photo processing service.',
}

export default function TermsPage() {
  const lastUpdated = 'February 22, 2026'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">
            Centyr
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <p>
              Welcome to Centyr. By accessing or using our service at{' '}
              <strong>centyr.tech</strong>, you agree to be bound by these Terms of Service.
              Please read them carefully before using the platform.
            </p>
          </section>

          <Section title="1. Service Description">
            <p>
              Centyr provides an AI-powered product photo processing service that automatically
              centers, aligns, and enhances product images. The service is provided via a
              web application and API accessible at centyr.tech.
            </p>
          </Section>

          <Section title="2. Account Registration">
            <p>To use Centyr you must:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Be at least 18 years old</li>
              <li>Provide accurate and complete registration information</li>
              <li>Keep your account credentials secure</li>
              <li>Notify us immediately of any unauthorized access to your account</li>
            </ul>
            <p className="mt-3">
              You are responsible for all activity that occurs under your account.
            </p>
          </Section>

          <Section title="3. Acceptable Use">
            <p>You agree not to use Centyr to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Upload images that infringe third-party intellectual property rights</li>
              <li>Process illegal, obscene, or harmful content</li>
              <li>Attempt to reverse engineer or exploit the service</li>
              <li>Circumvent usage quotas or access restrictions</li>
              <li>Resell or sublicense the service without written authorization</li>
            </ul>
          </Section>

          <Section title="4. Subscription Plans and Billing">
            <p>
              Centyr offers a free tier (3 jobs/month) and paid subscription plans. Paid
              plans are billed monthly through Stripe. By subscribing:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>You authorize us to charge your payment method on a recurring basis</li>
              <li>Subscriptions renew automatically unless cancelled before the renewal date</li>
              <li>Prices are in EUR and may be subject to local taxes</li>
              <li>Unused quota does not carry over to the next period</li>
            </ul>
          </Section>

          <Section title="5. Refund Policy">
            <p>
              We offer a <strong>30-day money-back guarantee</strong> on all paid plans.
              If you are not satisfied, contact us at{' '}
              <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline">
                support@centyr.tech
              </a>{' '}
              within 30 days of your first payment for a full refund. Refund requests after
              30 days are evaluated on a case-by-case basis.
            </p>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              You retain full ownership of all images you upload to Centyr. By uploading
              content, you grant Centyr a limited, non-exclusive license to process your
              images solely for the purpose of delivering the service.
            </p>
            <p className="mt-3">
              Centyr retains all rights to its software, algorithms, branding, and
              documentation. Nothing in these Terms transfers ownership of our intellectual
              property to you.
            </p>
          </Section>

          <Section title="7. Data Retention">
            <p>
              Uploaded images and processed results are stored on AWS S3 and automatically
              deleted after <strong>30 days</strong>. It is your responsibility to download
              processed images before this period expires. We do not guarantee long-term
              storage of your files.
            </p>
          </Section>

          <Section title="8. Service Availability">
            <p>
              We strive for high availability but do not guarantee uninterrupted service.
              We may perform maintenance, updates, or experience outages. We are not liable
              for losses resulting from service unavailability.
            </p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, Centyr shall not be liable for any
              indirect, incidental, consequential, or punitive damages arising from your use
              of the service. Our total liability to you shall not exceed the amount paid
              by you in the 12 months preceding the claim.
            </p>
          </Section>

          <Section title="10. Termination">
            <p>
              You may cancel your account at any time from the billing settings. We reserve
              the right to suspend or terminate accounts that violate these Terms. Upon
              termination, your data will be deleted within 30 days.
            </p>
          </Section>

          <Section title="11. Changes to Terms">
            <p>
              We may update these Terms from time to time. We will notify you of material
              changes via email or a notice on the platform. Continued use of the service
              after changes constitutes acceptance of the new Terms.
            </p>
          </Section>

          <Section title="12. Governing Law">
            <p>
              These Terms are governed by the laws of Italy. Any disputes shall be resolved
              in the competent courts of Italy, without prejudice to your rights as a
              consumer under applicable EU law.
            </p>
          </Section>

          <Section title="13. Contact">
            <p>
              For any questions about these Terms, contact us at:{' '}
              <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline">
                support@centyr.tech
              </a>
            </p>
          </Section>
        </div>

        {/* Footer links */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/privacy" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">
            Privacy Policy
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
