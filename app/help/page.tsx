'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const faqs = [
  {
    en: {
      q: 'What does Centyr do?',
      a: 'Centyr is an AI-powered pipeline that automatically processes your product photos: it centers the subject, removes the background (optional), applies a custom or white background, and outputs images in your chosen size. No manual editing required.',
    },
    it: {
      q: 'Cosa fa Centyr?',
      a: 'Centyr è una pipeline AI che elabora automaticamente le tue foto prodotto: centra il soggetto, rimuove lo sfondo (opzionale), applica uno sfondo personalizzato o bianco e genera le immagini nelle dimensioni scelte. Nessuna modifica manuale richiesta.',
    },
  },
  {
    en: {
      q: 'What image formats are supported?',
      a: 'We accept JPG, PNG, and WEBP. Output is always generated as PNG (lossless) or JPG. Maximum file size per image is 25 MB.',
    },
    it: {
      q: 'Quali formati immagine sono supportati?',
      a: 'Accettiamo JPG, PNG e WEBP. L\'output viene sempre generato come PNG (lossless) o JPG. La dimensione massima per immagine è 25 MB.',
    },
  },
  {
    en: {
      q: 'What is a "job"?',
      a: 'A job is a batch of images submitted together in a single upload. Each upload session creates one job. The Free plan allows 1 image per job and 3 jobs per month. Paid plans allow more images per job and more jobs per month.',
    },
    it: {
      q: 'Cos\'è un "job"?',
      a: 'Un job è un batch di immagini inviate insieme in un unico caricamento. Ogni sessione di upload crea un job. Il piano Gratuito consente 1 immagine per job e 3 jobs al mese. I piani a pagamento consentono più immagini per job e più jobs al mese.',
    },
  },
  {
    en: {
      q: 'How long does processing take?',
      a: 'Processing typically takes 10–60 seconds per image depending on your plan. Premium users get priority processing (≤ 60s/image). Free plan is best-effort (≤ 120s). You\'ll receive an email notification when your job is complete.',
    },
    it: {
      q: 'Quanto tempo richiede l\'elaborazione?',
      a: 'L\'elaborazione richiede tipicamente 10–60 secondi per immagine a seconda del piano. Gli utenti Premium hanno priorità (≤ 60s/immagine). Il piano Gratuito è best-effort (≤ 120s). Riceverai una notifica email quando il job è completato.',
    },
  },
  {
    en: {
      q: 'For how long are my images stored?',
      a: 'Uploaded images and processed outputs are stored for 30 days from the upload date, then automatically deleted. Download your results before the expiry. You can also request immediate deletion by emailing privacy@centyr.tech.',
    },
    it: {
      q: 'Per quanto tempo vengono conservate le mie immagini?',
      a: 'Le immagini caricate e gli output elaborati vengono conservati per 30 giorni dalla data di caricamento, poi eliminati automaticamente. Scarica i risultati prima della scadenza. Puoi anche richiedere l\'eliminazione immediata scrivendo a privacy@centyr.tech.',
    },
  },
  {
    en: {
      q: 'Does Centyr use my images to train AI models?',
      a: 'No. Your images are never used to train, fine-tune, or improve our models. We are committed to keeping your product images private and confidential.',
    },
    it: {
      q: 'Centyr usa le mie immagini per addestrare modelli AI?',
      a: 'No. Le tue immagini non vengono mai usate per addestrare, ottimizzare o migliorare i nostri modelli. Ci impegniamo a mantenere le tue immagini prodotto private e riservate.',
    },
  },
  {
    en: {
      q: 'Can I cancel my subscription at any time?',
      a: 'Yes. You can cancel from the billing settings in your dashboard at any time. Cancellation takes effect at the end of the current billing period. New subscribers also benefit from a 30-day money-back guarantee.',
    },
    it: {
      q: 'Posso cancellare l\'abbonamento in qualsiasi momento?',
      a: 'Sì. Puoi cancellare dalle impostazioni di fatturazione nella dashboard in qualsiasi momento. La cancellazione ha effetto al termine del periodo di fatturazione corrente. I nuovi abbonati beneficiano anche di una garanzia soddisfatti o rimborsati di 30 giorni.',
    },
  },
  {
    en: {
      q: 'Where is my data stored?',
      a: 'All data is stored in the EU — specifically on Amazon Web Services in the eu-west-3 (Paris) region. We are fully GDPR compliant.',
    },
    it: {
      q: 'Dove vengono archiviati i miei dati?',
      a: 'Tutti i dati sono archiviati nell\'UE — specificatamente su Amazon Web Services nella regione eu-west-3 (Parigi). Siamo pienamente conformi al GDPR.',
    },
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full text-left py-4 flex items-start justify-between gap-4 text-sm font-medium text-gray-800 hover:text-purple-700 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>
        <span
          className="text-purple-400 shrink-0 text-lg leading-none transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '300px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="pb-4 text-sm text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function HelpPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">Centyr</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {it ? 'Centro Assistenza' : 'Help Center'}
          </h1>
          <p className="text-gray-500 text-sm">
            {it ? 'Domande frequenti su Centyr.' : 'Frequently asked questions about Centyr.'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <h2 className="font-bold text-gray-900 mb-4 text-lg">FAQ</h2>
          {faqs.map((faq) => (
            <FaqItem
              key={faq.en.q}
              question={it ? faq.it.q : faq.en.q}
              answer={it ? faq.it.a : faq.en.a}
            />
          ))}
        </div>

        {/* Still need help */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 text-center">
          <h2 className="font-bold text-gray-900 mb-2">{it ? 'Non hai trovato risposta?' : 'Didn\'t find your answer?'}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {it
              ? 'Il nostro team di supporto è disponibile via email.'
              : 'Our support team is available via email.'}
          </p>
          <a
            href="mailto:support@centyr.tech"
            className="inline-block bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition text-sm"
          >
            support@centyr.tech
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/contact" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">
            {it ? 'Contatti' : 'Contact'}
          </Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors flex items-center gap-1"><ArrowLeft className="w-4 h-4" />{it ? 'Torna alla Home' : 'Back to Home'}</Link>
        </div>
      </div>
    </div>
  )
}
