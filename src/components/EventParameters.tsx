import React, { useEffect } from 'react'
import { Copy, Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { copyToClipboard } from '../lib/utils'
import { truncateHash } from '@/lib/format'
import { ISSUER_PALLET_NAME } from '@truenetworkio/sdk/dist/pallets/issuer/state.js'
import { getTrueNetworkInstance } from '../../true-network/true.config'
import { getWalletWithType } from '@truenetworkio/sdk'

interface EventParametersProps {
  parameters: Array<{
    name: string
    value: string
    description: string
  }>
}

export const EventParameters: React.FC<EventParametersProps> = ({ parameters }) => {

  const [issuerName, setIssuerName] = React.useState<string | null>(null)

  useEffect(() => {

    const getIssuerName = async (hash: string) => {
      // Fetch issuer name from the issuer's hash
      const api = await getTrueNetworkInstance()

      const data = await api.network.query[ISSUER_PALLET_NAME].issuers(hash)

      const humanData = data.toHuman() as any

      if (humanData) {
        setIssuerName(humanData['name'])
      }
    }

    // Check if parameter name is "Issuer", and if so, add a badge with the issuer's name
    const issuer = parameters.find((param) => param.name === "Issuer Hash")

    if (issuer) {
      getIssuerName(issuer.value)
    }
  }, [parameters])

  const getParameterComponent = (param: { name: string, value: string, description: string }) => {
    if (param.name === "Issuer Hash" && issuerName) {
      return <code className="text-xs sm:text-sm bg-[#B3D9FE]/30 rounded px-2 py-1 overflow-x-auto max-w-[200px] sm:max-w-none">
        <span className='font-bold'>{issuerName}</span> {truncateHash(param.value, 4)}
      </code>
    }

    if (param.name === "Attested To") {
      const wallet = getWalletWithType(param.value) as any

      let src = ""
      if (wallet['Ethereum']) {
        src = "/wallets/eth.png"
      } else if (wallet['Solana']) {
        src = "/wallets/sol.png"
      } else if (wallet['Substrate']) {
        src = "/wallets/dot.png"
      }

      return <div className='flex flex-row gap-2 justify-center items-center'>
        <img height={12} width={12} src={src} alt="w" />
        <code className="text-xs sm:text-sm bg-[#B3D9FE]/30 rounded px-2 py-1 overflow-x-auto max-w-[200px] sm:max-w-none">
          {truncateHash(param.value, 8)}
        </code>
      </div>
    }

    return <code className="text-xs sm:text-sm bg-[#B3D9FE]/30 rounded px-2 py-1 overflow-x-auto max-w-[200px] sm:max-w-none">{truncateHash(param.value, 8)}</code>
  }

  return (
    <div className="grid gap-2 sm:gap-4">
      {parameters.map((param) => param.name !== "Attestation" && (
        <div
          key={param.name}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-white/50 dark:bg-white/10 rounded-lg backdrop-blur-sm"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-0">
                <span className="font-medium text-xs sm:text-sm text-[#03101D] dark:text-white">
                  {param.name}
                </span>
                <Info size={12} className="sm:w-4 sm:h-4 text-[#062107]/70 dark:text-[#B3D9FE]/70" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs sm:text-sm">{param.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex flex-col items-center gap-2">
            {param.name == "Controllers" ? param.value.split(',').map((controller) => {
              return (
                <div key={controller} className='flex flex-row w-full justify-end gap-2'>
                  <code key={controller} className="text-xs sm:text-sm bg-[#B3D9FE]/30 rounded px-2 py-1 overflow-x-auto max-w-[200px] sm:max-w-none">
                    {truncateHash(controller, 8)}
                  </code>

                  <button
                    onClick={() => copyToClipboard(controller)}
                    className="text-[#062107]/50 dark:text-[#B3D9FE]/50 hover:text-[#FF4000] transition-colors"
                  >
                    <Copy size={12} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              );
            }) :
              <div className='flex flex-row justify-end gap-2'>

                {getParameterComponent(param)}

                <button
                  onClick={() => copyToClipboard(param.value)}
                  className="text-[#062107]/50 dark:text-[#B3D9FE]/50 hover:text-[#FF4000] transition-colors"
                >
                  <Copy size={12} className="sm:w-4 sm:h-4" />
                </button>
              </div>}
          </div>
        </div>
      ))}
    </div>
  )
}