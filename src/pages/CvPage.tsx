import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Printer } from 'lucide-react'
import { profile } from '@/content/profile'
import { education, experiences, languages } from '@/content/experience'
import { aiSection, techCategories } from '@/content/tech'
import { products } from '@/content/products'
import { useT } from '@/app/providers/locale-context'

/**
 * The resume renders from the same content files as the site, so the two can
 * never drift apart. Printing is handled entirely by the @media print block in
 * index.css - there is no separate PDF to keep in sync.
 */
export function CvPage() {
  const t = useT()

  useEffect(() => {
    const previous = document.title
    document.title = `${profile.name} — ${t({ pt: 'Currículo', en: 'Resume' })}`
    return () => {
      document.title = previous
    }
  }, [t])

  return (
    <div className="section-shell max-w-3xl pb-20 pt-28">
      <div className="print-hide mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition hover:text-ink"
        >
          <ArrowLeft size={15} />
          {t({ pt: 'Voltar ao portfólio', en: 'Back to portfolio' })}
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-600/25 transition hover:brightness-110"
        >
          <Printer size={15} />
          {t({ pt: 'Baixar em PDF', en: 'Download as PDF' })}
        </button>
      </div>

      <article className="glass rounded-glass-lg px-6 py-8 sm:px-10 sm:py-10 print:px-0 print:py-0">
        <header className="print-block border-b border-line/10 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
          <p className="mt-1 text-lg text-ink-muted">{t(profile.role)}</p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs text-ink-muted">
            <span>{t(profile.location)}</span>
            <a className="print-link-url" href={`mailto:${profile.contact.email}`}>
              {profile.contact.email}
            </a>
            <a href={profile.contact.phoneHref}>{profile.contact.phone}</a>
            <a className="print-link-url" href={profile.links.github}>
              github.com/luscacid
            </a>
            <a className="print-link-url" href={profile.links.linkedin}>
              linkedin.com/in/lucas-cid
            </a>
          </div>
        </header>

        <Section title={t({ pt: 'Resumo', en: 'Summary' })}>
          <p className="text-sm leading-relaxed text-ink-muted">{t(profile.summary)}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t(profile.tagline)}</p>
        </Section>

        <Section title={t({ pt: 'Experiência profissional', en: 'Professional experience' })}>
          <div className="space-y-6">
            {experiences.map((item) => (
              <div key={item.id} className="print-block">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">
                    {t(item.role)} · {item.company}
                  </h3>
                  <span className="font-mono text-xs text-ink-subtle">{t(item.period)}</span>
                </div>
                <p className="mt-0.5 font-mono text-xs text-ink-subtle">{item.location}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(item.summary)}</p>
                <ul className="mt-2 space-y-1.5">
                  {item.highlights.map((highlight, index) => (
                    <li key={index} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                      <span aria-hidden>·</span>
                      {t(highlight)}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 font-mono text-xs text-ink-subtle">
                  {item.tech.map((tech) => tech.label).join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={t({ pt: 'Produtos próprios', en: 'Own products' })}>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="print-block">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <a className="print-link-url font-mono text-xs text-ink-subtle" href={product.href}>
                    {product.domain}
                  </a>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {t(product.description)}
                </p>
                <p className="mt-1.5 font-mono text-xs text-ink-subtle">
                  {product.tech.map((tech) => tech.label).join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={t({ pt: 'Competências', en: 'Skills' })}>
          <div className="space-y-3">
            <div className="print-block">
              <h3 className="text-sm font-semibold">{t(aiSection.title)}</h3>
              <p className="mt-1 font-mono text-xs leading-relaxed text-ink-muted">
                {aiSection.items.map((item) => item.label).join(' · ')}
              </p>
            </div>
            {techCategories.map((category) => (
              <div key={category.id} className="print-block">
                <h3 className="text-sm font-semibold">{t(category.title)}</h3>
                <p className="mt-1 font-mono text-xs leading-relaxed text-ink-muted">
                  {category.items.map((item) => item.label).join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={t({ pt: 'Formação', en: 'Education' })}>
          {education.map((item) => (
            <div key={item.institution} className="print-block">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{t(item.degree)}</h3>
                <span className="font-mono text-xs text-ink-subtle">{t(item.period)}</span>
              </div>
              <p className="mt-0.5 text-sm text-ink-muted">
                {item.institution} · {item.location}
              </p>
            </div>
          ))}
        </Section>

        <Section title={t({ pt: 'Idiomas', en: 'Languages' })}>
          <ul className="space-y-1">
            {languages.map((item) => (
              <li key={item.name.en} className="text-sm text-ink-muted">
                <span className="font-medium text-ink">{t(item.name)}</span> — {t(item.level)}
              </li>
            ))}
          </ul>
        </Section>
      </article>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-400">{title}</h2>
      {children}
    </section>
  )
}
