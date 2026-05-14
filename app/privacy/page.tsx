'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PrivacyPage() {
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
            {it ? 'Informativa sulla Privacy' : 'Privacy Policy'}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>Version 1.1</span>
            <span>·</span>
            <span>{it ? 'Ultimo aggiornamento: 19 marzo 2026' : 'Last updated: March 19, 2026'}</span>
          </div>
        </div>

        {/* GDPR badge */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 mb-8 text-sm text-green-800 flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div>
            {it ? (
              <><strong>Conforme al GDPR.</strong> Questa informativa è redatta in conformità al Regolamento Generale sulla Protezione dei Dati dell&apos;UE (Regolamento 2016/679). La nostra infrastruttura è situata nell&apos;Unione Europea (AWS eu-west-3, Parigi).</>
            ) : (
              <><strong>GDPR Compliant.</strong> This policy is designed to comply with the EU General Data Protection Regulation (Regulation 2016/679). Our infrastructure is based in the European Union (AWS eu-west-3, Paris).</>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <p className="text-sm">
              {it ? (
                <>Centyr (&quot;<strong>noi</strong>&quot;, &quot;<strong>nostro</strong>&quot; o &quot;<strong>ci</strong>&quot;) si impegna a proteggere i tuoi dati personali e a rispettare la tua privacy. La presente Informativa sulla Privacy descrive quali dati raccogliamo, perché li raccogliamo, come li utilizziamo e proteggiamo, e quali diritti hai sui tuoi dati, in conformità al Regolamento Generale sulla Protezione dei Dati dell&apos;UE (GDPR).</>
              ) : (
                <>Centyr (&quot;<strong>we</strong>&quot;, &quot;<strong>our</strong>&quot;, or &quot;<strong>us</strong>&quot;) is committed to protecting your personal data and respecting your privacy. This Privacy Policy describes what data we collect, why we collect it, how we use and protect it, and what rights you have over your data, in accordance with the EU General Data Protection Regulation (GDPR).</>
              )}
            </p>
            <p className="text-sm mt-2">
              {it ? (
                <>Utilizzando il nostro Servizio su <strong>centyr.tech</strong>, dichiari di aver letto e compreso la presente Informativa sulla Privacy.</>
              ) : (
                <>By using our Service at <strong>centyr.tech</strong>, you acknowledge that you have read and understood this Privacy Policy.</>
              )}
            </p>
          </section>

          <Section title={it ? '1. Titolare del Trattamento' : '1. Data Controller'}>
            <p>
              {it ? 'Il titolare del trattamento responsabile del trattamento dei tuoi dati personali è:' : 'The data controller responsible for processing your personal data is:'}
            </p>
            <div className="mt-3 bg-purple-50 rounded-xl p-4 border border-purple-100 text-sm">
              <p><strong>Centyr</strong></p>
              <p className="mt-1">Email: <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a></p>
              <p>Website: <a href="https://centyr.tech" className="text-purple-600 hover:underline">centyr.tech</a></p>
            </div>
            <p className="mt-3">
              {it ? (
                <>Per tutte le richieste relative alla privacy, inclusi i diritti degli interessati, contattaci all&apos;indirizzo email sopra indicato. Risponderemo entro <strong>30 giorni di calendario</strong> come richiesto dall&apos;Art. 12 del GDPR.</>
              ) : (
                <>For all privacy-related requests, including data subject rights, please contact us at the email above. We will respond within <strong>30 calendar days</strong> as required by GDPR Article 12.</>
              )}
            </p>
          </Section>

          <Section title={it ? '2. Dati Personali che Raccogliamo' : '2. Personal Data We Collect'}>
            <p>
              {it
                ? 'Raccogliamo solo i dati necessari per fornire il Servizio ("minimizzazione dei dati", Art. 5(1)(c) GDPR):'
                : 'We collect only the data necessary to provide the Service ("data minimization", GDPR Art. 5(1)(c)):'}
            </p>

            <div className="mt-4 space-y-3">
              <DataCard title={it ? 'Dati di Identità e Contatto' : 'Identity and Contact Data'} badge={it ? 'Account' : 'Account'}>
                {it
                  ? 'Nome completo, indirizzo email. Raccolti al momento della registrazione o recuperati dal tuo provider OAuth (Google, Apple, GitHub) con il tuo consenso.'
                  : 'Full name, email address. Collected at registration or retrieved from your OAuth provider (Google, Apple, GitHub) with your consent.'}
              </DataCard>
              <DataCard title={it ? 'Dati di Autenticazione' : 'Authentication Data'} badge="Account">
                {it
                  ? 'Password con hash (gestite da AWS Cognito), token OAuth, identificatori di sessione e timestamp di autenticazione. Non archiviamo mai le password in chiaro.'
                  : 'Hashed passwords (managed by AWS Cognito), OAuth tokens, session identifiers, and authentication timestamps. We never store plaintext passwords.'}
              </DataCard>
              <DataCard title={it ? 'Contenuti Utente (Immagini)' : 'User Content (Images)'} badge={it ? 'Elaborazione' : 'Processing'}>
                {it
                  ? 'Foto di prodotti caricate per l\'elaborazione. Archiviate temporaneamente su AWS S3 (eu-west-3) ed eliminate automaticamente dopo 30 giorni. Non utilizziamo le tue immagini per addestrare modelli AI.'
                  : 'Product photos you upload for processing. Stored temporarily on AWS S3 (eu-west-3) and automatically deleted after 30 days. We do not use your images to train AI models.'}
              </DataCard>
              <DataCard title={it ? 'Dati di Utilizzo e Tecnici' : 'Usage and Technical Data'} badge={it ? 'Servizio' : 'Service'}>
                {it
                  ? 'Numero di jobs elaborati per periodo, timestamp dei jobs, durate di elaborazione, log delle richieste API, indirizzo IP, tipo di browser e informazioni sul dispositivo. Utilizzati per la gestione delle quote, il debug e il miglioramento del servizio.'
                  : 'Number of jobs processed per period, job timestamps, processing durations, API request logs, IP address, browser type, and device information. Used for quota enforcement, debugging, and service improvement.'}
              </DataCard>
              <DataCard title={it ? 'Dati di Fatturazione e Transazioni' : 'Billing and Transaction Data'} badge={it ? 'Pagamenti' : 'Payments'}>
                {it
                  ? 'Piano di abbonamento, storico di fatturazione e un ID cliente Stripe. I dettagli completi della carta sono elaborati esclusivamente da Stripe e non vengono mai trasmessi o archiviati sui nostri server.'
                  : 'Subscription plan, billing history, and a Stripe Customer ID. Full card details are processed exclusively by Stripe and are never transmitted to or stored on our servers.'}
              </DataCard>
            </div>
          </Section>

          <Section title={it ? '3. Basi Giuridiche del Trattamento' : '3. Legal Basis for Processing'}>
            <p>{it ? 'Trattiamo i tuoi dati personali sulle seguenti basi giuridiche (Art. 6 GDPR):' : 'We process your personal data on the following legal bases (GDPR Art. 6):'}</p>
            <div className="mt-3 space-y-2">
              <LegalBasis basis={it ? 'Contratto (Art. 6(1)(b))' : 'Contract (Art. 6(1)(b))'}>
                {it
                  ? 'Trattamento necessario per eseguire il Servizio a cui ti sei abbonato, inclusi autenticazione, elaborazione delle immagini, gestione delle quote e fatturazione.'
                  : 'Processing necessary to perform the Service you have subscribed to, including authentication, image processing, quota management, and billing.'}
              </LegalBasis>
              <LegalBasis basis={it ? 'Interesse Legittimo (Art. 6(1)(f))' : 'Legitimate Interest (Art. 6(1)(f))'}>
                {it
                  ? 'Monitoraggio della sicurezza, prevenzione delle frodi, rilevamento degli abusi, analisi del servizio e miglioramento dell\'affidabilità della nostra infrastruttura. Abbiamo condotto una Valutazione dell\'Interesse Legittimo (LIA) e concluso che i nostri interessi non prevalgono sui tuoi diritti e libertà.'
                  : 'Security monitoring, fraud prevention, abuse detection, service analytics, and improving the reliability of our infrastructure. We have conducted a Legitimate Interest Assessment (LIA) and concluded our interests do not override your rights and freedoms.'}
              </LegalBasis>
              <LegalBasis basis={it ? 'Obbligo Legale (Art. 6(1)(c))' : 'Legal Obligation (Art. 6(1)(c))'}>
                {it
                  ? 'Conservazione dei registri di fatturazione e transazioni per 7 anni per conformarsi alla legge fiscale italiana (D.P.R. 633/1972) e alle direttive IVA dell\'UE.'
                  : 'Retention of billing and transaction records for 7 years to comply with Italian fiscal law (D.P.R. 633/1972) and EU VAT directives.'}
              </LegalBasis>
              <LegalBasis basis={it ? 'Consenso (Art. 6(1)(a))' : 'Consent (Art. 6(1)(a))'}>
                {it
                  ? 'Comunicazioni di marketing, aggiornamenti di prodotto e newsletter, solo se hai esplicitamente acconsentito. Puoi revocare il consenso in qualsiasi momento.'
                  : 'Marketing communications, product updates, and newsletters, only if you have explicitly opted in. You may withdraw consent at any time.'}
              </LegalBasis>
            </div>
          </Section>

          <Section title={it ? '4. Come Utilizziamo i Tuoi Dati' : '4. How We Use Your Data'}>
            <ul className="list-disc ml-6 space-y-1">
              {it ? (
                <>
                  <li>Creare e gestire il tuo Account</li>
                  <li>Autenticare la tua identità e mantenere sessioni sicure</li>
                  <li>Elaborare le immagini caricate tramite la nostra pipeline AI</li>
                  <li>Applicare la quota del tuo abbonamento e i limiti del piano</li>
                  <li>Elaborare i pagamenti e gestire la fatturazione tramite Stripe</li>
                  <li>Inviare email transazionali (verifica email, reset password, ricevute di pagamento)</li>
                  <li>Rispondere alle richieste di supporto e comunicare riguardo al tuo Account</li>
                  <li>Monitorare incidenti di sicurezza, frodi e violazioni dei Termini di Servizio</li>
                  <li>Generare statistiche di utilizzo aggregate e anonimizzate per migliorare il Servizio</li>
                </>
              ) : (
                <>
                  <li>Create and manage your Account</li>
                  <li>Authenticate your identity and maintain secure sessions</li>
                  <li>Process your uploaded images using our AI pipeline</li>
                  <li>Enforce your Subscription quota and plan limits</li>
                  <li>Process payments and manage billing via Stripe</li>
                  <li>Send transactional emails (email verification, password reset, payment receipts)</li>
                  <li>Respond to support requests and communicate about your Account</li>
                  <li>Monitor for security incidents, fraud, and Terms of Service violations</li>
                  <li>Generate aggregated, anonymized usage statistics to improve the Service</li>
                </>
              )}
            </ul>
            <p className="mt-3 font-medium">
              {it
                ? 'Non vendiamo i tuoi dati, non utilizziamo le tue immagini per addestrare modelli AI, non condividiamo i tuoi dati con inserzionisti e non effettuiamo processi decisionali automatizzati che producano effetti legali o significativi simili.'
                : 'We do not: sell your data, use your images to train AI models, share your data with advertisers, or engage in automated decision-making that produces legal or similarly significant effects.'}
            </p>
          </Section>

          <Section title={it ? '5. Archiviazione dei Dati, Infrastruttura e Trasferimenti Internazionali' : '5. Data Storage, Infrastructure, and International Transfers'}>
            <p>{it ? 'I tuoi dati sono elaborati e archiviati sulla seguente infrastruttura:' : 'Your data is processed and stored on the following infrastructure:'}</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="text-left p-3 border border-purple-100 font-semibold">{it ? 'Sub-responsabile' : 'Sub-processor'}</th>
                    <th className="text-left p-3 border border-purple-100 font-semibold">{it ? 'Scopo' : 'Purpose'}</th>
                    <th className="text-left p-3 border border-purple-100 font-semibold">{it ? 'Ubicazione' : 'Location'}</th>
                    <th className="text-left p-3 border border-purple-100 font-semibold">{it ? 'Garanzia' : 'Safeguard'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-purple-100">Amazon Web Services</td>
                    <td className="p-3 border border-purple-100">{it ? 'Archiviazione (S3), database (DynamoDB), calcolo (ECS), autenticazione (Cognito)' : 'Storage (S3), database (DynamoDB), compute (ECS), auth (Cognito)'}</td>
                    <td className="p-3 border border-purple-100">EU (Paris, eu-west-3)</td>
                    <td className="p-3 border border-purple-100">{it ? 'SEE, nessun trasferimento' : 'EEA, no transfer'}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border border-purple-100">Stripe, Inc.</td>
                    <td className="p-3 border border-purple-100">{it ? 'Elaborazione pagamenti' : 'Payment processing'}</td>
                    <td className="p-3 border border-purple-100">USA / EU</td>
                    <td className="p-3 border border-purple-100">SCCs + EU-US DPF</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-purple-100">Vercel, Inc.</td>
                    <td className="p-3 border border-purple-100">{it ? 'Hosting applicazione web' : 'Web application hosting'}</td>
                    <td className="p-3 border border-purple-100">USA / EU edge</td>
                    <td className="p-3 border border-purple-100">SCCs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              {it
                ? 'SCCs = Clausole Contrattuali Standard (Decisione della Commissione UE 2021/914). DPF = Framework sulla Privacy dei Dati UE-USA.'
                : 'SCCs = Standard Contractual Clauses (EU Commission Decision 2021/914). DPF = EU-US Data Privacy Framework.'}
            </p>
          </Section>

          <Section title={it ? '6. Conservazione dei Dati' : '6. Data Retention'}>
            <div className="mt-2 space-y-2">
              {(it ? [
                ['Immagini caricate e output', '30 giorni dalla data di caricamento (eliminazione automatica)'],
                ['Dati dell\'account (nome, email)', 'Durata dell\'account + 30 giorni dopo la richiesta di eliminazione'],
                ['Log di utilizzo e metadati dei job', '90 giorni per scopi operativi'],
                ['Registri di fatturazione e transazioni', '7 anni (requisito della legge fiscale italiana)'],
                ['Log di sicurezza e audit', '12 mesi'],
                ['Registri dei consensi', 'Fino alla revoca del consenso + 1 anno'],
              ] : [
                ['Uploaded images and Outputs', '30 days from upload date (automatic deletion)'],
                ['Account data (name, email)', 'Duration of Account + 30 days after deletion request'],
                ['Usage logs and job metadata', '90 days for operational purposes'],
                ['Billing and transaction records', '7 years (Italian fiscal law requirement)'],
                ['Security and audit logs', '12 months'],
                ['Consent records', 'Until consent is withdrawn + 1 year'],
              ]).map(([type, period]) => (
                <div key={type} className="flex justify-between items-start gap-4 py-2 border-b border-gray-100 text-sm">
                  <span className="text-gray-700">{type}</span>
                  <span className="text-gray-500 text-right shrink-0">{period}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title={it ? '7. I Tuoi Diritti ai sensi del GDPR' : '7. Your Rights Under GDPR'}>
            <p>{it ? 'Come interessato ai sensi del Capitolo III del GDPR, hai i seguenti diritti:' : 'As a data subject under GDPR Chapter III, you have the following rights:'}</p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(it ? [
                ['Diritto di Accesso (Art. 15)', 'Richiedere una copia di tutti i dati personali che conserviamo su di te.'],
                ['Diritto di Rettifica (Art. 16)', 'Correggere dati personali inesatti o incompleti.'],
                ['Diritto alla Cancellazione (Art. 17)', 'Richiedere la cancellazione dei tuoi dati ("diritto all\'oblio"), fatti salvi gli obblighi legali di conservazione.'],
                ['Diritto alla Portabilità dei Dati (Art. 20)', 'Ricevere i tuoi dati in un formato strutturato e leggibile da macchina (JSON/CSV).'],
                ['Diritto di Limitazione (Art. 18)', 'Richiedere che limitiamo il trattamento dei tuoi dati in determinate circostanze.'],
                ['Diritto di Opposizione (Art. 21)', 'Opporsi al trattamento basato sull\'interesse legittimo o per marketing diretto.'],
                ['Diritto di Revocare il Consenso (Art. 7(3))', 'Revocare il consenso in qualsiasi momento senza pregiudicare la liceità del trattamento precedente.'],
                ['Diritto di Proporre Reclamo (Art. 77)', 'Presentare un reclamo al Garante per la Protezione dei Dati Personali (Autorità di controllo italiana) o alla tua autorità di controllo locale.'],
              ] : [
                ['Right of Access (Art. 15)', 'Request a copy of all personal data we hold about you.'],
                ['Right to Rectification (Art. 16)', 'Correct inaccurate or incomplete personal data.'],
                ['Right to Erasure (Art. 17)', 'Request deletion of your data ("right to be forgotten"), subject to legal retention obligations.'],
                ['Right to Data Portability (Art. 20)', 'Receive your data in a structured, machine-readable format (JSON/CSV).'],
                ['Right to Restriction (Art. 18)', 'Request that we limit processing of your data in certain circumstances.'],
                ['Right to Object (Art. 21)', 'Object to processing based on legitimate interest or for direct marketing.'],
                ['Right to Withdraw Consent (Art. 7(3))', 'Withdraw consent at any time without affecting prior lawful processing.'],
                ['Right to Lodge a Complaint (Art. 77)', 'File a complaint with the Garante per la Protezione dei Dati Personali (Italian DPA) or your local supervisory authority.'],
              ]).map(([right, desc]) => (
                <div key={right} className="bg-purple-50 rounded-xl p-3 border border-purple-100 text-sm">
                  <p className="font-semibold text-gray-900 mb-1">{right}</p>
                  <p className="text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
              {it ? (
                <><strong>Esercizio automatico dei diritti:</strong> I diritti di cui all&apos;Art. 17 (cancellazione) e Art. 20 (portabilità) possono essere esercitati direttamente dalla tua area personale: <strong>Dashboard → Impostazioni → Privacy &amp; Dati</strong>. Il tuo account e tutti i dati vengono eliminati immediatamente, oppure puoi scaricare un export JSON completo dei tuoi dati.</>
              ) : (
                <><strong>Self-service rights:</strong> Rights under Art. 17 (erasure) and Art. 20 (portability) can be exercised directly from your account: <strong>Dashboard → Settings → Privacy &amp; Data</strong>. Your account and all data are deleted immediately, or you can download a complete JSON export of all your data.</>
              )}
            </div>
            <p className="mt-3">
              {it ? (
                <>Per gli altri diritti, invia una richiesta a{' '}
                <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a>.
                Potremmo chiederti di verificare la tua identità prima di elaborare la richiesta. Risponderemo entro 30 giorni e non addebiteremo alcun costo per richieste ragionevoli.</>
              ) : (
                <>For other rights, submit a request to{' '}
                <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a>.
                We may ask you to verify your identity before processing the request. We will respond within 30 days and will not charge a fee for reasonable requests.</>
              )}
            </p>
          </Section>

          <Section title={it ? '8. Cookie e Tecnologie Simili' : '8. Cookies and Similar Technologies'}>
            <p>
              {it
                ? 'Utilizziamo solo cookie strettamente necessari. Non vengono utilizzati cookie pubblicitari o di tracciamento di terze parti.'
                : 'We use only technically necessary cookies. No advertising or third-party tracking cookies are used.'}
            </p>
            <div className="mt-3 space-y-2">
              {[
                ['auth_token', it ? 'Sessione' : 'Session', it ? 'Conserva il tuo token JWT di autenticazione per mantenerti connesso.' : 'Stores your JWT authentication token to keep you logged in.'],
                ['user', it ? 'Sessione' : 'Session', it ? 'Conserva i dati del profilo utente memorizzati nella cache per evitare chiamate API ridondanti.' : 'Stores cached user profile data to avoid redundant API calls.'],
              ].map(([name, type, purpose]) => (
                <div key={name} className="flex gap-4 py-2 border-b border-gray-100 text-sm items-start">
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-purple-700 font-mono shrink-0">{name}</code>
                  <span className="text-gray-400 shrink-0">{type}</span>
                  <span className="text-gray-600">{purpose}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm">
              {it
                ? 'I cookie strettamente necessari non richiedono il consenso ai sensi del Considerando 47 del GDPR e della Direttiva ePrivacy.'
                : 'Strictly necessary cookies do not require consent under GDPR Recital 47 and the ePrivacy Directive.'}
            </p>
          </Section>

          <Section title={it ? '9. Misure di Sicurezza' : '9. Security Measures'}>
            <p>{it ? 'Implementiamo adeguate misure di sicurezza tecniche e organizzative, tra cui:' : 'We implement appropriate technical and organizational security measures, including:'}</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              {it ? (
                <>
                  <li>Crittografia TLS 1.2+ per tutti i dati in transito</li>
                  <li>Crittografia AES-256 a riposo su AWS S3</li>
                  <li>Autenticazione tramite AWS Cognito con hashing sicuro delle password (bcrypt)</li>
                  <li>Controlli di accesso basati sui ruoli e principio del privilegio minimo per i sistemi interni</li>
                  <li>Scadenza automatica ed eliminazione dei dati immagine archiviati dopo 30 giorni</li>
                  <li>Revisioni periodiche della sicurezza e aggiornamenti delle dipendenze</li>
                </>
              ) : (
                <>
                  <li>TLS 1.2+ encryption for all data in transit</li>
                  <li>AES-256 encryption at rest on AWS S3</li>
                  <li>Authentication via AWS Cognito with secure password hashing (bcrypt)</li>
                  <li>Role-based access controls and principle of least privilege for internal systems</li>
                  <li>Automatic expiry and deletion of stored image data after 30 days</li>
                  <li>Regular security reviews and dependency updates</li>
                </>
              )}
            </ul>
            <p className="mt-3">
              {it
                ? 'In caso di violazione dei dati personali che possa comportare un rischio per i tuoi diritti e libertà, notificheremo l\'autorità di controllo competente entro 72 ore e gli utenti interessati senza indebito ritardo, come richiesto dagli Art. 33-34 del GDPR.'
                : 'In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify the competent supervisory authority within 72 hours and affected users without undue delay, as required by GDPR Art. 33-34.'}
            </p>
          </Section>

          <Section title={it ? '10. Privacy dei Minori' : '10. Children\'s Privacy'}>
            <p>
              {it ? (
                <>Il Servizio non è rivolto a persone di età inferiore ai 16 anni. Non raccogliamo consapevolmente dati personali di minori. Se veniamo a conoscenza di aver raccolto inavvertitamente dati di un minore, li elimineremo tempestivamente. Se ritieni che un minore ci abbia fornito dati personali, contattaci all&apos;indirizzo{' '}
                <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a>.</>
              ) : (
                <>The Service is not directed to individuals under the age of 16. We do not knowingly collect personal data from children. If we become aware that we have inadvertently collected data from a child, we will delete it promptly. If you believe a child has provided us with personal data, contact us at{' '}
                <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a>.</>
              )}
            </p>
          </Section>

          <Section title={it ? '11. Modifiche alla Presente Informativa' : '11. Changes to This Policy'}>
            <p>
              {it
                ? 'Potremmo aggiornare periodicamente la presente Informativa sulla Privacy. Per modifiche sostanziali, forniremo un preavviso di almeno 14 giorni tramite email o notifica in-app, con un riepilogo delle modifiche. La versione aggiornata sarà efficace dalla data indicata in cima. Il tuo uso continuato del Servizio dopo tale data costituisce accettazione delle modifiche.'
                : 'We may update this Privacy Policy from time to time. For material changes, we will provide at least 14 days\' notice via email or an in-app notification, with a summary of what has changed. The updated version will be effective as of the date indicated at the top. Your continued use of the Service after that date constitutes acceptance of the changes.'}
            </p>
            <p className="mt-2">
              {it
                ? 'Manteniamo un registro delle modifiche sostanziali a questa informativa. Puoi richiederne una copia contattandoci.'
                : 'We maintain a change log of material updates to this policy. You may request a copy by contacting us.'}
            </p>
          </Section>

          <Section title={it ? '12. Contatti e Reclami' : '12. Contact and Complaints'}>
            <p>
              {it ? 'Per qualsiasi domanda relativa alla privacy o per esercitare i tuoi diritti:' : 'For any privacy-related questions or to exercise your rights:'}
            </p>
            <div className="mt-3 bg-purple-50 rounded-xl p-4 border border-purple-100 text-sm">
              <p><strong>Email:</strong> <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a></p>
              <p className="mt-1"><strong>{it ? 'Tempo di risposta:' : 'Response time:'}</strong> {it ? 'Entro 30 giorni' : 'Within 30 days'}</p>
            </div>
            <p className="mt-3">
              {it
                ? 'Se non sei soddisfatto della nostra risposta, hai il diritto di presentare un reclamo all\'Autorità Garante per la Protezione dei Dati Personali italiana:'
                : 'If you are not satisfied with our response, you have the right to lodge a complaint with the Italian Data Protection Authority:'}
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
            {it ? 'Termini di Servizio' : 'Terms of Service'}
          </Link>
          <span className="hidden sm:inline">·</span>
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
