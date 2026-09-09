import { useEffect } from 'react'

const MIN_VISIBLE_MS = 450
const SAFETY_CAP_MS = 6000
const FADE_MS = 450

/** Hands the visitor off from the pre-JS splash in index.html to the app.
 *  Renders nothing: it only drives the #splash node that already exists in the
 *  document, which is the whole point - that markup paints before this bundle
 *  has even been parsed. */
export function SplashScreen() {
  useEffect(() => {
    const node = document.getElementById('splash')
    if (!node) return

    let done = false
    const startedAt = performance.now()
    const timers: number[] = []

    const remove = () => node.remove()

    const dismiss = () => {
      if (done) return
      done = true

      const elapsed = performance.now() - startedAt
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed)

      timers.push(
        window.setTimeout(() => {
          node.dataset.hidden = 'true'
          node.addEventListener('transitionend', remove, { once: true })
          // transitionend never fires under reduced motion or if the node is
          // display:none'd by something else, so keep a fallback.
          timers.push(window.setTimeout(remove, FADE_MS + 250))
        }, wait),
      )
    }

    // Ready = fonts settled AND the app has actually painted a frame.
    // requestAnimationFrame never fires while the tab sits in the background,
    // so it races a timer: otherwise opening the site in a background tab
    // leaves the splash up until the safety cap fires.
    const painted = new Promise<void>((resolve) => {
      const fallback = window.setTimeout(resolve, 800)
      timers.push(fallback)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          window.clearTimeout(fallback)
          resolve()
        }),
      )
    })
    const fonts = document.fonts?.ready ?? Promise.resolve()

    void Promise.all([painted, fonts]).then(dismiss)

    // If a promise never settles, do not strand the visitor behind the splash.
    timers.push(window.setTimeout(dismiss, SAFETY_CAP_MS))

    return () => timers.forEach(window.clearTimeout)
  }, [])

  return null
}
