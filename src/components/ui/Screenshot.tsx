import { ImageIcon } from 'lucide-react'
import { useT } from '@/app/providers/locale-context'
import type { ProductScreenshot } from '@/content/products'
import { cn } from '@/lib/cn'

interface ScreenshotProps {
  shot?: ProductScreenshot
  /** Fallback aspect-ratio for the empty slot, e.g. "1600 / 758". Keeps the box
   *  the same size before and after the real capture lands. */
  ratio: string
  /** Shown in the window chrome when there is no capture yet. */
  fallbackLabel: string
  className?: string
}

export function Screenshot({ shot, ratio, fallbackLabel, className }: ScreenshotProps) {
  const t = useT()

  return (
    <figure
      className={cn(
        'overflow-hidden rounded-glass border border-line/10 bg-surface/30 backdrop-blur-md',
        className,
      )}
    >
      {/* Window chrome, so a flat screenshot still reads as an application. */}
      <div className="flex items-center gap-1.5 border-b border-line/10 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-400/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
        <span className="ml-2 truncate font-mono text-[0.65rem] text-ink-subtle">
          {shot ? t(shot.label) : fallbackLabel}
        </span>
      </div>

      <div
        style={{ aspectRatio: shot ? `${shot.width} / ${shot.height}` : ratio }}
        className="relative"
      >
        {shot ? (
          <img
            src={shot.src}
            alt={t(shot.alt)}
            width={shot.width}
            height={shot.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-brand-500/8 to-accent-500/8">
            <div className="flex flex-col items-center gap-2 text-ink-subtle">
              <ImageIcon size={22} />
              <span className="font-mono text-[0.68rem]">
                {t({ pt: 'captura em breve', en: 'screenshot coming soon' })}
              </span>
            </div>
          </div>
        )}
      </div>
    </figure>
  )
}
