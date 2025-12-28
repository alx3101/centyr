'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'How does the AI work?',
      answer: 'Centyr uses advanced computer vision to detect your actual product (not just the image boundaries), then intelligently centers it while removing shadows and reflections. Unlike generic tools, we understand product context.',
    },
    {
      question: 'What image formats are supported?',
      answer: 'JPG, PNG, WebP, and HEIC. Max size: 50MB per image.',
    },
    {
      question: 'Can I use Centyr with any e-commerce platform?',
      answer: 'Yes! Works with Shopify, WooCommerce, BigCommerce, Magento, or manual upload. Our API integrates with anything.',
    },
    {
      question: 'What if I don\'t like the results?',
      answer: 'We have a 30-day money-back guarantee. Plus, you can customize templates and adjust settings to match your preferences.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. Images are encrypted in transit and at rest. We delete processed images after 30 days. SOC 2 Type II compliant.',
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, cancel anytime from your dashboard. No long-term contracts, no cancellation fees.',
    },
    {
      question: 'Do you offer white-label for agencies?',
      answer: 'Yes! Our Scale plan includes white-label options. Contact sales for custom agency pricing.',
    },
    {
      question: 'What\'s your uptime SLA?',
      answer: '99.9% uptime on all paid plans. Enterprise plans include 99.99% SLA.',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-white via-purple-50 to-fuchsia-50 relative overflow-hidden">
      {/* Animated background decoration */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-200 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Everything you need to know about Centyr
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg overflow-hidden transition-all duration-300 animate-fade-in-up ${
                openIndex === index
                  ? 'border-fuchsia-400 shadow-xl glow-purple bg-white'
                  : 'border-gray-200 hover:border-fuchsia-300 hover:shadow-lg bg-white/80 backdrop-blur-sm'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-purple-50 transition-all duration-300 group"
              >
                <span className={`font-semibold pr-4 transition-colors duration-300 ${openIndex === index ? 'text-gradient' : 'text-gray-900'}`}>{faq.question}</span>
                <span className={`text-2xl flex-shrink-0 transition-all duration-500 ${openIndex === index ? 'text-fuchsia-500 rotate-180 scale-110' : 'text-primary-500 rotate-0 scale-100'}`}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className={`px-6 py-4 bg-gradient-to-br from-purple-50 to-fuchsia-50 border-t border-fuchsia-200 transform transition-all duration-500 ${
                  openIndex === index
                    ? 'translate-y-0 scale-100'
                    : '-translate-y-4 scale-95'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-fuchsia-500 text-xl animate-scale-in" style={{ animationDelay: '0.2s' }}>✓</span>
                    <p className="text-gray-700 leading-relaxed flex-1">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
