import { useT } from '@/app/providers/locale-context'
import type { ArchNode } from '@/lib/types'
import { KIND_ACCENT, KIND_LABEL } from './kinds'

interface ArchDetailPanelProps {
  id: string
  node: ArchNode | null
  /** Shown when nothing is selected: the description of the active view. */
  fallback: { title: string; body: string }
}

export function ArchDetailPanel({ id, node, fallback }: ArchDetailPanelProps) {
  const t = useT()

  if (!node) {
    return (
      <div
        id={id}
        className="rounded-glass border border-line/10 bg-surface/25 px-5 py-5 sm:px-6"
      >
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-400">
          {fallback.title}
        </p>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-muted">{fallback.body}</p>
        <p className="mt-4 font-mono text-xs text-ink-subtle">
          {t({
            pt: 'Clique em qualquer bloco para ver o que ele faz.',
            en: 'Click any block to see what it does.',
          })}
        </p>
      </div>
    )
  }

  const accent = KIND_ACCENT[node.kind]

  return (
    <div id={id} className="rounded-glass border border-line/10 bg-surface/25 px-5 py-5 sm:px-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span
          className="rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide"
          style={{ background: `rgb(${accent} / 0.16)`, color: `rgb(${accent})` }}
        >
          {t(KIND_LABEL[node.kind])}
        </span>
        <h4 className="text-lg font-semibold">{node.label}</h4>
        {node.sublabel && (
          <span className="font-mono text-xs text-ink-subtle">{node.sublabel}</span>
        )}
      </div>

      <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-muted">{t(node.detail)}</p>

      {node.bullets && node.bullets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {node.bullets.map((bullet, index) => (
            <li key={index} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
              <span
                aria-hidden
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                style={{ background: `rgb(${accent})` }}
              />
              {t(bullet)}
            </li>
          ))}
        </ul>
      )}

      {node.tech.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {node.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line/10 bg-surface/40 px-2.5 py-1 font-mono text-[0.68rem] text-ink-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
