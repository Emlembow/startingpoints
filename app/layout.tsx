import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://startingpoints.dev'),
  title: 'StartingPoints - AI Coding Rules Generator',
  description: 'Generate customized rules files for Cursor, Claude, Windsurf, and Aider. Set the perfect foundation for your AI coding assistant.',
  keywords: 'AI coding, Cursor rules, Claude rules, Windsurf rules, Aider conventions, AI development tools',
  authors: [{ name: 'StartingPoints' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'StartingPoints - AI Coding Rules Generator',
    description: 'Generate customized rules files for Cursor, Claude, Windsurf, and Aider. Set the perfect foundation for your AI coding assistant with tailored configurations.',
    type: 'website',
    url: 'https://startingpoints.dev',
    siteName: 'StartingPoints',
    images: [
      {
        url: '/ogimage.png',
        width: 1200,
        height: 630,
        alt: 'StartingPoints - AI Coding Rules Generator for Cursor, Claude, and more',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StartingPoints - AI Coding Rules Generator',
    description: 'Generate customized rules files for Cursor, Claude, Windsurf, and Aider.',
    images: ['/ogimage.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'StartingPoints',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description: 'Generate customized rules files for Cursor, Claude, Windsurf, and Aider. Set the perfect foundation for your AI coding assistant.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '100',
    },
    author: {
      '@type': 'Organization',
      name: 'StartingPoints Contributors',
      url: 'https://github.com/Emlembow/startingpoints',
    },
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/startingpoints-logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}