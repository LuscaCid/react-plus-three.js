import type { Localized } from '@/lib/types'

export interface Experience {
  id: string
  company: string
  role: Localized
  location: string
  period: Localized
  current?: boolean
  summary: Localized
  highlights: Localized[]
  tech: { label: string; slug?: string }[]
}

export const experiences: Experience[] = [
  {
    id: 'geoex',
    company: 'Geoex Tecnologias',
    role: { pt: 'Software Developer', en: 'Software Developer' },
    location: 'Salvador, BA',
    period: { pt: 'ago/2026 — atual', en: 'Aug 2026 — present' },
    current: true,
    summary: {
      pt: 'Desenvolvimento e sustentação do sistema da Neoenergia, com Angular no front, .NET 10 no back e SQL Server na camada de dados.',
      en: 'Building and maintaining Neoenergia systems, with Angular on the front end, .NET 10 on the back end and SQL Server in the data layer.',
    },
    highlights: [
      {
        pt: 'Interfaces modernas e responsivas em Angular, com implementação de novas funcionalidades, correção de problemas e melhorias de performance.',
        en: 'Modern, responsive Angular interfaces: new features, bug fixes and performance work.',
      },
      {
        pt: 'APIs e serviços em .NET 10, aplicando boas práticas de código e cuidando da integração entre os componentes do sistema.',
        en: 'APIs and services in .NET 10, applying solid practices and owning the integration between system components.',
      },
      {
        pt: 'Camada de dados em SQL Server: procedures, views, jobs e triggers escritos para atender às regras de negócio das aplicações.',
        en: 'SQL Server data layer: procedures, views, jobs and triggers written to serve real business rules.',
      },
      {
        pt: 'IA aplicada ao desenvolvimento: agents, skills e integrações via MCP, apoiando a análise de problemas, a identificação de causa raiz e melhorias de estabilidade e desempenho.',
        en: 'AI applied to development: agents, skills and MCP integrations supporting problem analysis, root-cause identification and stability improvements.',
      },
    ],
    tech: [
      { label: 'Angular', slug: 'angular' },
      { label: '.NET 10', slug: 'dotnet' },
      { label: 'C#' },
      { label: 'SQL Server' },
      { label: 'TypeScript', slug: 'typescript' },
      { label: 'MCP' },
    ],
  },
  {
    id: 'fugro',
    company: 'Fugro',
    role: { pt: 'Full Stack Web Developer', en: 'Full Stack Web Developer' },
    location: 'Salvador, BA',
    period: { pt: 'jan/2026 — set/2026', en: 'Jan 2026 — Sep 2026' },
    summary: {
      pt: 'Aplicações web para o setor financeiro com React, TypeScript e Python com Django REST Framework, além de soluções com IA e uso diário do inglês com times internacionais.',
      en: 'Financial-sector web applications with React, TypeScript and Python with Django REST Framework, plus AI work and daily English with international teams.',
    },
    highlights: [
      {
        pt: 'Desenvolvimento e manutenção de aplicações web voltadas ao setor financeiro com React, TypeScript e Django REST Framework.',
        en: 'Built and maintained financial web applications with React, TypeScript and Django REST Framework.',
      },
      {
        pt: 'Construção de soluções com IA: agents e skills, integração de ferramentas e sistemas via MCP, aplicação de RAG e fine-tuning de modelos.',
        en: 'Built AI solutions: agents and skills, tool and system integration through MCP, plus RAG and model fine-tuning.',
      },
      {
        pt: 'Inglês no dia a dia para colaborar com equipes internacionais, participar de reuniões e trabalhar num ambiente global.',
        en: 'Daily English to collaborate with international teams, take part in meetings and work in a global environment.',
      },
      {
        pt: 'Desafios diários de arquitetura de software para garantir que os produtos permaneçam altamente performáticos e seguros.',
        en: 'Daily software architecture challenges to keep the products highly performant and secure.',
      },
    ],
    tech: [
      { label: 'React', slug: 'react' },
      { label: 'TypeScript', slug: 'typescript' },
      { label: 'Python', slug: 'python' },
      { label: 'Django REST', slug: 'django' },
      { label: 'RAG' },
      { label: 'Fine-tuning' },
      { label: 'MCP' },
    ],
  },
  {
    id: 'wi5',
    company: 'Wi5 Tecnologia',
    role: { pt: 'Full Stack Developer', en: 'Full Stack Developer' },
    location: 'Salvador, BA',
    period: { pt: 'abr/2023 — dez/2025', en: 'Apr 2023 — Dec 2025' },
    summary: {
      pt: 'Trabalho colaborativo em diversos projetos da equipe e liderança independente de três deles, com React e TypeScript, PHP e C# com ASP.NET Core e Entity Framework.',
      en: 'Collaborative work across team projects plus independent ownership of three of them, using React with TypeScript, PHP, and C# with ASP.NET Core and Entity Framework.',
    },
    highlights: [
      {
        pt: 'Aplicação desktop colaborativa em tempo real com Electron para gerenciamento de banco de dados (DBMS), com abordagem diferente das soluções de mercado e geração automática de código PHP para criação de formulários no Adianti Framework.',
        en: 'Real-time collaborative desktop application in Electron for database management, taking a different approach from existing tools and generating PHP code automatically for Adianti Framework forms.',
      },
      {
        pt: 'Frontend e backend de um Portal da Transparência projetado para atender múltiplos municípios, sendo responsável por funcionalidades com cron jobs, MongoDB e PostgreSQL.',
        en: 'Front end and back end of a government transparency portal designed to serve multiple municipalities, owning features built on cron jobs, MongoDB and PostgreSQL.',
      },
      {
        pt: 'Sites institucionais com sistema de gerenciamento de conteúdo, permitindo que administradores publiquem notícias e gerenciem conteúdo sem depender do time de desenvolvimento.',
        en: 'Institutional websites with a content management system, letting administrators publish news and manage content without the development team.',
      },
      {
        pt: 'Aprofundamento em React com TypeScript, PHP na principal aplicação web da empresa e C# com ASP.NET Core e Entity Framework.',
        en: 'Deepened React with TypeScript, PHP on the main company web application, and C# with ASP.NET Core and Entity Framework.',
      },
    ],
    tech: [
      { label: 'React', slug: 'react' },
      { label: 'TypeScript', slug: 'typescript' },
      { label: 'PHP', slug: 'php' },
      { label: 'C#' },
      { label: 'ASP.NET Core', slug: 'dotnet' },
      { label: 'Electron', slug: 'electron' },
      { label: 'PostgreSQL', slug: 'postgresql' },
      { label: 'MongoDB', slug: 'mongodb' },
    ],
  },
  {
    id: 'workana',
    company: 'Workana',
    role: { pt: 'Freelancer Developer', en: 'Freelance Developer' },
    location: 'Salvador, BA',
    period: { pt: 'fev/2023 — nov/2023', en: 'Feb 2023 — Nov 2023' },
    summary: {
      pt: 'Soluções sob medida de acordo com os requisitos de cada cliente, com foco em aplicações web modernas, performáticas e escaláveis.',
      en: 'Custom solutions shaped by each client requirement, focused on modern, fast and scalable web applications.',
    },
    highlights: [
      {
        pt: 'Projetos desenvolvidos principalmente com TypeScript, Next.js e React, do levantamento de requisitos à entrega.',
        en: 'Projects built mainly with TypeScript, Next.js and React, from requirements gathering through delivery.',
      },
      {
        pt: 'Contato direto com clientes, traduzindo necessidade de negócio em escopo técnico.',
        en: 'Direct client contact, translating business needs into technical scope.',
      },
    ],
    tech: [
      { label: 'TypeScript', slug: 'typescript' },
      { label: 'Next.js', slug: 'nextjs' },
      { label: 'React', slug: 'react' },
    ],
  },
]

export interface Education {
  institution: string
  degree: Localized
  location: string
  period: Localized
}

export const education: Education[] = [
  {
    institution: 'SENAI',
    degree: {
      pt: 'Ensino Técnico em Desenvolvimento de Sistemas',
      en: 'Technical Degree in Systems Development',
    },
    location: 'Salvador, BA',
    period: { pt: 'jan/2023 — dez/2024', en: 'Jan 2023 — Dec 2024' },
  },
]

export interface LanguageSkill {
  name: Localized
  level: Localized
}

export const languages: LanguageSkill[] = [
  {
    name: { pt: 'Português', en: 'Portuguese' },
    level: { pt: 'Nativo', en: 'Native' },
  },
  {
    name: { pt: 'Inglês', en: 'English' },
    level: {
      pt: 'Profissional, em uso diário com times internacionais',
      en: 'Professional, used daily with international teams',
    },
  },
]
