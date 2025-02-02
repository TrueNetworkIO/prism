import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EventParameters } from './EventParameters'
import { AttestationData } from './AttestationData'
import { FormattedEvent } from './types'
import { SchemaData } from './SchemaData'

interface EventCardProps {
  event: FormattedEvent
  isExpanded: boolean
  onToggle: () => void
  index: number
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isExpanded,
  onToggle,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative bg-eventsBackground p-2 sm:p-4 rounded-lg"
    >
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#FF9ECF]/10 dark:bg-white/5 rounded-full blur-3xl -z-10" />
      
      <div className="flex items-center justify-between mb-3 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1 sm:p-2 bg-white rounded-lg">
            <FileText size={16} className="sm:w-5 sm:h-5 text-[#FF4000]" />
          </div>
          <h3 className="text-sm sm:text-xl font-semibold text-[#03101D] dark:text-white">
            {event.section}: <span className="">{event.name}</span>
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-[#062107] dark:text-[#B3D9FE]"
        >
          {isExpanded ? (
            <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
          ) : (
            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 sm:space-y-6"
          >
            <EventParameters parameters={event.parameters} />
            
            {event.schemaData && (
              <SchemaData data={event.schemaData} />
            )}
            {event.attestationData && (
              <AttestationData data={event.attestationData} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}