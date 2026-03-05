'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function GdprPage() {
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
            {it ? 'Conformità GDPR & Cookie Policy' : 'GDPR Compliance & Cookie Policy'}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>Version 1.0</span>
            <span>·</span>
            <span>{it ? 'Data di entrata in vigore: 22 febbraio 2026' : 'Effective date: February 22, 2026'}</span>
          </div>
        </div>

        {/* Intro box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-8 text-sm text-blue-800">
          {it ? (
            <><strong>La tua privacy è importante per noi.</strong> Centyr è pienamente conforme al Regolamento Generale sulla Protezione dei Dati dell&apos;UE (GDPR). Questa pagina spiega come gestiamo i tuoi dati personali e quali cookie utilizziamo. La nostra{' '}
            <Link href="/privacy" className="underline font-semibold">Informativa sulla Privacy</Link> completa contiene tutti i dettagli sul trattamento dei dati.</>
          ) : (
            <><strong>Your privacy is important to us.</strong> Centyr is fully compliant with the EU General Data Protection Regulation (GDPR). This page explains how we handle your personal data and what cookies we use. Our full{' '}
            <Link href="/privacy" className="underline font-semibold">Privacy Policy</Link> contains complete details on data processing.</>
          )}
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

          <Section title={it ? '1. Chi è il Titolare del Trattamento?' : '1. Who Is the Data Controller?'}>
            <p>
              {it
                ? 'Centyr è il titolare del trattamento per tutti i dati personali raccolti tramite la piattaforma centyr.tech. Puoi contattarci per qualsiasi questione relativa alla protezione dei dati a:'
                : 'Centyr is the data controller for all personal data collected through the centyr.tech platform. You can contact us regarding any data protection matter at:'}
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><strong>Email:</strong> <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a></li>
              <li><strong>{it ? 'Supporto generale:' : 'General support:'}</strong> <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline">support@centyr.tech</a></li>
            </ul>
          </Section>

          <Section title={it ? '2. Quali Dati Personali Raccogliamo' : '2. What Personal Data We Collect'}>
            <p>{it ? 'Raccogliamo il minimo di dati necessari per fornire il Servizio:' : 'We collect the minimum data necessary to provide the Service:'}</p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              {it ? (
                <>
                  <li><strong>Dati account:</strong> indirizzo email, nome (da provider OAuth come Google o Apple)</li>
                  <li><strong>Dati di autenticazione:</strong> token di sessione crittografati gestiti tramite AWS Cognito</li>
                  <li><strong>Contenuto utente:</strong> immagini di prodotti caricate per l&apos;elaborazione (archiviate temporaneamente, eliminate dopo 30 giorni)</li>
                  <li><strong>Dati di fatturazione:</strong> dettagli del metodo di pagamento gestiti esclusivamente da Stripe — non archiviamo mai i numeri di carta</li>
                  <li><strong>Dati di utilizzo:</strong> storico jobs, conteggi caricamenti, stato abbonamento</li>
                  <li><strong>Dati tecnici:</strong> indirizzo IP, tipo di browser, timestamp delle richieste (per sicurezza e prevenzione delle frodi)</li>
                </>
              ) : (
                <>
                  <li><strong>Account data:</strong> email address, name (from OAuth providers such as Google or Apple)</li>
                  <li><strong>Authentication data:</strong> encrypted session tokens managed via AWS Cognito</li>
                  <li><strong>User content:</strong> product images you upload for processing (stored temporarily, deleted after 30 days)</li>
                  <li><strong>Billing data:</strong> payment method details managed exclusively by Stripe — we never store card numbers</li>
                  <li><strong>Usage data:</strong> job history, upload counts, subscription status</li>
                  <li><strong>Technical data:</strong> IP address, browser type, request timestamps (for security and fraud prevention)</li>
                </>
              )}
            </ul>
          </Section>

          <Section title={it ? '3. Basi Giuridiche del Trattamento' : '3. Legal Bases for Processing'}>
            <p>{it ? 'Trattiamo i tuoi dati personali sulle seguenti basi giuridiche ai sensi dell\'Art. 6 GDPR:' : 'We process your personal data on the following legal bases under Art. 6 GDPR:'}</p>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-sm">
              {it ? (
                <>
                  <li><strong>Contratto (Art. 6(1)(b)):</strong> trattamento necessario per fornire il Servizio a cui ti sei abbonato, inclusa l&apos;elaborazione delle immagini, la gestione dell&apos;account e la fatturazione</li>
                  <li><strong>Interesse legittimo (Art. 6(1)(f)):</strong> monitoraggio della sicurezza, prevenzione delle frodi, miglioramento del servizio e analisi (solo aggregate, non identificative)</li>
                  <li><strong>Obbligo legale (Art. 6(1)(c)):</strong> conservazione dei registri di fatturazione per 7 anni ai sensi della legge fiscale italiana (D.P.R. 633/1972)</li>
                  <li><strong>Consenso (Art. 6(1)(a)):</strong> utilizzato solo dove esplicitamente richiesto; puoi revocare il consenso in qualsiasi momento senza pregiudicare il trattamento precedente</li>
                </>
              ) : (
                <>
                  <li><strong>Contract (Art. 6(1)(b)):</strong> processing necessary to deliver the Service you have subscribed to, including image processing, account management, and billing</li>
                  <li><strong>Legitimate interests (Art. 6(1)(f)):</strong> security monitoring, fraud prevention, service improvement, and analytics (only aggregated, non-identifying)</li>
                  <li><strong>Legal obligation (Art. 6(1)(c)):</strong> retention of billing records for 7 years per Italian tax law (D.P.R. 633/1972)</li>
                  <li><strong>Consent (Art. 6(1)(a)):</strong> used only where explicitly required; you may withdraw consent at any time without affecting prior processing</li>
                </>
              )}
            </ul>
          </Section>

          <Section title={it ? '4. I Tuoi Diritti GDPR' : '4. Your GDPR Rights'}>
            <p>
              {it ? (
                <>Come interessato ai sensi del GDPR, hai i seguenti diritti. Per esercitarli, scrivi a <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a>. Risponderemo entro 30 giorni.</>
              ) : (
                <>As a data subject under GDPR, you have the following rights. To exercise any of them, email <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a>. We will respond within 30 days.</>
              )}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {(it ? [
                ['Diritto di accesso (Art. 15)', 'Richiedere una copia di tutti i dati personali che conserviamo su di te.'],
                ['Diritto di rettifica (Art. 16)', 'Richiedere la correzione di dati inesatti o incompleti.'],
                ['Diritto alla cancellazione (Art. 17)', 'Richiedere l\'eliminazione dei tuoi dati ("diritto all\'oblio"), fatti salvi gli obblighi legali di conservazione.'],
                ['Diritto alla portabilità dei dati (Art. 20)', 'Ricevere i tuoi dati in un formato strutturato e leggibile da macchina (JSON/CSV).'],
                ['Diritto di limitazione (Art. 18)', 'Richiedere che sospendano temporaneamente il trattamento dei tuoi dati mentre viene risolta una controversia.'],
                ['Diritto di opposizione (Art. 21)', 'Opporsi al trattamento basato sugli interessi legittimi.'],
                ['Diritto a non essere soggetto a decisioni automatizzate (Art. 22)', 'Non prendiamo decisioni automatizzate giuridicamente significative nei tuoi confronti.'],
              ] : [
                ['Right of access (Art. 15)', 'Request a copy of all personal data we hold about you.'],
                ['Right to rectification (Art. 16)', 'Request correction of inaccurate or incomplete data.'],
                ['Right to erasure (Art. 17)', 'Request deletion of your data ("right to be forgotten"), subject to legal retention obligations.'],
                ['Right to data portability (Art. 20)', 'Receive your data in a structured, machine-readable format (JSON/CSV).'],
                ['Right to restriction (Art. 18)', 'Request that we temporarily stop processing your data while a dispute is resolved.'],
                ['Right to object (Art. 21)', 'Object to processing based on legitimate interests.'],
                ['Right not to be subject to automated decisions (Art. 22)', 'We do not make legally significant automated decisions about you.'],
              ]).map(([right, desc]) => (
                <li key={right} className="flex gap-2">
                  <span className="font-semibold text-gray-900 whitespace-nowrap">{right}</span>
                  <span>— {desc}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              {it ? (
                <>Se ritieni che i tuoi diritti siano stati violati, hai il diritto di presentare un reclamo al <strong>Garante per la Protezione dei Dati Personali</strong> all&apos;indirizzo{' '}
                <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">garanteprivacy.it</a>, o all&apos;autorità di controllo del tuo paese di residenza.</>
              ) : (
                <>If you believe your rights have been violated, you have the right to lodge a complaint with the Italian Data Protection Authority (<strong>Garante per la Protezione dei Dati Personali</strong>) at{' '}
                <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">garanteprivacy.it</a>, or with the supervisory authority in your country of residence.</>
              )}
            </p>
          </Section>

          <Section title={it ? '5. Conservazione dei Dati' : '5. Data Retention'}>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              {it ? (
                <>
                  <li><strong>Immagini caricate (input):</strong> eliminate automaticamente dopo 30 giorni</li>
                  <li><strong>Immagini elaborate (output):</strong> eliminate automaticamente dopo 30 giorni</li>
                  <li><strong>Dati account:</strong> eliminati entro 30 giorni dalla richiesta di eliminazione account</li>
                  <li><strong>Registri di fatturazione:</strong> conservati per 7 anni come richiesto dalla legge fiscale italiana</li>
                  <li><strong>Log di sicurezza/accesso:</strong> conservati per 90 giorni per la prevenzione delle frodi</li>
                </>
              ) : (
                <>
                  <li><strong>Uploaded images (input):</strong> automatically deleted after 30 days</li>
                  <li><strong>Processed images (output):</strong> automatically deleted after 30 days</li>
                  <li><strong>Account data:</strong> deleted within 30 days of account deletion request</li>
                  <li><strong>Billing records:</strong> retained for 7 years as required by Italian fiscal law</li>
                  <li><strong>Security/access logs:</strong> retained for 90 days for fraud prevention</li>
                </>
              )}
            </ul>
          </Section>

          <Section title={it ? '6. Trasferimenti di Dati al di fuori dell\'UE' : '6. Data Transfers Outside the EU'}>
            <p>
              {it
                ? 'La nostra infrastruttura principale è situata nell\'UE (AWS eu-west-3, Parigi). Tuttavia, alcuni sub-responsabili potrebbero elaborare dati al di fuori dell\'UE:'
                : 'Our primary infrastructure is located in the EU (AWS eu-west-3, Paris). However, some sub-processors may process data outside the EU:'}
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              {it ? (
                <>
                  <li><strong>Stripe (USA):</strong> elaborazione pagamenti — coperta dall&apos;EU-US Data Privacy Framework (DPF) e dalle Clausole Contrattuali Standard (SCCs)</li>
                  <li><strong>Vercel (USA):</strong> hosting frontend — coperta dalle SCCs</li>
                  <li><strong>AWS (UE):</strong> infrastruttura — dati archiviati in eu-west-3 (Parigi)</li>
                </>
              ) : (
                <>
                  <li><strong>Stripe (USA):</strong> payment processing — covered by EU-US Data Privacy Framework (DPF) and Standard Contractual Clauses (SCCs)</li>
                  <li><strong>Vercel (USA):</strong> frontend hosting — covered by SCCs</li>
                  <li><strong>AWS (EU):</strong> infrastructure — data stored in eu-west-3 (Paris)</li>
                </>
              )}
            </ul>
            <p className="mt-2 text-sm">
              {it
                ? 'Tutti i trasferimenti internazionali sono protetti da adeguate garanzie ai sensi dell\'Art. 46 GDPR.'
                : 'All international transfers are protected by appropriate safeguards under Art. 46 GDPR.'}
            </p>
          </Section>

          <Section title={it ? '7. Cookie Policy' : '7. Cookie Policy'}>
            <p>
              {it ? (
                <>Centyr utilizza solo <strong>cookie strettamente necessari</strong> per il funzionamento del Servizio. Non utilizziamo cookie pubblicitari, di tracciamento o di analisi di terze parti.</>
              ) : (
                <>Centyr uses only <strong>strictly necessary cookies</strong> required for the Service to function. We do not use advertising, tracking, or third-party analytics cookies.</>
              )}
            </p>

            <div className="mt-4 rounded-xl border border-gray-200 overflow-hidden text-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Nome cookie' : 'Cookie name'}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Scopo' : 'Purpose'}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Durata' : 'Duration'}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{it ? 'Tipo' : 'Type'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-purple-700">auth_token</td>
                    <td className="px-4 py-3">{it ? 'Conserva il JWT di autenticazione per mantenerti connesso' : 'Stores your authentication JWT to keep you logged in'}</td>
                    <td className="px-4 py-3">{it ? 'Sessione / 7 giorni' : 'Session / 7 days'}</td>
                    <td className="px-4 py-3">{it ? 'Strettamente necessario' : 'Strictly necessary'}</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="px-4 py-3 font-mono text-xs text-purple-700">user</td>
                    <td className="px-4 py-3">{it ? 'Memorizza nella cache i dati del profilo base (nome, email) per la visualizzazione nell\'interfaccia' : 'Caches your basic profile data (name, email) for UI display'}</td>
                    <td className="px-4 py-3">{it ? 'Sessione / 7 giorni' : 'Session / 7 days'}</td>
                    <td className="px-4 py-3">{it ? 'Strettamente necessario' : 'Strictly necessary'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-sm">
              {it
                ? 'Poiché utilizziamo solo cookie strettamente necessari, non mostriamo un banner di consenso ai cookie — nessun consenso è richiesto ai sensi dell\'Art. 25 del Codice Privacy italiano (D.Lgs. 196/2003 come modificato) e della Direttiva ePrivacy per i cookie tecnicamente essenziali.'
                : 'Because we only use strictly necessary cookies, we do not display a cookie consent banner — no consent is required under Art. 25 of the Italian Privacy Code (D.Lgs. 196/2003 as amended) and the ePrivacy Directive for technically essential cookies.'}
            </p>
            <p className="mt-2 text-sm">
              {it
                ? 'Puoi eliminare questi cookie in qualsiasi momento tramite le impostazioni del browser. In tal caso verrai disconnesso dal Servizio.'
                : 'You can delete these cookies at any time through your browser settings. Doing so will log you out of the Service.'}
            </p>
          </Section>

          <Section title={it ? '8. Misure di Sicurezza' : '8. Security Measures'}>
            <p>{it ? 'Implementiamo adeguate misure tecniche e organizzative per proteggere i tuoi dati, tra cui:' : 'We implement appropriate technical and organizational measures to protect your data, including:'}</p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              {it ? (
                <>
                  <li>Crittografia TLS 1.2/1.3 per tutti i dati in transito</li>
                  <li>Crittografia AES-256 per i dati a riposo (S3, DynamoDB)</li>
                  <li>Controllo degli accessi tramite AWS IAM con policy di privilegio minimo</li>
                  <li>Tutti i bucket S3 sono privati; i file sono accessibili solo tramite URL firmati a tempo limitato</li>
                  <li>Protezione DDoS e WAF di Cloudflare</li>
                  <li>Revisioni periodiche della sicurezza</li>
                </>
              ) : (
                <>
                  <li>TLS 1.2/1.3 encryption for all data in transit</li>
                  <li>AES-256 encryption for data at rest (S3, DynamoDB)</li>
                  <li>Access control via AWS IAM with least-privilege policies</li>
                  <li>All S3 buckets are private; files accessible only via time-limited presigned URLs</li>
                  <li>Cloudflare DDoS protection and WAF</li>
                  <li>Regular security reviews</li>
                </>
              )}
            </ul>
            <p className="mt-2 text-sm">
              {it ? (
                <>Consulta la nostra <Link href="/security" className="text-purple-600 hover:underline">pagina Sicurezza</Link> per i dettagli completi.</>
              ) : (
                <>See our <Link href="/security" className="text-purple-600 hover:underline">Security page</Link> for full details.</>
              )}
            </p>
          </Section>

          <Section title={it ? '9. Modifiche alla Presente Policy' : '9. Changes to This Policy'}>
            <p>
              {it
                ? 'Potremmo aggiornare periodicamente questa policy. Le modifiche sostanziali saranno comunicate tramite email o avviso in-app almeno 14 giorni prima della loro entrata in vigore. La data di entrata in vigore in cima a questa pagina riflette la data dell\'ultima revisione.'
                : 'We may update this policy from time to time. Material changes will be communicated by email or via an in-app notice at least 14 days before taking effect. The effective date at the top of this page reflects the date of the latest revision.'}
            </p>
          </Section>

          <Section title={it ? '10. Contatti e Reclami' : '10. Contact & Complaints'}>
            <p>
              {it ? (
                <>Per qualsiasi richiesta o domanda relativa al GDPR, contatta il nostro team privacy all&apos;indirizzo{' '}
                <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a>.</>
              ) : (
                <>For any GDPR-related request or question, contact our privacy team at{' '}
                <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a>.</>
              )}
            </p>
            <p className="mt-2">
              {it ? (
                <>Se non sei soddisfatto della nostra risposta, hai il diritto di presentare un reclamo al{' '}
                <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                  Garante per la Protezione dei Dati Personali
                </a>{' '}
                (Autorità Garante italiana) o all&apos;autorità di controllo del tuo paese di residenza nell&apos;UE.</>
              ) : (
                <>If you are not satisfied with our response, you have the right to lodge a complaint with the{' '}
                <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                  Garante per la Protezione dei Dati Personali
                </a>{' '}
                (Italian DPA) or the supervisory authority in your EU country of residence.</>
              )}
            </p>
          </Section>

        </div>

        {/* Footer links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/privacy" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">
            {it ? 'Informativa sulla Privacy' : 'Privacy Policy'}
          </Link>
          <span>·</span>
          <Link href="/terms" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">
            {it ? 'Termini di Servizio' : 'Terms of Service'}
          </Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />{it ? 'Torna alla Home' : 'Back to Home'}
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
