import { forwardRef } from 'react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'glass' | 'ghost'
type Size = 'sm' | 'md'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition ' +
  'disabled:cursor-not-allowed disabled:opacity-55'

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-bg shadow-lg shadow-line/10 ' +
    'hover:opacity-90 active:opacity-80',
  glass:
    'glass rounded-full text-ink hover:text-ink [&:hover]:-translate-y-0.5 transition-transform',
  ghost: 'text-ink-muted hover:bg-line/10 hover:text-ink',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm sm:text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children?: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  )
})

export const ButtonLink = forwardRef<HTMLAnchorElement, LinkProps>(function ButtonLink(
  { variant = 'primary', size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <a ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  )
})
