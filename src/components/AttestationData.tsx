import React from 'react'
import { Badge } from '@/components/ui/badge'
import { AttestationData as AttestationDataType } from './types'
import { getDataTypeComponent } from '../lib/data-types'
import { getIconForField } from '@/lib/iconGenerator'

interface AttestationDataProps {
  data: AttestationDataType
}

export const AttestationData: React.FC<AttestationDataProps> = ({ data }) => {
  return (
    <div className="mt-3 sm:mt-6 pt-3 sm:pt-6">
      <h4 className="text-sm sm:text-lg font-semibold mb-2 sm:mb-4">
        Attestation Data
      </h4>
      <div className="grid gap-2 sm:gap-4">
        {data.schema.map((field, idx) => {
          const value = data.values[idx]
          return (
            <div
              key={field.name}
              className="p-2 sm:p-3 bg-white/50 dark:bg-white/5 rounded-lg border border-[#FF4000]/10 hover:border-[#FF4000]/20 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  {React.createElement(getIconForField(field.name), {
                    className: "w-4 h-4 sm:w-5 sm:h-5 text-[#FF4000]"
                  })}
                  <span className="font-medium text-xs sm:text-sm text-[#03101D] dark:text-white">
                    {field.name}
                  </span>
                  <Badge variant="outline" className="text-[0.6rem] sm:text-xs bg-[#C2EBC3]/20 border-[#C2EBC3]/40 text-[#062107] dark:text-[#C2EBC3]">
                    {field.type}
                  </Badge>
                </div>
                <div className="font-mono text-xs sm:text-sm text-[#03101D] dark:text-white mt-1 sm:mt-0">
                  {getDataTypeComponent(field.type, value)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}