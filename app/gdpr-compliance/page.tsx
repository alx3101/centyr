import Link from 'next/link'

export const metadata = {
  title: 'GDPR Compliance & Cookie Policy - Centyr',
  description: 'How Centyr complies with GDPR and how we use cookies.',
}

export default function GdprPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">
            Centyr
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">GDPR Compliance & Cookie Policy</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>Version 1.0</span>
            <span>·</span>
            <span>Effective date: February 22, 2026</span>
          </div>
        </div>

        {/* Intro box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-8 text-sm text-blue-800">
          <strong>Your privacy is important to us.</strong> Centyr is fully compliant with the EU General Data Protection Regulation (GDPR). This page explains how we handle your personal data and what cookies we use. Our full{' '}
          <Link href="/privacy" className="underline font-semibold">Privacy Policy</Link> contains complete details on data processing.
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

          <Section title="1. Who Is the Data Controller?">
            <p>
              Centyr is the data controller for all personal data collected through the centyr.tech platform. You can contact us regarding any data protection matter at:
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><strong>Email:</strong> <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a></li>
              <li><strong>General support:</strong> <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline">support@centyr.tech</a></li>
            </ul>
          </Section>

          <Section title="2. What Personal Data We Collect">
            <p>We collect the minimum data necessary to provide the Service:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              <li><strong>Account data:</strong> email address, name (from OAuth providers such as Google or Apple)</li>
              <li><strong>Authentication data:</strong> encrypted session tokens managed via AWS Cognito</li>
              <li><strong>User content:</strong> product images you upload for processing (stored temporarily, deleted after 30 days)</li>
              <li><strong>Billing data:</strong> payment method details managed exclusively by Stripe — we never store card numbers</li>
              <li><strong>Usage data:</strong> job history, upload counts, subscription status</li>
              <li><strong>Technical data:</strong> IP address, browser type, request timestamps (for security and fraud prevention)</li>
            </ul>
          </Section>

          <Section title="3. Legal Bases for Processing">
            <p>We process your personal data on the following legal bases under Art. 6 GDPR:</p>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-sm">
              <li><strong>Contract (Art. 6(1)(b)):</strong> processing necessary to deliver the Service you have subscribed to, including image processing, account management, and billing</li>
              <li><strong>Legitimate interests (Art. 6(1)(f)):</strong> security monitoring, fraud prevention, service improvement, and analytics (only aggregated, non-identifying)</li>
              <li><strong>Legal obligation (Art. 6(1)(c)):</strong> retention of billing records for 7 years per Italian tax law (D.P.R. 633/1972)</li>
              <li><strong>Consent (Art. 6(1)(a)):</strong> used only where explicitly required; you may withdraw consent at any time without affecting prior processing</li>
            </ul>
          </Section>

          <Section title="4. Your GDPR Rights">
            <p>As a data subject under GDPR, you have the following rights. To exercise any of them, email <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a>. We will respond within 30 days.</p>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ['Right of access (Art. 15)', 'Request a copy of all personal data we hold about you.'],
                ['Right to rectification (Art. 16)', 'Request correction of inaccurate or incomplete data.'],
                ['Right to erasure (Art. 17)', 'Request deletion of your data ("right to be forgotten"), subject to legal retention obligations.'],
                ['Right to data portability (Art. 20)', 'Receive your data in a structured, machine-readable format (JSON/CSV).'],
                ['Right to restriction (Art. 18)', 'Request that we temporarily stop processing your data while a dispute is resolved.'],
                ['Right to object (Art. 21)', 'Object to processing based on legitimate interests.'],
                ['Right not to be subject to automated decisions (Art. 22)', 'We do not make legally significant automated decisions about you.'],
              ].map(([right, desc]) => (
                <li key={right} className="flex gap-2">
                  <span className="font-semibold text-gray-900 whitespace-nowrap">{right}</span>
                  <span>— {desc}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              If you believe your rights have been violated, you have the right to lodge a complaint with the Italian Data Protection Authority (<strong>Garante per la Protezione dei Dati Personali</strong>) at{' '}
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">garanteprivacy.it</a>, or with the supervisory authority in your country of residence.
            </p>
          </Section>

          <Section title="5. Data Retention">
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              <li><strong>Uploaded images (input):</strong> automatically deleted after 30 days</li>
              <li><strong>Processed images (output):</strong> automatically deleted after 30 days</li>
              <li><strong>Account data:</strong> deleted within 30 days of account deletion request</li>
              <li><strong>Billing records:</strong> retained for 7 years as required by Italian fiscal law</li>
              <li><strong>Security/access logs:</strong> retained for 90 days for fraud prevention</li>
            </ul>
          </Section>

          <Section title="6. Data Transfers Outside the EU">
            <p>
              Our primary infrastructure is located in the EU (AWS eu-west-3, Paris). However, some sub-processors may process data outside the EU:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              <li><strong>Stripe (USA):</strong> payment processing — covered by EU-US Data Privacy Framework (DPF) and Standard Contractual Clauses (SCCs)</li>
              <li><strong>Vercel (USA):</strong> frontend hosting — covered by SCCs</li>
              <li><strong>AWS (EU):</strong> infrastructure — data stored in eu-west-3 (Paris)</li>
            </ul>
            <p className="mt-2 text-sm">
              All international transfers are protected by appropriate safeguards under Art. 46 GDPR.
            </p>
          </Section>

          <Section title="7. Cookie Policy">
            <p>
              Centyr uses only <strong>strictly necessary cookies</strong> required for the Service to function. We do not use advertising, tracking, or third-party analytics cookies.
            </p>

            <div className="mt-4 rounded-xl border border-gray-200 overflow-hidden text-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Cookie name</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Purpose</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Duration</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-purple-700">auth_token</td>
                    <td className="px-4 py-3">Stores your authentication JWT to keep you logged in</td>
                    <td className="px-4 py-3">Session / 7 days</td>
                    <td className="px-4 py-3">Strictly necessary</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3 font-mono text-xs text-purple-700">user</td>
                    <td className="px-4 py-3">Caches your basic profile data (name, email) for UI display</td>
                    <td className="px-4 py-3">Session / 7 days</td>
                    <td className="px-4 py-3">Strictly necessary</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-sm">
              Because we only use strictly necessary cookies, we do not display a cookie consent banner — no consent is required under Art. 25 of the Italian Privacy Code (D.Lgs. 196/2003 as amended) and the ePrivacy Directive for technically essential cookies.
            </p>
            <p className="mt-2 text-sm">
              You can delete these cookies at any time through your browser settings. Doing so will log you out of the Service.
            </p>
          </Section>

          <Section title="8. Security Measures">
            <p>We implement appropriate technical and organizational measures to protect your data, including:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              <li>TLS 1.2/1.3 encryption for all data in transit</li>
              <li>AES-256 encryption for data at rest (S3, DynamoDB)</li>
              <li>Access control via AWS IAM with least-privilege policies</li>
              <li>All S3 buckets are private; files accessible only via time-limited presigned URLs</li>
              <li>Cloudflare DDoS protection and WAF</li>
              <li>Regular security reviews</li>
            </ul>
            <p className="mt-2 text-sm">
              See our <Link href="/security" className="text-purple-600 hover:underline">Security page</Link> for full details.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this policy from time to time. Material changes will be communicated by email or via an in-app notice at least 14 days before taking effect. The effective date at the top of this page reflects the date of the latest revision.
            </p>
          </Section>

          <Section title="10. Contact & Complaints">
            <p>
              For any GDPR-related request or question, contact our privacy team at{' '}
              <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a>.
            </p>
            <p className="mt-2">
              If you are not satisfied with our response, you have the right to lodge a complaint with the{' '}
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                Garante per la Protezione dei Dati Personali
              </a>{' '}
              (Italian DPA) or the supervisory authority in your EU country of residence.
            </p>
          </Section>

        </div>

        {/* Footer links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/privacy" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link href="/terms" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">Terms of Service</Link>
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
