import { Reveal } from './ui'
import { wedding as w } from '../data/wedding'

function EventCard({ event }) {
  return (
    <div className="event-composition">
      <div className="event-date">
        <time dateTime={event.date}>
          <strong>{event.day}</strong>
          <span className="eyebrow">
            {event.weekday}
            <br />
            {w.dates.month} {w.dates.year}
          </span>
        </time>
      </div>
      <a className="action-link" href={event.venue.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${event.venue.name} on Google Maps (opens in new tab)`}>
        Directions
      </a>
      <ol className="timeline">
        {event.schedule.map((s, i) => (
          <li key={i}>
            <span className="schedule-time">{s.time}</span>
            <h4>{s.title}</h4>
            {s.detail && <p>{s.detail}</p>}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Events() {
  return (
    <section className="events" id="celebrations" aria-labelledby="events-title">
      <Reveal className="events-heading">
        <h2 id="events-title">
          Come for the love.
          <br />
          <em>Stay for the memories.</em>
        </h2>
      </Reveal>
      <div className="events-grid">
        <Reveal className="event-card">
          <EventCard event={w.wedding} />
        </Reveal>
      </div>
    </section>
  )
}
