export const FILTERED_EVENTS = [
  "issuersModule.IssuerCreated",
  'credentialsModule.SchemaCreated',
  "credentialsModule.AttestationCreated",
  "credentialsModule.AttestationUpdated",
  'algorithmsModule.AlgorithmAdded',
  'algorithmsModule.AlgoResult',
  'balances.Transfer',
  'balances.Reserved',
  'balances.Unreserved',
  'system.ExtrinsicFailed'
] as string[]

export const EVENT_TYPES = {
  ATTESTATION: ['AttestationCreated', 'AttestationUpdated'],
  ISSUER: 'IssuerCreated',
  SCHEMA: 'SchemaCreated',
  ALGORITHM: ['AlgorithmAdded', 'AlgoResult'],
}

export const BLOCK_ERRORS = {
  STATE_DISCARDED: '4003',
  BLOCK_UNAVAILABLE: 'Api called for an unknown Block'
}