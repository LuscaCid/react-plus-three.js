import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Locale, Localized } from '@/lib/types'
import { LocaleContext } from './locale-context'

const STORAGE_KEY = 'lc.locale'

function initialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'pt' || stored === 'en') return stored
  } catch {
    /* blocked storage - fall back to the browser language */
  }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window === 'undefined' ? 'pt' : initialLocale(),
  )

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      /* the choice just will not survive a reload */
    }
  }, [locale])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])
  const t = useCallback((field: Localized) => field[locale], [locale])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
