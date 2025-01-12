export const FILTERED_EVENTS = [
  "issuersModule.IssuerCreated",
  'credentialsModule.SchemaCreated',
  "credentialsModule.AttestationCreated",
  'algorithmsModule.AlgorithmAdded'
] as string[]

export const EVENT_TYPES = {
  ATTESTATION: 'AttestationCreated',
  ISSUER: 'IssuerCreated',
  SCHEMA: 'SchemaCreated',
  ALGORITHM: 'AlgorithmAdded'
} as const

export const BLOCK_ERRORS = {
  STATE_DISCARDED: '4003',
  BLOCK_UNAVAILABLE: 'Api called for an unknown Block'
}