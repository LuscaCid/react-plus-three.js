import type { ArchitectureSpec } from '@/lib/types'

const ALL = ['overview', 'tenancy', 'billing', 'media']

/**
 * MyWedding, as the repository actually is.
 *
 * Deliberately absent: Redis (caching is an in-process IMemoryCache), any
 * queue or worker process (the only background job is a hosted service inside
 * the API), and Kubernetes (it is one VM running Docker Compose).
 */
export const myweddingArchitecture: ArchitectureSpec = {
  id: 'mywedding',
  cols: 12,
  rows: 7,
  views: [
    {
      id: 'overview',
      label: { pt: 'Visão geral', en: 'Overview' },
      description: {
        pt: 'Um build Angular servindo quatro públicos, uma API .NET e um Postgres.',
        en: 'One Angular build serving four audiences, a .NET API and a single Postgres.',
      },
    },
    {
      id: 'tenancy',
      label: { pt: 'Multi-tenancy', en: 'Multi-tenancy' },
      description: {
        pt: 'Três camadas de isolamento, e nenhuma delas confia na anterior: o middleware cruza o Host com o token, os filtros globais do ORM falham fechado quando o tenant não resolve, e um interceptor carimba o dono na escrita contra uma coluna NOT NULL sem default.',
        en: 'Three layers of isolation, none of them trusting the previous one: the middleware cross-checks Host against the token, the ORM global filters fail closed when the tenant does not resolve, and an interceptor stamps ownership on write against a NOT NULL column with no default.',
      },
    },
    {
      id: 'billing',
      label: { pt: 'Assinatura', en: 'Billing' },
      description: {
        pt: 'Checkout e portal pelo Stripe, webhooks idempotentes por id de evento, e cotas e módulos verificados a cada requisição. Uma regra de produto atravessa tudo: nenhum site sai do ar nos 14 dias antes do casamento.',
        en: 'Checkout and portal through Stripe, webhooks made idempotent by event id, and quotas and modules checked on every request. One product rule cuts across all of it: no site is ever taken down in the 14 days before the wedding.',
      },
    },
    {
      id: 'media',
      label: { pt: 'Mídia', en: 'Media' },
      description: {
        pt: 'Upload processado no servidor e gravado por uma abstração de storage: disco em volume hoje, MinIO ou S3 trocando uma variável de ambiente. As chaves já nascem prefixadas por tenant.',
        en: 'Uploads are processed server-side and written through a storage abstraction: a disk volume today, MinIO or S3 by changing one environment variable. Keys are tenant-prefixed from the start.',
      },
    },
  ],
  nodes: [
    /* --- Clients ---------------------------------------------------------- */
    {
      id: 'guest',
      label: 'Convidado',
      sublabel: 'Sem login',
      kind: 'client',
      tech: ['Código de convite'],
      col: 1,
      row: 1,
      span: 3,
      views: ['overview', 'tenancy'],
      detail: {
        pt: 'O convidado nunca cria conta. Ele abre o convite pelo código e confirma presença: as duas rotas são anônimas de propósito, porque exigir cadastro para responder um convite derrubaria a taxa de resposta.',
        en: 'A guest never creates an account. They open the invitation by its code and confirm attendance: both routes are anonymous by design, because requiring a signup to answer an invitation would sink the response rate.',
      },
    },
    {
      id: 'couple',
      label: 'Casal',
      sublabel: '<casal>.mywedding.app.br',
      kind: 'client',
      tech: ['Angular 20', 'Signals', 'Tailwind'],
      col: 4,
      row: 1,
      span: 3,
      views: ALL,
      detail: {
        pt: 'Site público do casamento mais o painel administrativo. Cada casal é um tenant com subdomínio próprio, seis paletas de cor e publicação versionada, com publicar, publicar e notificar, ou despublicar.',
        en: 'The public wedding site plus the admin dashboard. Each couple is a tenant with its own subdomain, six colour palettes and versioned publishing: publish, publish and notify, or unpublish.',
      },
      bullets: [
        {
          pt: 'Contagem regressiva, linha do tempo, RSVP, galeria, lista de presentes com QR Pix, mural moderado e FAQ.',
          en: 'Countdown, story timeline, RSVP, gallery, gift list with a Pix QR code, moderated guestbook and FAQ.',
        },
        {
          pt: 'Exportação da lista de convidados em CSV e PDF, e mapa de mesas com busca.',
          en: 'Guest list export to CSV and PDF, plus a seating chart with search.',
        },
      ],
    },
    {
      id: 'vendor',
      label: 'Fornecedor',
      sublabel: '/fornecedores',
      kind: 'client',
      tech: ['Angular', 'Escopo próprio'],
      col: 7,
      row: 1,
      span: 3,
      views: ['overview', 'tenancy'],
      detail: {
        pt: 'Marketplace: o fornecedor se cadastra, publica perfil, catálogo de serviços e portfólio de fotos. Os casais o encontram por categoria, cidade, faixa de preço ou raio a partir do local do casamento.',
        en: 'Marketplace: a vendor signs up, publishes a profile, a service catalogue and a photo portfolio. Couples find them by category, city, price range or radius from the wedding venue.',
      },
      bullets: [
        {
          pt: 'A autorização recheca o fornecedor no banco a cada requisição, então uma suspensão vale na hora, não daqui a algumas horas.',
          en: 'Authorization re-checks the vendor in the database on every request, so a suspension takes effect immediately rather than hours later.',
        },
      ],
    },
    {
      id: 'platform',
      label: 'Console',
      sublabel: 'admin.mywedding.app.br',
      kind: 'client',
      tech: ['Angular', 'ECharts'],
      col: 10,
      row: 1,
      span: 3,
      views: ['overview', 'tenancy', 'billing'],
      detail: {
        pt: 'Painel da plataforma, propositalmente com tema neutro para nunca haver dúvida de qual console está aberto antes de suspender alguém. Gerencia tenants, aprova fornecedores, edita planos e inspeciona os últimos webhooks.',
        en: 'Platform panel, deliberately neutral-themed so there is never any doubt which console is open before suspending someone. It manages tenants, approves vendors, edits plans and inspects the latest webhooks.',
      },
    },

    /* --- Edge ------------------------------------------------------------- */
    {
      id: 'cloudflare',
      label: 'Cloudflare',
      sublabel: 'DNS @ e * · Origin CA wildcard',
      kind: 'edge',
      tech: ['DNS', 'Proxy', 'TLS 15 anos'],
      col: 4,
      row: 2,
      span: 5,
      views: ALL,
      detail: {
        pt: 'Dois registros apontam para a VM: o apex e o curinga. O certificado é um Origin CA cobrindo o domínio e todos os subdomínios, porque o Let’s Encrypt não emite curinga por desafio HTTP.',
        en: 'Two records point at the VM: the apex and the wildcard. The certificate is an Origin CA covering the domain and every subdomain, because Let’s Encrypt will not issue a wildcard over an HTTP challenge.',
      },
    },
    {
      id: 'edge',
      label: 'edge-proxy',
      sublabel: 'Compartilhado com o Plune',
      kind: 'edge',
      tech: ['Nginx stream', 'SNI'],
      col: 4,
      row: 3,
      span: 5,
      views: ALL,
      detail: {
        pt: 'O mesmo proxy de borda que atende o Plune. Os dois produtos moram na mesma VM e ambos aceitam qualquer Host, então sem o roteamento por SNI um deles responderia pelo domínio do outro.',
        en: 'The same edge proxy that serves Plune. Both products live on the same VM and both accept any Host, so without SNI routing one of them would answer for the other domain.',
      },
    },
    {
      id: 'nginx',
      label: 'web',
      sublabel: 'Nginx · SPA + proxy',
      kind: 'service',
      tech: ['Nginx', 'Angular build'],
      col: 4,
      row: 4,
      span: 5,
      views: ALL,
      detail: {
        pt: 'Serve a SPA e faz proxy de /api/ e /images/. Aceita qualquer Host de propósito: com um subdomínio por casal, o Nginx não pode conhecer a lista de tenants.',
        en: 'Serves the SPA and proxies /api/ and /images/. It accepts any Host on purpose: with one subdomain per couple, Nginx cannot know the tenant list.',
      },
      bullets: [
        {
          pt: 'proxy_set_header Host $host é o que permite à API saber de qual casamento é a requisição.',
          en: 'proxy_set_header Host $host is what lets the API know which wedding the request belongs to.',
        },
      ],
    },

    /* --- Services --------------------------------------------------------- */
    {
      id: 'api',
      label: 'api',
      sublabel: 'ASP.NET Core 10 · EF Core',
      kind: 'service',
      tech: ['ASP.NET Core 10', 'EF Core', 'JWT', 'BCrypt'],
      col: 1,
      row: 5,
      span: 7,
      views: ALL,
      detail: {
        pt: 'API em camadas, com o middleware de tenant posicionado entre autenticação e autorização de propósito: nada registrado antes dele consegue resolver o contexto do banco sem que os filtros capturem um tenant vazio.',
        en: 'A layered API, with the tenant middleware placed between authentication and authorization on purpose: nothing registered before it can resolve the database context without the filters capturing an empty tenant.',
      },
      bullets: [
        {
          pt: 'Um único esquema JWT com quatro políticas nomeadas separa casal, dono, fornecedor e plataforma.',
          en: 'A single JWT scheme with four named policies separates couple, owner, vendor and platform.',
        },
        {
          pt: 'Migrations rodam no boot, e é por isso que o healthcheck tem uma janela inicial generosa.',
          en: 'Migrations run at boot, which is why the healthcheck has a generous start window.',
        },
      ],
    },
    {
      id: 'trial',
      label: 'Trial sweeper',
      sublabel: 'Hosted service · a cada hora',
      kind: 'worker',
      tech: ['PeriodicTimer', 'In-process'],
      col: 8,
      row: 5,
      span: 5,
      views: ['overview', 'billing'],
      detail: {
        pt: 'O único trabalho de fundo do sistema, e ele roda dentro da própria API: suspende trials expirados, mas nunca nos 14 dias que antecedem o casamento. Uma regra de produto codificada onde não dá para esquecer dela.',
        en: 'The only background job in the system, and it runs inside the API itself: it suspends expired trials, but never in the 14 days before the wedding. A product rule encoded where it cannot be forgotten.',
      },
    },

    /* --- Data ------------------------------------------------------------- */
    {
      id: 'postgres',
      label: 'PostgreSQL 16',
      sublabel: '18 migrations · filtros globais',
      kind: 'datastore',
      tech: ['PostgreSQL 16', 'EF Core'],
      col: 1,
      row: 6,
      span: 4,
      views: ALL,
      detail: {
        pt: 'Uma base para todos os casamentos. Toda entidade que pertence a um tenant recebe automaticamente um filtro global, um índice e uma chave estrangeira restritiva, aplicados por reflexão em vez de à mão, entidade por entidade.',
        en: 'One database for every wedding. Every tenant-owned entity automatically gets a global filter, an index and a restrictive foreign key, applied by reflection instead of by hand, entity by entity.',
      },
      bullets: [
        {
          pt: 'Unicidade sempre por tenant, então dois casais podem ter o convite ABC123 sem colidir.',
          en: 'Uniqueness is always scoped per tenant, so two couples can both have invitation ABC123 without colliding.',
        },
        {
          pt: 'O id do evento do Stripe é único, e é isso que torna o webhook idempotente.',
          en: 'The Stripe event id is unique, and that is what makes the webhook idempotent.',
        },
      ],
    },
    {
      id: 'uploads',
      label: 'Volume de uploads',
      sublabel: 'Chaves por tenant',
      kind: 'storage',
      tech: ['Docker volume', 'Magick.NET'],
      col: 5,
      row: 6,
      span: 4,
      views: ['overview', 'media'],
      detail: {
        pt: 'As imagens são processadas no servidor e gravadas com a chave já prefixada pelo tenant. A abstração de storage é o que permite trocar disco por S3 sem mexer no domínio.',
        en: 'Images are processed server-side and written with the key already prefixed by tenant. The storage abstraction is what allows swapping disk for S3 without touching the domain.',
      },
    },
    {
      id: 'cache',
      label: 'IMemoryCache',
      sublabel: 'Host para tenant · 60s',
      kind: 'datastore',
      tech: ['In-process', 'Invalidação explícita'],
      col: 9,
      row: 6,
      span: 4,
      views: ['overview', 'tenancy'],
      detail: {
        pt: 'Todo o cache do sistema, e ele vive dentro do processo. Guarda a resolução de host para tenant por um minuto, com invalidação explícita para que uma troca de paleta ou uma suspensão valha na hora.',
        en: 'The entire cache tier, and it lives in-process. It holds the host-to-tenant resolution for a minute, with explicit invalidation so a palette change or a suspension takes effect immediately.',
      },
    },

    /* --- External --------------------------------------------------------- */
    {
      id: 'stripe',
      label: 'Stripe',
      sublabel: 'Checkout · portal · webhooks',
      kind: 'external',
      tech: ['Stripe.net', 'Idempotency key'],
      col: 1,
      row: 7,
      span: 3,
      views: ['overview', 'billing'],
      detail: {
        pt: 'Assinaturas em três planos. O preço nunca vem do navegador, e a cada evento de assinatura o servidor rebusca o estado no Stripe em vez de confiar na ordem de chegada dos webhooks.',
        en: 'Subscriptions across three plans. Price never comes from the browser, and on each subscription event the server re-fetches state from Stripe rather than trusting webhook ordering.',
      },
      bullets: [
        {
          pt: 'O webhook entra por fora do escopo de tenant e descobre de quem é pelo payload.',
          en: 'The webhook enters outside the tenant scope and discovers its owner from the payload.',
        },
      ],
    },
    {
      id: 'smtp',
      label: 'SMTP',
      sublabel: 'Convites e notificações',
      kind: 'external',
      tech: ['System.Net.Mail'],
      col: 4,
      row: 7,
      span: 3,
      views: ['overview'],
      detail: {
        pt: 'Publicar e notificar dispara um e-mail para cada convidado com o link do convite dele. É SMTP puro, sem provedor transacional.',
        en: 'Publish and notify sends every guest an email with their own invitation link. Plain SMTP, with no transactional provider.',
      },
    },
    {
      id: 'objectstore',
      label: 'MinIO / S3',
      sublabel: 'Provider opcional',
      kind: 'storage',
      tech: ['Minio SDK'],
      col: 7,
      row: 7,
      span: 3,
      views: ['overview', 'media'],
      detail: {
        pt: 'Terceira implementação da abstração de storage, ligada por variável de ambiente. Existe para o dia em que o volume no disco deixar de ser suficiente.',
        en: 'A third implementation of the storage abstraction, switched on by an environment variable. It exists for the day the disk volume stops being enough.',
      },
    },
    {
      id: 'viacep',
      label: 'ViaCEP',
      sublabel: 'Chamado do navegador',
      kind: 'external',
      tech: ['HTTP', 'AbortController'],
      col: 10,
      row: 7,
      span: 3,
      views: ['overview'],
      detail: {
        pt: 'Busca de endereço por CEP, feita direto do navegador com timeout. É justamente por causa dela que o interceptor de autenticação só anexa o token em chamadas para a própria API.',
        en: 'Address lookup by postal code, called straight from the browser with a timeout. It is exactly why the auth interceptor only attaches the token to calls aimed at the API itself.',
      },
    },
  ],
  edges: [
    { from: 'guest', to: 'cloudflare', kind: 'sync', views: ['overview', 'tenancy'] },
    { from: 'couple', to: 'cloudflare', kind: 'sync', views: ALL },
    { from: 'vendor', to: 'cloudflare', kind: 'sync', views: ['overview', 'tenancy'] },
    { from: 'platform', to: 'cloudflare', kind: 'sync', views: ['overview', 'tenancy', 'billing'] },
    {
      from: 'cloudflare',
      to: 'edge',
      kind: 'sync',
      views: ALL,
      highlight: true,
      label: { pt: 'TLS bruto', en: 'raw TLS' },
    },
    {
      from: 'edge',
      to: 'nginx',
      kind: 'sync',
      views: ALL,
      highlight: true,
      label: { pt: 'por SNI', en: 'by SNI' },
    },
    {
      from: 'nginx',
      to: 'api',
      kind: 'sync',
      views: ALL,
      highlight: true,
      label: { pt: '/api/ + Host', en: '/api/ + Host' },
    },
    { from: 'api', to: 'postgres', kind: 'sync', views: ALL, highlight: true },
    { from: 'api', to: 'cache', kind: 'sync', views: ['overview', 'tenancy'] },
    { from: 'api', to: 'uploads', kind: 'sync', views: ['overview', 'media'] },
    { from: 'api', to: 'objectstore', kind: 'sync', views: ['overview', 'media'] },
    { from: 'nginx', to: 'uploads', kind: 'sync', views: ['media'] },
    { from: 'trial', to: 'postgres', kind: 'sync', views: ['overview', 'billing'] },
    {
      from: 'api',
      to: 'stripe',
      kind: 'sync',
      views: ['overview', 'billing'],
      label: { pt: 'checkout', en: 'checkout' },
    },
    {
      from: 'stripe',
      to: 'api',
      kind: 'async',
      views: ['overview', 'billing'],
      highlight: true,
      label: { pt: 'webhook, fora do tenant', en: 'webhook, outside tenant' },
    },
    { from: 'api', to: 'smtp', kind: 'sync', views: ['overview'] },
    { from: 'couple', to: 'viacep', kind: 'sync', views: ['overview'] },
  ],
}
