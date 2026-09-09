import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { AlertTriangle, Check, Github, Linkedin, Loader2, Mail, Phone } from 'lucide-react'
import { profile } from '@/content/profile'
import { useT } from '@/app/providers/locale-context'
import { useAlert } from '@/hooks/useAlert'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

interface FormState {
  name: string
  email: string
  message: string
}

const EMPTY: FormState = { name: '', email: '', message: '' }

const inputClass =
  'mt-2 w-full rounded-xl border border-line/10 bg-surface/30 px-4 py-3 text-sm text-ink ' +
  'placeholder:text-ink-subtle/70 transition focus:border-brand-400/50 focus:outline-none ' +
  'focus:ring-2 focus:ring-brand-400/30'

export function Contact() {
  const t = useT()
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState<FormState>(EMPTY)
  const [loading, setLoading] = useState(false)
  const { alert, showAlert } = useAlert()

  const channels = [
    {
      Icon: Mail,
      label: t({ pt: 'E-mail', en: 'Email' }),
      value: profile.contact.email,
      href: `mailto:${profile.contact.email}`,
    },
    {
      Icon: Phone,
      label: t({ pt: 'Telefone', en: 'Phone' }),
      value: profile.contact.phone,
      href: profile.contact.phoneHref,
    },
    { Icon: Github, label: 'GitHub', value: 'github.com/luscacid', href: profile.links.github },
    {
      Icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/lucas-cid',
      href: profile.links.linkedin,
    },
  ]

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (loading) return

    if (!CONFIGURED) {
      showAlert(
        t({
          pt: 'O formulário ainda não está configurado. Me escreva direto no e-mail abaixo.',
          en: 'The form is not configured yet. Please email me directly using the address below.',
        }),
        'danger',
      )
      return
    }

    setLoading(true)
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: profile.name,
          from_email: form.email,
          to_email: profile.contact.email,
          message: form.message,
        },
        PUBLIC_KEY,
      )
      showAlert(
        t({
          pt: 'Mensagem enviada. Respondo assim que possível.',
          en: 'Message sent. I will get back to you shortly.',
        }),
        'success',
      )
      setForm(EMPTY)
      formRef.current?.reset()
    } catch (error) {
      console.error('EmailJS send failed:', error)
      showAlert(
        t({
          pt: 'Não consegui enviar. Tente novamente ou me escreva direto no e-mail.',
          en: 'Sending failed. Try again, or email me directly.',
        }),
        'danger',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contato" className="section-rule scroll-mt-24 py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow={t({ pt: 'Contato', en: 'Contact' })}
            title={t({
              pt: 'Vamos conversar sobre o seu projeto',
              en: 'Let us talk about your project',
            })}
            description={t({
              pt: 'Aberto a oportunidades, freelas e trocas técnicas. Respondo pelo canal que for mais prático para você.',
              en: 'Open to opportunities, freelance work and technical conversations. Reach me on whichever channel is easiest.',
            })}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <GlassCard className="h-full px-6 py-7 sm:px-8">
              <ul className="space-y-5">
                {channels.map(({ Icon, label, value, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                      className="group flex items-center gap-4"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line/10 bg-surface/30 text-brand-400 transition group-hover:border-brand-400/40">
                        <Icon size={17} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-xs uppercase tracking-wide text-ink-subtle">
                          {label}
                        </span>
                        <span className="block truncate text-sm text-ink transition group-hover:text-brand-400">
                          {value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-line/10 bg-surface/20 p-4">
                <p className="text-sm text-ink-muted">
                  {t({
                    pt: 'Também mantenho o Plune e o MyWedding no ar. Se quiser ver o produto antes de falar comigo, os dois estão linkados acima.',
                    en: 'I also keep Plune and MyWedding running. If you would rather see the products before talking, both are linked above.',
                  })}
                </p>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-3">
            <GlassCard className="h-full px-6 py-7 sm:px-8">
              <form ref={formRef} onSubmit={handleSubmit} noValidate={false}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium">{t({ pt: 'Nome', en: 'Name' })}</span>
                    <input
                      required
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder={t({ pt: 'Seu nome', en: 'Your name' })}
                      className={inputClass}
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium">{t({ pt: 'E-mail', en: 'Email' })}</span>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="voce@empresa.com"
                      className={inputClass}
                    />
                  </label>
                </div>

                <label className="mt-5 block">
                  <span className="text-sm font-medium">
                    {t({ pt: 'Mensagem', en: 'Message' })}
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder={t({
                      pt: 'Conte rapidamente o que você precisa.',
                      en: 'Briefly, what do you need?',
                    })}
                    className={cn(inputClass, 'resize-y')}
                  />
                </label>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg shadow-lg shadow-line/10 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {loading
                      ? t({ pt: 'Enviando...', en: 'Sending...' })
                      : t({ pt: 'Enviar mensagem', en: 'Send message' })}
                  </button>

                  {/* Announced to screen readers as soon as it appears. */}
                  <p
                    role="status"
                    aria-live="polite"
                    className={cn(
                      'inline-flex items-center gap-2 text-sm transition-opacity',
                      alert.show ? 'opacity-100' : 'opacity-0',
                      alert.type === 'danger' ? 'text-danger' : 'text-success',
                    )}
                  >
                    {alert.show &&
                      (alert.type === 'danger' ? (
                        <AlertTriangle size={15} />
                      ) : (
                        <Check size={15} />
                      ))}
                    {alert.text}
                  </p>
                </div>
              </form>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
