import { wedding as w } from '../data/wedding'

const stamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

export function googleCalendarUrl(event, couple) {
  return `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: 'TEMPLATE',
    text: `${couple} · ${event.title}`,
    dates: `${stamp(event.start)}/${stamp(event.end ?? event.start)}`,
    details: 'Join us at our wedding reception. All event times are India Standard Time (Asia/Kolkata).',
    location: `${event.venue.name}, ${event.venue.address}`,
    ctz: 'Asia/Kolkata',
  }).toString()}`
}

const vevent = (uid, event, couple) =>
  [
    'BEGIN:VEVENT',
    `UID:${uid}@nufaiz-fida-reception`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(event.start)}`,
    `DTEND:${stamp(event.end)}`,
    `SUMMARY:${couple} · ${event.title}`,
    `LOCATION:${event.venue.name}\\, ${event.venue.address}`,
    'END:VEVENT',
  ].join('\r\n')

// Works on every phone, unlike Google's render link for signed-out browsers.
export function downloadIcs(couple) {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Fida & Nufaiz//Wedding Reception//EN',
    'CALSCALE:GREGORIAN',
    vevent('reception', w.wedding, couple),
    'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'fida-nufaiz-reception.ics'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
