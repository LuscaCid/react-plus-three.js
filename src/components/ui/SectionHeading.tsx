import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <header className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-ink-muted">{description}</p>
      )}
    </header>
  )
}
