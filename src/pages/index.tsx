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
        <h1 className="text-3xl lg:text-4xl xl:text-5xl text-center mb-8 text-[#FF4000] flex flex-row items-center justify-center">
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
          <RecentEventsTable />
        </div>
      </main>
      <Footer />
    </div>
  )
}

