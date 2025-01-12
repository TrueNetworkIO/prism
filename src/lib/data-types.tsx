import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Clipboard } from 'lucide-react'
import { copyToClipboard } from './utils'
import { U8, U32, U64, I32, I64, F32, F64 } from '@truenetworkio/sdk'

export const getDataTypeComponent = (type: string, value: any) => {
  switch (type.toLowerCase()) {
    case 'text':
      return <span className="font-mono break-all">{value}</span>
    case 'bool':
      return <Badge variant={value ? "default" : "destructive"}>{value ? "True" : "False"}</Badge>
    case 'u8':
      return <Badge variant="secondary" className="font-mono">{U8.deserialize(value)}</Badge>
    case 'u32':
      return <Badge variant="secondary" className="font-mono">{U32.deserialize(value)}</Badge>
    case 'u64':
      return <Badge variant="secondary" className="font-mono">{U64.deserialize(value)}</Badge>
    case 'i32':
      return <Badge variant="secondary" className="font-mono">{I32.deserialize(value)}</Badge>
    case 'i64':
      return <Badge variant="secondary" className="font-mono">{I64.deserialize(value)}</Badge>
    case 'f32':
      return <Badge variant="secondary" className="font-mono">{F32.deserialize(value)}</Badge>
    case 'f64':
      return <Badge variant="secondary" className="font-mono">{F64.deserialize(value)}</Badge>
    case 'hash':
      return (
        <div className="flex items-center gap-2">
          <code className="text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 rounded px-1 py-0.5 sm:px-2 sm:py-1">{value}</code>
          <button
            onClick={() => copyToClipboard(value)}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <Clipboard size={12} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      )
    default:
      return <span>{value}</span>
  }
}