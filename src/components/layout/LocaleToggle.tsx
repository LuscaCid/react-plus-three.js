import { useLocale } from '@/app/providers/locale-context'
import type { Locale } from '@/lib/types'
import { cn } from '@/lib/cn'

const OPTIONS: { value: Locale; short: string; full: string }[] = [
  { value: 'pt', short: 'PT', full: 'Portugues' },
  { value: 'en', short: 'EN', full: 'English' },
]

export function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale()

  return (
    <div
      role="radiogroup"
      aria-label={locale === 'pt' ? 'Idioma' : 'Language'}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-line/10 bg-surface/30 p-0.5 backdrop-blur',
        className,
      )}
    >
      {OPTIONS.map(({ value, short, full }) => {
        const active = locale === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={full}
            onClick={() => setLocale(value)}
            className={cn(
              'rounded-full px-2.5 py-1 font-mono text-xs transition',
              active
                ? 'bg-ink text-bg shadow'
                : 'text-ink-subtle hover:text-ink',
            )}
          >
            {short}
          </button>
        )
      })}
    </div>
  )
}
