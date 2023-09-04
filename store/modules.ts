export interface Module {
  id?: number
  sectionName: string
  fields: { type: 'String' | 'Number' | 'Boolean' | 'JSON-html', label: string }
}
