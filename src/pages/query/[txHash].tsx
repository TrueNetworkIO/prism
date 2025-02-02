import { useEffect, useState } from 'react'
import Image from 'next/image'
import { SearchBar } from '../../components/SearchBar'
import { TransactionDetails } from '../../components/TransactionDetails'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { useParams } from 'next/navigation'
import Head from 'next/head'
import { getTrueNetworkInstance } from '../../../true-network/true.config'

export default function QueryPage() {
  const params = useParams<{ txHash: string }>()
  const [searchedHash, setSearchedHash] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (params?.txHash) {
      setSearchedHash(params.txHash)

      getTrueNetworkInstance().then((api) => {
        if (!api.network.isConnected) {
          api.network.connect()
        }
      })
    }
  }, [params?.txHash])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F2F0ED] to-[#B3D9FE] text-[#03101D] font-sans">
      <Header />
      <Head>
        <title>Transaction Query | Prism | True Network</title>
      </Head>
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* <h1 className="text-5xl text-center mb-8 text-[#FF4000] flex flex-row items-center justify-center">
          <Image
            src="/logo.png"
            alt="True Network"
            width={960}
            height={240}
            className="h-20 w-auto"
          /> prism
        </h1>
        <p className='mb-8 text-center'>Explore the on-chain attestations &amp; reputation algorithms on the True Network.</p> */}
        <div className="max-w-3xl mx-auto">
          <span className='flex flex-1'>
            <p className='max-w-3xl font-nimbus text-[20px] leading-[20px] sm:text-[28px] sm:leading-[28px] md:text-[36px] md:leading-[36px] lg:text-[40px] lg:leading-[40px] mb-8'>Explore the on-chain attestations &amp; reputation algorithms on the <span className='text-[#ff4000]'>True Network.</span></p>
          </span>
          <SearchBar value={searchedHash} onSearch={setSearchedHash} />
          {searchedHash && <TransactionDetails hash={searchedHash} />}
        </div>
      </main>
      <Footer />
    </div>
  )
}

