import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='py-5 px-10 border-b flex justify-between items-center h-1/10'>
      <div className='flex justify-between items-center'>
        <h1 className='header-list'>
          <Link href="/">Top</Link>
        </h1>
        <h1 className='header-list'>
          <Link href="/articles">Articles</Link>
        </h1>
      </div>
      <div>
        <nav className='text-sm font-medium'>
          <Link href="/articles/new" className='bg-orange-300 px-3 py-3 rounded-md'>Connect Wallet</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header