import type { ArchitectureSpec } from '@/lib/types'

const ALL = ['overview', 'request', 'messaging', 'realtime']

/**
 * Plune, as the repository actually is.
 *
 * Deliberately absent: Redis (there is no cache tier at all), MongoDB (it sits
 * in package.json but nothing imports it), object storage (voice notes live as
 * bytea in Postgres) and any separate scheduler service (cron runs inside the
 * API process).
 */
export const pluneArchitecture: ArchitectureSpec = {
  id: 'plune',
  cols: 12,
  rows: 7,
  views: [
    {
      id: 'overview',
      label: { pt: 'Visão geral', en: 'Overview' },
      description: {
        pt: 'Todos os serviços, dados e integrações externas de uma vez.',
        en: 'Every service, datastore and external integration at once.',
      },
    },
    {
      id: 'request',
      label: { pt: 'Caminho da requisição', en: 'Request path' },
      description: {
        pt: 'O tenant viaja no cabeçalho Host, de ponta a ponta: Cloudflare, proxy de borda, Nginx e enfim o guard de organização. O header x-api-organization é só fallback, e o Host sempre vence.',
        en: 'The tenant travels on the Host header end to end: Cloudflare, edge proxy, Nginx and finally the organization guard. The x-api-organization header is only a fallback, and Host always wins.',
      },
    },
    {
      id: 'messaging',
      label: { pt: 'Mensageria', en: 'Messaging' },
      description: {
        pt: 'A API grava a linha em outbound_message antes de publicar no RabbitMQ. Se o broker cair, nada se perde: o worker varre depois o que ficou em queued.',
        en: 'The API writes the outbound_message row before publishing to RabbitMQ. If the broker goes down nothing is lost: the worker later sweeps whatever stayed queued.',
      },
    },
    {
      id: 'realtime',
      label: { pt: 'Tempo real', en: 'Real time' },
      description: {
        pt: 'Chat e notificações passam pelo Socket.IO. Mídia de chamada não: o WebRTC é ponto a ponto entre navegadores, e o coturn só entra quando o NAT bloqueia o caminho direto.',
        en: 'Chat and notifications go through Socket.IO. Call media does not: WebRTC is peer to peer between browsers, and coturn only steps in when NAT blocks the direct path.',
      },
    },
  ],
  nodes: [
    /* --- Clients ---------------------------------------------------------- */
    {
      id: 'web',
      label: 'Web',
      sublabel: 'plune.app.br',
      kind: 'client',
      tech: ['React 18', 'Vite', 'TanStack Query', 'Zustand'],
      col: 1,
      row: 1,
      span: 3,
      views: ['overview', 'request', 'realtime'],
      detail: {
        pt: 'Landing, downloads, autenticação e o app de administração depois do login. Formulários públicos em /f/<token> são respondidos aqui sem conta nenhuma.',
        en: 'Landing page, downloads, authentication and the administration app after login. Public forms at /f/<token> are answered here with no account at all.',
      },
      bullets: [
        {
          pt: 'React Flow renderiza o editor de fluxo com 14 tipos de nó customizados.',
          en: 'React Flow renders the flow editor with 14 custom node types.',
        },
        {
          pt: 'A base da API é relativa (/v1/api) de propósito, para o Host do tenant sobreviver.',
          en: 'The API base URL is relative (/v1/api) on purpose, so the tenant Host survives.',
        },
      ],
    },
    {
      id: 'portal',
      label: 'Portal do cliente',
      sublabel: '<org>.plune.app.br',
      kind: 'client',
      tech: ['React', 'Subdomínio por organização'],
      col: 4,
      row: 1,
      span: 3,
      views: ['overview', 'request', 'realtime'],
      detail: {
        pt: 'Onde um usuário com papel Viewer inicia fluxos e responde às etapas atribuídas a ele. Mesmo build da web, resolvido em tempo de execução pelo subdomínio.',
        en: 'Where a user with the Viewer role starts flows and answers the steps assigned to them. Same build as the web app, resolved at runtime by the subdomain.',
      },
    },
    {
      id: 'admin',
      label: 'Console',
      sublabel: 'admin.plune.app.br',
      kind: 'client',
      tech: ['React', 'Sessão separada'],
      col: 7,
      row: 1,
      span: 3,
      views: ['overview', 'request'],
      detail: {
        pt: 'Console da plataforma, com conta de super admin própria. O token usa o mesmo segredo mas carrega outro claim e expira em 12 horas, e o guard de produto recusa um token de console.',
        en: 'Platform console with its own super-admin account. The token uses the same secret but carries a different claim and expires in 12 hours, and the product guard rejects a console token.',
      },
    },
    {
      id: 'desktop',
      label: 'Desktop',
      sublabel: 'Windows · macOS · Linux',
      kind: 'client',
      tech: ['Electron 30', 'electron-updater'],
      col: 10,
      row: 1,
      span: 3,
      views: ['overview', 'request', 'realtime'],
      detail: {
        pt: 'App empacotado por electron-builder. Como não há subdomínio para carregar o tenant, aqui a organização viaja no header x-api-organization contra uma URL absoluta.',
        en: 'App packaged by electron-builder. With no subdomain to carry the tenant, the organization travels in the x-api-organization header against an absolute URL.',
      },
    },

    /* --- Edge ------------------------------------------------------------- */
    {
      id: 'cloudflare',
      label: 'Cloudflare',
      sublabel: 'DNS wildcard *.plune.app.br',
      kind: 'edge',
      tech: ['DNS', 'Proxy', 'Origin CA'],
      col: 4,
      row: 2,
      span: 5,
      views: ALL,
      detail: {
        pt: 'O DNS curinga é o que faz uma organização nova não precisar de nenhum trabalho de infraestrutura: o subdomínio já resolve no dia em que é criada.',
        en: 'The wildcard DNS record is what makes a new organization need zero infrastructure work: the subdomain resolves the day it is created.',
      },
    },
    {
      id: 'edge',
      label: 'edge-proxy',
      sublabel: 'Nginx · roteamento L4 por SNI',
      kind: 'edge',
      tech: ['Nginx stream', 'SNI'],
      col: 4,
      row: 3,
      span: 5,
      views: ALL,
      detail: {
        pt: 'A mesma VM hospeda o Plune e o MyWedding, e os dois queriam a porta 443. Este proxy é a solução: ele lê o nome do servidor no ClientHello e encaminha o TCP bruto para o container certo. Não termina TLS e não guarda chave nenhuma.',
        en: 'The same VM hosts Plune and MyWedding, and both wanted port 443. This proxy is the answer: it reads the server name from the ClientHello and forwards raw TCP to the right container. It never terminates TLS and holds no private key.',
      },
      bullets: [
        {
          pt: 'É o único container que publica as portas 80 e 443 do host.',
          en: 'It is the only container that binds host ports 80 and 443.',
        },
      ],
    },
    {
      id: 'nginx',
      label: 'web',
      sublabel: 'Nginx · TLS + SPA + proxy',
      kind: 'service',
      tech: ['Nginx 1.27', 'Certificado wildcard'],
      col: 4,
      row: 4,
      span: 5,
      views: ALL,
      detail: {
        pt: 'Termina o TLS com o certificado curinga, serve a SPA e faz proxy de /v1/ para a API e de /socket.io/ para o serviço de socket. Aceita qualquer Host de propósito: com um subdomínio por organização, o Nginx não deve conhecer a lista de tenants.',
        en: 'Terminates TLS with the wildcard certificate, serves the SPA and proxies /v1/ to the API and /socket.io/ to the socket service. It accepts any Host by design: with one subdomain per organization, Nginx must not know the tenant list.',
      },
      bullets: [
        {
          pt: 'proxy_set_header Host $host é a linha que carrega a identidade do tenant adiante.',
          en: 'proxy_set_header Host $host is the line that carries tenant identity forward.',
        },
      ],
    },

    /* --- Services --------------------------------------------------------- */
    {
      id: 'api',
      label: 'api',
      sublabel: 'Fastify 5 · TypeScript',
      kind: 'service',
      tech: ['Fastify 5', 'TypeORM', 'Zod', 'CASL', 'JWT'],
      col: 1,
      row: 5,
      span: 4,
      views: ALL,
      detail: {
        pt: 'O domínio inteiro: motor de fluxo, formulários, autenticação, multi-tenancy e o agendador. Organizado em três camadas, com injeção de dependência por decorators do Fastify em vez de container.',
        en: 'The whole domain: flow engine, forms, auth, multi-tenancy and the scheduler. Organised in three layers, with dependency injection through Fastify decorators instead of a container.',
      },
      bullets: [
        {
          pt: 'O motor caminha pelo grafo nó a nó e estaciona sempre que precisa de uma pessoa ou de um tempo.',
          en: 'The engine walks the graph node by node and parks whenever it needs a person or a timer.',
        },
        {
          pt: 'O agendador roda aqui dentro, a cada minuto, reivindicando trabalho com FOR UPDATE SKIP LOCKED, o que o mantém seguro com várias réplicas.',
          en: 'The scheduler runs inside this process, every minute, claiming work with FOR UPDATE SKIP LOCKED, which keeps it safe across replicas.',
        },
      ],
    },
    {
      id: 'socket',
      label: 'socket',
      sublabel: 'NestJS 11 · Socket.IO',
      kind: 'service',
      tech: ['NestJS 11', 'Socket.IO 4', 'TypeORM'],
      col: 5,
      row: 5,
      span: 4,
      views: ['overview', 'messaging', 'realtime'],
      detail: {
        pt: 'Chat, notificações e sinalização de chamadas. Sobe com sincronização de schema desligada de propósito: o schema pertence à API, e só a ela.',
        en: 'Chat, notifications and call signalling. It boots with schema synchronisation switched off on purpose: the schema belongs to the API, and only to it.',
      },
    },
    {
      id: 'worker',
      label: 'worker',
      sublabel: 'Consumidor AMQP · sem porta',
      kind: 'worker',
      tech: ['Node', 'amqplib', 'TypeORM'],
      col: 9,
      row: 5,
      span: 4,
      views: ['overview', 'messaging'],
      detail: {
        pt: 'Processo headless que consome as filas. Ele não roda o motor de fluxo: quando uma mensagem de chat precisa disparar um fluxo, ele chama de volta a API por uma rota interna autenticada por segredo compartilhado.',
        en: 'Headless process that consumes the queues. It does not run the flow engine: when a chat message must trigger a flow, it calls back into the API through an internal route authenticated by a shared secret.',
      },
      bullets: [
        {
          pt: 'Também entrega as mensagens de saída e varre o que ficou preso em queued.',
          en: 'It also delivers outbound messages and sweeps whatever got stuck as queued.',
        },
      ],
    },

    /* --- Data ------------------------------------------------------------- */
    {
      id: 'postgres',
      label: 'PostgreSQL 16',
      sublabel: '25 entidades · base única',
      kind: 'datastore',
      tech: ['PostgreSQL 16', 'TypeORM'],
      col: 1,
      row: 6,
      span: 4,
      views: ALL,
      detail: {
        pt: 'Uma base para tudo: usuários, organizações, fluxos e execuções, formulários e submissões, chat, contatos, integrações e a fila de trabalhos agendados. Os áudios do chat ficam aqui mesmo, como bytea, sem storage de objetos.',
        en: 'One database for everything: users, organizations, flows and runs, forms and submissions, chat, contacts, integrations and the scheduled-job queue. Chat audio lives right here as bytea, with no object storage.',
      },
      bullets: [
        {
          pt: 'Template e instância são o modelo central: um gatilho clona o template, e editar o original nunca perturba as execuções em andamento.',
          en: 'Template and instance are the core model: a trigger clones the template, so editing the original never disturbs runs already in flight.',
        },
      ],
    },
    {
      id: 'rabbit',
      label: 'RabbitMQ',
      sublabel: '5 exchanges · 6 filas',
      kind: 'broker',
      tech: ['RabbitMQ 3', 'TTL retry', 'Dead letter'],
      col: 5,
      row: 6,
      span: 4,
      views: ['overview', 'messaging'],
      detail: {
        pt: 'A topologia é um arquivo só, copiado nos três serviços, porque eles precisam concordar exatamente. Retentativa por TTL de fila com dead-letter de volta para a exchange de origem.',
        en: 'The topology is a single file copied into all three services, because they have to agree exactly. Retries use queue TTL with dead-lettering back to the origin exchange.',
      },
    },
    {
      id: 'coturn',
      label: 'coturn',
      sublabel: 'TURN / STUN',
      kind: 'service',
      tech: ['coturn 4.6', 'network_mode: host'],
      col: 9,
      row: 6,
      span: 4,
      views: ['overview', 'realtime'],
      detail: {
        pt: 'Relay de última instância para as chamadas. Só entra em cena quando o NAT impede a conexão direta entre os navegadores.',
        en: 'Last-resort relay for calls. It only steps in when NAT prevents a direct connection between the browsers.',
      },
    },

    /* --- External --------------------------------------------------------- */
    {
      id: 'anthropic',
      label: 'Anthropic',
      sublabel: 'Nó de IA do fluxo',
      kind: 'external',
      tech: ['Claude', 'SDK oficial'],
      col: 1,
      row: 7,
      span: 3,
      views: ['overview', 'messaging'],
      detail: {
        pt: 'O nó de IA consulta o Claude e grava a resposta no contexto da execução, disponível para os nós seguintes. A paleta só oferece o nó se o endpoint de capacidades confirmar que existe provedor configurado.',
        en: 'The AI node queries Claude and writes the answer into the run context, where later nodes can read it. The palette only offers the node when the capabilities endpoint confirms a provider is configured.',
      },
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp Cloud API',
      sublabel: 'Meta',
      kind: 'external',
      tech: ['Templates', 'Webhook assinado'],
      col: 4,
      row: 7,
      span: 3,
      views: ['overview', 'messaging'],
      detail: {
        pt: 'Envio de templates e recebimento de callbacks assinados. O worker é o único processo que decifra o token da conta, guardado criptografado no cofre de integrações.',
        en: 'Template sending and signed inbound callbacks. The worker is the only process that decrypts the account token, kept encrypted in the integration vault.',
      },
    },
    {
      id: 'smtp',
      label: 'Entrega SMTP',
      sublabel: 'MX direto · DKIM',
      kind: 'external',
      tech: ['Cliente próprio', 'DKIM'],
      col: 7,
      row: 7,
      span: 3,
      views: ['overview', 'messaging'],
      detail: {
        pt: 'Sem provedor de e-mail: o cliente SMTP é escrito à mão, resolve o MX do destinatário por DNS e entrega direto na porta 25, com assinatura DKIM. Há uma saída de emergência por relay, se necessário.',
        en: 'No email provider: the SMTP client is hand-written, resolves the recipient MX record over DNS and delivers straight to port 25, DKIM-signed. A relay escape hatch is available if needed.',
      },
    },
    {
      id: 'releases',
      label: 'GitHub Releases',
      sublabel: 'Instaladores e updates',
      kind: 'external',
      tech: ['electron-updater', 'GitHub Actions'],
      col: 10,
      row: 7,
      span: 3,
      views: ['overview'],
      detail: {
        pt: 'A API faz proxy da lista de releases, então o repositório pode continuar privado, e o app instalado se atualiza sozinho. O release é disparado pela mudança de versão no package.json, nunca por uma tag empurrada à mão.',
        en: 'The API proxies the releases list, so the repository can stay private, and the installed app updates itself. A release is triggered by the version changing in package.json, never by a hand-pushed tag.',
      },
    },
  ],
  edges: [
    { from: 'web', to: 'cloudflare', kind: 'sync', views: ['overview', 'request', 'realtime'] },
    { from: 'portal', to: 'cloudflare', kind: 'sync', views: ['overview', 'request', 'realtime'] },
    { from: 'admin', to: 'cloudflare', kind: 'sync', views: ['overview', 'request'] },
    {
      from: 'desktop',
      to: 'cloudflare',
      kind: 'sync',
      views: ['overview', 'request', 'realtime'],
      label: { pt: 'x-api-organization', en: 'x-api-organization' },
    },
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
      label: { pt: '/v1/ + Host', en: '/v1/ + Host' },
    },
    {
      from: 'nginx',
      to: 'socket',
      kind: 'stream',
      views: ['overview', 'realtime'],
      label: { pt: '/socket.io/', en: '/socket.io/' },
    },
    { from: 'api', to: 'postgres', kind: 'sync', views: ALL, highlight: true },
    { from: 'socket', to: 'postgres', kind: 'sync', views: ['overview', 'messaging', 'realtime'] },
    { from: 'worker', to: 'postgres', kind: 'sync', views: ['overview', 'messaging'] },
    {
      from: 'api',
      to: 'rabbit',
      kind: 'async',
      views: ['overview', 'messaging'],
      label: { pt: 'publica saída', en: 'publishes outbound' },
    },
    {
      from: 'socket',
      to: 'rabbit',
      kind: 'async',
      views: ['overview', 'messaging'],
      label: { pt: 'mensagem recebida', en: 'message received' },
    },
    {
      from: 'rabbit',
      to: 'worker',
      kind: 'async',
      views: ['overview', 'messaging'],
      label: { pt: 'consome', en: 'consumes' },
    },
    {
      from: 'worker',
      to: 'api',
      kind: 'sync',
      views: ['overview', 'messaging'],
      label: { pt: 'rota interna', en: 'internal route' },
    },
    {
      from: 'api',
      to: 'socket',
      kind: 'sync',
      views: ['overview', 'realtime'],
      label: { pt: 'emite', en: 'emits' },
    },
    { from: 'api', to: 'anthropic', kind: 'sync', views: ['overview', 'messaging'] },
    { from: 'worker', to: 'whatsapp', kind: 'sync', views: ['overview', 'messaging'] },
    { from: 'worker', to: 'smtp', kind: 'sync', views: ['overview', 'messaging'] },
    { from: 'api', to: 'releases', kind: 'sync', views: ['overview'] },
    {
      from: 'web',
      to: 'coturn',
      kind: 'p2p',
      views: ['overview', 'realtime'],
      label: { pt: 'mídia P2P', en: 'P2P media' },
    },
    { from: 'desktop', to: 'coturn', kind: 'p2p', views: ['overview', 'realtime'] },
  ],
}
