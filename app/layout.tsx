import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AppProviders } from '@/components/providers/AppProviders'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Centyr - Align Product Photos Automatically | AI Image Alignment for E-commerce',
  description: 'Automatically align and center your product photos in seconds. AI-powered tool removes shadows and creates perfectly aligned images for your online store. Start free.',
  keywords: 'product image alignment, align product photos, center product images, automatic product photo alignment tool, e-commerce image processing',
  openGraph: {
    title: 'Centyr - Align All Your Product Photos in Seconds',
    description: 'Stop wasting hours on manual editing. Centyr\'s AI automatically centers your products, removes shadows, and creates perfectly aligned photos.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://js.stripe.com/v3/pricing-table.js">
        </script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <AppProviders>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#1f2937',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                padding: '1rem',
                fontSize: '0.875rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              },
              success: {
                iconTheme: {
                  primary: '#8b5cf6',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AppProviders>
      </body>
    </html>
  )
}
