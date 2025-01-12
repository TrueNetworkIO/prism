// import { useState, useEffect } from 'react'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Vec } from '@polkadot/types'
// import { EventRecord } from '@polkadot/types/interfaces'
// import { getTrueNetworkInstance } from '../../true-network/true.config'
// import { ApiPromise } from '@polkadot/api'
// import { FILTERED_EVENTS } from './constants'
// import { decodeEvent } from '@/lib/blockchain'
// import { FormattedEvent } from './types'

// interface BlockchainEvent {
//   blockHash: string
//   eventName: string
//   timestamp: string
//   details: string
//   pallet: 'Credentials' | 'Issuers' | 'Algorithm'
// }

// // Helper function to format credential attestation details
// const formatAddressDetails = (address: any): string => {
//   if (address.isSubstrate) {
//     return `Substrate: ${address.asSubstrate.toString()}`
//   } else if (address.isEthereum) {
//     return `Ethereum: ${address.asEthereum.toString()}`
//   } else if (address.isSolana) {
//     return `Solana: ${address.asSolana.toString()}`
//   }
//   return 'Unknown address type'
// }

// const formatEventDetails = (method: string, data: any): string => {
//   try {
//     switch (method) {
//       // Credentials Pallet Events
//       case 'SchemaCreated':
//         return `Schema created with hash: ${data[0].toString()}`
//       case 'AttestationCreated':
//         return `Attestation created for ${formatAddressDetails(data[1])}`
//       case 'AttestationUpdated':
//         return `Attestation updated at index ${data[3].toString()}`

//       // Issuers Pallet Events
//       case 'IssuerCreated':
//         return `Issuer created with hash: ${data[0].toString()}`
//       case 'IssuerUpdated':
//         return `Issuer updated with hash: ${data[0].toString()}`

//       // Algorithm Pallet Events
//       case 'AlgorithmAdded':
//         return `Algorithm added with ID: ${data[0].toString()}`
//       case 'AlgoResult':
//         return `Algorithm executed with result: ${data[0].toString()}`

//       default:
//         return 'Event details not available'
//     }
//   } catch (error) {
//     console.error('Error formatting event details:', error)
//     return 'Error formatting event details'
//   }
// }

// export function RecentEventsTable() {
//   const [events, setEvents] = useState<BlockchainEvent[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [api, setApi] = useState<ApiPromise | null>(null)

//   useEffect(() => {
//     const connectToChain = async () => {
//       try {
//         // Replace with your True Network WebSocket endpoint

//         const trueApi = await getTrueNetworkInstance()

//         setLoading(false)

//         // Subscribe to new blocks
//         await trueApi.network.rpc.chain.subscribeNewHeads(async (header) => {

//           const block = (await trueApi.network.at(header.hash)) as any;
//           // Get events at this block hash
//           const allEvents = await block.query.system.events() as Vec<EventRecord>

//           const newEvents = allEvents.toArray()
//             .map((record: any) => {
//               const { event } = record
//               const eventHuman = event.toHuman()
//               const eventName = `${event.section}.${event.method}`

//               if (!FILTERED_EVENTS.includes(eventName)) {
//                 return null
//               }

//               return decodeEvent(eventHuman)
//             }).filter((event: any): event is FormattedEvent => event !== null);
            
//             .map(({ event }: { event: any }) => ({
//               blockNumber: header.number.toNumber(),
//               eventName: event.method,
//               timestamp: new Date().toISOString(),
//               details: formatEventDetails(event.method, event.data),
//               pallet: event.section as 'Credentials' | 'Issuers' | 'Algorithm'
//             }))

//           if (newEvents.length > 0) {
//             setEvents(prev => [...newEvents, ...prev].slice(0, 10))
//           }
//         })

//       } catch (err) {
//         console.error('Failed to connect to the chain:', err)
//         setError('Failed to connect to the network')
//         setLoading(false)
//       }
//     }

//     connectToChain()

//     return () => {
//       if (api) {
//         api.disconnect()
//       }
//     }
//   }, [])

//   const getPalletColor = (pallet: string) => {
//     switch (pallet) {
//       case 'Credentials':
//         return 'bg-blue-100 text-blue-800'
//       case 'Issuers':
//         return 'bg-green-100 text-green-800'
//       case 'Algorithm':
//         return 'bg-purple-100 text-purple-800'
//       default:
//         return 'bg-gray-100 text-gray-800'
//     }
//   }

//   if (error) {
//     return <div className="text-center text-red-500 font-medium">{error}</div>
//   }

//   if (loading && events.length === 0) {
//     return <div className="text-center text-lg font-medium">Connecting to True Network...</div>
//   }

//   return (
//     <Card className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle className="text-2xl font-bold text-[#FF4000]">Live Network Events</CardTitle>
//         <Badge variant="outline" className={api ? 'bg-green-100' : 'bg-yellow-100'}>
//           {api ? 'Connected' : 'Connecting...'}
//         </Badge>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="font-semibold text-[#03101D]">Block</TableHead>
//               <TableHead className="font-semibold text-[#03101D]">Time</TableHead>
//               <TableHead className="font-semibold text-[#03101D]">Type</TableHead>
//               <TableHead className="font-semibold text-[#03101D]">Event</TableHead>
//               <TableHead className="font-semibold text-[#03101D]">Details</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {events.map((event, index) => (
//               <TableRow key={index} className="hover:bg-[#C2EBC3]/20 transition-colors">
//                 <TableCell className="font-medium">{event.blockNumber}</TableCell>
//                 <TableCell>
//                   <Badge className={getPalletColor(event.pallet)}>
//                     {event.pallet}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>{event.eventName}</TableCell>
//                 <TableCell>{new Date(event.timestamp).toLocaleTimeString()}</TableCell>
//                 <TableCell className="max-w-md truncate">{event.details}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   )
// }

// export default RecentEventsTable