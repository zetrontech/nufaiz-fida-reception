import { Reveal } from './ui'
import { wedding as w } from '../data/wedding'

export default function PromiseSection() {
  return (
    <section className="story promise-section section-pad" id="our-story" aria-labelledby="story-title">
      <Reveal className="promise-layout">
        <div className="promise-heading">
          <h2 id="story-title">
            A lifetime
            <br />
            <em>together.</em>
          </h2>
          <p className="promise-theme">{w.theme}</p>
        </div>
        <div className="promise-verse">
          <div className="promise-rings" aria-hidden="true">
            <span />
            <span />
          </div>
          <span className="promise-quote-mark" aria-hidden="true">“</span>
          <p className="promise-arabic" lang="ar" dir="rtl">{w.verseArabic}</p>
          <blockquote>{w.verse}</blockquote>
        </div>
      </Reveal>
    </section>
  )
}
