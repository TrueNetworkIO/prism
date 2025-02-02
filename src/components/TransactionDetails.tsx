import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getTrueNetworkInstance } from '../../true-network/true.config'
import { TransactionHeader } from './TransactionHeader'
import { decodeEvent, getSchemaFromHash, parseSchemaString } from '../lib/blockchain'
import { FILTERED_EVENTS, EVENT_TYPES } from './constants'
import { FormattedEvent, TransactionDetailsProps, TransactionState } from './types'
import { EventTabs } from './EventTabs'
import { ErrorState } from './ErrorState'
import { LoadingState } from './LoadingState'

export function TransactionDetails({ hash }: TransactionDetailsProps) {
  const [state, setState] = useState<TransactionState>({
    events: [],
    loading: true,
    error: null
  })
  const [expandedEvents, setExpandedEvents] = useState<string[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      let api = null;
      try {
        const trueApi = await getTrueNetworkInstance();
        api = trueApi.network;

        // Fetch block events
        const blockEvents = (await (await api.at(hash)).query.system.events()) as any;

        // Fetch extrinsics in the block
        const block = await api.rpc.chain.getBlock(hash);
        const extrinsics = block.block.extrinsics;

        const formattedEvents = blockEvents
          .toArray()
          .map((record: any) => {
            const { event, phase } = record;

            const eventHuman = event.toHuman();
            const eventName = `${event.section}.${event.method}`;

            if (!FILTERED_EVENTS.includes(eventName)) {
              return null;
            }

            // Match event to extrinsic using phase
            if (phase.isApplyExtrinsic) {
              const extrinsicIndex = phase.asApplyExtrinsic.toNumber();
              const extrinsic = extrinsics[extrinsicIndex];

              // Extract the signer
              const signer = extrinsic?.signer?.toString() || null;

              const decodedEvent = decodeEvent(eventHuman);
              if (decodedEvent && signer) {
                decodedEvent.parameters.splice(0, 0, {
                  name: "Transaction Signer",
                  value: signer,
                  description: 'Account that signed the transaction',
                })
              }
              return decodedEvent;
            }

            return decodeEvent(eventHuman);
          })
          .filter((event: any): event is FormattedEvent => event !== null);

        // Handle additional processing for events
        const eventsWithAttestations = await Promise.all(
          formattedEvents.map(async (event: any) => {
            if (event.name === EVENT_TYPES.SCHEMA) {
              const schemaData = event.parameters[1].value;
              if (schemaData) {
                try {
                  return {
                    ...event,
                    schemaData: {
                      schema: parseSchemaString(JSON.parse(schemaData)),
                    },
                  };
                } catch (error) {
                  console.error("Error fetching attestation data:", error);
                }
              }
            }

            if (event.name === EVENT_TYPES.ATTESTATION) {
              const schemaHash = event.parameters[3].value;
              if (schemaHash) {
                try {
                  const schema = (await getSchemaFromHash(trueApi, schemaHash)) as any[];
                  if (schema) {
                    return {
                      ...event,
                      attestationData: {
                        schema: parseSchemaString(schema),
                        values: JSON.parse(event.parameters[5].value),
                      },
                    };
                  }
                } catch (error) {
                  console.error("Error fetching attestation data:", error);
                }
              }
            }
            return event;
          })
        );

        setState({
          events: eventsWithAttestations,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching transaction details:", error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to fetch transaction details. The block may be too old or not available.",
        }));
      } finally {
        if (api) {
          await api.disconnect();
        }
      }
    };

    fetchEvents()
  }, [hash])

  const toggleEvent = (eventId: string) => {
    setExpandedEvents(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }

  if (state.error) {
    return <ErrorState error={state.error} />
  }

  if (state.loading) {
    return <LoadingState />
  }

  const groupedEvents = {
    attestations: state.events.filter(e => e.name === EVENT_TYPES.ATTESTATION),
    issuers: state.events.filter(e => e.name === EVENT_TYPES.ISSUER),
    schemas: state.events.filter(e => e.name === EVENT_TYPES.SCHEMA),
    algorithms: state.events.filter(e => e.name === EVENT_TYPES.ALGORITHM)
  }

  return (
    <Card className="bg-white dark:bg-[#03101D]/80 backdrop-blur-md shadow-lg rounded-lg overflow-hidden border-0">
      <TransactionHeader hash={hash} />
      <Separator className="opacity-50" />
      <CardContent className="p-4 sm:p-6">
        <EventTabs
          events={state.events}
          groupedEvents={groupedEvents}
          expandedEvents={expandedEvents}
          onToggleEvent={toggleEvent}
        />
      </CardContent>
    </Card>
  )
}

export default TransactionDetails