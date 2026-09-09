import { ArrowUpRight, Network } from 'lucide-react'
import { products, pluneFlowExample } from '@/content/products'
import { useT } from '@/app/providers/locale-context'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Chip } from '@/components/ui/Chip'
import { Screenshot } from '@/components/ui/Screenshot'
import { ArchitectureDiagram } from '@/components/arch/ArchitectureDiagram'

export function Products() {
  const t = useT()

  return (
    <section id="produtos" className="section-rule scroll-mt-24 py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow={t({ pt: 'Produtos', en: 'Products' })}
            title={t({
              pt: 'Dois SaaS que eu construí e mantenho no ar',
              en: 'Two SaaS products I built and keep running',
            })}
            description={t({
              pt: 'Não são protótipos. Os dois têm assinantes, domínio próprio, isolamento por tenant e deploy que eu mesmo opero. Os diagramas abaixo descrevem os sistemas como eles são hoje, no código.',
              en: 'These are not prototypes. Both have subscribers, their own domain, tenant isolation and a deployment I operate myself. The diagrams below describe the systems as they actually are in the code today.',
            })}
          />
        </Reveal>

        <div className="mt-14 space-y-20">
          {products.map((product) => (
            <Reveal key={product.id}>
              <article>
                <GlassCard
                  variant="strong"
                  className="overflow-hidden rounded-glass-lg px-6 py-8 sm:px-10 sm:py-10"
                >
                  <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-3xl font-semibold tracking-tight">{product.name}</h3>
                        <span className="rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-success">
                          {t(product.status)}
                        </span>
                      </div>
                      <p className="mt-2 text-lg text-ink-muted">{t(product.tagline)}</p>
                    </div>

                    <a
                      href={product.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-surface/40 px-4 py-2 font-mono text-sm text-ink transition hover:border-brand-400/50 hover:text-brand-400"
                    >
                      {product.domain}
                      <ArrowUpRight size={15} />
                    </a>
                  </header>

                  <p className="mt-6 max-w-3xl text-pretty leading-relaxed text-ink-muted">
                    {t(product.description)}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {product.tech.map((tech) => (
                      <Chip key={tech.label} label={tech.label} slug={tech.slug} />
                    ))}
                  </div>

                  {/* Full width, not side by side: these are dense application
                      UIs, and at half width they read as texture rather than as
                      a product. Two slots always render, so the placeholders
                      hold the same box until the captures land. */}
                  <div className="mt-10 grid gap-5">
                    {[0, 1].map((index) => (
                      <Screenshot
                        key={index}
                        shot={product.screenshots[index]}
                        ratio={product.screenshotRatio}
                        fallbackLabel={product.domain}
                      />
                    ))}
                  </div>

                  <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {product.features.map((feature) => (
                      <div
                        key={feature.title.en}
                        className="rounded-glass border border-line/10 bg-surface/20 p-5"
                      >
                        <h4 className="font-medium">{t(feature.title)}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                          {t(feature.body)}
                        </p>
                        {feature.chips && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {feature.chips.map((chip) => (
                              <span
                                key={chip}
                                className="rounded-full border border-line/10 bg-surface/40 px-2 py-0.5 font-mono text-[0.65rem] text-ink-subtle"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {product.id === 'plune' && (
                    <div className="mt-10">
                      <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-subtle">
                        <Network size={15} className="text-accent-400" />
                        {t({ pt: 'Como um fluxo se parece', en: 'What a flow looks like' })}
                      </h4>
                      <div className="mt-4">
                        <ArchitectureDiagram spec={pluneFlowExample} showViews={false} />
                      </div>
                    </div>
                  )}

                  <div className="mt-12">
                    <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-subtle">
                      <Network size={15} className="text-brand-400" />
                      {t({ pt: 'Arquitetura', en: 'Architecture' })}
                    </h4>
                    <p className="mt-2 max-w-3xl text-sm text-ink-muted">
                      {t({
                        pt: 'Escolha uma visão e clique nos blocos. O diagrama não inventa camadas: o que não está aqui, não existe no sistema.',
                        en: 'Pick a view and click the blocks. The diagram invents nothing: whatever is missing here does not exist in the system.',
                      })}
                    </p>
                    <div className="mt-5">
                      <ArchitectureDiagram spec={product.architecture} />
                    </div>
                  </div>
                </GlassCard>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <GlassCard className="px-6 py-7 sm:px-8">
            <h3 className="text-lg font-semibold">
              {t({
                pt: 'O detalhe que amarra os dois',
                en: 'The detail that ties both together',
              })}
            </h3>
            <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-ink-muted">
              {t({
                pt: 'Os dois produtos rodam na mesma VM, e os dois aceitam qualquer Host de propósito, porque cada cliente tem seu subdomínio. Isso significa que ambos disputavam a porta 443 e um respondia pelo domínio do outro. A solução foi um proxy de borda em Nginx fazendo roteamento layer 4 por SNI: ele lê o nome do servidor no ClientHello e encaminha o TCP bruto para o container certo, sem terminar TLS e sem guardar chave nenhuma.',
                en: 'Both products run on the same VM, and both accept any Host by design, because every customer gets a subdomain. That meant both were fighting over port 443 and one would answer for the other domain. The fix was an Nginx edge proxy doing layer-4 SNI routing: it reads the server name from the ClientHello and forwards raw TCP to the right container, never terminating TLS and holding no private key.',
              })}
            </p>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
