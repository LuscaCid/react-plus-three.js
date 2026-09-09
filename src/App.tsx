import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { LocaleProvider } from '@/app/providers/LocaleProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { SplashScreen } from '@/components/splash/SplashScreen'
import { AuroraBackground } from '@/components/ui/AuroraBackground'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SectionSkeleton } from '@/components/ui/Skeleton'
import { HomePage } from '@/pages/HomePage'

// The resume is a separate document with its own print sheet, and most
// visitors never open it - so it is not worth putting in the initial bundle.
const CvPage = lazy(() => import('@/pages/CvPage').then((m) => ({ default: m.CvPage })))

export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LocaleProvider>
          <BrowserRouter>
            <SplashScreen />
            <AuroraBackground />
            <Header />

            <main id="conteudo">
              <Suspense fallback={<SectionSkeleton />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/cv" element={<CvPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />
          </BrowserRouter>
        </LocaleProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
