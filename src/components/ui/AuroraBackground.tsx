/** Fixed backdrop behind the whole page: three drifting luminance blobs, a
 *  grain layer that kills banding, and the two vertical page rules.
 *
 *  The blobs are monochrome now - they exist to give the glass panes something
 *  with tonal variation to refract, which is the only job they ever had. The
 *  tiled grid that used to sit here is gone; `.frame-lines` plus the per-section
 *  `.section-rule` draw the structure instead.
 *
 *  Animation is transform-only and switched off by prefers-reduced-motion. */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden"
    >
      <div
        className="aurora-blob animate-aurora-a"
        style={{
          top: '-18vh',
          left: '-10vw',
          width: '58vw',
          height: '58vw',
          background: 'radial-gradient(circle, rgb(var(--brand-500)) 0%, transparent 70%)',
        }}
      />
      <div
        className="aurora-blob animate-aurora-b"
        style={{
          top: '10vh',
          right: '-16vw',
          width: '52vw',
          height: '52vw',
          background: 'radial-gradient(circle, rgb(var(--accent-500)) 0%, transparent 70%)',
        }}
      />
      <div
        className="aurora-blob animate-aurora-c"
        style={{
          bottom: '-24vh',
          left: '22vw',
          width: '46vw',
          height: '46vw',
          background: 'radial-gradient(circle, rgb(var(--beam)) 0%, transparent 72%)',
        }}
      />
      <div className="aurora-grain" />
      <div className="frame-lines" />
    </div>
  )
}
