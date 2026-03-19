import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Centyr — Product Photography & E-commerce Automation',
  description: 'Guides, case studies, and tips on product photography, image processing automation, and e-commerce optimization. Learn how to save hours of manual editing.',
  openGraph: {
    title: 'Centyr Blog — Product Photography & E-commerce Automation',
    description: 'Guides, case studies, and tips on product photography and e-commerce image automation.',
    type: 'website',
    url: 'https://centyr.tech/blog',
  },
  alternates: {
    canonical: 'https://centyr.tech/blog',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
