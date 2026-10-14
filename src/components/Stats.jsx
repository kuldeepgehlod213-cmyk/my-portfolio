import Section from './Section'
import Card from './Card'
import Counter from './Counter'
import { STATS } from '../data'

export default function Stats() {
  return (
    <Section id="stats" style={{ paddingTop: 10 }}>
      <div className="grid st">
        {STATS.map((s) => (
          <Card key={s.label}>
            <Counter n={s.n} d={s.d} />
            {s.label}
          </Card>
        ))}
        <Card>
          <div className="nm">2027</div>
          Expected graduation
        </Card>
      </div>
    </Section>
  )
}
