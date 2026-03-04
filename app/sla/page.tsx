'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SlaPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">
            Centyr
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {it ? 'Accordo sul Livello di Servizio' : 'Service Level Agreement'}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>Version 1.0</span>
            <span>·</span>
            <span>{it ? 'Data di entrata in vigore: 22 febbraio 2026' : 'Effective date: February 22, 2026'}</span>
          </div>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto text-sm">
            {it
              ? 'Il presente SLA si applica ai piani di abbonamento a pagamento (Premium ed Enterprise). Il piano gratuito è fornito su base best-effort senza garanzia di uptime.'
              : 'This SLA applies to paid Subscription plans (Premium and Enterprise). The Free plan is provided on a best-effort basis with no uptime guarantee.'}
          </p>
        </div>

        {/* Uptime summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white border-2 border-green-200 rounded-xl p-5 text-center shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-1">99.9%</div>
            <div className="text-sm font-semibold text-gray-700">{it ? 'Uptime Mensile' : 'Monthly Uptime'}</div>
            <div className="text-xs text-gray-500 mt-1">{it ? 'Piani Premium' : 'Premium plans'}</div>
          </div>
          <div className="bg-white border-2 border-purple-200 rounded-xl p-5 text-center shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-1">&lt; 2h</div>
            <div className="text-sm font-semibold text-gray-700">{it ? 'Risposta Critica' : 'Critical Response'}</div>
            <div className="text-xs text-gray-500 mt-1">{it ? 'Incidenti P1' : 'P1 incidents'}</div>
          </div>
          <div className="bg-white border-2 border-blue-200 rounded-xl p-5 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-1">10%</div>
            <div className="text-sm font-semibold text-gray-700">{it ? 'Credito Mensile' : 'Monthly Credit'}</div>
            <div className="text-xs text-gray-500 mt-1">{it ? 'Per ora di downtime eccedente' : 'Per hour of excess downtime'}</div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

          <Section title={it ? '1. Definizioni' : '1. Definitions'}>
            <ul className="mt-2 space-y-2 text-sm">
              {(it ? [
                ['"Uptime"', 'la percentuale di tempo in un mese di calendario durante la quale l\'API e l\'applicazione web di Centyr sono disponibili e funzionanti, esclusa la Manutenzione Programmata.'],
                ['"Downtime"', 'qualsiasi periodo superiore a 5 minuti consecutivi durante i quali il Servizio è non disponibile o restituisce errori per ≥ 50% delle richieste, escluse la Manutenzione Programmata e il Downtime Giustificato.'],
                ['"Manutenzione Programmata"', 'finestre di manutenzione pianificate annunciate con almeno 48 ore di anticipo tramite email e/o la pagina di stato.'],
                ['"Downtime Giustificato"', 'indisponibilità causata da fattori al di fuori del nostro ragionevole controllo (vedi Sezione 7).'],
                ['"Percentuale di Uptime Mensile"', 'calcolata come: (minuti totali del mese − minuti di Downtime) / minuti totali del mese × 100.'],
              ] : [
                ['"Uptime"', 'the percentage of time in a calendar month during which the Centyr API and web application are available and functional, excluding Scheduled Maintenance.'],
                ['"Downtime"', 'any period exceeding 5 consecutive minutes during which the Service is unavailable or returning errors for ≥ 50% of requests, excluding Scheduled Maintenance and Excused Downtime.'],
                ['"Scheduled Maintenance"', 'planned maintenance windows announced at least 48 hours in advance via email and/or the status page.'],
                ['"Excused Downtime"', 'unavailability caused by factors outside our reasonable control (see Section 7).'],
                ['"Monthly Uptime Percentage"', 'calculated as: (total minutes in month − Downtime minutes) / total minutes in month × 100.'],
              ]).map(([term, desc]) => (
                <li key={term} className="flex gap-2">
                  <span className="font-semibold text-gray-900 whitespace-nowrap">{term}</span>
                  <span>— {desc}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title={it ? '2. Impegno di Uptime' : '2. Uptime Commitment'}>
            <div className="mt-2 rounded-xl border border-gray-200 overflow-hidden text-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Piano' : 'Plan'}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Target Uptime Mensile' : 'Monthly Uptime Target'}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Max Downtime Mensile' : 'Max Monthly Downtime'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-medium">{it ? 'Gratuito' : 'Free'}</td>
                    <td className="px-4 py-3 text-gray-500">{it ? 'Best effort (nessun SLA)' : 'Best effort (no SLA)'}</td>
                    <td className="px-4 py-3 text-gray-500">—</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3 font-medium">Premium</td>
                    <td className="px-4 py-3">99.9%</td>
                    <td className="px-4 py-3">~43 {it ? 'minuti' : 'minutes'}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Enterprise</td>
                    <td className="px-4 py-3">99.9% ({it ? 'SLA personalizzato disponibile' : 'custom SLA available'})</td>
                    <td className="px-4 py-3">~43 {it ? 'minuti' : 'minutes'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm">
              {it
                ? 'L\'uptime viene monitorato continuamente e riportato sulla nostra pagina di stato pubblica. I dati storici sull\'uptime sono disponibili su richiesta.'
                : 'Uptime is monitored continuously and reported on our public status page. Historical uptime data is available upon request.'}
            </p>
          </Section>

          <Section title={it ? '3. Classificazione degli Incidenti e Tempi di Risposta' : '3. Incident Classification & Response Times'}>
            <div className="mt-2 rounded-xl border border-gray-200 overflow-hidden text-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Priorità' : 'Priority'}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Descrizione' : 'Description'}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Conferma' : 'Acknowledgement'}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Risoluzione Target' : 'Target Resolution'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">P1 – {it ? 'Critico' : 'Critical'}</span>
                    </td>
                    <td className="px-4 py-3">{it ? 'Servizio completamente non disponibile o perdita di dati' : 'Service completely unavailable or data loss'}</td>
                    <td className="px-4 py-3">30 {it ? 'min' : 'min'}</td>
                    <td className="px-4 py-3">2 {it ? 'ore' : 'hours'}</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">P2 – {it ? 'Alto' : 'High'}</span>
                    </td>
                    <td className="px-4 py-3">{it ? 'Funzionalità principale degradata; impatto significativo sugli utenti' : 'Core feature degraded; significant user impact'}</td>
                    <td className="px-4 py-3">1 {it ? 'ora' : 'hour'}</td>
                    <td className="px-4 py-3">8 {it ? 'ore' : 'hours'}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">P3 – {it ? 'Medio' : 'Medium'}</span>
                    </td>
                    <td className="px-4 py-3">{it ? 'Funzionalità non critica compromessa; soluzione alternativa disponibile' : 'Non-critical feature impaired; workaround available'}</td>
                    <td className="px-4 py-3">4 {it ? 'ore' : 'hours'}</td>
                    <td className="px-4 py-3">3 {it ? 'giorni lavorativi' : 'business days'}</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">P4 – {it ? 'Basso' : 'Low'}</span>
                    </td>
                    <td className="px-4 py-3">{it ? 'Problemi minori; cosmetici o funzionalità minore' : 'Minor issues; cosmetic or minor functionality'}</td>
                    <td className="px-4 py-3">1 {it ? 'giorno lavorativo' : 'business day'}</td>
                    <td className="px-4 py-3">10 {it ? 'giorni lavorativi' : 'business days'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm">
              {it
                ? 'I tempi di risposta si applicano durante l\'orario lavorativo (09:00–18:00 CET, lunedì–venerdì) salvo diversi accordi in un contratto Enterprise. Gli incidenti P1 vengono gestiti 24/7.'
                : 'Response times apply during business hours (09:00–18:00 CET, Monday–Friday) unless otherwise agreed in an Enterprise contract. P1 incidents are addressed 24/7.'}
            </p>
          </Section>

          <Section title={it ? '4. Crediti di Servizio' : '4. Service Credits'}>
            <p>
              {it
                ? 'Se non riusciamo a rispettare l\'impegno di Uptime Mensile, puoi richiedere un credito di servizio secondo il seguente schema:'
                : 'If we fail to meet the Monthly Uptime commitment, you may request a service credit according to the following schedule:'}
            </p>
            <div className="mt-3 rounded-xl border border-gray-200 overflow-hidden text-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Uptime Mensile' : 'Monthly Uptime'}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Credito' : 'Credit'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3">99.0% – 99.9%</td>
                    <td className="px-4 py-3">{it ? '10% della quota mensile' : '10% of monthly fee'}</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3">95.0% – 99.0%</td>
                    <td className="px-4 py-3">{it ? '25% della quota mensile' : '25% of monthly fee'}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">{it ? 'Inferiore al 95.0%' : 'Below 95.0%'}</td>
                    <td className="px-4 py-3">{it ? '50% della quota mensile' : '50% of monthly fee'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm">
              {it
                ? 'I crediti vengono applicati al ciclo di fatturazione successivo, non pagati in contanti. I crediti sono il tuo unico ed esclusivo rimedio per i mancati rispetti dello SLA. Il credito massimo in un mese di calendario è il 50% della quota di abbonamento di quel mese.'
                : 'Credits are applied to your next billing cycle, not paid in cash. Credits are your sole and exclusive remedy for SLA failures. Maximum credit in any calendar month is 50% of that month\'s subscription fee.'}
            </p>
            <p className="mt-2 text-sm">
              {it ? (
                <>Per richiedere un credito, invia un&apos;email a <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline">support@centyr.tech</a> con oggetto &quot;Richiesta Credito SLA&quot; entro 15 giorni dalla fine del mese interessato, includendo le date e la durata del Downtime.</>
              ) : (
                <>To request a credit, email <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline">support@centyr.tech</a> with subject &quot;SLA Credit Request&quot; within 15 days of the end of the affected month, including the dates and duration of the Downtime.</>
              )}
            </p>
          </Section>

          <Section title={it ? '5. Manutenzione Programmata' : '5. Scheduled Maintenance'}>
            <p>
              {it
                ? 'Eseguiamo manutenzioni di routine per aggiornare il software, applicare patch di sicurezza e migliorare le prestazioni. Le finestre di manutenzione programmata sono:'
                : 'We perform routine maintenance to update software, apply security patches, and improve performance. Scheduled maintenance windows are:'}
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              {it ? (
                <>
                  <li>Annunciate con almeno 48 ore di anticipo tramite email agli utenti registrati e sulla pagina di stato</li>
                  <li>Tipicamente programmate nelle ore a basso traffico: 02:00–06:00 CET nei giorni feriali</li>
                  <li>Durata prevista comunicata nell&apos;avviso anticipato</li>
                  <li>La manutenzione programmata è <strong>esclusa</strong> dai calcoli del Downtime</li>
                </>
              ) : (
                <>
                  <li>Announced at least 48 hours in advance via email to registered users and on the status page</li>
                  <li>Typically scheduled during low-traffic hours: 02:00–06:00 CET on weekdays</li>
                  <li>Expected duration communicated in the advance notice</li>
                  <li>Scheduled maintenance is <strong>excluded</strong> from Downtime calculations</li>
                </>
              )}
            </ul>
            <p className="mt-2 text-sm">
              {it
                ? 'La manutenzione di emergenza necessaria per affrontare vulnerabilità di sicurezza critiche può procedere con un preavviso ridotto o nullo.'
                : 'Emergency maintenance required to address critical security vulnerabilities may proceed with shorter or no advance notice.'}
            </p>
          </Section>

          <Section title={it ? '6. Tempi di Elaborazione' : '6. Processing Time'}>
            <p>
              {it
                ? 'Oltre all\'uptime della piattaforma, puntiamo ai seguenti tempi di elaborazione delle immagini (misurati dall\'invio del job al suo completamento):'
                : 'In addition to platform uptime, we aim for the following image processing times (measured from job submission to completion):'}
            </p>
            <div className="mt-2 rounded-xl border border-gray-200 overflow-hidden text-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Piano' : 'Plan'}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Tempo di elaborazione target (per immagine)' : 'Target processing time (per image)'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3">{it ? 'Gratuito' : 'Free'}</td>
                    <td className="px-4 py-3">≤ 120 {it ? 'secondi (best effort)' : 'seconds (best effort)'}</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3">Premium</td>
                    <td className="px-4 py-3">≤ 60 {it ? 'secondi' : 'seconds'}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Enterprise</td>
                    <td className="px-4 py-3">≤ 30 {it ? 'secondi (SLA personalizzato disponibile)' : 'seconds (custom SLA available)'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-sm">
              {it
                ? 'I tempi di elaborazione sono obiettivi, non garanzie. I periodi di picco possono causare ritardi temporanei. I mancati rispetti dello SLA di elaborazione non danno diritto indipendentemente a crediti di servizio, a meno che non coincidano con un Downtime della piattaforma.'
                : 'Processing times are targets, not guarantees. Peak demand periods may cause temporary delays. Processing SLA failures do not independently qualify for service credits unless they coincide with platform Downtime.'}
            </p>
          </Section>

          <Section title={it ? '7. Esclusioni (Downtime Giustificato)' : '7. Exclusions (Excused Downtime)'}>
            <p>{it ? 'I seguenti casi sono esclusi dal Downtime e non danno diritto a crediti di servizio:' : 'The following are excluded from Downtime and do not qualify for service credits:'}</p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              {it ? (
                <>
                  <li>Finestre di manutenzione programmata (con preavviso)</li>
                  <li>Eventi di forza maggiore (catastrofi naturali, guerra, pandemia, azioni governative)</li>
                  <li>Guasti a servizi di terze parti al di fuori del nostro controllo (interruzioni regionali AWS, Cloudflare, Stripe)</li>
                  <li>Downtime causato dalle tue azioni, uso improprio o violazione dei Termini di Servizio</li>
                  <li>Attacchi di tipo denial-of-service o altre attività malevole di terze parti</li>
                  <li>Problemi derivanti dalla tua connessione Internet o rete locale</li>
                  <li>Funzionalità beta o sperimentali chiaramente contrassegnate come tali</li>
                </>
              ) : (
                <>
                  <li>Scheduled maintenance windows (with advance notice)</li>
                  <li>Force majeure events (natural disasters, war, pandemic, government actions)</li>
                  <li>Third-party service failures beyond our control (AWS regional outages, Cloudflare outages, Stripe outages)</li>
                  <li>Downtime caused by your actions, misuse, or violation of the Terms of Service</li>
                  <li>Denial-of-service attacks or other malicious third-party activity</li>
                  <li>Issues arising from your internet connection or local network</li>
                  <li>Beta or experimental features clearly marked as such</li>
                </>
              )}
            </ul>
          </Section>

          <Section title={it ? '8. Monitoraggio e Trasparenza' : '8. Monitoring & Transparency'}>
            <p>
              {it ? (
                <>Monitoriamo il Servizio continuamente. Lo stato degli incidenti e la cronologia dell&apos;uptime sono pubblicati pubblicamente. Per segnalare un incidente o verificare lo stato attuale, invia un&apos;email a{' '}
                <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline">support@centyr.tech</a>.</>
              ) : (
                <>We monitor the Service continuously. Incident status and uptime history are published publicly. To report an incident or check current status, email{' '}
                <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline">support@centyr.tech</a>.</>
              )}
            </p>
          </Section>

          <Section title={it ? '9. Modifiche al Presente SLA' : '9. Modifications to This SLA'}>
            <p>
              {it
                ? 'Potremmo aggiornare il presente SLA con un preavviso di 30 giorni. Se una modifica riduce materialmente le tue protezioni SLA, puoi risolvere il tuo Abbonamento entro 30 giorni dalla notifica e ricevere un rimborso pro-rata per il periodo inutilizzato, in conformità con la Sezione 9 dei Termini di Servizio.'
                : 'We may update this SLA with 30 days\' notice. If a modification materially reduces your SLA protections, you may terminate your Subscription within 30 days of the notice and receive a pro-rata refund for the unused period, in accordance with Section 9 of the Terms of Service.'}
            </p>
          </Section>

          <Section title={it ? '10. Contatti' : '10. Contact'}>
            <p>
              {it ? 'Per richieste di credito SLA o domande:' : 'For SLA credit requests or questions:'}{' '}
              <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline">support@centyr.tech</a><br />
              {it ? 'Per la personalizzazione dello SLA Enterprise:' : 'For Enterprise SLA customization:'}{' '}
              <a href="mailto:enterprise@centyr.io" className="text-purple-600 hover:underline">enterprise@centyr.io</a>
            </p>
          </Section>

        </div>

        {/* Footer links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/terms" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">
            {it ? 'Termini di Servizio' : 'Terms of Service'}
          </Link>
          <span>·</span>
          <Link href="/privacy" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">
            {it ? 'Informativa sulla Privacy' : 'Privacy Policy'}
          </Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors">
            {it ? '← Torna alla Home' : '← Back to Home'}
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
