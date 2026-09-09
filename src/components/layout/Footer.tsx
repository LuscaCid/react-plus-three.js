import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '@/content/profile'
import { useT } from '@/app/providers/locale-context'

const year = new Date().getFullYear()

export function Footer() {
  const t = useT()

  const links = [
    { href: profile.links.github, label: 'GitHub', Icon: Github },
    { href: profile.links.linkedin, label: 'LinkedIn', Icon: Linkedin },
    { href: `mailto:${profile.contact.email}`, label: 'E-mail', Icon: Mail },
  ]

  return (
    <footer className="section-rule mt-16 print:hidden">
      <div className="section-shell pb-10 pt-16">
        <div className="glass rounded-glass-lg px-6 py-8 sm:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold">{profile.name}</p>
              <p className="mt-1 text-sm text-ink-muted">
                {t(profile.role)} · {t(profile.location)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {links.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line/10 bg-surface/30 text-ink-muted transition hover:border-brand-400/40 hover:text-ink"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-line/10 pt-6 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {profile.name}
            </p>
            <p className="font-mono">
              {t({
                pt: 'React · TypeScript · Vite · Tailwind',
                en: 'React · TypeScript · Vite · Tailwind',
              })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
