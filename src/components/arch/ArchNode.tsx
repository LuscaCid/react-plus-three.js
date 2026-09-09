import type { ArchNode as ArchNodeData } from '@/lib/types'
import { cn } from '@/lib/cn'
import type { NodeRect } from './useArchLayout'
import { KIND_ACCENT, KIND_ICON } from './kinds'

interface ArchNodeProps {
  node: ArchNodeData
  rect: NodeRect
  selected: boolean
  dimmed: boolean
  panelId: string
  onSelect: () => void
  onFocusChange: (id: string | null) => void
}

export function ArchNode({
  node,
  rect,
  selected,
  dimmed,
  panelId,
  onSelect,
  onFocusChange,
}: ArchNodeProps) {
  const Icon = KIND_ICON[node.kind]
  const accent = KIND_ACCENT[node.kind]

  return (
    <button
      type="button"
      aria-expanded={selected}
      aria-controls={panelId}
      onClick={onSelect}
      onMouseEnter={() => onFocusChange(node.id)}
      onMouseLeave={() => onFocusChange(null)}
      onFocus={() => onFocusChange(node.id)}
      onBlur={() => onFocusChange(null)}
      style={{
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: rect.h,
        borderColor: selected ? `rgb(${accent})` : undefined,
        boxShadow: selected
          ? `0 0 0 1px rgb(${accent} / 0.6), 0 12px 32px -18px rgb(${accent})`
          : undefined,
      }}
      className={cn(
        'absolute flex flex-col justify-center gap-1 overflow-hidden rounded-xl border px-3 py-2 text-left',
        'border-line/10 bg-surface/50 backdrop-blur-md transition-all duration-300',
        'hover:border-brand-400/50 hover:bg-surface/70',
        dimmed && 'opacity-25',
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, rgb(${accent} / 0.9), transparent)` }}
      />

      <span className="flex items-center gap-1.5">
        <Icon size={13} style={{ color: `rgb(${accent})` }} className="shrink-0" />
        <span className="truncate text-[0.8rem] font-semibold leading-tight">{node.label}</span>
      </span>

      {node.sublabel && (
        <span className="truncate font-mono text-[0.62rem] leading-tight text-ink-subtle">
          {node.sublabel}
        </span>
      )}
    </button>
  )
}
