import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { posts } from '../_data'
import BlogPostClient from './BlogPostClient'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts.find(p => p.slug === params.slug)
  if (!post) return {}

  const title = `${post.title.en} | Centyr Blog`
  const description = post.excerpt.en

  return {
    title,
    description,
    openGraph: {
      title: post.title.en,
      description,
      type: 'article',
      url: `https://centyr.tech/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title.en,
      description,
    },
    alternates: {
      canonical: `https://centyr.tech/blog/${post.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = posts.find(p => p.slug === params.slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title.en,
    description: post.excerpt.en,
    datePublished: post.isoDate ?? new Date().toISOString(),
    author: { '@type': 'Organization', name: 'Centyr' },
    publisher: {
      '@type': 'Organization',
      name: 'Centyr',
      url: 'https://centyr.tech',
    },
    url: `https://centyr.tech/blog/${post.slug}`,
    mainEntityOfPage: `https://centyr.tech/blog/${post.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient slug={params.slug} />
    </>
  )
}
