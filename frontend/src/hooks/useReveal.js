import { useEffect, useRef } from 'react'

/**
 * Attach to a section container.
 * Any child with class sr / sr-left / sr-right / sr-scale
 * gets class "visible" when it enters the viewport.
 *
 * Pass a dependency value (e.g. data length) to re-observe
 * when async content renders after the initial mount.
 */
export default function useReveal(dep) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    // Small delay so async-rendered children are in the DOM
    const timer = setTimeout(() => {
      const els = root.querySelectorAll('.sr, .sr-left, .sr-right, .sr-scale')
      if (!els.length) return

      const io = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('visible')
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.06, rootMargin: '0px 0px -16px 0px' }
      )

      els.forEach(el => {
        // If already in viewport (e.g. section is visible on load), reveal immediately
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible')
        } else {
          io.observe(el)
        }
      })

      return () => io.disconnect()
    }, 50)

    return () => clearTimeout(timer)
  // Re-run when dep changes (e.g. when API data arrives and grid renders)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep])

  return ref
}
