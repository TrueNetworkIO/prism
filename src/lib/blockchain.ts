import { FormattedEvent, SchemaField } from '@/components/types'
import { ApiPromise } from '@polkadot/api'
import { TrueApi } from '@truenetworkio/sdk'
import { CREDENTIALS_PALLET_NAME } from '@truenetworkio/sdk/dist/pallets/credentials/state'

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
function formatSubstrateBalance(rawBalance: any, decimals = 12) {
  // Handle different input types
  let bigValue;

  try {
    // Check if the input is already a BigInt
    if (typeof rawBalance === 'bigint') {
      bigValue = rawBalance;
    }
    // Handle hex string (common in Substrate)
    else if (typeof rawBalance === 'string' && rawBalance.startsWith('0x')) {
      bigValue = BigInt(rawBalance);
    }
    // Handle regular string or number
    else {
      bigValue = BigInt(rawBalance.toString().replace(/,/g, ''));
    }

    // Convert to a string for precise decimal manipulation
    const stringValue = bigValue.toString();

    // If the value is smaller than the decimal places
    if (stringValue.length <= decimals) {
      const paddedValue = stringValue.padStart(decimals, '0');
      const decimalPart = paddedValue.slice(0, 4).replace(/0+$/, '');

      if (decimalPart === '') {
        return "0";
      }
      return `0.${decimalPart}`;
    }

    // Split into whole and decimal parts
    const wholePartStr = stringValue.slice(0, stringValue.length - decimals) || '0';
    const decimalPartStr = stringValue.slice(stringValue.length - decimals);

    // Format the whole part with commas
    const wholePart = parseInt(wholePartStr).toLocaleString();

    // Take up to 4 decimal places and remove trailing zeros
    const decimalPart = decimalPartStr.padStart(decimals, '0').slice(0, 4).replace(/0+$/, '');

    // Return formatted result
    if (decimalPart === '') {
      return wholePart;
    }
    return `${wholePart}.${decimalPart}`;

  } catch (error) {
    console.error("Error formatting balance:", error);
    // Return a fallback value or the original to prevent NaN
    return "Error: Invalid balance format";
  }
}

export const parseSchemaString = (schemaStr: any[]): SchemaField[] => {
  return schemaStr.map(field => ({
    name: field[0],
    type: field[1]
  }))
}


export const decodeEvent = (event: any, api: ApiPromise): FormattedEvent | null => {
  try {
    const { section, method, data } = event
    const sectionName = section.toLowerCase()

    switch (`${sectionName}.${method}`) {
      case 'balances.Unreserved':
        return {
          name: 'Unreserved',
          section: 'Balances',
          parameters: [
            {
              name: 'Who',
              value: data['who'],
              description: 'Account with funds reserved'
            },
            {
              name: 'Amount',
              value: formatSubstrateBalance(data['amount'].toString()) + ' TRUE',
              description: 'Amount reserved'
            }
          ]
        };
      case 'balances.Reserved':
        return {
          name: 'Reserved',
          section: 'Balances',
          parameters: [
            {
              name: 'Who',
              value: data['who'],
              description: 'Account with funds reserved'
            },
            {
              name: 'Amount',
              value: formatSubstrateBalance(data['amount'].toString()) + ' TRUE',
              description: 'Amount reserved'
            }
          ]
        };
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
              value: formatSubstrateBalance(data['amount'].toString()) + ' TRUE',
              description: 'Amount transferred'
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
            },
            {
              name: 'Schema',
              value: JSON.stringify(data['schema']),
              description: 'Schema structure created on-chain'
            },
            {
              name: 'Issuer Hash',
              value: JSON.stringify(data['issuerHash']),
              description: 'Hash of the issuer creating the schema'
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
              name: 'Attested To',
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
      case 'credentialsmodule.AttestationUpdated':
        return {
          name: 'AttestationUpdated',
          section: 'Credentials',
          parameters: [
            {
              name: 'Issuer Hash',
              value: data['issuerHash'],
              description: 'Hash of the issuer creating the attestation'
            },
            {
              name: 'Attested To',
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
              value: data['algorithmId'],
              description: 'Unique identifier for the algorithm'
            },
            {
              name: 'Schemas',
              value: data['schemaHashes'].map((schema: any) => schema.toString()).join(', '),
              description: 'Schema hashes associated with the algorithm'
            }
          ]
        }
      case 'algorithmsmodule.AlgoResult':
        return {
          name: 'AlgoResult',
          section: 'Algorithms',
          parameters: [
            {
              name: 'Algorithm Result',
              value: data['result'],
              description: 'Result of the reputation algorithm.'
            },
            {
              name: 'Issuer Hash',
              value: data['issuerHash'],
              description: 'The hash of the issuer who created the attestations used by the algorithm.'
            },
            {
              name: 'Account Id',
              value: data['accountId'],
              description: "User's Account ID for whom the reputation is calculated."
            }
          ]
        }
      // Add to your decodeEvent function in blockchain.ts
      case 'system.ExtrinsicFailed':
        try {
          const dispatchError = data.dispatchError;
          let errorInfo: any = { section: 'Unknown', method: 'Unknown', description: 'Unknown error' };

          // Handle module errors (from custom pallets)
          if (dispatchError.isModule) {
            // This line assumes you have access to the API instance
            // You might need to pass it as a parameter to decodeEvent
            const decoded = api.registry.findMetaError(dispatchError.asModule);
            errorInfo = {
              section: decoded.section,
              name: decoded.method,
              description: decoded.docs ? decoded.docs.join(' ') : 'No details available'
            };
          }
          // Handle other error types
          else if (dispatchError.isToken) {
            errorInfo = {
              section: 'Token',
              name: dispatchError.asToken.type,
              description: 'Token error'
            };
          } else if (dispatchError.isArithmetic) {
            errorInfo = {
              section: 'Arithmetic',
              name: dispatchError.asArithmetic.type,
              description: 'Arithmetic error'
            };
          }

          return {
            name: 'ExtrinsicFailed',
            section: 'System',
            parameters: [
              {
                name: 'Error',
                value: `${errorInfo.section}.${errorInfo.name}`,
                description: errorInfo.description
              },
              {
                name: 'Details',
                value: JSON.stringify(dispatchError),
                description: 'Technical error details'
              }
            ]
          };
        } catch (error) {
          console.error('Error decoding dispatch error:', error);
          return {
            name: 'ExtrinsicFailed',
            section: 'System',
            parameters: [
              {
                name: 'Error',
                value: 'Unknown',
                description: 'Failed to decode the error'
              },
              {
                name: 'Details',
                value: JSON.stringify(data.dispatchError),
                description: 'Raw error data'
              }
            ]
          };
        }
      default:
        return null
    }
  } catch (error) {
    console.error('Error decoding event:', error)
    return null
  }
}
