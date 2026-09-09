import { useT } from '@/app/providers/locale-context'
import type { ArchEdge } from '@/lib/types'
import { cn } from '@/lib/cn'
import { edgeGeometry, type NodeRect } from './useArchLayout'

interface ArchEdgesProps {
  edges: ArchEdge[]
  rects: Map<string, NodeRect>
  width: number
  height: number
  /** When set, edges not touching this node are dimmed. */
  focusId: string | null
}

const STROKE: Record<ArchEdge['kind'], string> = {
  sync: 'rgb(var(--brand-400))',
  async: 'rgb(var(--accent-400))',
  stream: 'rgb(var(--beam))',
  p2p: 'rgb(var(--ink-subtle))',
}

export function ArchEdges({ edges, rects, width, height, focusId }: ArchEdgesProps) {
  const t = useT()

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      {edges.map((edge) => {
        const from = rects.get(edge.from)
        const to = rects.get(edge.to)
        if (!from || !to) return null

        const { d, tip, angle, mid } = edgeGeometry(from, to)
        const touched = !focusId || focusId === edge.from || focusId === edge.to
        const color = STROKE[edge.kind]
        // A label only reads correctly on a short hop. Across several rows its
        // midpoint lands on top of unrelated nodes, so that edge goes unlabelled.
        const label = edge.label && Math.abs(from.row - to.row) <= 1 ? t(edge.label) : null

        return (
          <g
            key={`${edge.from}-${edge.to}-${edge.kind}`}
            style={{ opacity: touched ? 1 : 0.14 }}
            className="transition-opacity duration-300"
          >
            <path
              d={d}
              stroke={color}
              strokeWidth={edge.highlight ? 2 : 1.4}
              strokeOpacity={edge.highlight ? 0.95 : 0.65}
              className={cn(
                'arch-edge',
                edge.kind === 'async' && 'arch-edge--async',
                edge.kind === 'stream' && 'arch-edge--async',
                edge.kind === 'p2p' && 'arch-edge--p2p',
              )}
            />

            {/* Arrowhead drawn as geometry rather than a marker, so it inherits
                the group opacity the same way the path does. */}
            <path
              d="M 0 0 L -7 -3.6 L -7 3.6 Z"
              fill={color}
              fillOpacity={edge.highlight ? 0.95 : 0.7}
              transform={`translate(${tip.x} ${tip.y}) rotate(${angle})`}
            />

            {label && (
              <text
                x={mid.x}
                y={mid.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-ink-subtle font-mono"
                style={{ fontSize: 10, paintOrder: 'stroke' }}
                stroke="rgb(var(--bg))"
                strokeWidth={4}
                strokeLinejoin="round"
              >
                {label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
