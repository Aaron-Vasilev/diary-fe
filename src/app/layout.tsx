import type { Metadata } from 'next'
import '../styles/globals.css'
import { Layout } from '../components/Layout'
import { Providers } from '../store/provider'
 
export const metadata: Metadata = {
  title: 'Diary',
  description: 'My diary',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Layout>
          <Providers>
           {children}
          </Providers>
        </Layout>
      </body>
    </html>
  )
}
