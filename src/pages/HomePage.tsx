import { lazy, Suspense } from 'react'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { TechStack } from '@/sections/TechStack'
import { Experience } from '@/sections/Experience'
import { Projects } from '@/sections/Projects'
import { Contact } from '@/sections/Contact'
import { Skeleton } from '@/components/ui/Skeleton'

// The two architecture diagrams are by far the heaviest thing on the page and
// sit well below the fold, so they load on their own chunk.
const Products = lazy(() =>
  import('@/sections/Products').then((m) => ({ default: m.Products })),
)

function ProductsFallback() {
  return (
    <div className="section-shell py-20">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="mt-4 h-4 w-full max-w-2xl" />
      <Skeleton className="mt-10 h-[420px]" />
    </div>
  )
}

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Experience />
      <Suspense fallback={<ProductsFallback />}>
        <Products />
      </Suspense>
      <Projects />
      <Contact />
    </>
  )
}
