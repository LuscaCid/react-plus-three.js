import { createContext, useContext } from 'react'
import type { Locale, Localized } from '@/lib/types'

export interface LocaleContextValue {
  locale: Locale
  setLocale: (next: Locale) => void
  /** Resolve a { pt, en } pair against the active locale. */
  t: (field: Localized) => string
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>')
  return ctx
}

/** Shorthand for components that only need the resolver. */
export function useT() {
  return useLocale().t
}
