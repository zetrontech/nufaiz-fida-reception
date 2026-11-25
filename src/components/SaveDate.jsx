import { useEffect, useState } from 'react'
import { Reveal, Arrow } from './ui'
import { googleCalendarUrl, downloadIcs } from './calendar'
import { wedding as w } from '../data/wedding'

const monthCells = (year, monthIndex) => [
  ...Array(new Date(Date.UTC(year, monthIndex, 1)).getUTCDay()).fill(null),
  ...Array.from({ length: new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate() }, (_, i) => i + 1),
]

export function remaining(target, now = Date.now()) {
  const s = Math.max(0, Math.floor((new Date(target).getTime() - now) / 1000))
  return {
    passed: s === 0,
    days: Math.floor(s / 86400),
    hours: Math.floor(s / 3600) % 24,
    minutes: Math.floor(s / 60) % 60,
    seconds: s % 60,
  }
}

function Countdown() {
  const [t, setT] = useState(() => remaining(w.dates.weddingStart))
  useEffect(() => {
    const tick = () => setT(remaining(w.dates.weddingStart))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])
  if (t.passed)
    return (
      <p className="forever-began">
        Forever began on{' '}
        <time dateTime={w.wedding.date}>
          {w.wedding.day} {w.dates.month} {w.dates.year}
        </time>
      </p>
    )
  return (
    <div className="countdown" role="timer" aria-label="Time until our wedding reception">
      {['days', 'hours', 'minutes', 'seconds'].map((k) => (
        <div key={k}>
          <span>{String(t[k]).padStart(2, '0')}</span>
          <small>{k}</small>
        </div>
      ))}
    </div>
  )
}

export default function SaveDate() {
  const cells = monthCells(w.dates.year, w.dates.monthIndex)
  const couple = `${w.couple.bride.informal} & ${w.couple.groom.informal}`
  const events = [w.wedding]
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return (
    <section className="save-date section-pad" aria-labelledby="calendar-title">
      <Reveal>
        <div className="save-date-intro">
          <h2 id="calendar-title">
            Save the <em>date.</em>
          </h2>
        </div>
        <div className="calendar">
          <h3>
            {w.dates.month} <span>{w.dates.year}</span>
          </h3>
          <div className="calendar-grid" role="grid" aria-label={`${w.dates.month} ${w.dates.year}`}>
            <div className="calendar-row" role="row">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <span key={i} role="columnheader" aria-label={day[i]}>
                  {d}
                </span>
              ))}
            </div>
            {Array.from({ length: Math.ceil(cells.length / 7) }, (_, row) => (
              <div key={row} className="calendar-row" role="row">
                {Array.from({ length: 7 }, (_, col) => {
                  const n = cells[row * 7 + col]
                  const marked = events.filter((e) => e.day === n)
                  return (
                    <div
                      key={col}
                      role="gridcell"
                      className={`${marked.length ? 'marked' : ''} ${n === w.wedding.day ? 'main-date' : ''}`}
                      aria-label={n ? `${n} ${w.dates.month}${marked.length ? ', ' + marked.map((e) => e.title).join(' and ') : ''}` : 'Empty'}
                    >
                      {n && <time dateTime={`${w.dates.year}-${String(w.dates.monthIndex + 1).padStart(2, '0')}-${String(n).padStart(2, '0')}`}>{n}</time>}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <div className="calendar-legend">
            {events.map((e) => (
              <span key={e.title}>
                <b>{e.day}</b> {e.title}
              </span>
            ))}
          </div>
        </div>
        <div className="save-date-countdown">
          <p className="eyebrow counting-label">EVERY SECOND, A LITTLE CLOSER</p>
          <Countdown />
          <a className="action-link" href={googleCalendarUrl(w.wedding, couple)} target="_blank" rel="noopener noreferrer" aria-label="Add the wedding reception to Google Calendar (opens in new tab)">
            Add to Google Calendar <Arrow />
          </a>
          <button type="button" className="action-link ics-link" onClick={() => downloadIcs(couple)}>
            Download calendar file (.ics)
          </button>
        </div>
      </Reveal>
    </section>
  )
}
