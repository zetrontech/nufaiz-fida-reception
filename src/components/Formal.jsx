import { Reveal, Rings } from './ui'
import { wedding as w } from '../data/wedding'

export default function Formal() {
  return (
    <section className="formal section-pad" id="formal" aria-label="With the blessings of our families">
      <div className="formal-bilingual formal-single">
        <Reveal>
          <article className="invitation-letter english-invitation" lang="en">
            <p className="formal-prayer">
              {w.prayer[0]}
              <br />
              {w.prayer[1]}
            </p>
            <p className="formal-invite">{w.invitation}</p>
            <div className="formal-couple">
              {Object.values(w.couple).map((p, i) => (
                <div key={p.formal}>
                  {i === 1 && <Rings />}
                  <h3>{p.formal}</h3>
                  {p.qualification && <p className="qualification">{p.qualification}</p>}
                  <div className="family">
                    {p.family.parents.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                    {p.family.grandparents.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                    {p.family.place && <p>{p.family.place}</p>}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
