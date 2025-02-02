import Image from 'next/image'
import { SearchBar } from '../components/SearchBar'
import { RecentEventsTable } from '../components/RecentEventsTable'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Home() {
  const { push } = useRouter()

  const setSearchedHash = (tx: string) => {
    push(`/query/${tx}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F2F0ED] to-[#B3D9FE] text-[#03101D] font-sans">
      <Header />
      <Head>
        <title>Prism | Explore Attestations and Reputations on True Network </title>
      </Head>
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* <h1 className="text-xl md:text-2xl lg:text-3xl text-center mb-8 flex flex-row items-center justify-center gap-0">
          <div className="relative w-40 h-10 sm:w-48 sm:h-12 md:w-56 md:h-14 lg:w-64 lg:h-16">
            <Image
              src="/logo.png"
              alt="True Network"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-[#FF4000]">prism</span>
        </h1> */}
        <div className="max-w-3xl mx-auto">
          <span className='flex flex-1'>
            <p className='max-w-3xl font-nimbus text-[20px] leading-[20px] sm:text-[28px] sm:leading-[28px] md:text-[36px] md:leading-[36px] lg:text-[40px] lg:leading-[40px] mb-8'>Explore on-chain attestations &amp; reputation algorithms on the <span className='text-[#ff4000]'>True Network</span></p>
          </span>
          <SearchBar onSearch={setSearchedHash} />
          <RecentEventsTable />
        </div>
      </main>
      <Footer />
    </div>
  )
}