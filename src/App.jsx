import { useEffect, useRef, useState } from 'react'
import Intro from './components/Intro'
import Hero from './components/Hero'
import Formal from './components/Formal'
import Events from './components/Events'
import SaveDate from './components/SaveDate'
import PromiseSection from './components/PromiseSection'
import Venue from './components/Venue'
import Closing from './components/Closing'
import { useMusic } from './components/ui'

export default function App() {
  const music = useMusic()
  const [open, setOpen] = useState(false)
  const content = useRef(null)

  useEffect(() => {
    if (!open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  const reveal = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setOpen(true)
    window.setTimeout(() => content.current?.focus({ preventScroll: true }), 0)
  }

  return (
    <>
      <audio ref={music.audioRef} src="/music.mp3" loop preload="none" />
      {!open && <Intro onOpen={reveal} onBegin={music.start} />}
      <div ref={content} tabIndex={-1} inert={!open ? '' : undefined} className="invitation-content">
        <a className="skip-link" href="#celebrations">
          Skip to celebration details
        </a>
        {music.started && (
          <button className="music-toggle" type="button" onClick={music.toggle} aria-label={music.playing ? 'Mute music' : 'Play music'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              {music.playing ? (
                <>
                  <path d="M15 8a6 6 0 0 1 0 8" />
                  <path d="M18 5a10 10 0 0 1 0 14" />
                </>
              ) : (
                <path d="m16 9 5 6m0-6-5 6" />
              )}
            </svg>
          </button>
        )}
        <Hero open={open} />
        <main>
          <Formal />
          <Events />
          <SaveDate />
          <PromiseSection />
          <Venue />
          <Closing />
        </main>
      </div>
    </>
  )
}
