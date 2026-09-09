import { cn } from '@/lib/cn'

/** Glass-tinted placeholder used as the Suspense fallback for lazy sections,
 *  sized so the layout does not jump when the real content arrives. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-glass border border-line/10 bg-surface/20',
        className,
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-line/10 to-transparent" />
    </div>
  )
}

export function SectionSkeleton() {
  return (
    <div className="section-shell py-20">
      <Skeleton className="h-8 w-52" />
      <Skeleton className="mt-4 h-4 w-full max-w-xl" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </div>
  )
}
