import React, { use, useEffect, useState } from 'react'
import { Hash, Copy, CheckCircle2, Clock } from 'lucide-react'
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { copyToClipboard } from '../lib/utils'
import { formatDateTime, formatTimeAgo } from '../lib/format'
import { getTrueNetworkInstance } from '../../true-network/true.config'

interface TransactionHeaderProps {
  hash: string
}

export const TransactionHeader: React.FC<TransactionHeaderProps> = ({ hash }) => {

  const [timestamp, setTimestamp] = useState<number | null>(null)

  useEffect(() => {
    const fetchTimestamp = async () => {
      const trueApi = await getTrueNetworkInstance()
      const api = trueApi.network
      const apiAt = await api.at(hash)
      const timestamp = await apiAt.query.timestamp.now()
      const time = (timestamp).toHuman()!.toString().replaceAll(',', '')
      
      const blockTimestamp = (parseInt(time))
      setTimestamp(blockTimestamp)
    }
    fetchTimestamp()
  }, [hash])

  return (
    <div>
      <CardHeader className="space-y-2 sm:space-y-4 p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <CardTitle className="text-xl sm:text-3xl font-bold text-[#03101D] dark:text-white">
            Transaction Details
          </CardTitle>
        </div>
        <CardDescription className="space-y-2">
          <div className="flex items-center gap-2 text-[#062107] dark:text-[#B3D9FE] text-xs sm:text-sm">
            <span>Transaction Hash</span>
          </div>
          <div className="flex items-center gap-2 p-2 sm:p-3 bg-[#DCFCE7] rounded-lg group">
            <code className="font-mono text-xs sm:text-sm flex-1 break-all text-[#03101D] dark:text-white">
              {hash}
            </code>
            <button
              onClick={() => copyToClipboard(hash)}
              className="text-[#062107]/50 dark:text-[#B3D9FE]/50 hover:text-[#FF4000] transition-colors shrink-0"
            >
              <Copy size={12} className="sm:w-4 sm:h-4 group-hover:hidden" />
              <CheckCircle2 size={12} className="sm:w-4 sm:h-4 hidden group-hover:block" />
            </button>
          </div>
        </CardDescription>
        {timestamp && <CardDescription className="space-y-2">
          <div className="flex items-center gap-2 text-[#062107] dark:text-[#B3D9FE] text-xs sm:text-sm">
            <span>Timestamp</span>
          </div>
          <div className="flex items-center gap-2 p-2 sm:p-3 bg-[#DCFCE7] dark:bg-white/10 rounded-lg group">
            <code className="flex flex-row w-100 justify-between flex-1 font-mono text-xs sm:text-sm flex-1 break-all text-[#03101D] dark:text-white">
              <span>{formatDateTime(timestamp ?? Date.now())}</span>
              <span>{formatTimeAgo(timestamp ?? Date.now())}</span>
            </code>
          </div>
        </CardDescription>}
      </CardHeader>

    </div>
  )
}