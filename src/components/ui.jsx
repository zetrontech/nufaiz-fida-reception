import { useEffect, useRef, useState } from 'react'

// One-shot reveal wrapper (the reference's `at`).
export function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.08 },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

export function Arrow({ down = false }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={down ? { transform: 'rotate(90deg)' } : undefined}>
      <path d="M3 12h17m-6-6 6 6-6 6" />
    </svg>
  )
}

export function Rings() {
  return (
    <svg className="rings" aria-hidden="true" width="64" height="40" viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth="1">
      <ellipse cx="24" cy="20" rx="14" ry="14" />
      <ellipse cx="40" cy="20" rx="14" ry="14" />
    </svg>
  )
}

export function Floral({ dark = false, className = '', eager = false }) {
  const name = dark ? 'dark' : 'floral'
  return (
    <img
      className={`floral ${className}`}
      src={`/images/${name}-960.webp`}
      srcSet={`/images/${name}-480.webp 480w, /images/${name}-960.webp 960w`}
      sizes="(max-width: 600px) 90vw, 50vw"
      width="1024"
      height="1536"
      alt=""
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      aria-hidden="true"
    />
  )
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

// Background music: starts on the opener tap, pauses when the tab is hidden.
export function useMusic() {
  const audioRef = useRef(null)
  const wanted = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)

  const play = () => {
    const a = audioRef.current
    if (!a || !wanted.current || document.hidden) return
    a.play()
      .then(() => {
        if (!wanted.current || document.hidden) a.pause()
      })
      .catch(() => setPlaying(false))
  }
  const start = () => {
    wanted.current = true
    setStarted(true)
    play()
  }
  const toggle = () => {
    const a = audioRef.current
    if (wanted.current && a && !a.paused) {
      wanted.current = false
      a.pause()
      setPlaying(false)
    } else {
      wanted.current = true
      play()
    }
  }

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.volume = 0.45
    const onPlay = () => {
      if (document.hidden || !wanted.current) a.pause()
      else setPlaying(true)
    }
    const onPause = () => setPlaying(false)
    const onVisibility = () => (document.hidden ? a.pause() : play())
    const onHide = () => a.pause()
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    a.addEventListener('error', onPause)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', onHide)
    window.addEventListener('pageshow', onVisibility)
    return () => {
      a.pause()
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('error', onPause)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onHide)
      window.removeEventListener('pageshow', onVisibility)
    }
  }, [])

  return { audioRef, playing, started, start, toggle }
}

export const dmy = (iso, sep = '.') => iso.split('-').reverse().join(sep)
