import { useEffect, useRef, useState } from 'react'

/** Fires once when the element first enters the viewport. Used for reveals,
 *  so it deliberately stops observing after the first hit. */
export function useInView<T extends HTMLElement>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    // Anything already on screen - or already scrolled past, which happens
    // after an anchor jump or a restored scroll position - is revealed at once.
    // Waiting for the observer there would leave content invisible until the
    // visitor scrolls back down through it.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin, threshold: 0.05 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inView }
}
