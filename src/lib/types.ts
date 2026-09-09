export type Locale = 'pt' | 'en'

/** Every user-facing string carries both languages next to the data it
 *  describes, so a translation can never drift away from its key. */
export interface Localized {
  pt: string
  en: string
}

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

/* --- Architecture diagrams ------------------------------------------------ */

export type ArchKind =
  | 'client'
  | 'edge'
  | 'service'
  | 'worker'
  | 'datastore'
  | 'broker'
  | 'storage'
  | 'external'

export interface ArchNode {
  id: string
  label: string
  sublabel?: string
  kind: ArchKind
  tech: string[]
  /** 1-based grid coordinates; the renderer converts them to percentages. */
  col: number
  row: number
  span?: number
  detail: Localized
  bullets?: Localized[]
  /** Which views show this node. */
  views: string[]
}

export type ArchEdgeKind = 'sync' | 'async' | 'stream' | 'p2p'

export interface ArchEdge {
  from: string
  to: string
  label?: Localized
  kind: ArchEdgeKind
  views: string[]
  /** Route the path around the grid instead of straight through it. */
  bend?: 'auto' | 'horizontal' | 'vertical'
  highlight?: boolean
}

export interface ArchView {
  id: string
  label: Localized
  description: Localized
}

export interface ArchitectureSpec {
  id: string
  cols: number
  rows: number
  views: ArchView[]
  nodes: ArchNode[]
  edges: ArchEdge[]
}
