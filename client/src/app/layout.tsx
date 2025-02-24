import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { TransactionContext, TransactionProvier } from './contexts/TransactionContext'


export const metadata: Metadata = {
  title: 'NFT-mint',
  description: 'we can mint nft.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className='h-full'>
      <body className='container mx-auto bg-slate-700 text-slate-50 h-full'>
        <TransactionProvier>
          <Header />
          {children}
          <Footer />
        </TransactionProvier>
        </body>
    </html>
  )
}
