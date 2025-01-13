import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Vec } from '@polkadot/types'
import { EventRecord } from '@polkadot/types/interfaces'
import { getTrueNetworkInstance } from '../../true-network/true.config'
import { FILTERED_EVENTS } from './constants'
import { decodeEvent } from '@/lib/blockchain'
import { FormattedEvent } from './types'
import { formatTimeAgo, truncateHash } from '@/lib/format'
import { useRouter } from 'next/router'
import { Loader2 } from 'lucide-react'
import Identicon from '@polkadot/react-identicon'

// Utility function for badge colors
const getPalletColor = (pallet: string) => {
  switch (pallet) {
    case 'Credentials':
      return 'bg-blue-100 text-blue-800 hover:text-blue-800 hover:bg-blue-100'
    case 'Issuers':
      return 'bg-green-100 text-green-800 hover:text-green-800 hover:bg-green-100'
    case 'Algorithm':
      return 'bg-purple-100 text-purple-800 hover:text-purple-800 hover:bg-purple-100'
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800'
  }
}

interface BlockchainEvent {
  blockHash: string
  timestamp: number
  type: string
  eventName: string
  signer: string
}

interface FormattedEventWithSigner extends FormattedEvent {
  signer: string
}

const EventCard = ({ event, onClick }: { event: BlockchainEvent; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
  >
    <div className="flex justify-between items-start mb-3">
      <div>
        <div className="text-sm text-gray-600 mb-1">Block</div>
        <div className="font-medium">{truncateHash(event.blockHash, 6)}</div>
      </div>
      <Badge className={getPalletColor(event.type)}>
        {event.type}
      </Badge>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Identicon
          value={event.signer}
          size={20}
          theme='polkadot'
        />
        <span className="text-sm text-gray-600">
          {truncateHash(event.signer, 8)}
        </span>
      </div>
      <div className="text-sm text-gray-500">
        {formatTimeAgo(event.timestamp)}
      </div>
    </div>
  </div>
)

export function RecentEventsTable() {
  const [events, setEvents] = useState<BlockchainEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [networkVersion, setNetworkVersion] = useState<number>()
  const [timeKey, setTimeKey] = useState(0)

  const { push } = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeKey(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const savedEvents = localStorage.getItem('network-events')
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents)
      const recentEvents = parsedEvents.filter((event: BlockchainEvent) => {
        const eventAge = Date.now() - event.timestamp
        return eventAge < 15 * 60 * 1000
      })
      setEvents(recentEvents)
    }

    const connectToChain = async () => {
      try {
        const trueApi = await getTrueNetworkInstance()
        setNetworkVersion(trueApi.network.runtimeVersion.specVersion.toNumber())
        setLoading(false)

        await trueApi.network.rpc.chain.subscribeNewHeads(async (header) => {
          const block = (await trueApi.network.at(header.hash)) as any
          const allEvents = await block.query.system.events() as Vec<EventRecord>
          const blocks = await trueApi.network.rpc.chain.getBlock(header.hash)
          const extrinsics = blocks.block.extrinsics

          const newEvents = allEvents.toArray()
            .map((record: any) => {
              const { event, phase } = record
              const eventHuman = event.toHuman()
              const eventName = `${event.section}.${event.method}`

              if (!FILTERED_EVENTS.includes(eventName)) {
                return null
              }

              if (phase.isApplyExtrinsic) {
                const extrinsicIndex = phase.asApplyExtrinsic.toNumber()
                const extrinsic = extrinsics[extrinsicIndex]
                const signer = extrinsic?.signer?.toString() || null
                const decodedEvent = decodeEvent(eventHuman)

                if (!signer) return null
                return { ...decodedEvent, signer }
              }
              return null
            }).filter((event: any) => event !== null) as FormattedEventWithSigner[]

          const timestamp = Date.now()

          const blockEvents: BlockchainEvent[] = newEvents.map((e) => ({
            blockHash: header.hash.toString(),
            timestamp: timestamp,
            type: e.section,
            eventName: e.name,
            signer: e.signer
          }))

          if (blockEvents.length > 0) {
            setEvents(prev => {
              // Create a Set of existing blockHashes for O(1) lookup
              const existingHashes = new Set(prev.map(e => e.blockHash))
              
              // Filter out any new events that already exist
              const uniqueNewEvents = blockEvents.filter(event => !existingHashes.has(event.blockHash))
              
              // Combine unique new events with existing ones
              const combinedEvents = [...uniqueNewEvents, ...prev]
              
              // Filter for recent events (less than 15 minutes old)
              const recentEvents = combinedEvents.filter(event => {
                const eventAge = Date.now() - event.timestamp
                return eventAge < 15 * 60 * 1000
              })
              
              // Keep only the most recent 10 events
              const updatedEvents = recentEvents.slice(0, 10)
              localStorage.setItem('network-events', JSON.stringify(updatedEvents))
              return updatedEvents
            })
          }
        })

      } catch (err) {
        console.error('Failed to connect to the chain:', err)
        setError('Failed to connect to the network')
        setLoading(false)
      }
    }

    connectToChain()

    const cleanup = setInterval(() => {
      setEvents(prev => {
        const recentEvents = prev.filter(event => {
          const eventAge = Date.now() - event.timestamp
          return eventAge < 15 * 60 * 1000
        })
        localStorage.setItem('network-events', JSON.stringify(recentEvents))
        return recentEvents
      })
    }, 60000)

    return () => {
      clearInterval(cleanup)
    }
  }, [])

  const getPalletColor = (pallet: string) => {
    switch (pallet) {
      case 'Credentials':
        return 'bg-blue-100 text-blue-800 hover:text-blue-800 hover:bg-blue-100'
      case 'Issuers':
        return 'bg-green-100 text-green-800 hover:text-green-800 hover:bg-green-100'
      case 'Algorithm':
        return 'bg-purple-100 text-purple-800 hover:text-purple-800 hover:bg-purple-100'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800'
    }
  }

  if (error) {
    return (
      <Card className="bg-white shadow-lg rounded-3xl">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-red-500 font-medium flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            {error}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white shadow-lg rounded-3xl overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 p-8 md:pb-8 pb-2">
        <div className="flex flex-col gap-3">
          <CardTitle className="text-[#FF4000] text-xl font-bold md:text-2xl">
            Live Network Events
          </CardTitle>
          <p className="text-gray-500 text-xs md:text-base">
            Watch network activity in real-time
          </p>
        </div>
        <Badge 
          className={`${!loading ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} px-4 py-2 text-sm font-normal rounded-md transition-colors duration-300 hidden md:block`}
        >
          <div className="flex items-center gap-2 text-xs md:text-sm">
            {loading && <Loader2 className="h-3 w-3 animate-spin" />}
            {!loading ? 'Raman Network' : 'Connecting...'}
            {!loading ? ` v${networkVersion}` : ''}
          </div>
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-base font-semibold px-8">Block</TableHead>
                <TableHead className="text-base font-semibold px-8">Type</TableHead>
                <TableHead className="text-base font-semibold px-8">Event</TableHead>
                <TableHead className="text-base font-semibold px-8 text-right">Time</TableHead>
                <TableHead className="text-base font-semibold px-8">Signer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length === 0 && !loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Waiting for new events...
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event, index) => (
                  <TableRow 
                    onClick={() => push(`/query/${event.blockHash}`)} 
                    key={`${event.blockHash}${index}`} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <TableCell className="px-8 py-4 font-medium">
                      {truncateHash(event.blockHash, 3)}
                    </TableCell>
                    <TableCell className="px-8 py-4">
                      <Badge className={`${getPalletColor(event.type)}`}>
                        {event.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-8 py-4">
                      {event.eventName}
                    </TableCell>
                    <TableCell className="px-8 py-4 text-right whitespace-nowrap text-gray-500">
                      {formatTimeAgo(event.timestamp)}
                    </TableCell>
                    <TableCell className="px-8 py-4">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <Identicon
                          value={event.signer}
                          size={24}
                          theme='polkadot'
                        />
                        <span className="text-gray-600 whitespace-nowrap">
                          {truncateHash(event.signer, 3)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden p-4 space-y-3">
          {events.length === 0 && !loading ? (
            <div className="text-center py-8 text-gray-500">
              Waiting for new events...
            </div>
          ) : (
            events.map((event, index) => (
              <EventCard 
                key={`${event.blockHash}${index}`}
                event={event}
                onClick={() => push(`/query/${event.blockHash}`)}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentEventsTable