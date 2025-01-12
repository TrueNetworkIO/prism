export interface TransactionDetailsProps {
  hash: string
}

export interface FormattedEvent {
  name: string
  section: string
  parameters: EventParameter[]
  attestationData?: AttestationData
  schemaData?: { schema: SchemaField[] }
}

export interface EventParameter {
  name: string
  value: string
  description: string
}

export interface AttestationData {
  schema: SchemaField[]
  values: Record<string, any>
}

export interface SchemaField {
  name: string
  type: string
}

export interface TransactionState {
  events: FormattedEvent[]
  loading: boolean
  error: string | null
}