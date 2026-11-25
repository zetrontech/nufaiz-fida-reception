import { Reveal, Floral } from './ui'
import Credit from './Credit'
import { wedding as w } from '../data/wedding'

export default function Closing() {
  const { bride, groom } = w.couple
  return (
    <>
      <section className="thank-you navy section-pad" aria-labelledby="thank-you-title">
        <Floral dark className="ending-flower" />
        <Reveal>
          <p className="eyebrow">WITH LOVE</p>
          <h2 id="thank-you-title">
            {bride.informal}
            <span>&amp;</span>
            {groom.informal}
          </h2>
          <p className="thank-copy">
            Thank you for being part
            <br />
            of a chapter we'll remember forever.
          </p>
        </Reveal>
      </section>
      <footer className="footer navy">
        <Credit />
      </footer>
    </>
  )
}
