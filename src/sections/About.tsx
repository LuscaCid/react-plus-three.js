import { GraduationCap, Languages } from 'lucide-react'
import { profile } from '@/content/profile'
import { education, languages } from '@/content/experience'
import { useT } from '@/app/providers/locale-context'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

export function About() {
  const t = useT()

  return (
    <section id="sobre" className="defer-paint scroll-mt-24 py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow={t({ pt: 'Sobre', en: 'About' })}
            title={t({
              pt: 'Quem eu sou e como eu trabalho',
              en: 'Who I am and how I work',
            })}
            description={t(profile.summary)}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <GlassCard className="h-full px-6 py-7 sm:px-8">
              <div className="space-y-5 text-pretty leading-relaxed text-ink-muted">
                {profile.about.map((paragraph, index) => (
                  <p key={index}>{t(paragraph)}</p>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <div className="grid gap-6 lg:col-span-2">
            <Reveal delay={80}>
              <GlassCard className="px-6 py-7">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-subtle">
                  <GraduationCap size={16} className="text-brand-400" />
                  {t({ pt: 'Formação', en: 'Education' })}
                </h3>
                <ul className="mt-4 space-y-4">
                  {education.map((item) => (
                    <li key={item.institution}>
                      <p className="font-medium">{t(item.degree)}</p>
                      <p className="mt-0.5 text-sm text-ink-muted">
                        {item.institution} · {item.location}
                      </p>
                      <p className="mt-0.5 font-mono text-xs text-ink-subtle">{t(item.period)}</p>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            <Reveal delay={140}>
              <GlassCard className="px-6 py-7">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-subtle">
                  <Languages size={16} className="text-accent-400" />
                  {t({ pt: 'Idiomas', en: 'Languages' })}
                </h3>
                <ul className="mt-4 space-y-4">
                  {languages.map((item) => (
                    <li key={item.name.en}>
                      <p className="font-medium">{t(item.name)}</p>
                      <p className="mt-0.5 text-sm text-ink-muted">{t(item.level)}</p>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
