import type { Metadata } from 'next'
import './globals.css'

import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'

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
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
