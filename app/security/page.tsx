'use client'

import Link from 'next/link'
import { Lock, Globe, Shield, Trash2, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SecurityPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{it ? 'Sicurezza' : 'Security'}</h1>
          <p className="text-gray-500 text-sm">{it ? 'Ultimo aggiornamento: 22 febbraio 2026' : 'Last updated: February 22, 2026'}</p>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            {it
              ? 'La sicurezza è integrata in ogni livello della piattaforma Centyr, dall\'infrastruttura su cui operiamo al modo in cui le tue immagini vengono archiviate ed eliminate.'
              : 'Security is built into every layer of the Centyr platform, from the infrastructure we run on to the way your images are stored and deleted.'}
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {([
            { Icon: Lock, label: it ? 'TLS 1.3 Crittografato' : 'TLS 1.3 Encrypted' },
            { Icon: Globe, label: it ? 'Infrastruttura UE' : 'EU Infrastructure' },
            { Icon: Shield, label: 'Cloudflare WAF' },
            { Icon: Trash2, label: it ? 'Eliminazione Auto 30g' : 'Auto-Delete 30d' },
          ] as { Icon: (p: { className?: string }) => JSX.Element; label: string }[]).map(({ Icon, label }) => (
            <div key={label} className="bg-white border-2 border-purple-100 rounded-xl p-4 text-center shadow-sm">
              <div className="flex justify-center mb-2"><Icon className="w-6 h-6 text-purple-600" /></div>
              <div className="text-xs font-semibold text-gray-700">{label}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

          <Section title={it ? 'Infrastruttura' : 'Infrastructure'}>
            <p>
              {it ? (
                <>Centyr opera su AWS nella regione <strong>eu-west-3 (Parigi)</strong>. Tutti i dati degli utenti restano all&apos;interno dell&apos;UE.</>
              ) : (
                <>Centyr runs on AWS in the <strong>eu-west-3 (Paris)</strong> region. All user data stays within the EU.</>
              )}
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              {it ? (
                <>
                  <li>Server API su AWS EC2 dietro proxy inverso Nginx</li>
                  <li>Elaborazione immagini su AWS ECS Fargate (container isolati per workload)</li>
                  <li>Archiviazione immagini su Amazon S3 con ACL privati e crittografia lato server (AES-256)</li>
                  <li>Database su Amazon DynamoDB con crittografia a riposo</li>
                  <li>Tutti i servizi operano all&apos;interno di un VPC AWS con security group restrittivi</li>
                </>
              ) : (
                <>
                  <li>API server on AWS EC2 behind Nginx reverse proxy</li>
                  <li>Image processing on AWS ECS Fargate (isolated containers per workload)</li>
                  <li>Image storage on Amazon S3 with private ACLs and server-side encryption (AES-256)</li>
                  <li>Database on Amazon DynamoDB with encryption at rest</li>
                  <li>All services run inside an AWS VPC with strict security groups</li>
                </>
              )}
            </ul>
          </Section>

          <Section title={it ? 'Crittografia' : 'Encryption'}>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-sm">
              {it ? (
                <>
                  <li><strong>In transito:</strong> TLS 1.2/1.3 applicato su tutte le connessioni. HTTP viene reindirizzato permanentemente a HTTPS. Suite di cifratura limitate a ECDHE con AES-GCM e ChaCha20-Poly1305.</li>
                  <li><strong>A riposo:</strong> Oggetti S3 crittografati con AES-256 (SSE-S3). Tabelle DynamoDB crittografate a riposo. Backup crittografati.</li>
                  <li><strong>URL firmati:</strong> URL di accesso temporanei alle immagini che scadono dopo 1 ora. Nessuna immagine è mai accessibile pubblicamente.</li>
                </>
              ) : (
                <>
                  <li><strong>In transit:</strong> TLS 1.2/1.3 enforced on all connections. HTTP is permanently redirected to HTTPS. Cipher suites restricted to ECDHE with AES-GCM and ChaCha20-Poly1305.</li>
                  <li><strong>At rest:</strong> S3 objects encrypted with AES-256 (SSE-S3). DynamoDB tables encrypted at rest. Backups encrypted.</li>
                  <li><strong>Presigned URLs:</strong> Temporary access URLs for images expire after 1 hour. No image is ever publicly accessible.</li>
                </>
              )}
            </ul>
          </Section>

          <Section title={it ? 'Sicurezza di Rete' : 'Network Security'}>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              {it ? (
                <>
                  <li><strong>Cloudflare:</strong> Tutto il traffico passa attraverso Cloudflare per protezione DDoS, Web Application Firewall (WAF) e rate limiting prima di raggiungere i nostri server</li>
                  <li><strong>Security group:</strong> Le istanze EC2 ed ECS accettano traffico solo dagli indirizzi IP di Cloudflare e dai servizi interni</li>
                  <li><strong>Nessun accesso pubblico S3:</strong> I bucket S3 hanno l&apos;accesso pubblico completamente bloccato. I file sono accessibili solo tramite URL firmati autenticati</li>
                  <li><strong>CORS:</strong> La condivisione delle risorse tra origini diverse è limitata solo a centyr.tech</li>
                </>
              ) : (
                <>
                  <li><strong>Cloudflare:</strong> All traffic passes through Cloudflare for DDoS protection, Web Application Firewall (WAF), and rate limiting before reaching our servers</li>
                  <li><strong>Security groups:</strong> EC2 and ECS instances only accept traffic from Cloudflare IP ranges and internal services</li>
                  <li><strong>No public S3 access:</strong> S3 buckets have public access fully blocked. Files are accessible only via authenticated presigned URLs</li>
                  <li><strong>CORS:</strong> Cross-Origin Resource Sharing is restricted to centyr.tech only</li>
                </>
              )}
            </ul>
          </Section>

          <Section title={it ? 'Autenticazione e Controllo degli Accessi' : 'Authentication & Access Control'}>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              {it ? (
                <>
                  <li>Autenticazione utente gestita da <strong>AWS Cognito</strong>, non archiviamo mai le password direttamente</li>
                  <li>JWT firmati con RS256; chiavi pubbliche verificate dall&apos;endpoint JWKS di Cognito (aggiornate ogni ora)</li>
                  <li>OAuth 2.0 supportato (Google, Apple) per accesso senza password</li>
                  <li>Tutti gli endpoint API richiedono un token Bearer valido; nessun endpoint sensibile è accessibile pubblicamente</li>
                  <li>I ruoli AWS IAM seguono il principio del privilegio minimo, ogni servizio ha solo le autorizzazioni di cui ha bisogno</li>
                  <li>Le credenziali AWS interne utilizzano ruoli IAM delle istanze; nessuna chiave di accesso a lunga durata nel codice dell&apos;applicazione</li>
                </>
              ) : (
                <>
                  <li>User authentication managed by <strong>AWS Cognito</strong>, we never store passwords directly</li>
                  <li>JWTs signed with RS256; public keys verified from Cognito&apos;s JWKS endpoint (refreshed hourly)</li>
                  <li>OAuth 2.0 supported (Google, Apple) for passwordless sign-in</li>
                  <li>All API endpoints require a valid Bearer token; no sensitive endpoint is publicly accessible</li>
                  <li>AWS IAM roles follow least-privilege principle, each service has only the permissions it needs</li>
                  <li>Internal AWS credentials use IAM instance roles; no long-lived access keys in application code</li>
                </>
              )}
            </ul>
          </Section>

          <Section title={it ? 'Isolamento dei Dati' : 'Data Isolation'}>
            <p>{it ? 'I tuoi dati sono completamente isolati da quelli degli altri utenti:' : 'Your data is fully isolated from other users:'}</p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              {it ? (
                <>
                  <li>Ogni oggetto S3 è archiviato in un percorso limitato al tuo ID utente</li>
                  <li>Tutti gli endpoint API verificano che l&apos;utente richiedente sia proprietario della risorsa prima di servirla</li>
                  <li>Gli ID dei job sono UUID; l&apos;enumerazione sequenziale non è possibile</li>
                  <li>I container di elaborazione (ECS Fargate) sono effimeri e isolati, non condividono memoria o storage tra job</li>
                </>
              ) : (
                <>
                  <li>Every S3 object is stored under a path scoped to your user ID</li>
                  <li>All API endpoints validate that the requesting user owns the resource before serving it</li>
                  <li>Job IDs are UUIDs; sequential enumeration is not possible</li>
                  <li>Processing containers (ECS Fargate) are ephemeral and isolated, they do not share memory or storage across jobs</li>
                </>
              )}
            </ul>
          </Section>

          <Section title={it ? 'Conservazione ed Eliminazione dei Dati' : 'Data Retention & Deletion'}>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              {it ? (
                <>
                  <li>Le immagini caricate vengono <strong>eliminate automaticamente dopo 30 giorni</strong> tramite policy del ciclo di vita S3</li>
                  <li>Le immagini di output elaborate vengono <strong>eliminate automaticamente dopo 30 giorni</strong></li>
                  <li>I dati dell&apos;account vengono eliminati entro 30 giorni da una richiesta di eliminazione account</li>
                  <li>I registri di fatturazione vengono conservati per 7 anni come richiesto dalla legge fiscale italiana</li>
                  <li>Puoi richiedere l&apos;eliminazione immediata dei tuoi dati inviando un&apos;email a <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a></li>
                </>
              ) : (
                <>
                  <li>Uploaded images are <strong>automatically deleted after 30 days</strong> via S3 lifecycle policy</li>
                  <li>Processed output images are <strong>automatically deleted after 30 days</strong></li>
                  <li>Account data is deleted within 30 days of an account deletion request</li>
                  <li>Billing records are retained for 7 years as required by Italian tax law</li>
                  <li>You can request immediate deletion of your data by emailing <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline">privacy@centyr.tech</a></li>
                </>
              )}
            </ul>
          </Section>

          <Section title={it ? 'Sicurezza dell\'Applicazione' : 'Application Security'}>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              {it ? (
                <>
                  <li>Header di sicurezza HTTP su tutte le risposte: <code className="bg-gray-100 px-1 rounded text-xs">X-Frame-Options: DENY</code>, <code className="bg-gray-100 px-1 rounded text-xs">X-Content-Type-Options: nosniff</code>, <code className="bg-gray-100 px-1 rounded text-xs">HSTS</code>, <code className="bg-gray-100 px-1 rounded text-xs">Content-Security-Policy</code></li>
                  <li>I file caricati vengono validati per tipo MIME (magic bytes), non solo per estensione</li>
                  <li>Dimensione massima di caricamento applicata sia a livello API che Nginx</li>
                  <li>Tutti i parametri di percorso forniti dall&apos;utente (ID job) vengono validati come UUID per prevenire injection</li>
                  <li>I dettagli degli errori interni non vengono mai esposti nelle risposte API</li>
                  <li>Elaborazione pagamenti gestita esclusivamente da <strong>Stripe</strong>, i dati della carta non toccano mai i nostri server</li>
                </>
              ) : (
                <>
                  <li>HTTP security headers on all responses: <code className="bg-gray-100 px-1 rounded text-xs">X-Frame-Options: DENY</code>, <code className="bg-gray-100 px-1 rounded text-xs">X-Content-Type-Options: nosniff</code>, <code className="bg-gray-100 px-1 rounded text-xs">HSTS</code>, <code className="bg-gray-100 px-1 rounded text-xs">Content-Security-Policy</code></li>
                  <li>File uploads validated by MIME type (magic bytes), not just file extension</li>
                  <li>Maximum upload size enforced at both the API and Nginx levels</li>
                  <li>All user-supplied path parameters (job IDs) validated as UUIDs to prevent injection</li>
                  <li>Internal error details never exposed in API responses</li>
                  <li>Payment processing handled exclusively by <strong>Stripe</strong>, card data never touches our servers</li>
                </>
              )}
            </ul>
          </Section>

          <Section title={it ? 'Sicurezza dei Pagamenti' : 'Payments Security'}>
            <p>
              {it ? (
                <>Tutta l&apos;elaborazione dei pagamenti è gestita da <strong>Stripe</strong>, un provider di pagamenti certificato PCI DSS Livello 1. Centyr non archivia, trasmette né ha accesso al tuo numero di carta, CVV o dati di fatturazione completi. Le pratiche di sicurezza di Stripe sono documentate su{' '}
                <a href="https://stripe.com/docs/security" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">stripe.com/docs/security</a>.</>
              ) : (
                <>All payment processing is handled by <strong>Stripe</strong>, a PCI DSS Level 1 certified payment provider. Centyr never stores, transmits, or has access to your card number, CVV, or full billing details. Stripe&apos;s security practices are documented at{' '}
                <a href="https://stripe.com/docs/security" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">stripe.com/docs/security</a>.</>
              )}
            </p>
          </Section>

          <Section title={it ? 'Divulgazione delle Vulnerabilità' : 'Vulnerability Disclosure'}>
            <p>
              {it
                ? 'Prendiamo sul serio le vulnerabilità di sicurezza. Se scopri un problema di sicurezza nella piattaforma Centyr, ti preghiamo di segnalarlo responsabilmente:'
                : 'We take security vulnerabilities seriously. If you discover a security issue in the Centyr platform, please report it responsibly:'}
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              {it ? (
                <>
                  <li>Email: <a href="mailto:security@centyr.tech" className="text-purple-600 hover:underline">security@centyr.tech</a></li>
                  <li>Includi una descrizione della vulnerabilità e i passaggi per riprodurla</li>
                  <li>Risponderemo alla tua segnalazione entro 48 ore e puntiamo a risolvere i problemi critici entro 7 giorni</li>
                  <li>Ti chiediamo di non divulgare pubblicamente la vulnerabilità finché non avremo avuto la possibilità di affrontarla</li>
                </>
              ) : (
                <>
                  <li>Email: <a href="mailto:security@centyr.tech" className="text-purple-600 hover:underline">security@centyr.tech</a></li>
                  <li>Please include a description of the vulnerability and steps to reproduce it</li>
                  <li>We will acknowledge your report within 48 hours and aim to resolve critical issues within 7 days</li>
                  <li>We request that you do not publicly disclose the vulnerability until we have had the opportunity to address it</li>
                </>
              )}
            </ul>
          </Section>

          <Section title={it ? 'Risposta agli Incidenti' : 'Incident Response'}>
            <p>
              {it ? 'In caso di incidente di sicurezza che riguardi i tuoi dati personali, noi:' : 'In the event of a security incident affecting your personal data, we will:'}
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
              {it ? (
                <>
                  <li>Notificheremo gli utenti interessati entro 72 ore se richiesto dall&apos;Art. 34 GDPR</li>
                  <li>Segnaleremo l&apos;incidente al Garante italiano entro 72 ore come richiesto dall&apos;Art. 33 GDPR</li>
                  <li>Forniremo dettagli sulla natura della violazione, i dati interessati e le misure adottate per mitigarla</li>
                </>
              ) : (
                <>
                  <li>Notify affected users within 72 hours if required under GDPR Art. 34</li>
                  <li>Report the incident to the Italian DPA (Garante) within 72 hours as required by GDPR Art. 33</li>
                  <li>Provide details on the nature of the breach, data affected, and steps taken to mitigate it</li>
                </>
              )}
            </ul>
          </Section>

        </div>

        {/* Footer links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/privacy" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">
            {it ? 'Informativa sulla Privacy' : 'Privacy Policy'}
          </Link>
          <span>·</span>
          <Link href="/gdpr-compliance" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">
            {it ? 'GDPR & Cookie' : 'GDPR & Cookies'}
          </Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-4 h-4 inline mr-1" />{it ? 'Torna alla Home' : 'Back to Home'}
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
