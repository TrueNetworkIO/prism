import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  value?: string
  onSearch: (hash: string) => void
}

export function SearchBar({ onSearch, value }: SearchBarProps) {
  const [hash, setHash] = useState('')

  useEffect(() => {
    if (value) {
      setHash(value)
    }
  }, [value])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (hash.trim()) {
      onSearch(hash.trim())
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto mb-4">
      <form onSubmit={handleSubmit} className="relative group">
        <input
          type="text"
          placeholder="Search by transaction hash..."
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          className="w-full h-14 pl-5 pr-16 rounded-xl bg-white dark:bg-white/10 backdrop-blur-md border border-[#FF4000]/20 text-[#03101D] dark:text-white placeholder-[#062107]/50 dark:placeholder-[#B3D9FE]/50 focus:outline-none focus:border-[#FF4000]/40 focus:ring-2 focus:ring-[#FF4000]/20 transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#FF4000] text-white rounded-lg opacity-90 hover:opacity-100 transition-opacity"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  )
}

