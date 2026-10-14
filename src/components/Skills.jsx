import Section from './Section'
import Card from './Card'
import { SKILLS } from '../data'

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid">
        {SKILLS.map(([title, items]) => (
          <Card tilt key={title}>
            <h3>{title}</h3>
            <div className="chips">{items.map((s) => <span key={s}>{s}</span>)}</div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
