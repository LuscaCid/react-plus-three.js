import type { Localized } from '@/lib/types'

export interface TechItem {
  label: string
  /** Key into the brand registry in TechIcon. Omitted when no brand mark
   *  exists (C#, SQL Server) or when the item is a concept, not a product. */
  slug?: string
}

export interface TechCategory {
  id: string
  title: Localized
  description: Localized
  items: TechItem[]
}

/* -------------------------------------------------------------------------
   AI is the featured block: it gets its own component treatment, so it is
   modelled separately from the plain categories below.
   ------------------------------------------------------------------------- */

export interface AiProof {
  id: string
  title: Localized
  body: Localized
}

export const aiSection = {
  title: {
    pt: 'IA e Agentes',
    en: 'AI and Agents',
  } satisfies Localized,
  description: {
    pt: 'Não é uma linha no currículo: é como eu trabalho e o que já está rodando em produção. Construo agents e skills, integro ferramentas e sistemas via MCP, e aplico RAG e fine-tuning tanto no ciclo de desenvolvimento quanto dentro dos produtos.',
    en: 'Not a bullet point: it is how I work and what is already running in production. I build agents and skills, integrate tools and systems through MCP, and apply RAG and fine-tuning both in the development cycle and inside the products themselves.',
  } satisfies Localized,
  items: [
    { label: 'MCP', slug: undefined },
    { label: 'RAG' },
    { label: 'Fine-tuning' },
    { label: 'Agents' },
    { label: 'Skills' },
    { label: 'Maestri' },
    { label: 'Claude Code', slug: 'anthropic' },
    { label: 'Anthropic SDK', slug: 'anthropic' },
    { label: 'Embeddings' },
    { label: 'Prompt engineering' },
  ] satisfies TechItem[],
  proofs: [
    {
      id: 'skills',
      title: {
        pt: 'Agents e skills versionados',
        en: 'Versioned agents and skills',
      },
      body: {
        pt: 'Os dois produtos carregam skills de projeto no repositório: seis no Plune (endpoint de API, nó de fluxo, mensagem de saída, release, tela e verificação de UI) e cinco no MyWedding (endpoint, card, estilo, formulário e página de CRUD). São instruções versionadas junto com o código, não prompts soltos.',
        en: 'Both products carry project skills in the repository: six in Plune (API endpoint, flow node, outbound message, release, screen and UI verification) and five in MyWedding (endpoint, card, styling, form and CRUD page). They are instructions versioned alongside the code, not loose prompts.',
      },
    },
    {
      id: 'product',
      title: {
        pt: 'IA dentro do produto',
        en: 'AI inside the product',
      },
      body: {
        pt: 'O Plune tem um nó de IA no motor de fluxo: ele consulta o Claude pelo SDK da Anthropic e grava a resposta no contexto da execução, disponível para os nós seguintes. A paleta só oferece esse nó se o endpoint de capacidades confirmar que há provedor configurado, então o editor nunca mostra algo que o servidor não sabe executar.',
        en: 'Plune has an AI node in its flow engine: it queries Claude through the Anthropic SDK and writes the answer into the run context, where later nodes can read it. The palette only offers the node when the capabilities endpoint confirms a provider is configured, so the editor never shows something the server cannot run.',
      },
    },
    {
      id: 'workflow',
      title: {
        pt: 'IA no ciclo de desenvolvimento',
        en: 'AI in the development cycle',
      },
      body: {
        pt: 'Uso agents e skills para análise de problemas e identificação de causa raiz, integro ferramentas via MCP, e trabalho com Maestri para orquestrar vários agents em paralelo: cada terminal é um nó num canvas infinito, e ligar dois nós faz um agent escrever no terminal do outro.',
        en: 'I use agents and skills for problem analysis and root-cause identification, integrate tools through MCP, and work with Maestri to orchestrate several agents in parallel: each terminal is a node on an infinite canvas, and connecting two nodes lets one agent type into another agent terminal.',
      },
    },
  ] satisfies AiProof[],
}

export const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    title: { pt: 'Frontend', en: 'Frontend' },
    description: {
      pt: 'Interfaces responsivas, acessíveis e rápidas, em web e desktop.',
      en: 'Responsive, accessible and fast interfaces, on web and desktop.',
    },
    items: [
      { label: 'React', slug: 'react' },
      { label: 'Angular', slug: 'angular' },
      { label: 'Next.js', slug: 'nextjs' },
      { label: 'TypeScript', slug: 'typescript' },
      { label: 'JavaScript', slug: 'javascript' },
      { label: 'Tailwind CSS', slug: 'tailwind' },
      { label: 'Electron', slug: 'electron' },
      { label: 'React Native', slug: 'react' },
      { label: 'Flutter', slug: 'flutter' },
      { label: 'Dart', slug: 'dart' },
      { label: 'HTML', slug: 'html' },
      { label: 'CSS', slug: 'css' },
    ],
  },
  {
    id: 'backend',
    title: { pt: 'Backend', en: 'Backend' },
    description: {
      pt: 'APIs, motores de execução e serviços que precisam continuar de pé.',
      en: 'APIs, execution engines and services that have to stay up.',
    },
    items: [
      { label: '.NET 10', slug: 'dotnet' },
      { label: 'ASP.NET Core', slug: 'dotnet' },
      { label: 'C#' },
      { label: 'Node.js', slug: 'nodejs' },
      { label: 'Fastify', slug: 'fastify' },
      { label: 'NestJS', slug: 'nestjs' },
      { label: 'Python', slug: 'python' },
      { label: 'Django REST', slug: 'django' },
      { label: 'PHP', slug: 'php' },
      { label: 'WebSockets', slug: 'socketio' },
      { label: 'RabbitMQ', slug: 'rabbitmq' },
    ],
  },
  {
    id: 'data',
    title: { pt: 'Dados', en: 'Data' },
    description: {
      pt: 'Modelagem, consultas e a lógica que mora perto do banco.',
      en: 'Modelling, queries and the logic that lives close to the database.',
    },
    items: [
      { label: 'PostgreSQL', slug: 'postgresql' },
      { label: 'SQL Server' },
      { label: 'MongoDB', slug: 'mongodb' },
      { label: 'Redis', slug: 'redis' },
      { label: 'Entity Framework', slug: 'dotnet' },
      { label: 'TypeORM' },
    ],
  },
  {
    id: 'infra',
    title: { pt: 'Infra e DevOps', en: 'Infra and DevOps' },
    description: {
      pt: 'Do container ao domínio: eu mesmo publico e mantenho o que construo.',
      en: 'From container to domain: I ship and maintain what I build.',
    },
    items: [
      { label: 'Docker', slug: 'docker' },
      { label: 'Nginx', slug: 'nginx' },
      { label: 'AWS', slug: 'aws' },
      { label: 'Cloudflare', slug: 'cloudflare' },
      { label: 'Linux', slug: 'linux' },
      { label: 'GitHub Actions', slug: 'github' },
      { label: 'Git', slug: 'git' },
      { label: 'Vite', slug: 'vite' },
    ],
  },
]
