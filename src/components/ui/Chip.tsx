import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { TechIcon } from './TechIcon'

interface ChipProps {
  label: string
  slug?: string
  className?: string
  children?: ReactNode
}

/** A technology pill: brand mark (or monogram) plus the name, in mono type. */
export function Chip({ label, slug, className, children }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line/10 bg-surface/30 px-3 py-1.5',
        'font-mono text-xs text-ink-muted backdrop-blur-sm transition-colors',
        'hover:border-brand-400/40 hover:text-ink',
        className,
      )}
    >
      <TechIcon slug={slug} label={label} className="text-[1.05rem]" />
      {children ?? label}
    </span>
  )
}
