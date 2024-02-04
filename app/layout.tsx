import type { Metadata } from 'next'
import './globals.css'

import ToasterContext from './context/ToasterContext'


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
      <body>
        {children}
        <ToasterContext />
      </body>
    </html>
  )
}
