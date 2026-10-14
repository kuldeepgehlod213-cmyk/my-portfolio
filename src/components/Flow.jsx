import { Fragment } from 'react'
import Section from './Section'
import Card from './Card'
import { FLOW, FLOW_CHIPS } from '../data'

export default function Flow() {
  return (
    <Section id="flow" title="Awatani: How It's Built">
      <div className="flow">
        {FLOW.map(([title, sub], i) => (
          <Fragment key={title}>
            {i > 0 && <span>→</span>}
            <Card><b>{title}</b><small>{sub}</small></Card>
          </Fragment>
        ))}
      </div>
      <div className="chips" style={{ marginTop: 22 }}>
        {FLOW_CHIPS.map((c) => <span key={c}>{c}</span>)}
      </div>
    </Section>
  )
}
