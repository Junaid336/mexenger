import type { Metadata } from 'next'
import './globals.css'



export const metadata: Metadata = {
  title: 'Mexenger',
  description: 'Chat App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
