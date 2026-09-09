import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { ResolvedTheme, Theme } from '@/lib/types'
import { ThemeContext } from './theme-context'

const STORAGE_KEY = 'lc.theme'

function systemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  } catch {
    /* private mode, blocked storage - fall through to the default */
  }
  return 'system'
}

/** Applies the resolved theme to <html> and keeps the browser UI colour in
 *  sync. The same attribute is stamped by the inline script in index.html
 *  before first paint, so this only ever confirms or changes it. */
function applyTheme(resolved: ResolvedTheme) {
  document.documentElement.setAttribute('data-theme', resolved)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', resolved === 'dark' ? '#08090f' : '#f6f7fc')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === 'undefined' ? 'system' : readStoredTheme(),
  )
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    typeof window === 'undefined' ? 'dark' : theme === 'system' ? systemTheme() : theme,
  )

  useEffect(() => {
    const resolved = theme === 'system' ? systemTheme() : theme
    setResolvedTheme(resolved)
    applyTheme(resolved)

    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* the choice just will not survive a reload */
    }

    if (theme !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      const next = systemTheme()
      setResolvedTheme(next)
      applyTheme(next)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [theme])

  const setTheme = useCallback((next: Theme) => setThemeState(next), [])

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
