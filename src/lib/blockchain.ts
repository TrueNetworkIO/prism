import { FormattedEvent, SchemaField } from '@/components/types'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { TrueApi } from '@truenetworkio/sdk'
import { CREDENTIALS_PALLET_NAME } from '@truenetworkio/sdk/dist/pallets/credentials/state'

export const getBlockchainApi = async () => {
  const wsProvider = new WsProvider('wss://raman.truenetwork.io/ws')
  return await ApiPromise.create({ provider: wsProvider })
}

export const getSchemaFromHash = async (api: TrueApi, hash: string) => {
  try {
    const response = await api.network.query[CREDENTIALS_PALLET_NAME].schemas(hash)
    const data = response.toHuman()
    return data && (data as any[]).length > 0 ? data : null
  } catch (error) {
    console.error('Error fetching schema:', error)
    return null
  }
}

export const parseSchemaString = (schemaStr: any[]): SchemaField[] => {
  return schemaStr.map(field => ({
    name: field[0],
    type: field[1]
  }))
}


export const decodeEvent = (event: any): FormattedEvent | null => {
  try {
    const { section, method, data } = event
    const sectionName = section.toLowerCase()

    switch (`${sectionName}.${method}`) {
      case 'balances.Transfer':
        return {
          name: 'Transfer',
          section: 'Balances',
          parameters: [
            {
              name: 'From',
              value: data['from'],
              description: 'Sender wallet address'
            },
            {
              name: 'To',
              value: data['to'],
              description: 'Reciever wallet address'
            },
            {
              name: 'Amount',
              value: (data['amount'] / 12).toFixed(4),
              description: 'Controller accounts that manages the issuer'
            }
          ]
        }
      case 'issuersmodule.IssuerCreated':
        return {
          name: 'IssuerCreated',
          section: 'Issuers',
          parameters: [
            {
              name: 'Hash',
              value: data['hash_'],
              description: 'Unique hash identifying the issuer'
            },
            {
              name: 'Name',
              value: data['issuerName'],
              description: 'Name of the issuer entity'
            },
            {
              name: 'Controllers',
              value: data['controllersIdentified'].map((controller: any) => controller.toString()).join(', '),
              description: 'Controller accounts that manages the issuer'
            }
          ]
        }
      case 'credentialsmodule.SchemaCreated':
        return {
          name: 'SchemaCreated',
          section: 'Credentials',
          parameters: [
            {
              name: 'Schema Hash',
              value: data['schemaHash'],
              description: 'Unique hash identifying the schema'
            }
          ]
        }
      case 'credentialsmodule.AttestationCreated':
        return {
          name: 'AttestationCreated',
          section: 'Credentials',
          parameters: [
            {
              name: 'Issuer Hash',
              value: data['issuerHash'],
              description: 'Hash of the issuer creating the attestation'
            },
            {
              name: 'Account',
              value: data['accountId']['Ethereum'] ?? data['accountId']['Substrate'] ?? data['accountId']['Solana'],
              description: 'Address receiving the attestation'
            },
            {
              name: 'Schema',
              value: data['schemaHash'],
              description: 'Schema hash for the attestation'
            },
            {
              name: 'Attestation Index',
              value: data['attestationIndex'],
              description: 'Attestation Index for the account of this schema'
            },
            {
              name: 'Attestation',
              value: JSON.stringify(data['attestation']),
              description: 'Attestation data'
            }
          ]
        }
      case 'algorithmsmodule.AlgorithmAdded':
        return {
          name: 'AlgorithmAdded',
          section: 'Algorithms',
          parameters: [
            {
              name: 'Algorithm ID',
              value: data['algorithm_id'],
              description: 'Unique identifier for the algorithm'
            }
          ]
        }
      default:
        console.log(sectionName, method)
        return null
    }
  } catch (error) {
    console.error('Error decoding event:', error)
    return null
  }
}
