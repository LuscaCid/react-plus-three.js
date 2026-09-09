import type { Localized } from '@/lib/types'

export const profile = {
  name: 'Lucas Cid',
  company: 'LUCIDEV',
  initials: 'LC',
  role: {
    pt: 'Software Developer',
    en: 'Software Developer',
  } satisfies Localized,
  location: {
    pt: 'Salvador, BA — Brasil',
    en: 'Salvador, BA — Brazil',
  } satisfies Localized,
  availability: {
    pt: 'Aberto a novos projetos',
    en: 'Open to new projects',
  } satisfies Localized,
  headline: {
    pt: 'Construo produtos de ponta a ponta — da interface à infraestrutura.',
    en: 'I build products end to end — from the interface to the infrastructure.',
  } satisfies Localized,
  tagline: {
    pt: 'Desenvolvedor full stack em Salvador. Trabalho com Angular e .NET no dia a dia, React e Python em produto, e mantenho dois SaaS multi-tenant meus rodando em produção — com a arquitetura, o deploy e o suporte por minha conta.',
    en: 'Full stack developer based in Salvador, Brazil. Angular and .NET by day, React and Python in product work, and two multi-tenant SaaS products of my own running in production — architecture, deploy and on-call included.',
  } satisfies Localized,
  summary: {
    pt: 'Resolvo problemas com soluções criativas, limpas e escaláveis. Gosto de trabalho que sobrevive ao tempo: código legível, arquitetura que aguenta crescer e decisões que dá para justificar seis meses depois.',
    en: 'I solve problems with clean, creative and scalable solutions. I care about work that survives time: readable code, architecture that can grow, and decisions I can still justify six months later.',
  } satisfies Localized,
  about: [
    {
      pt: 'Comecei em 2023 e desde então passei por freelance, agência e produto. Hoje sou Software Developer na Geoex, atuando no sistema da Neoenergia com Angular e .NET 10, incluindo a camada de dados em SQL Server — procedures, views, jobs e triggers escritos para regra de negócio real, não para exercício.',
      en: 'I started in 2023 and have since worked through freelancing, an agency and product teams. Today I am a Software Developer at Geoex, working on Neoenergia systems with Angular and .NET 10, including the data layer in SQL Server — procedures, views, jobs and triggers written for real business rules, not for practice.',
    },
    {
      pt: 'Antes disso, na Fugro, trabalhei em aplicações web do setor financeiro com React, TypeScript e Python com Django REST Framework, usando inglês diariamente com times internacionais e lidando com decisões de arquitetura para manter os produtos performáticos e seguros.',
      en: 'Before that, at Fugro, I worked on financial-sector web applications with React, TypeScript and Python with Django REST Framework, using English daily with international teams and handling architecture decisions to keep the products fast and secure.',
    },
    {
      pt: 'Em paralelo, construo o Plune e o MyWedding: dois SaaS multi-tenant completos, com motor de execução, mensageria, cobrança, isolamento por tenant e deploy próprio numa VM. É onde eu erro, aprendo e depois levo a lição para o trabalho.',
      en: 'On the side I build Plune and MyWedding: two complete multi-tenant SaaS products, with an execution engine, messaging, billing, tenant isolation and my own deployment on a VM. That is where I get things wrong, learn, and carry the lesson back into client work.',
    },
  ] satisfies Localized[],
  contact: {
    email: 'lucasfelipaaa@gmail.com',
    phone: '+55 71 99206-8238',
    phoneHref: 'tel:+5571992068238',
    whatsapp: 'https://wa.me/5571992068238',
  },
  links: {
    site: 'https://lucascid.com.br',
    github: 'https://github.com/luscacid',
    linkedin: 'https://linkedin.com/in/lucas-cid',
    plune: 'https://plune.app.br',
    mywedding: 'https://mywedding.app.br',
  },
} as const

export interface NavItem {
  href: string
  label: Localized
}

export const navItems: NavItem[] = [
  { href: '#sobre', label: { pt: 'Sobre', en: 'About' } },
  { href: '#stack', label: { pt: 'Stack', en: 'Stack' } },
  { href: '#experiencia', label: { pt: 'Experiência', en: 'Experience' } },
  { href: '#produtos', label: { pt: 'Produtos', en: 'Products' } },
  { href: '#projetos', label: { pt: 'Projetos', en: 'Projects' } },
  { href: '#contato', label: { pt: 'Contato', en: 'Contact' } },
]
