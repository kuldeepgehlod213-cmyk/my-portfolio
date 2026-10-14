import Section from './Section'
import Card from './Card'
import { CFG, PROJECTS } from '../data'

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
        {PROJECTS.map((p) => (
          <Card as="article" tilt className="pc" key={p.title}>
            <h3>
              {p.title}
              {p.badge && <span className="bd2">{p.badge}</span>}
            </h3>
            {p.tags && <div className="chips">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>}
            <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            {p.links.some(([, k]) => CFG[k]) && (
              <div className="lk">
                {p.links.map(([label, k]) =>
                  CFG[k] ? <a key={k} href={CFG[k]} target="_blank" rel="noopener">{label}</a> : null
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </Section>
  )
}
