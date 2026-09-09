import { ArrowRight, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile } from '@/content/profile'
import { useT } from '@/app/providers/locale-context'
import { ButtonLink } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'

const stats = [
  {
    value: '4+',
    label: { pt: 'anos construindo software', en: 'years building software' },
  },
  {
    value: '2',
    label: { pt: 'SaaS próprios em produção', en: 'own SaaS products in production' },
  },
  {
    value: '4',
    label: { pt: 'empresas e times', en: 'companies and teams' },
  },
]

export function Hero() {
  const t = useT()

  return (
    <section className="relative pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div className="section-shell">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-surface/30 px-3 py-1.5 font-mono text-xs text-ink-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            {t(profile.availability)}
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            {profile.name}
            <span className="mt-2 block gradient-text">{t(profile.headline)}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
            {t(profile.tagline)}
          </p>

          <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink-subtle">
            <MapPin size={15} />
            {t(profile.location)}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#produtos"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-600/25 transition hover:brightness-110 sm:text-base"
            >
              {t({ pt: 'Ver os produtos', en: 'See the products' })}
              <ArrowRight size={16} />
            </a>
            <a
              href="#contato"
              className="glass inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 sm:text-base"
            >
              {t({ pt: 'Falar comigo', en: 'Get in touch' })}
            </a>
            <Link
              to="/cv"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-ink-muted underline-offset-4 transition hover:text-ink hover:underline"
            >
              {t({ pt: 'Currículo', en: 'Resume' })}
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <ButtonLink
              variant="ghost"
              size="sm"
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="h-10 w-10 !px-0"
            >
              <Github size={18} />
            </ButtonLink>
            <ButtonLink
              variant="ghost"
              size="sm"
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="h-10 w-10 !px-0"
            >
              <Linkedin size={18} />
            </ButtonLink>
            <ButtonLink
              variant="ghost"
              size="sm"
              href={`mailto:${profile.contact.email}`}
              aria-label="E-mail"
              className="h-10 w-10 !px-0"
            >
              <Mail size={18} />
            </ButtonLink>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <GlassCard key={stat.value} interactive className="px-6 py-5">
              <p className="font-mono text-3xl font-semibold gradient-text">{stat.value}</p>
              <p className="mt-1 text-sm text-ink-muted">{t(stat.label)}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
