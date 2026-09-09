import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/app/providers/theme-context'
import { useT } from '@/app/providers/locale-context'
import type { Theme } from '@/lib/types'
import { cn } from '@/lib/cn'

const OPTIONS: { value: Theme; Icon: typeof Sun; label: { pt: string; en: string } }[] = [
  { value: 'light', Icon: Sun, label: { pt: 'Tema claro', en: 'Light theme' } },
  { value: 'dark', Icon: Moon, label: { pt: 'Tema escuro', en: 'Dark theme' } },
  { value: 'system', Icon: Monitor, label: { pt: 'Tema do sistema', en: 'System theme' } },
]

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const t = useT()

  return (
    <div
      role="radiogroup"
      aria-label={t({ pt: 'Tema', en: 'Theme' })}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-line/10 bg-surface/30 p-0.5 backdrop-blur',
        className,
      )}
    >
      {OPTIONS.map(({ value, Icon, label }) => {
        const active = theme === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={t(label)}
            title={t(label)}
            onClick={() => setTheme(value)}
            className={cn(
              'grid h-8 w-8 place-items-center rounded-full transition',
              active
                ? 'bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow'
                : 'text-ink-subtle hover:text-ink',
            )}
          >
            <Icon size={15} strokeWidth={2} />
          </button>
        )
      })}
    </div>
  )
}
