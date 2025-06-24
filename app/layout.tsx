import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'StartingPoints - AI Coding Rules Generator',
  description: 'Generate customized rules files for Cursor, Claude, Windsurf, and Aider. Set the perfect foundation for your AI coding assistant.',
  keywords: 'AI coding, Cursor rules, Claude rules, Windsurf rules, Aider conventions, AI development tools',
  authors: [{ name: 'StartingPoints' }],
  openGraph: {
    title: 'StartingPoints - AI Coding Rules Generator',
    description: 'Generate customized rules files for AI coding assistants',
    type: 'website',
    images: [
      {
        url: '/ogimage.png',
        width: 1200,
        height: 630,
        alt: 'StartingPoints - AI Coding Rules Generator',
      }
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/startingpoints-logo.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}