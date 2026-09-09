import type { ElementType, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger, in milliseconds, applied as a transition delay. */
  delay?: number
  as?: ElementType
}

/** Fades content up the first time it scrolls into view.
 *  The transition itself is neutralised by the reduced-motion block in
 *  glass.css, so no extra branch is needed here. */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()

  // Widened on purpose: the caller picks the tag, so the ref type cannot be
  // narrowed to one element at this point.
  const Tag = as as ElementType

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
