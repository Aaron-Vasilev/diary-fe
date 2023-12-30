import type { Metadata } from 'next'
import '../styles/globals.css'
import { Layout } from '../components/Layout'
import { Context } from '../store/context'
 
export const metadata: Metadata = {
  title: 'One Day One Question',
  description: 'Diary',
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
