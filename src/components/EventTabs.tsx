import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EventCard } from './EventCard'
import { FormattedEvent } from './types'

interface GroupedEvents {
  attestations: FormattedEvent[]
  issuers: FormattedEvent[]
  schemas: FormattedEvent[]
  algorithms: FormattedEvent[]
}

interface EventTabsProps {
  events: FormattedEvent[]
  groupedEvents: GroupedEvents
  expandedEvents: string[]
  onToggleEvent: (eventId: string) => void
}

export const EventTabs: React.FC<EventTabsProps> = ({
  events,
  groupedEvents,
  expandedEvents,
  onToggleEvent
}) => {
  return (
    <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
      <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-transparent">
        <TabsTrigger 
          value="all"
          className="text-xs sm:text-sm py-2 px-3 bg-white/50 dark:bg-white/5 data-[state=active]:bg-[#FF4000] data-[state=active]:text-white"
        >
          All ({events.length})
        </TabsTrigger>
        <TabsTrigger 
          value="attestations"
          className="text-xs sm:text-sm py-2 px-3 bg-white/50 dark:bg-white/5 data-[state=active]:bg-[#FF4000] data-[state=active]:text-white"
        >
          Attestations ({groupedEvents.attestations.length})
        </TabsTrigger>
        <TabsTrigger 
          value="issuers"
          className="text-xs sm:text-sm py-2 px-3 bg-white/50 dark:bg-white/5 data-[state=active]:bg-[#FF4000] data-[state=active]:text-white"
        >
          Issuers ({groupedEvents.issuers.length})
        </TabsTrigger>
        <TabsTrigger 
          value="schemas"
          className="text-xs sm:text-sm py-2 px-3 bg-white/50 dark:bg-white/5 data-[state=active]:bg-[#FF4000] data-[state=active]:text-white"
        >
          Schemas ({groupedEvents.schemas.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        {events.map((event, index) => (
          <EventCard
            key={`${event.name}-${index}`}
            event={event}
            isExpanded={expandedEvents.includes(`${event.name}-${index}`)}
            onToggle={() => onToggleEvent(`${event.name}-${index}`)}
            index={index}
          />
        ))}
      </TabsContent>

      <TabsContent value="attestations" className="space-y-4">
        {groupedEvents.attestations.map((event, index) => (
          <EventCard
            key={`attestation-${index}`}
            event={event}
            isExpanded={expandedEvents.includes(`attestation-${index}`)}
            onToggle={() => onToggleEvent(`attestation-${index}`)}
            index={index}
          />
        ))}
      </TabsContent>

      <TabsContent value="issuers" className="space-y-4">
        {groupedEvents.issuers.map((event, index) => (
          <EventCard
            key={`issuer-${index}`}
            event={event}
            isExpanded={expandedEvents.includes(`issuer-${index}`)}
            onToggle={() => onToggleEvent(`issuer-${index}`)}
            index={index}
          />
        ))}
      </TabsContent>

      <TabsContent value="schemas" className="space-y-4">
        {groupedEvents.schemas.map((event, index) => (
          <EventCard
            key={`schema-${index}`}
            event={event}
            isExpanded={expandedEvents.includes(`schema-${index}`)}
            onToggle={() => onToggleEvent(`schema-${index}`)}
            index={index}
          />
        ))}
      </TabsContent>
    </Tabs>
  )
}