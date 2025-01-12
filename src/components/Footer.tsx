import { Github, Twitter, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-[#03101D] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Image
              src="/logo.png"
              alt="True Network"
              width={160}
              height={40}
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="text-sm text-gray-400">
              Revolutionizing trust through digital reputation
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="https://docs.truenetwork.io" 
                  target='_blank'
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  href="https://docs.truenetwork.io/lightpaper/overview.html" 
                  target='_blank'
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Lightpaper
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="https://github.com/truenetworkio" 
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Link>
              </li>
              <li>
                <Link 
                  href="https://x.com/truenetworkio" 
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Link>
              </li>
              <li>
                <Link 
                  href="https://at.truenetwork.io/community" 
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Telegram
                </Link>
              </li>
            </ul>
          </div>
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Jupiter Innovations Lab Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

