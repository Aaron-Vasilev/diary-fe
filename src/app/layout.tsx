import type { Metadata } from 'next'
import '../styles/globals.css'
import { Layout } from '../components/Layout'
import { Context } from '../store/context'
 
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
          <Context>
           {children}
          </Context>
        </Layout>
      </body>
    </html>
  )
}
