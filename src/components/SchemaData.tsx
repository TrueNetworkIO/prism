import React from 'react'
import { Badge } from '@/components/ui/badge'
import { SchemaField } from './types'
import { getDataTypeComponent } from '../lib/data-types'
import { getIconForField } from '@/lib/iconGenerator'

interface SchemaDataProps {
  data?: { schema: SchemaField[] }
}

export const SchemaData: React.FC<SchemaDataProps> = ({ data }) => {
  console.log('data', data)
  return (
    <div className="mt-3 sm:mt-6 border-t border-[#FF9ECF]/20 pt-3 sm:pt-6">
      <h4 className="text-sm sm:text-lg font-semibold mb-2 sm:mb-4 text-[#FF4000]">
        Schema Structure
      </h4>
      <div className="grid gap-2 sm:gap-4">
        {data!.schema.map((field) => {
          return (
            <div
              key={field.name}
              className="p-2 sm:p-3 bg-white/50 dark:bg-white/5 rounded-lg border border-[#FF4000]/10 hover:border-[#FF4000]/20 transition-colors"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-center sm:justify-between">
                <div className="flex items-center flex-1 w-100 justify-between gap-2 mb-1 sm:mb-0">
                  <div className='flex flex-1 flex-row'>
                  {React.createElement(getIconForField(field.name), {
                    className: "w-4 h-4 sm:w-5 sm:h-5 text-[#FF4000]"
                  })}
                  <span className="font-medium text-xs sm:text-sm text-[#03101D] dark:text-white ml-2">
                    {field.name}
                  </span>
                  </div>
                  <Badge variant="outline" className="text-[0.6rem] sm:text-xs bg-[#C2EBC3]/20 border-[#C2EBC3]/40 text-[#062107] dark:text-[#C2EBC3]">
                    {field.type}
                  </Badge>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}