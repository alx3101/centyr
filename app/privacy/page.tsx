import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy - Centyr',
  description: 'How Centyr collects, uses, and protects your personal data in compliance with GDPR.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">
            Centyr
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>Version 1.0</span>
            <span>·</span>
            <span>Effective date: February 22, 2026</span>
          </div>
        </div>

        {/* GDPR badge */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 mb-8 text-sm text-green-800 flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div>
            <strong>GDPR Compliant.</strong> This policy is designed to comply with the EU General Data Protection Regulation (Regulation 2016/679). Our infrastructure is based in the European Union (AWS eu-west-3, Paris).
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <p className="text-sm">
              Centyr ("<strong>we</strong>", "<strong>our</strong>", or "<strong>us</strong>") is committed to protecting your personal data and respecting your privacy.
              This Privacy Policy describes what data we collect, why we collect it, how we use and protect it, and what rights you have over your data — in accordance with the EU General Data Protection Regulation (GDPR).
            </p>
            <p className="text-sm mt-2">
              By using our Service at <strong>centyr.tech</strong>, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </section>

          <Section title="1. Data Controller">
            <p>
              The data controller responsible for processing your personal data is:
            </p>
            <div className="mt-3 bg-purple-50 rounded-xl p-4 border border-purple-100 text-sm">
              <p><strong>Centyr</strong></p>
              <p className="mt-1">Email: <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a></p>
              <p>Website: <a href="https://centyr.tech" className="text-purple-600 hover:underline">centyr.tech</a></p>
            </div>
            <p className="mt-3">
              For all privacy-related requests, including data subject rights, please contact us at the email above. We will respond within <strong>30 calendar days</strong> as required by GDPR Article 12.
            </p>
          </Section>

          <Section title="2. Personal Data We Collect">
            <p>We collect only the data necessary to provide the Service ("<strong>data minimization</strong>", GDPR Art. 5(1)(c)):</p>

            <div className="mt-4 space-y-3">
              <DataCard title="Identity and Contact Data" badge="Account">
                Full name, email address. Collected at registration or retrieved from your OAuth provider (Google, Apple, GitHub) with your consent.
              </DataCard>
              <DataCard title="Authentication Data" badge="Account">
                Hashed passwords (managed by AWS Cognito), OAuth tokens, session identifiers, and authentication timestamps. We never store plaintext passwords.
              </DataCard>
              <DataCard title="User Content (Images)" badge="Processing">
                Product photos you upload for processing. Stored temporarily on AWS S3 (eu-west-3) and automatically deleted after 30 days. We do not use your images to train AI models.
              </DataCard>
              <DataCard title="Usage and Technical Data" badge="Service">
                Number of jobs processed per period, job timestamps, processing durations, API request logs, IP address, browser type, and device information. Used for quota enforcement, debugging, and service improvement.
              </DataCard>
              <DataCard title="Billing and Transaction Data" badge="Payments">
                Subscription plan, billing history, and a Stripe Customer ID. Full card details are processed exclusively by Stripe and are never transmitted to or stored on our servers.
              </DataCard>
            </div>
          </Section>

          <Section title="3. Legal Basis for Processing">
            <p>We process your personal data on the following legal bases (GDPR Art. 6):</p>
            <div className="mt-3 space-y-2">
              <LegalBasis basis="Contract (Art. 6(1)(b))">
                Processing necessary to perform the Service you have subscribed to, including authentication, image processing, quota management, and billing.
              </LegalBasis>
              <LegalBasis basis="Legitimate Interest (Art. 6(1)(f))">
                Security monitoring, fraud prevention, abuse detection, service analytics, and improving the reliability of our infrastructure. We have conducted a Legitimate Interest Assessment (LIA) and concluded our interests do not override your rights and freedoms.
              </LegalBasis>
              <LegalBasis basis="Legal Obligation (Art. 6(1)(c))">
                Retention of billing and transaction records for 7 years to comply with Italian fiscal law (D.P.R. 633/1972) and EU VAT directives.
              </LegalBasis>
              <LegalBasis basis="Consent (Art. 6(1)(a))">
                Marketing communications, product updates, and newsletters — only if you have explicitly opted in. You may withdraw consent at any time.
              </LegalBasis>
            </div>
          </Section>

          <Section title="4. How We Use Your Data">
            <ul className="list-disc ml-6 space-y-1">
              <li>Create and manage your Account</li>
              <li>Authenticate your identity and maintain secure sessions</li>
              <li>Process your uploaded images using our AI pipeline</li>
              <li>Enforce your Subscription quota and plan limits</li>
              <li>Process payments and manage billing via Stripe</li>
              <li>Send transactional emails (email verification, password reset, payment receipts)</li>
              <li>Respond to support requests and communicate about your Account</li>
              <li>Monitor for security incidents, fraud, and Terms of Service violations</li>
              <li>Generate aggregated, anonymized usage statistics to improve the Service</li>
            </ul>
            <p className="mt-3 font-medium">
              We do not: sell your data, use your images to train AI models, share your data with advertisers, or engage in automated decision-making that produces legal or similarly significant effects.
            </p>
          </Section>

          <Section title="5. Data Storage, Infrastructure, and International Transfers">
            <p>Your data is processed and stored on the following infrastructure:</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="text-left p-3 border border-purple-100 font-semibold">Sub-processor</th>
                    <th className="text-left p-3 border border-purple-100 font-semibold">Purpose</th>
                    <th className="text-left p-3 border border-purple-100 font-semibold">Location</th>
                    <th className="text-left p-3 border border-purple-100 font-semibold">Safeguard</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-purple-100">Amazon Web Services</td>
                    <td className="p-3 border border-purple-100">Storage (S3), database (DynamoDB), compute (ECS), auth (Cognito)</td>
                    <td className="p-3 border border-purple-100">EU (Paris, eu-west-3)</td>
                    <td className="p-3 border border-purple-100">EEA — no transfer</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border border-purple-100">Stripe, Inc.</td>
                    <td className="p-3 border border-purple-100">Payment processing</td>
                    <td className="p-3 border border-purple-100">USA / EU</td>
                    <td className="p-3 border border-purple-100">SCCs + EU-US DPF</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-purple-100">Vercel, Inc.</td>
                    <td className="p-3 border border-purple-100">Web application hosting</td>
                    <td className="p-3 border border-purple-100">USA / EU edge</td>
                    <td className="p-3 border border-purple-100">SCCs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              SCCs = Standard Contractual Clauses (EU Commission Decision 2021/914). DPF = EU-US Data Privacy Framework.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <div className="mt-2 space-y-2">
              {[
                ['Uploaded images and Outputs', '30 days from upload date (automatic deletion)'],
                ['Account data (name, email)', 'Duration of Account + 30 days after deletion request'],
                ['Usage logs and job metadata', '90 days for operational purposes'],
                ['Billing and transaction records', '7 years (Italian fiscal law requirement)'],
                ['Security and audit logs', '12 months'],
                ['Consent records', 'Until consent is withdrawn + 1 year'],
              ].map(([type, period]) => (
                <div key={type} className="flex justify-between items-start gap-4 py-2 border-b border-gray-100 text-sm">
                  <span className="text-gray-700">{type}</span>
                  <span className="text-gray-500 text-right shrink-0">{period}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="7. Your Rights Under GDPR">
            <p>As a data subject under GDPR Chapter III, you have the following rights:</p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['Right of Access (Art. 15)', 'Request a copy of all personal data we hold about you.'],
                ['Right to Rectification (Art. 16)', 'Correct inaccurate or incomplete personal data.'],
                ['Right to Erasure (Art. 17)', 'Request deletion of your data ("right to be forgotten"), subject to legal retention obligations.'],
                ['Right to Data Portability (Art. 20)', 'Receive your data in a structured, machine-readable format (JSON/CSV).'],
                ['Right to Restriction (Art. 18)', 'Request that we limit processing of your data in certain circumstances.'],
                ['Right to Object (Art. 21)', 'Object to processing based on legitimate interest or for direct marketing.'],
                ['Right to Withdraw Consent (Art. 7(3))', 'Withdraw consent at any time without affecting prior lawful processing.'],
                ['Right to Lodge a Complaint (Art. 77)', 'File a complaint with the Garante per la Protezione dei Dati Personali (Italian DPA) or your local supervisory authority.'],
              ].map(([right, desc]) => (
                <div key={right} className="bg-purple-50 rounded-xl p-3 border border-purple-100 text-sm">
                  <p className="font-semibold text-gray-900 mb-1">{right}</p>
                  <p className="text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4">
              To exercise any of these rights, submit a request to{' '}
              <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a>.
              We may ask you to verify your identity before processing the request. We will respond within 30 days and will not charge a fee for reasonable requests.
            </p>
          </Section>

          <Section title="8. Cookies and Similar Technologies">
            <p>We use only technically necessary cookies. No advertising or third-party tracking cookies are used.</p>
            <div className="mt-3 space-y-2">
              {[
                ['auth_token', 'Session', 'Stores your JWT authentication token to keep you logged in.'],
                ['user', 'Session', 'Stores cached user profile data to avoid redundant API calls.'],
              ].map(([name, type, purpose]) => (
                <div key={name} className="flex gap-4 py-2 border-b border-gray-100 text-sm items-start">
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-purple-700 font-mono shrink-0">{name}</code>
                  <span className="text-gray-400 shrink-0">{type}</span>
                  <span className="text-gray-600">{purpose}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm">
              Strictly necessary cookies do not require consent under GDPR Recital 47 and the ePrivacy Directive.
            </p>
          </Section>

          <Section title="9. Security Measures">
            <p>We implement appropriate technical and organizational security measures, including:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>TLS 1.2+ encryption for all data in transit</li>
              <li>AES-256 encryption at rest on AWS S3</li>
              <li>Authentication via AWS Cognito with secure password hashing (bcrypt)</li>
              <li>Role-based access controls and principle of least privilege for internal systems</li>
              <li>Automatic expiry and deletion of stored image data after 30 days</li>
              <li>Regular security reviews and dependency updates</li>
            </ul>
            <p className="mt-3">
              In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify the competent supervisory authority within 72 hours and affected users without undue delay, as required by GDPR Art. 33-34.
            </p>
          </Section>

          <Section title="10. Children's Privacy">
            <p>
              The Service is not directed to individuals under the age of 16. We do not knowingly collect personal data from children. If we become aware that we have inadvertently collected data from a child, we will delete it promptly. If you believe a child has provided us with personal data, contact us at{' '}
              <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a>.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. For material changes, we will provide at least 14 days' notice via email or an in-app notification, with a summary of what has changed. The updated version will be effective as of the date indicated at the top. Your continued use of the Service after that date constitutes acceptance of the changes.
            </p>
            <p className="mt-2">
              We maintain a change log of material updates to this policy. You may request a copy by contacting us.
            </p>
          </Section>

          <Section title="12. Contact and Complaints">
            <p>
              For any privacy-related questions or to exercise your rights:
            </p>
            <div className="mt-3 bg-purple-50 rounded-xl p-4 border border-purple-100 text-sm">
              <p><strong>Email:</strong> <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a></p>
              <p className="mt-1"><strong>Response time:</strong> Within 30 days</p>
            </div>
            <p className="mt-3">
              If you are not satisfied with our response, you have the right to lodge a complaint with the Italian Data Protection Authority:
            </p>
            <div className="mt-2 bg-gray-50 rounded-xl p-4 border border-gray-200 text-sm">
              <p><strong>Garante per la Protezione dei Dati Personali</strong></p>
              <p>Piazza Venezia 11, 00187 Roma, Italy</p>
              <p><a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">www.garanteprivacy.it</a></p>
            </div>
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
      <div className="space-y-2 text-sm">{children}</div>
    </section>
  )
}

function DataCard({ title, badge, children }: { title: string; badge: string; children: React.ReactNode }) {
  return (
    <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
      <div className="flex items-center gap-2 mb-1">
        <p className="font-bold text-gray-900">{title}</p>
        <span className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full font-medium">{badge}</span>
      </div>
      <p className="text-gray-600 text-sm">{children}</p>
    </div>
  )
}

function LegalBasis({ basis, children }: { basis: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start py-2 border-b border-gray-100">
      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold whitespace-nowrap mt-0.5">{basis}</span>
      <span className="text-sm text-gray-600">{children}</span>
    </div>
  )
}
