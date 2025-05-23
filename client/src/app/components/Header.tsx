import Link from 'next/link'
import React from 'react'
import { connectWallet } from '../contexts/TransactionContext'

const Header = () => {
  return (
    <header className='py-5 px-10 border-b flex justify-between items-center h-1/10'>
      <div className='flex justify-between items-center'>
        <h1 className='header-list'>
          <Link href="/">Top</Link>
        </h1>
        <h1 className='header-list'>
          <Link href="/nft-items">NFTs</Link>
        </h1>
      </div>
    </header>
  )
}

export default Header