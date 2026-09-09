import { experiences } from '@/content/experience'
import { useT } from '@/app/providers/locale-context'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Chip } from '@/components/ui/Chip'

export function Experience() {
  const t = useT()

  return (
    <section id="experiencia" className="section-rule defer-paint scroll-mt-24 py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow={t({ pt: 'Experiência', en: 'Experience' })}
            title={t({
              pt: 'Onde eu trabalhei e o que construí lá',
              en: 'Where I have worked and what I built there',
            })}
          />
        </Reveal>

        <ol className="relative mt-12 space-y-6">
          {/* The rail sits behind the cards and stops at the last marker. */}
          <span
            aria-hidden
            className="absolute bottom-8 left-[15px] top-8 hidden w-px bg-gradient-to-b from-line/20 via-line/10 to-transparent sm:block"
          />

          {experiences.map((item, index) => (
            <Reveal as="li" key={item.id} delay={index * 60} className="relative sm:pl-12">
              <span
                aria-hidden
                className="absolute left-0 top-8 hidden h-[31px] w-[31px] place-items-center rounded-full border border-line/10 bg-bg-elev sm:grid"
              >
                <span
                  className={
                    item.current
                      ? 'h-2.5 w-2.5 rounded-full bg-ink shadow-[0_0_0_4px_rgb(var(--line)/0.1)]'
                      : 'h-2 w-2 rounded-full bg-ink-subtle/60'
                  }
                />
              </span>

              <GlassCard interactive className="px-6 py-7 sm:px-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold">{t(item.role)}</h3>
                  <span className="font-mono text-xs text-ink-subtle">{t(item.period)}</span>
                </div>

                <p className="mt-1 text-sm text-ink-muted">
                  <span className="font-medium text-brand-400">{item.company}</span> · {item.location}
                  {item.current && (
                    <span className="ml-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-brand-400">
                      {t({ pt: 'Atual', en: 'Current' })}
                    </span>
                  )}
                </p>

                <p className="mt-4 text-pretty leading-relaxed text-ink-muted">{t(item.summary)}</p>

                <ul className="mt-5 space-y-2.5">
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-400"
                      />
                      {t(highlight)}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tech.map((tech) => (
                    <Chip key={tech.label} label={tech.label} slug={tech.slug} />
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
