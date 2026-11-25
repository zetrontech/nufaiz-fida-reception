import { Floral, Arrow, dmy } from './ui'
import { wedding as w } from '../data/wedding'

export default function Hero({ open }) {
  const couple = `${w.couple.bride.informal} & ${w.couple.groom.informal}`
  return (
    <header className={`hero ${open ? 'is-open' : ''}`} id="invitation">
      <div className="hero-masthead">
        <a href="#invitation" aria-label={`${couple} invitation`} className="small-monogram">
          {w.initials.bride} × {w.initials.groom}
        </a>
        <time className="eyebrow" dateTime={w.wedding.date}>
          {dmy(w.wedding.date)}
        </time>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow line-label">SAVE THE DATE</p>
          <h1>
            {w.couple.bride.informal}
            <span className="with">with</span>
            {w.couple.groom.informal}
          </h1>
          <p className="hero-caption">{w.theme}</p>
          <p className="hero-dates">
            <time dateTime={w.wedding.date}>{dmy(w.wedding.date)}</time>
          </p>
          <a className="text-button scroll-cue" href="#formal">
            Scroll to unfold <Arrow down />
          </a>
        </div>
        <div className="hero-art">
          <div className="hero-arch" />
          <Floral eager className="hero-flower" />
          <span className="vertical-note eyebrow">A NEW CHAPTER, TOGETHER</span>
        </div>
      </div>
    </header>
  )
}
