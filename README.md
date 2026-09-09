# lucascid.com.br

Portfólio pessoal de **Lucas Cid** — software developer em Salvador, BA.

Site de página única, bilíngue (PT-BR / EN), com tema claro e escuro, e duas vitrines
de produto (**Plune** e **MyWedding**) com diagramas de arquitetura interativos
construídos a partir da arquitetura real de cada sistema.

## Stack

| Camada | Ferramenta |
| --- | --- |
| Build | Vite 5 |
| UI | React 18 + TypeScript (strict) |
| Estilo | Tailwind CSS 3 sobre tokens em CSS custom properties |
| Rotas | react-router-dom (`/` e `/cv`) |
| Ícones | `simple-icons` (marcas, como paths) + `lucide-react` (interface) |
| Formulário | EmailJS |

Sem dependência de 3D, animação ou UI kit: os componentes de vidro, o fundo em
gradiente e os diagramas são próprios.

## Rodando

```bash
npm install
npm run dev        # http://localhost:5173
```

Outros scripts:

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint, com --max-warnings 0
npm run build      # typecheck + vite build
npm run preview    # serve dist/
npm run format     # prettier
```

O formulário de contato precisa das variáveis do EmailJS. Copie `.env.example`
para `.env` e preencha:

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Sem elas o site funciona normalmente; apenas o envio do formulário avisa que não
está configurado e sugere o e-mail direto.

## Estrutura

```
src/
  app/providers/          tema e idioma (contexto separado do provider por causa do fast refresh)
  components/
    arch/                 motor de diagramas de arquitetura
    layout/               header, menu mobile, footer, toggles
    splash/               handoff da splash de index.html para o app
    ui/                   GlassCard, AuroraBackground, Chip, Reveal, Screenshot...
  content/                TODO o texto do site, bilíngue e co-localizado
    architectures/        specs do Plune e do MyWedding
  hooks/                  useInView, useMediaQuery, useLockBodyScroll, useAlert
  pages/                  HomePage e CvPage
  sections/               Hero, About, TechStack, Experience, Products, Projects, Contact
  styles/                 tokens.css (cores dos dois temas) e glass.css (material)
```

### Onde mexer

- **Texto, experiências, produtos, projetos** → `src/content/*`. Cada campo é um par
  `{ pt, en }`, guardado junto do dado que descreve, para as duas versões nunca
  se separarem.
- **Cores dos temas** → `src/styles/tokens.css`. Tudo é canal RGB, consumido pelo
  Tailwind via `rgb(var(--x) / <alpha-value>)`, então uma única classe utilitária
  funciona nos dois temas e não existe variante `dark:` em lugar nenhum.
- **Arquiteturas** → `src/content/architectures/*.ts`. Nós e arestas são dados; o
  renderizador posiciona tudo a partir das coordenadas `col`/`row`.
- **Currículo** → nada. A página `/cv` é gerada dos mesmos arquivos de `content/`,
  e o PDF sai da folha `@media print` em `src/index.css` via `window.print()`.

## Splash screen

A marcação da splash vive direto no `index.html`, com CSS crítico inline, e
aparece na **primeira pintura** — antes de qualquer bundle ser baixado. Um script
inline síncrono resolve o tema antes disso, para não haver flash de tema errado.
`src/components/splash/SplashScreen.tsx` só faz o handoff: espera as fontes e o
primeiro frame da aplicação, respeita um tempo mínimo de exibição, e então remove
o nó — com um teto de segurança caso alguma promessa nunca resolva.

## Capturas de tela

Ficam em `public/products/<produto>/` e são referenciadas em `screenshots` no
`src/content/products.ts`, com `width`/`height` reais para o slot reservar a
caixa certa e nada pular quando a imagem carrega. Um slot sem captura mostra um
placeholder na mesma proporção.

Para adicionar novas: jogue os PNG ou JPG na pasta do produto e rode

```bash
npm run screenshots
```

O script gera os `.webp` ao lado (máx. 1600px de largura, qualidade 80) e imprime
o antes e depois — as quatro atuais saíram de 2,6 MB para 213 KB. Apague os
arquivos originais depois, senão eles vão junto no build.

## Pendências

- [ ] Imagem de Open Graph (`public/og-image.png`, 1200×630) e as meta tags
      `og:image` / `twitter:image` correspondentes no `index.html`.

## Deploy

Build estático em `dist/`. `public/_redirects` já traz o fallback de SPA
(`/* /index.html 200`) usado por Netlify e Cloudflare Pages.
