import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { navItems, profile } from '@/content/profile'
import { useT } from '@/app/providers/locale-context'
import { cn } from '@/lib/cn'
import { ThemeToggle } from './ThemeToggle'
import { LocaleToggle } from './LocaleToggle'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const t = useT()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Anchors only resolve on the home page; from /cv they need to go back first.
  const anchor = (href: string) => (isHome ? href : `/${href}`)

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {t({ pt: 'Pular para o conteudo', en: 'Skip to content' })}
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 print:hidden',
          scrolled ? 'py-2' : 'py-4',
        )}
      >
        <div className="section-shell">
          <div
            className={cn(
              'flex items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-300',
              scrolled ? 'glass' : 'border border-transparent',
            )}
          >
            <Link
              to="/"
              className="flex items-center gap-2.5 rounded-full pl-1 pr-3 font-semibold tracking-tight"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white shadow-lg shadow-brand-600/25">
                {profile.initials}
              </span>
              <span className="hidden sm:inline">{profile.name}</span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={anchor(item.href)}
                  className="rounded-full px-3 py-1.5 text-sm text-ink-muted transition hover:bg-line/10 hover:text-ink"
                >
                  {t(item.label)}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <LocaleToggle className="hidden sm:inline-flex" />
              <ThemeToggle className="hidden sm:inline-flex" />
              <Link
                to="/cv"
                className="hidden rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand-600/25 transition hover:brightness-110 md:inline-flex"
              >
                {t({ pt: 'Curriculo', en: 'Resume' })}
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={t({ pt: 'Abrir menu', en: 'Open menu' })}
                className="grid h-9 w-9 place-items-center rounded-full border border-line/10 bg-surface/30 text-ink lg:hidden"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} isHome={isHome} />
    </>
  )
}
