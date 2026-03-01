import Link from 'next/link'

export const metadata = {
  title: 'Service Level Agreement (SLA) - Centyr',
  description: 'Centyr uptime commitments, incident response times, and service credits.',
}

export default function SlaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">
            Centyr
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Service Level Agreement</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>Version 1.0</span>
            <span>·</span>
            <span>Effective date: February 22, 2026</span>
          </div>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto text-sm">
            This SLA applies to paid Subscription plans (Premium and Enterprise). The Free plan is provided on a best-effort basis with no uptime guarantee.
          </p>
        </div>

        {/* Uptime summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white border-2 border-green-200 rounded-xl p-5 text-center shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-1">99.9%</div>
            <div className="text-sm font-semibold text-gray-700">Monthly Uptime</div>
            <div className="text-xs text-gray-500 mt-1">Premium plans</div>
          </div>
          <div className="bg-white border-2 border-purple-200 rounded-xl p-5 text-center shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-1">&lt; 2h</div>
            <div className="text-sm font-semibold text-gray-700">Critical Response</div>
            <div className="text-xs text-gray-500 mt-1">P1 incidents</div>
          </div>
          <div className="bg-white border-2 border-blue-200 rounded-xl p-5 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-1">10%</div>
            <div className="text-sm font-semibold text-gray-700">Monthly Credit</div>
            <div className="text-xs text-gray-500 mt-1">Per hour of excess downtime</div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

          <Section title="1. Definitions">
            <ul className="mt-2 space-y-2 text-sm">
              {[
                ['"Uptime"', 'the percentage of time in a calendar month during which the Centyr API and web application are available and functional, excluding Scheduled Maintenance.'],
                ['"Downtime"', 'any period exceeding 5 consecutive minutes during which the Service is unavailable or returning errors for ≥ 50% of requests, excluding Scheduled Maintenance and Excused Downtime.'],
                ['"Scheduled Maintenance"', 'planned maintenance windows announced at least 48 hours in advance via email and/or the status page.'],
                ['"Excused Downtime"', 'unavailability caused by factors outside our reasonable control (see Section 7).'],
                ['"Monthly Uptime Percentage"', 'calculated as: (total minutes in month − Downtime minutes) / total minutes in month × 100.'],
              ].map(([term, desc]) => (
                <li key={term} className="flex gap-2">
                  <span className="font-semibold text-gray-900 whitespace-nowrap">{term}</span>
                  <span>— {desc}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="2. Uptime Commitment">
            <div className="mt-2 rounded-xl border border-gray-200 overflow-hidden text-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Plan</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Monthly Uptime Target</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Max Monthly Downtime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-medium">Free</td>
                    <td className="px-4 py-3 text-gray-500">Best effort (no SLA)</td>
                    <td className="px-4 py-3 text-gray-500">—</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3 font-medium">Premium</td>
                    <td className="px-4 py-3">99.9%</td>
                    <td className="px-4 py-3">~43 minutes</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Enterprise</td>
                    <td className="px-4 py-3">99.9% (custom SLA available)</td>
                    <td className="px-4 py-3">~43 minutes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm">
              Uptime is monitored continuously and reported on our public status page. Historical uptime data is available upon request.
            </p>
          </Section>

          <Section title="3. Incident Classification & Response Times">
            <div className="mt-2 rounded-xl border border-gray-200 overflow-hidden text-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Priority</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Description</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Acknowledgement</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Target Resolution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">P1 – Critical</span>
                    </td>
                    <td className="px-4 py-3">Service completely unavailable or data loss</td>
                    <td className="px-4 py-3">30 min</td>
                    <td className="px-4 py-3">2 hours</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">P2 – High</span>
                    </td>
                    <td className="px-4 py-3">Core feature degraded; significant user impact</td>
                    <td className="px-4 py-3">1 hour</td>
                    <td className="px-4 py-3">8 hours</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">P3 – Medium</span>
                    </td>
                    <td className="px-4 py-3">Non-critical feature impaired; workaround available</td>
                    <td className="px-4 py-3">4 hours</td>
                    <td className="px-4 py-3">3 business days</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">P4 – Low</span>
                    </td>
                    <td className="px-4 py-3">Minor issues; cosmetic or minor functionality</td>
                    <td className="px-4 py-3">1 business day</td>
                    <td className="px-4 py-3">10 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm">
              Response times apply during business hours (09:00–18:00 CET, Monday–Friday) unless otherwise agreed in an Enterprise contract. P1 incidents are addressed 24/7.
            </p>
          </Section>

          <Section title="4. Service Credits">
            <p>
              If we fail to meet the Monthly Uptime commitment, you may request a service credit according to the following schedule:
            </p>
            <div className="mt-3 rounded-xl border border-gray-200 overflow-hidden text-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Monthly Uptime</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Credit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3">99.0% – 99.9%</td>
                    <td className="px-4 py-3">10% of monthly fee</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3">95.0% – 99.0%</td>
                    <td className="px-4 py-3">25% of monthly fee</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Below 95.0%</td>
                    <td className="px-4 py-3">50% of monthly fee</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm">
              Credits are applied to your next billing cycle, not paid in cash. Credits are your sole and exclusive remedy for SLA failures. Maximum credit in any calendar month is 50% of that month's subscription fee.
            </p>
            <p className="mt-2 text-sm">
              To request a credit, email <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline">support@centyr.tech</a> with subject "SLA Credit Request" within 15 days of the end of the affected month, including the dates and duration of the Downtime.
            </p>
          </Section>

          <Section title="5. Scheduled Maintenance">
            <p>
              We perform routine maintenance to update software, apply security patches, and improve performance. Scheduled maintenance windows are:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              <li>Announced at least 48 hours in advance via email to registered users and on the status page</li>
              <li>Typically scheduled during low-traffic hours: 02:00–06:00 CET on weekdays</li>
              <li>Expected duration communicated in the advance notice</li>
              <li>Scheduled maintenance is <strong>excluded</strong> from Downtime calculations</li>
            </ul>
            <p className="mt-2 text-sm">
              Emergency maintenance required to address critical security vulnerabilities may proceed with shorter or no advance notice.
            </p>
          </Section>

          <Section title="6. Processing Time">
            <p>
              In addition to platform uptime, we aim for the following image processing times (measured from job submission to completion):
            </p>
            <div className="mt-2 rounded-xl border border-gray-200 overflow-hidden text-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Plan</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Target processing time (per image)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3">Free</td>
                    <td className="px-4 py-3">≤ 120 seconds (best effort)</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3">Premium</td>
                    <td className="px-4 py-3">≤ 60 seconds</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Enterprise</td>
                    <td className="px-4 py-3">≤ 30 seconds (custom SLA available)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-sm">
              Processing times are targets, not guarantees. Peak demand periods may cause temporary delays. Processing SLA failures do not independently qualify for service credits unless they coincide with platform Downtime.
            </p>
          </Section>

          <Section title="7. Exclusions (Excused Downtime)">
            <p>The following are excluded from Downtime and do not qualify for service credits:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              <li>Scheduled maintenance windows (with advance notice)</li>
              <li>Force majeure events (natural disasters, war, pandemic, government actions)</li>
              <li>Third-party service failures beyond our control (AWS regional outages, Cloudflare outages, Stripe outages)</li>
              <li>Downtime caused by your actions, misuse, or violation of the Terms of Service</li>
              <li>Denial-of-service attacks or other malicious third-party activity</li>
              <li>Issues arising from your internet connection or local network</li>
              <li>Beta or experimental features clearly marked as such</li>
            </ul>
          </Section>

          <Section title="8. Monitoring & Transparency">
            <p>
              We monitor the Service continuously. Incident status and uptime history are published publicly. To report an incident or check current status, email{' '}
              <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline">support@centyr.tech</a>.
            </p>
          </Section>

          <Section title="9. Modifications to This SLA">
            <p>
              We may update this SLA with 30 days' notice. If a modification materially reduces your SLA protections, you may terminate your Subscription within 30 days of the notice and receive a pro-rata refund for the unused period, in accordance with Section 9 of the Terms of Service.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              For SLA credit requests or questions: <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline">support@centyr.tech</a><br />
              For Enterprise SLA customization: <a href="mailto:enterprise@centyr.io" className="text-purple-600 hover:underline">enterprise@centyr.io</a>
            </p>
          </Section>

        </div>

        {/* Footer links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/terms" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">Terms of Service</Link>
          <span>·</span>
          <Link href="/privacy" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">Privacy Policy</Link>
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
