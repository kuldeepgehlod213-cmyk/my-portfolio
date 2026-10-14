import Section from './Section'
import { EDUCATION } from '../data'

export default function Education() {
  return (
    <Section id="edu" title="Education">
      <div className="tl">
        {EDUCATION.map((e) => (
          <div className="ti" key={e.title}>
            <b>{e.title}</b><br />{e.place}<br /><small>{e.when}</small>
          </div>
        ))}
      </div>
    </Section>
  )
}
