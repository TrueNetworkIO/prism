
import { TrueApi, testnet } from '@truenetworkio/sdk'
import { TrueConfig } from '@truenetworkio/sdk/dist/utils/cli-config'

// If you are not in a NodeJS environment, please comment the code following code:
// import dotenv from 'dotenv'
// dotenv.config()

export const getTrueNetworkInstance = async (): Promise<TrueApi> => {
  const trueApi = await TrueApi.create(config.account.secret)

  await trueApi.setIssuer(config.issuer.hash)

  return trueApi;
}

export const config: TrueConfig = {
  network: testnet,
  account: {
    address: 'hiGPj1vPpmQenWoCanNtUZ1sPvTAj6VP9U8Z8PsJ8mqeikS',
    secret: process.env.NEXT_PUBLIC_TRUE_NETWORK_SECRET_KEY ?? ''
  },
  issuer: {
    name: 'prism',
    hash: '0x7ce16400cc7accc07701c9a74c25c01c47a281790d294f863bd0665e2bbca601'
  },
  algorithm: {
    id: undefined,
    path: undefined,
    schemas: []
  },
}
  