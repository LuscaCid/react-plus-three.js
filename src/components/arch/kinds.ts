import { Boxes, Cloud, Database, Globe, HardDrive, Monitor, Radio, Workflow } from 'lucide-react'
import type { ArchKind, Localized } from '@/lib/types'

export const KIND_ICON: Record<ArchKind, typeof Globe> = {
  client: Monitor,
  edge: Cloud,
  service: Boxes,
  worker: Workflow,
  datastore: Database,
  broker: Radio,
  storage: HardDrive,
  external: Globe,
}

/** One accent per layer, so the diagram reads by colour before it reads by
 *  label. Values are token names, so both themes stay consistent. */
export const KIND_ACCENT: Record<ArchKind, string> = {
  client: 'var(--brand-400)',
  edge: 'var(--accent-400)',
  service: 'var(--brand-500)',
  worker: 'var(--accent-500)',
  datastore: 'var(--beam)',
  broker: 'var(--accent-300)',
  storage: 'var(--beam)',
  external: 'var(--ink-subtle)',
}

export const KIND_LABEL: Record<ArchKind, Localized> = {
  client: { pt: 'Cliente', en: 'Client' },
  edge: { pt: 'Borda', en: 'Edge' },
  service: { pt: 'Serviço', en: 'Service' },
  worker: { pt: 'Processo', en: 'Worker' },
  datastore: { pt: 'Banco', en: 'Datastore' },
  broker: { pt: 'Fila', en: 'Broker' },
  storage: { pt: 'Storage', en: 'Storage' },
  external: { pt: 'Externo', en: 'External' },
}
