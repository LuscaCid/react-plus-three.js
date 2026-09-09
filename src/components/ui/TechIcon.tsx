import {
  siAmazonwebservices,
  siAngular,
  siAnthropic,
  siCloudflare,
  siCss3,
  siDart,
  siDjango,
  siDocker,
  siDotnet,
  siElectron,
  siFastify,
  siFlutter,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLinux,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPython,
  siRabbitmq,
  siReact,
  siRedis,
  siSocketdotio,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVite,
  type SimpleIcon,
} from 'simple-icons'
import { cn } from '@/lib/cn'

/** Brand marks are rendered as raw paths with `currentColor`, so they inherit
 *  the theme instead of shipping 30 image files.
 *  Simple Icons carries no mark for C# or SQL Server (Microsoft brands were
 *  removed upstream) - those fall through to the monogram below, which is
 *  honest and needs no hand-drawn approximation of someone's logo. */
const BRAND: Record<string, SimpleIcon> = {
  angular: siAngular,
  anthropic: siAnthropic,
  aws: siAmazonwebservices,
  cloudflare: siCloudflare,
  css: siCss3,
  dart: siDart,
  django: siDjango,
  docker: siDocker,
  dotnet: siDotnet,
  electron: siElectron,
  fastify: siFastify,
  flutter: siFlutter,
  git: siGit,
  github: siGithub,
  html: siHtml5,
  javascript: siJavascript,
  linux: siLinux,
  mongodb: siMongodb,
  nestjs: siNestjs,
  nextjs: siNextdotjs,
  nginx: siNginx,
  nodejs: siNodedotjs,
  php: siPhp,
  postgresql: siPostgresql,
  python: siPython,
  rabbitmq: siRabbitmq,
  react: siReact,
  redis: siRedis,
  socketio: siSocketdotio,
  stripe: siStripe,
  tailwind: siTailwindcss,
  typescript: siTypescript,
  vite: siVite,
}

function monogram(label: string) {
  const cleaned = label.replace(/[^\p{L}\p{N}\s.#+]/gu, '').trim()
  const words = cleaned.split(/\s+/)
  if (words.length > 1) return words.slice(0, 2).map((w) => w[0] ?? '').join('')
  return cleaned.slice(0, 2)
}

interface TechIconProps {
  /** Key into the brand registry. Falls back to a monogram when unknown. */
  slug?: string
  label: string
  className?: string
}

export function TechIcon({ slug, label, className }: TechIconProps) {
  const icon = slug ? BRAND[slug] : undefined

  if (!icon) {
    return (
      <span
        aria-hidden
        className={cn(
          'inline-flex select-none items-center justify-center rounded-[0.3em] bg-current/15 font-mono text-[0.62em] font-semibold uppercase leading-none',
          'h-[1em] w-[1em]',
          className,
        )}
      >
        {monogram(label)}
      </span>
    )
  }

  return (
    <svg
      role="img"
      aria-hidden
      viewBox="0 0 24 24"
      className={cn('h-[1em] w-[1em] shrink-0 fill-current', className)}
    >
      <path d={icon.path} />
    </svg>
  )
}
