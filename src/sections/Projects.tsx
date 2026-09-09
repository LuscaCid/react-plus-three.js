import { ArrowUpRight, Lock } from 'lucide-react'
import { projects } from '@/content/projects'
import { useT } from '@/app/providers/locale-context'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Chip } from '@/components/ui/Chip'

export function Projects() {
  const t = useT()

  return (
    <section id="projetos" className="section-rule defer-paint scroll-mt-24 py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow={t({ pt: 'Projetos', en: 'Projects' })}
            title={t({
              pt: 'Outros sistemas que passaram pelas minhas mãos',
              en: 'Other systems that went through my hands'
            })}
            description={t({
              pt: 'Trabalhos do período na Wi5 Tecnologia, entre portais públicos, ferramentas internas e dashboards.',
              en: 'Work from my time at Wi5 Tecnologia, across public portals, internal tooling and dashboards.',
            })}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 70}>
              <GlassCard interactive className="flex h-full flex-col px-6 py-7 sm:px-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink-subtle">
                      {t(project.context)}
                    </p>
                  </div>
                  {project.link && (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${project.name} — ${t(project.link.label)}`}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line/10 bg-surface/30 text-ink-muted transition hover:border-brand-400/40 hover:text-ink"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>

                <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-ink-muted">
                  {t(project.description)}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Chip key={tech.label} label={tech.label} slug={tech.slug} />
                  ))}
                </div>

                <div className="mt-6 border-t border-line/10 pt-4 text-sm">
                  {project.link ? (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 font-medium text-brand-400 underline-offset-4 hover:underline"
                    >
                      {t(project.link.label)}
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    project.note && (
                      <span className="inline-flex items-center gap-2 text-ink-subtle">
                        <Lock size={14} />
                        {t(project.note)}
                      </span>
                    )
                  )}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
