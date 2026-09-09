import type { Localized } from '@/lib/types'
import type { TechItem } from './tech'

export interface Project {
  id: string
  name: string
  context: Localized
  description: Localized
  tech: TechItem[]
  link?: { href: string; label: Localized }
  /** Shown instead of a link when the work is not publicly reachable. */
  note?: Localized
}

export const projects: Project[] = [
  {
    id: 'transparencia',
    name: 'Portal da Transparência',
    context: { pt: 'Wi5 Tecnologia', en: 'Wi5 Tecnologia' },
    description: {
      pt: 'Aplicação fullstack para governos publicarem seus dados de transparência à população, projetada desde o início para atender múltiplos municípios. Fui responsável pelas funcionalidades de ingestão com cron jobs e pela camada de dados em MongoDB e PostgreSQL.',
      en: 'Full stack application for governments to publish transparency data to the public, designed from the start to serve multiple municipalities. I owned the cron-job ingestion features and the MongoDB and PostgreSQL data layer.',
    },
    tech: [
      { label: 'React', slug: 'react' },
      { label: 'TypeScript', slug: 'typescript' },
      { label: 'MongoDB', slug: 'mongodb' },
      { label: 'PostgreSQL', slug: 'postgresql' },
      { label: 'Cron jobs' },
    ],
    link: {
      href: 'https://consorcioapasbaixosul.w5i.com.br/',
      label: { pt: 'Ver no ar', en: 'View live' },
    },
  },
  {
    id: 'builder',
    name: 'W5i Builder',
    context: { pt: 'Wi5 Tecnologia', en: 'Wi5 Tecnologia' },
    description: {
      pt: 'Aplicação web e desktop que organiza tabelas e relacionamentos de banco de dados e gera código PHP e SQL para o Adianti Framework. Foi construída em Electron, com edição colaborativa em tempo real, para encurtar a etapa mais repetitiva do time.',
      en: 'Web and desktop application that organises database tables and relationships and generates PHP and SQL code for the Adianti Framework. Built in Electron with real-time collaborative editing, to cut out the most repetitive part of the team workflow.',
    },
    tech: [
      { label: 'Electron', slug: 'electron' },
      { label: 'React', slug: 'react' },
      { label: 'TypeScript', slug: 'typescript' },
      { label: 'PHP', slug: 'php' },
      { label: 'PostgreSQL', slug: 'postgresql' },
    ],
    note: {
      pt: 'Produto interno e fechado, sem link público.',
      en: 'Internal, closed product with no public link.',
    },
  },
  {
    id: 'bi',
    name: 'BI',
    context: { pt: 'Wi5 Tecnologia', en: 'Wi5 Tecnologia' },
    description: {
      pt: 'Dashboard de indicadores construído a partir de uma aplicação maior: gráficos, tabelas e muita informação condensada numa leitura só. Desenvolvido em dupla, com foco em deixar o dado denso ainda legível.',
      en: 'Indicator dashboard built on top of a larger application: charts, tables and a lot of condensed information in a single view. Built as a pair, focused on keeping dense data readable.',
    },
    tech: [
      { label: 'React', slug: 'react' },
      { label: 'TypeScript', slug: 'typescript' },
      { label: 'PostgreSQL', slug: 'postgresql' },
    ],
    link: {
      href: 'https://bi.w5i.com.br',
      label: { pt: 'Ver no ar', en: 'View live' },
    },
  },
  {
    id: 'prefeitura',
    name: 'Portal de Prefeitura',
    context: { pt: 'Wi5 Tecnologia', en: 'Wi5 Tecnologia' },
    description: {
      pt: 'Site institucional com sistema de gerenciamento de conteúdo próprio: notícias, secretarias, agendas e comunicados à população, publicados pelos próprios administradores sem passar pelo time de desenvolvimento.',
      en: 'Institutional website with a custom content management system: news, departments, schedules and public notices, published by the administrators themselves without going through the development team.',
    },
    tech: [
      { label: 'Next.js', slug: 'nextjs' },
      { label: 'React', slug: 'react' },
      { label: 'TypeScript', slug: 'typescript' },
    ],
    link: {
      href: 'https://w5i-gerenciador-sites.vercel.app/w5i-tecnologia-acesso-2025',
      label: { pt: 'Ver no ar', en: 'View live' },
    },
  },
]
