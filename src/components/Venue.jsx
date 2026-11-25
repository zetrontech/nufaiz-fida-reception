import { Reveal, Arrow } from './ui'
import { wedding as w } from '../data/wedding'

export default function Venue() {
  const v = w.venue
  const words = v.name.split(' ')
  return (
    <section className="venue venue-night navy section-pad" id="venue" aria-labelledby="venue-title">
      <picture className="venue-backdrop" aria-hidden="true">
        <source media="(max-width: 600px)" srcSet="/images/venue-mobile.webp" />
        <img src="/images/venue.webp" alt="" width="1024" height="1536" loading="lazy" decoding="async" />
      </picture>
      <Reveal>
        <p className="eyebrow section-marker">
          <i>A PLACE FOR OUR FOREVER</i>
        </p>
        <h2 id="venue-title">
          {words.slice(0, -1).join(' ')}
          <br />
          <em>{words.at(-1)}</em>
        </h2>
        <address>{v.address}</address>
        <div className="venue-events">
          {[w.wedding].map((e) => (
            <div className="venue-event" key={e.title}>
              <time className="venue-event-date" dateTime={e.date}>
                <strong>{e.day}</strong>
                <span>DEC</span>
              </time>
              <div className="venue-event-copy">
                <p className="venue-event-label">{e.title}</p>
                <p className="venue-event-time">{e.schedule[0].time}</p>
              </div>
            </div>
          ))}
        </div>
        <a className="action-link" href={v.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${v.name}, ${v.city} on Google Maps (opens in new tab)`}>
          Get directions <Arrow />
        </a>
      </Reveal>
    </section>
  )
}
