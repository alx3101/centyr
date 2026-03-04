'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const services = [
  { key: 'api', en: 'REST API', it: 'REST API' },
  { key: 'web', en: 'Web Application', it: 'Applicazione Web' },
  { key: 'processing', en: 'Image Processing Pipeline', it: 'Pipeline di Elaborazione Immagini' },
  { key: 'storage', en: 'File Storage (S3)', it: 'Archiviazione File (S3)' },
  { key: 'auth', en: 'Authentication', it: 'Autenticazione' },
  { key: 'billing', en: 'Billing & Payments', it: 'Fatturazione & Pagamenti' },
]

const uptime = [
  { label: '90d', value: '99.97%' },
  { label: '30d', value: '99.99%' },
  { label: '7d', value: '100%' },
]

export default function StatusPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">Centyr</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{it ? 'Stato del Servizio' : 'Service Status'}</h1>
          <p className="text-gray-500 text-sm">
            {it ? 'Monitoraggio in tempo reale dell\'infrastruttura Centyr.' : 'Real-time monitoring of Centyr infrastructure.'}
          </p>
        </div>

        {/* Overall status */}
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-6 flex items-center gap-4">
          <div className="w-4 h-4 rounded-full bg-green-500 shrink-0 animate-pulse" />
          <div>
            <p className="font-bold text-green-800 text-lg">
              {it ? 'Tutti i sistemi operativi' : 'All systems operational'}
            </p>
            <p className="text-green-700 text-sm">
              {it ? 'Nessun incidente in corso.' : 'No ongoing incidents.'}
            </p>
          </div>
        </div>

        {/* Uptime */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {uptime.map(({ label, value }) => (
            <div key={label} className="bg-white border-2 border-purple-100 rounded-xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-purple-600">{value}</div>
              <div className="text-xs text-gray-500 mt-1">{it ? `Uptime ${label}` : `${label} Uptime`}</div>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-purple-50">
            <h2 className="font-bold text-gray-900">{it ? 'Componenti' : 'Components'}</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {services.map(({ key, en, it: itLabel }) => (
              <div key={key} className="flex items-center justify-between px-6 py-4">
                <span className="text-sm text-gray-700">{it ? itLabel : en}</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-green-700 font-medium">{it ? 'Operativo' : 'Operational'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident history */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">{it ? 'Storico Incidenti' : 'Incident History'}</h2>
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-sm">
              {it ? 'Nessun incidente negli ultimi 90 giorni.' : 'No incidents in the past 90 days.'}
            </p>
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6">
          <h2 className="font-bold text-gray-900 mb-3">{it ? 'Manutenzioni Programmate' : 'Scheduled Maintenance'}</h2>
          <p className="text-sm text-gray-500">
            {it
              ? 'Nessuna manutenzione pianificata. Gli avvisi vengono inviati via email con almeno 48 ore di anticipo.'
              : 'No scheduled maintenance. Notices are sent via email at least 48 hours in advance.'}
          </p>
          <p className="text-xs text-gray-400 mt-3">
            {it
              ? 'Per segnalare un problema: '
              : 'To report an issue: '}
            <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline">support@centyr.tech</a>
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/sla" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">SLA</Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors">{it ? '← Torna alla Home' : '← Back to Home'}</Link>
        </div>
      </div>
    </div>
  )
}
