import { useId, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useT } from '@/app/providers/locale-context'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { ArchKind, ArchitectureSpec } from '@/lib/types'
import { cn } from '@/lib/cn'
import { ArchNode } from './ArchNode'
import { KIND_ACCENT, KIND_LABEL } from './kinds'
import { ArchEdges } from './ArchEdges'
import { ArchDetailPanel } from './ArchDetailPanel'
import { useContainerWidth, useLayout } from './useArchLayout'

interface ArchitectureDiagramProps {
  spec: ArchitectureSpec
  /** Hides the view switcher for single-view specs like the flow example. */
  showViews?: boolean
  className?: string
}

export function ArchitectureDiagram({
  spec,
  showViews = true,
  className,
}: ArchitectureDiagramProps) {
  const t = useT()
  const panelId = useId()
  const isDesktop = useMediaQuery('(min-width: 768px)', true)

  const [viewId, setViewId] = useState(spec.views[0]?.id ?? 'overview')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [focusId, setFocusId] = useState<string | null>(null)

  const { ref, width } = useContainerWidth<HTMLDivElement>()

  const view = spec.views.find((v) => v.id === viewId) ?? spec.views[0]
  const nodes = useMemo(
    () => spec.nodes.filter((node) => node.views.includes(viewId)),
    [spec.nodes, viewId],
  )
  const visibleIds = useMemo(() => new Set(nodes.map((n) => n.id)), [nodes])
  const edges = useMemo(
    () =>
      spec.edges.filter(
        (edge) => edge.views.includes(viewId) && visibleIds.has(edge.from) && visibleIds.has(edge.to),
      ),
    [spec.edges, viewId, visibleIds],
  )

  const { rects, height } = useLayout(spec, width)
  const selectedNode = nodes.find((node) => node.id === selectedId) ?? null

  const kindsInView = useMemo(() => {
    const seen: ArchKind[] = []
    for (const node of nodes) if (!seen.includes(node.kind)) seen.push(node.kind)
    return seen
  }, [nodes])

  const changeView = (next: string) => {
    setViewId(next)
    setSelectedId(null)
    setFocusId(null)
  }

  return (
    <div className={cn('w-full', className)}>
      {showViews && spec.views.length > 1 && (
        <div
          role="tablist"
          aria-label={t({ pt: 'Visões da arquitetura', en: 'Architecture views' })}
          className="mb-5 flex flex-wrap gap-2"
        >
          {spec.views.map((item) => {
            const active = item.id === viewId
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => changeView(item.id)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 font-mono text-xs transition',
                  active
                    ? 'border-transparent bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow'
                    : 'border-line/10 bg-surface/30 text-ink-muted hover:border-brand-400/40 hover:text-ink',
                )}
              >
                {t(item.label)}
              </button>
            )
          })}
        </div>
      )}

      {isDesktop ? (
        <div className="relative w-full overflow-hidden rounded-glass border border-line/10 bg-surface/15 p-4">
          {/* The ref sits on the inner box so the measured width excludes the
              padding - node positions and edge paths share that exact width. */}
          <div ref={ref} className="relative" style={{ height }}>
            {width > 0 && (
              <ArchEdges
                edges={edges}
                rects={rects}
                width={width}
                height={height}
                focusId={focusId}
              />
            )}

            {nodes.map((node) => {
              const rect = rects.get(node.id)
              if (!rect) return null
              const connected =
                !focusId ||
                focusId === node.id ||
                edges.some(
                  (e) =>
                    (e.from === focusId && e.to === node.id) ||
                    (e.to === focusId && e.from === node.id),
                )

              return (
                <ArchNode
                  key={node.id}
                  node={node}
                  rect={rect}
                  panelId={panelId}
                  selected={selectedId === node.id}
                  dimmed={!connected}
                  onSelect={() => setSelectedId((current) => (current === node.id ? null : node.id))}
                  onFocusChange={setFocusId}
                />
              )
            })}
          </div>
        </div>
      ) : (
        /* Under md the grid becomes a list ordered by layer, and the edges are
           spelled out instead of drawn - lines that small are unreadable. */
        <ol className="space-y-3">
          {nodes.map((node) => {
            const outgoing = edges.filter((edge) => edge.from === node.id)
            const accent = KIND_ACCENT[node.kind]

            return (
              <li key={node.id}>
                <button
                  type="button"
                  aria-expanded={selectedId === node.id}
                  aria-controls={panelId}
                  onClick={() => setSelectedId((c) => (c === node.id ? null : node.id))}
                  className="w-full rounded-xl border border-line/10 bg-surface/40 px-4 py-3 text-left backdrop-blur-md"
                >
                  <span className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide"
                      style={{ background: `rgb(${accent} / 0.16)`, color: `rgb(${accent})` }}
                    >
                      {t(KIND_LABEL[node.kind])}
                    </span>
                    <span className="font-semibold">{node.label}</span>
                  </span>
                  {node.sublabel && (
                    <span className="mt-1 block font-mono text-[0.68rem] text-ink-subtle">
                      {node.sublabel}
                    </span>
                  )}
                  {outgoing.length > 0 && (
                    <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-muted">
                      {outgoing.map((edge) => (
                        <span key={`${edge.from}-${edge.to}`} className="inline-flex items-center gap-1">
                          <ArrowRight size={11} className="text-brand-400" />
                          {spec.nodes.find((n) => n.id === edge.to)?.label ?? edge.to}
                          {edge.label && (
                            <span className="font-mono text-[0.62rem] text-ink-subtle">
                              ({t(edge.label)})
                            </span>
                          )}
                        </span>
                      ))}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ol>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {kindsInView.map((kind) => (
          <span key={kind} className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-ink-subtle">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full"
              style={{ background: `rgb(${KIND_ACCENT[kind]})` }}
            />
            {t(KIND_LABEL[kind])}
          </span>
        ))}
        <span className="ml-auto hidden font-mono text-[0.68rem] text-ink-subtle sm:inline">
          {t({
            pt: 'linha cheia: síncrono · tracejada: assíncrono · pontilhada: ponto a ponto',
            en: 'solid: synchronous · dashed: asynchronous · dotted: peer to peer',
          })}
        </span>
      </div>

      <div className="mt-5">
        <ArchDetailPanel
          id={panelId}
          node={selectedNode}
          fallback={{
            title: view ? t(view.label) : '',
            body: view ? t(view.description) : '',
          }}
        />
      </div>
    </div>
  )
}
