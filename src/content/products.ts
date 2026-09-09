import type { ArchitectureSpec, Localized } from '@/lib/types'
import type { TechItem } from './tech'
import { pluneArchitecture } from './architectures/plune'
import { myweddingArchitecture } from './architectures/mywedding'

export interface ProductScreenshot {
  /** Path under public/, e.g. /products/plune/editor.webp */
  src: string
  alt: Localized
  /** Shown in the window chrome above the image. */
  label: Localized
  /** Intrinsic size, so the slot reserves the right box and nothing shifts. */
  width: number
  height: number
}

export interface ProductFeature {
  title: Localized
  body: Localized
  /** Rendered as chips under the text when present. */
  chips?: string[]
}

export interface Product {
  id: string
  name: string
  domain: string
  href: string
  status: Localized
  tagline: Localized
  description: Localized
  tech: TechItem[]
  features: ProductFeature[]
  architecture: ArchitectureSpec
  /** Empty until the real screenshots land in public/products/<id>/. */
  screenshots: ProductScreenshot[]
  screenshotRatio: `${number} / ${number}`
}

export const products: Product[] = [
  {
    id: 'plune',
    name: 'Plune',
    domain: 'plune.app.br',
    href: 'https://plune.app.br',
    status: { pt: 'Em produção', en: 'In production' },
    tagline: {
      pt: 'Automação de processos com formulários, condições e aprovações.',
      en: 'Process automation with forms, conditions and approvals.',
    },
    description: {
      pt: 'Você desenha o processo da empresa num canvas e o motor executa nó a nó, parando sempre que precisa de uma pessoa ou de um tempo. É um SaaS multi-tenant completo: cada organização tem seu subdomínio, e o mesmo código roda como web, desktop, portal do cliente e console da plataforma.',
      en: 'You draw the company process on a canvas and the engine runs it node by node, parking whenever it needs a person or a timer. It is a complete multi-tenant SaaS: each organization gets its own subdomain, and the same codebase runs as web app, desktop app, client portal and platform console.',
    },
    tech: [
      { label: 'React', slug: 'react' },
      { label: 'TypeScript', slug: 'typescript' },
      { label: 'Fastify', slug: 'fastify' },
      { label: 'NestJS', slug: 'nestjs' },
      { label: 'PostgreSQL', slug: 'postgresql' },
      { label: 'RabbitMQ', slug: 'rabbitmq' },
      { label: 'Electron', slug: 'electron' },
      { label: 'Docker', slug: 'docker' },
      { label: 'Nginx', slug: 'nginx' },
    ],
    features: [
      {
        title: { pt: '14 tipos de nó', en: '14 node types' },
        body: {
          pt: 'Entradas por webhook, mensagem de chat ou agendamento. Etapas humanas de formulário e aprovação. Lógica com condição, atribuição de valores e espera. Saídas por chat, WhatsApp, e-mail e webhook. E um nó de IA que consulta o Claude e escreve no contexto da execução.',
          en: 'Entry points by webhook, chat message or schedule. Human steps for forms and approvals. Logic through conditions, value assignment and delays. Outputs over chat, WhatsApp, email and webhook. Plus an AI node that queries Claude and writes into the run context.',
        },
        chips: [
          'trigger',
          'chat_trigger',
          'schedule_trigger',
          'form',
          'approval',
          'condition',
          'set',
          'delay',
          'chat_message',
          'whatsapp',
          'email',
          'webhook',
          'ai',
          'stage',
        ],
      },
      {
        title: { pt: 'Formulários que são um produto à parte', en: 'Forms that are a product of their own' },
        body: {
          pt: 'Nove tipos de campo, incluindo referência, que é uma chave estrangeira para os registros de outro formulário. Master e detail para casos de cabeçalho e itens. Cinco tipos de validação, incluindo obrigatoriedade condicional e unicidade com escopo. Campos computados são recalculados no servidor, então um cliente adulterado não dita o valor gravado.',
          en: 'Nine field types, including reference, which is a foreign key to another form records. Master and detail for header-and-items cases. Five validation kinds, including conditional requirement and scoped uniqueness. Computed fields are recalculated server-side, so a tampered client cannot dictate the stored value.',
        },
      },
      {
        title: { pt: 'Um código, quatro produtos', en: 'One codebase, four products' },
        body: {
          pt: 'O mesmo build resolve em tempo de execução se está rodando no Electron, no domínio raiz, num subdomínio de organização ou no console da plataforma, e monta a árvore de rotas correspondente. Um usuário com papel Viewer sempre cai no portal do cliente, nunca nas telas de administração.',
          en: 'The same build decides at runtime whether it is running inside Electron, on the root domain, on an organization subdomain or on the platform console, and mounts the matching route tree. A user with the Viewer role always lands in the client portal, never in the admin screens.',
        },
      },
      {
        title: { pt: 'Chat, chamadas e WhatsApp', en: 'Chat, calls and WhatsApp' },
        body: {
          pt: 'Salas de chat com mensagens de voz e chamadas de áudio e vídeo por WebRTC, com compartilhamento de tela. A mídia é ponto a ponto entre os navegadores e nunca passa pelo servidor. Do lado de fora, integração com a API do WhatsApp Business e entrega de e-mail direto por MX, com DKIM.',
          en: 'Chat rooms with voice messages, plus audio and video calls over WebRTC with screen sharing. Media is peer to peer between browsers and never touches the server. Outward, there is WhatsApp Business API integration and direct MX email delivery, DKIM-signed.',
        },
      },
    ],
    architecture: pluneArchitecture,
    screenshots: [
      {
        src: '/products/plune/plune-diag.webp',
        label: {
          pt: 'plune.app.br · editor de fluxo',
          en: 'plune.app.br · flow editor',
        },
        alt: {
          pt: 'Editor de fluxo do Plune: um canvas com os nós de formulário, regras condicionais, mensagem de chat, e-mail, aprovadores e agendamento ligados entre si.',
          en: 'Plune flow editor: a canvas with form, conditional rule, chat message, email, approvers and schedule nodes wired together.',
        },
        width: 1600,
        height: 758,
      },
      {
        src: '/products/plune/plune-nocode-form.webp',
        label: {
          pt: 'plune.app.br · construtor de formulários',
          en: 'plune.app.br · form builder',
        },
        alt: {
          pt: 'Construtor de formulários do Plune, com seções arrastáveis, campos de texto, número, e-mail, seleção múltipla e a configuração do código de cada registro.',
          en: 'Plune form builder, with draggable sections, text, number, email and multiple-choice fields, and the per-record code configuration.',
        },
        width: 1600,
        height: 760,
      },
    ],
    screenshotRatio: '1600 / 758',
  },
  {
    id: 'mywedding',
    name: 'MyWedding',
    domain: 'mywedding.app.br',
    href: 'https://mywedding.app.br',
    status: { pt: 'Em produção', en: 'In production' },
    tagline: {
      pt: 'Site de casamento, painel dos noivos e marketplace de fornecedores.',
      en: 'Wedding website, couple dashboard and vendor marketplace.',
    },
    description: {
      pt: 'Cada casal recebe um subdomínio próprio com site publicável, painel administrativo e assinatura. Um build Angular atende quatro públicos diferentes decidindo pelo hostname, e a API .NET isola os dados de cada casamento em três camadas independentes.',
      en: 'Each couple gets their own subdomain with a publishable site, an admin dashboard and a subscription. One Angular build serves four different audiences by deciding on the hostname, and the .NET API isolates each wedding data across three independent layers.',
    },
    tech: [
      { label: 'Angular', slug: 'angular' },
      { label: 'TypeScript', slug: 'typescript' },
      { label: '.NET 10', slug: 'dotnet' },
      { label: 'C#' },
      { label: 'EF Core', slug: 'dotnet' },
      { label: 'PostgreSQL', slug: 'postgresql' },
      { label: 'Stripe', slug: 'stripe' },
      { label: 'Cloudflare', slug: 'cloudflare' },
      { label: 'Docker', slug: 'docker' },
    ],
    features: [
      {
        title: { pt: 'Quatro públicos, um build', en: 'Four audiences, one build' },
        body: {
          pt: 'O hostname decide o que carregar: o domínio raiz mostra o marketing e o portal de fornecedores, um subdomínio mostra o site do casal, e o subdomínio de admin mostra o console da plataforma. Cada ramo é carregado sob demanda, então quem visita o site de um casamento nunca baixa o bundle do console.',
          en: 'The hostname decides what to load: the root domain shows marketing and the vendor portal, a subdomain shows the couple site, and the admin subdomain shows the platform console. Each branch is lazy-loaded, so someone visiting a wedding site never downloads the console bundle.',
        },
      },
      {
        title: { pt: 'O site do casal', en: 'The couple site' },
        body: {
          pt: 'Contagem regressiva, linha do tempo do casal, detalhes do evento, RSVP por código de convite, galeria de fotos, lista de presentes com QR Pix, mural de recados moderado e FAQ. A publicação é versionada: dá para publicar, publicar e notificar todos os convidados por e-mail, ou despublicar.',
          en: 'Countdown, the couple story timeline, event details, RSVP by invitation code, photo gallery, gift registry with a Pix QR code, moderated guestbook and FAQ. Publishing is versioned: you can publish, publish and email every guest, or unpublish.',
        },
      },
      {
        title: { pt: 'Planos, cotas e uma regra humana', en: 'Plans, quotas and one humane rule' },
        body: {
          pt: 'Trial de 14 dias sem cartão e três planos, com cotas de convites, convidados, fotos e armazenamento, além de módulos habilitados por plano. Pedir um módulo fora do plano devolve 402 com a URL de upgrade, em vez de um 403 seco. E uma regra atravessa tudo: nenhum site sai do ar nos 14 dias antes do casamento.',
          en: 'A 14-day no-card trial and three plans, with quotas for invitations, guests, photos and storage, plus modules enabled per plan. Asking for a module outside the plan returns 402 with an upgrade URL, rather than a bare 403. And one rule cuts across everything: no site is taken down in the 14 days before the wedding.',
        },
      },
      {
        title: { pt: 'Marketplace e comunidade', en: 'Marketplace and community' },
        body: {
          pt: 'Fornecedores se cadastram, publicam catálogo e portfólio, e os casais os encontram por categoria, cidade, faixa de preço ou raio a partir do local do casamento, com busca geográfica feita numa tabela local de municípios. Há ainda um fórum entre casais, com leitura pública e escrita para assinantes.',
          en: 'Vendors sign up, publish a catalogue and portfolio, and couples find them by category, city, price range or radius from the venue, with geographic search running against a local municipalities table. There is also a forum across couples, publicly readable and writable by subscribers.',
        },
      },
    ],
    architecture: myweddingArchitecture,
    screenshots: [
      {
        src: '/products/mywedding/mywedding-preview.webp',
        label: {
          pt: 'mywedding.app.br · site do casal',
          en: 'mywedding.app.br · couple site',
        },
        alt: {
          pt: 'Preview do site de um casal no MyWedding: capa com save the date, contagem regressiva, foto do casal e os botões de confirmar presença e ver o evento.',
          en: 'Preview of a couple site in MyWedding: save-the-date cover, countdown, the couple photo and the buttons to confirm attendance and see the event.',
        },
        width: 1600,
        height: 759,
      },
      {
        src: '/products/mywedding/mywedding-dashboard.webp',
        label: {
          pt: 'mywedding.app.br · painel dos noivos',
          en: 'mywedding.app.br · couple dashboard',
        },
        alt: {
          pt: 'Painel dos noivos no MyWedding: status de publicação com o número da versão, data do casamento, contadores de convidados e confirmações, e o gráfico de respostas de RSVP.',
          en: 'MyWedding couple dashboard: publication status with the version number, wedding date, guest and confirmation counters, and the RSVP response chart.',
        },
        width: 1600,
        height: 755,
      },
    ],
    screenshotRatio: '1600 / 757',
  },
]

/* -------------------------------------------------------------------------
   A small, honest example of what a Plune flow looks like. It reuses the
   architecture renderer, which is also how that component gets exercised on a
   tiny graph before the two full systems.
   ------------------------------------------------------------------------- */

export const pluneFlowExample: ArchitectureSpec = {
  id: 'plune-flow',
  cols: 12,
  rows: 3,
  views: [
    {
      id: 'flow',
      label: { pt: 'Exemplo de fluxo', en: 'Example flow' },
      description: {
        pt: 'Uma solicitação de compra: o pedido chega por formulário, o valor decide o caminho, o gestor aprova e o fornecedor recebe um WhatsApp. O motor estaciona na aprovação até alguém responder.',
        en: 'A purchase request: the order arrives through a form, the amount decides the path, a manager approves it and the supplier gets a WhatsApp message. The engine parks at the approval until someone answers.',
      },
    },
  ],
  nodes: [
    {
      id: 'form',
      label: 'Formulário',
      sublabel: 'Solicitação de compra',
      kind: 'client',
      tech: ['form'],
      col: 1,
      row: 1,
      span: 3,
      views: ['flow'],
      detail: {
        pt: 'A etapa humana de entrada. Pode ser atribuída a qualquer pessoa ou a usuários específicos, e o motor registra o momento exato em que estacionou aqui.',
        en: 'The human entry step. It can be assigned to anyone or to specific users, and the engine records the exact moment it parked here.',
      },
    },
    {
      id: 'condition',
      label: 'Condição',
      sublabel: 'valor > R$ 5.000?',
      kind: 'service',
      tech: ['condition'],
      col: 5,
      row: 1,
      span: 3,
      views: ['flow'],
      detail: {
        pt: 'Regras encadeadas com E e OU sobre nove operadores, comparando com um literal ou com outro campo. Cada saída, de acerto e de erro, aponta para um nó diferente.',
        en: 'Rules chained with AND and OR across nine operators, comparing against a literal or another field. Each outcome, match and mismatch, points at a different node.',
      },
    },
    {
      id: 'approval',
      label: 'Aprovação',
      sublabel: 'Gestor responsável',
      kind: 'worker',
      tech: ['approval'],
      col: 9,
      row: 1,
      span: 3,
      views: ['flow'],
      detail: {
        pt: 'Vários aprovadores possíveis, e a rejeição não é falha: ela tem rota própria, porque recusar uma compra é um desfecho de negócio normal, não um erro do sistema.',
        en: 'Several possible approvers, and a rejection is not a failure: it has its own route, because turning a purchase down is a normal business outcome, not a system error.',
      },
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      sublabel: 'Avisa o fornecedor',
      kind: 'external',
      tech: ['whatsapp'],
      col: 5,
      row: 3,
      span: 3,
      views: ['flow'],
      detail: {
        pt: 'Saída por template da API do WhatsApp Business. A linha é gravada no banco antes de ir para a fila, então uma queda do broker atrasa a entrega mas não perde a mensagem.',
        en: 'Outbound through a WhatsApp Business API template. The row is written to the database before it reaches the queue, so a broker outage delays delivery but never loses the message.',
      },
    },
    {
      id: 'email',
      label: 'E-mail',
      sublabel: 'Recusa registrada',
      kind: 'external',
      tech: ['email'],
      col: 9,
      row: 3,
      span: 3,
      views: ['flow'],
      detail: {
        pt: 'O caminho da rejeição também termina em algum lugar: quem pediu recebe a resposta com o comentário do aprovador.',
        en: 'The rejection path also ends somewhere: the requester gets an answer carrying the approver comment.',
      },
    },
  ],
  edges: [
    { from: 'form', to: 'condition', kind: 'sync', views: ['flow'], highlight: true },
    {
      from: 'condition',
      to: 'approval',
      kind: 'sync',
      views: ['flow'],
      highlight: true,
      label: { pt: 'sim', en: 'yes' },
    },
    {
      from: 'condition',
      to: 'whatsapp',
      kind: 'async',
      views: ['flow'],
      label: { pt: 'não, segue direto', en: 'no, straight through' },
    },
    {
      from: 'approval',
      to: 'whatsapp',
      kind: 'async',
      views: ['flow'],
      label: { pt: 'aprovado', en: 'approved' },
    },
    {
      from: 'approval',
      to: 'email',
      kind: 'async',
      views: ['flow'],
      label: { pt: 'recusado', en: 'rejected' },
    },
  ],
}
