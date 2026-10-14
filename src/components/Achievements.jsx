import Section from './Section'
import Card from './Card'
import { ACHIEVEMENTS } from '../data'

export default function Achievements() {
  return (
    <Section id="ach" title="Achievements & Certifications">
      <div className="grid">
        {ACHIEVEMENTS.map(([title, text]) => (
          <Card tilt key={title}><h3>{title}</h3>{text}</Card>
        ))}
      </div>
    </Section>
  )
}
