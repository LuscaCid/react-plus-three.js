import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { navItems } from '@/content/profile'
import { useT } from '@/app/providers/locale-context'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { ThemeToggle } from './ThemeToggle'
import { LocaleToggle } from './LocaleToggle'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  isHome: boolean
}

export function MobileMenu({ open, onClose, isHome }: MobileMenuProps) {
  const t = useT()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      // Keep focus inside the panel while it is open.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  const anchor = (href: string) => (isHome ? href : `/${href}`)

  return (
    <div className="fixed inset-0 z-[70] lg:hidden print:hidden">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t({ pt: 'Menu', en: 'Menu' })}
        className="glass absolute inset-x-3 top-3 rounded-glass-lg p-5"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-subtle">
            {t({ pt: 'Navegacao', en: 'Navigation' })}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t({ pt: 'Fechar menu', en: 'Close menu' })}
            className="grid h-9 w-9 place-items-center rounded-full border border-line/10 text-ink"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="mt-5 grid gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={anchor(item.href)}
              onClick={onClose}
              className="rounded-xl px-3 py-3 text-lg font-medium text-ink transition hover:bg-line/10"
            >
              {t(item.label)}
            </a>
          ))}
          <Link
            to="/cv"
            onClick={onClose}
            className="mt-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-3 py-3 text-center text-base font-medium text-white"
          >
            {t({ pt: 'Ver curriculo', en: 'View resume' })}
          </Link>
        </nav>

        <div className="mt-5 flex items-center justify-between border-t border-line/10 pt-4">
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
