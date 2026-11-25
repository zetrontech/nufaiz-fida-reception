import { useEffect, useRef, useState } from 'react'
import { Arrow, Floral, usePrefersReducedMotion, dmy } from './ui'
import { wedding as w } from '../data/wedding'

export default function Intro({ onOpen, onBegin }) {
  const [opening, setOpening] = useState(false)
  const reduced = usePrefersReducedMotion()
  const timer = useRef()
  const button = useRef(null)

  useEffect(() => {
    button.current?.focus()
    return () => window.clearTimeout(timer.current)
  }, [])

  const open = (instant = false) => {
    if (opening) return
    onBegin()
    setOpening(true)
    timer.current = window.setTimeout(onOpen, instant || reduced ? 0 : 1500)
  }

  return (
    <div
      className={`intro ${opening ? 'is-opening' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Your wedding invitation"
      onKeyDown={(e) => {
        if (e.key === 'Escape') open(true)
        if (e.key === 'Tab') {
          e.preventDefault()
          const buttons = e.currentTarget.querySelectorAll('button')
          const i = Array.from(buttons).indexOf(document.activeElement)
          buttons[(i + 1) % buttons.length].focus()
        }
      }}
    >
      <Floral dark className="intro-flower" eager />
      <span className="eyebrow intro-top">A LITTLE INVITATION. A LIFETIME OF LOVE.</span>
      <div className="envelope">
        <div className="envelope-back" />
        <div className="invitation-paper">
          <p className="eyebrow">WEDDING RECEPTION</p>
          <div className="monogram">
            {w.initials.bride}
            <span>×</span>
            {w.initials.groom}
          </div>
          <div className="paper-rule" />
          <p className="opener-names">
            {w.openerNames[0]}
            <i>&amp;</i>
            {w.openerNames[1]}
          </p>
          <time dateTime={w.wedding.date} className="eyebrow">
            {dmy(w.wedding.date, ' · ')}
          </time>
          <button ref={button} className="open-tab" onClick={() => open()}>
            Open invitation <Arrow />
          </button>
        </div>
        <div className="envelope-front" />
      </div>
    </div>
  )
}
