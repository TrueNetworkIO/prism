import { useState } from 'react'
import Image from 'next/image'
import { SearchBar } from '../components/SearchBar'
// import { RecentEventsTable } from '../components/RecentEventsTable'
import { TransactionDetails } from '../components/TransactionDetails'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function Home() {
  const [searchedHash, setSearchedHash] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F2F0ED] to-[#B3D9FE] text-[#03101D] font-sans">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-5xl text-center mb-8 text-[#FF4000] flex flex-row items-center justify-center">
          <Image
            src="/logo.png"
            alt="True Network"
            width={960}
            height={240}
            className="h-20 w-auto"
          /> prism
        </h1>
        <p className='mb-8 text-center'>Explore the on-chain attestations &amp; reputation algorithms on the True Network.</p>
        <div className="max-w-3xl mx-auto">
          <SearchBar onSearch={setSearchedHash} />
          {searchedHash ? (
            <TransactionDetails hash={searchedHash} />
          ) : (
            <div></div>
            // <RecentEventsTable />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

