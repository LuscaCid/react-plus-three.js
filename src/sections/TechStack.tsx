import { Bot, Brain, Sparkles } from 'lucide-react'
import { aiSection, techCategories } from '@/content/tech'
import { useT } from '@/app/providers/locale-context'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Chip } from '@/components/ui/Chip'

const PROOF_ICONS = [Bot, Sparkles, Brain]

export function TechStack() {
  const t = useT()

  return (
    <section id="stack" className="section-rule defer-paint scroll-mt-24 py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow={t({ pt: 'Stack', en: 'Stack' })}
            title={t({
              pt: 'As ferramentas que eu uso de verdade',
              en: 'The tools I actually use',
            })}
            description={t({
              pt: 'Nada de lista decorativa: cada item aqui apareceu em produto entregue, em cliente atendido ou em sistema que eu mesmo mantenho no ar.',
              en: 'No decorative list: everything here has shown up in a shipped product, a client engagement, or a system I keep running myself.',
            })}
          />
        </Reveal>

        {/* AI gets the full-width treatment: it is the part of the stack that
            separates this profile from a generic full-stack one. */}
        <Reveal className="mt-12">
          <GlassCard
            variant="strong"
            className="relative overflow-hidden rounded-glass-lg px-6 py-8 sm:px-10 sm:py-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgb(var(--accent-500)), transparent 70%)',
              }}
            />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-bg shadow-lg shadow-line/10">
                  <Sparkles size={20} />
                </span>
                <h3 className="text-2xl font-semibold sm:text-3xl">{t(aiSection.title)}</h3>
              </div>

              <p className="mt-5 max-w-3xl text-pretty leading-relaxed text-ink-muted">
                {t(aiSection.description)}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {aiSection.items.map((item) => (
                  <Chip
                    key={item.label}
                    label={item.label}
                    slug={item.slug}
                    className="border-accent-400/25 bg-surface/40 text-ink"
                  />
                ))}
              </div>

              <div className="mt-9 grid gap-5 lg:grid-cols-3">
                {aiSection.proofs.map((proof, index) => {
                  const Icon = PROOF_ICONS[index] ?? Sparkles
                  return (
                    <div
                      key={proof.id}
                      className="rounded-glass border border-line/10 bg-surface/20 p-5"
                    >
                      <Icon size={18} className="text-brand-400" />
                      <h4 className="mt-3 font-medium">{t(proof.title)}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(proof.body)}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {techCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 70}>
              <GlassCard interactive className="h-full px-6 py-7">
                <h3 className="text-lg font-semibold">{t(category.title)}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{t(category.description)}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <Chip key={item.label} label={item.label} slug={item.slug} />
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
