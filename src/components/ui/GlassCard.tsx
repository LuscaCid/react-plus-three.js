import { forwardRef, useCallback, useRef } from 'react'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'subtle' | 'default' | 'strong'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType
  variant?: Variant
  /** Adds the pointer-following specular highlight and a lift on hover. */
  interactive?: boolean
  children?: ReactNode
}

const variantClass: Record<Variant, string> = {
  subtle: 'glass glass-subtle',
  default: 'glass',
  strong: 'glass glass-strong',
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { as: Tag = 'div', variant = 'default', interactive = false, className, children, ...rest },
  forwardedRef,
) {
  const frame = useRef<number | null>(null)

  // Write the cursor position straight to CSS custom properties. Going through
  // state here would re-render the whole card on every pointer move.
  const trackPointer = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!interactive || frame.current !== null) return
      // currentTarget is nulled once the handler returns, so read it now.
      const el = event.currentTarget
      const { clientX, clientY } = event

      frame.current = requestAnimationFrame(() => {
        frame.current = null
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${((clientX - rect.left) / rect.width) * 100}%`)
        el.style.setProperty('--my', `${((clientY - rect.top) / rect.height) * 100}%`)
      })
    },
    [interactive],
  )

  // Seed the position the moment the pointer arrives. Without this the glow
  // fades in at its default spot - the middle of the card - and only jumps to
  // the cursor on the next mousemove.
  const handlePointerEnter = trackPointer

  return (
    <Tag
      ref={forwardedRef}
      className={cn(
        variantClass[variant],
        'rounded-glass',
        interactive && 'glass-interactive',
        className,
      )}
      {...(interactive
        ? { onPointerEnter: handlePointerEnter, onPointerMove: trackPointer }
        : {})}
      {...rest}
    >
      {children}
    </Tag>
  )
})
