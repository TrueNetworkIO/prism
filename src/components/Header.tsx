import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="True Network"
              width={160}
              height={40}
              className="h-8 w-auto"
            /> prism
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="https://docs.truenetwork.io" 
              target='_blank'
              className="text-sm font-medium text-gray-700 hover:text-[#FF4000] transition-colors"
            >
              Docs
            </Link>
            <Link 
              href="https://github.com/truenetworkio" 
              target='_blank'
              className="text-sm font-medium text-gray-700 hover:text-[#FF4000] transition-colors"
            >
              GitHub
            </Link>
            {/* <Button variant="ghost" className="text-sm font-medium">
              Launch App
            </Button> */}
          </nav>
        </div>
      </div>
    </header>
  )
}

