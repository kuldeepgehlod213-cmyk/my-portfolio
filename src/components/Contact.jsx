import Section from './Section'
import Card from './Card'
import Btn from './Btn'
import { CFG } from '../data'

export default function Contact() {
  const download = (e) => {
    e.preventDefault()
    if (CFG.resumeUrl) window.open(CFG.resumeUrl, '_blank')
    else window.print()
  }
  return (
    <Section id="contact" title="Contact">
      <Card style={{ maxWidth: 560 }}>
        <p style={{ marginTop: 0 }}>Open to Software Development roles (Backend, Full Stack).</p>
        <p>
          ✉ <a href={`mailto:${CFG.email}`}>{CFG.email}</a><br />
          ☎ <a href={`tel:${CFG.phone.replace(/[^+\d]/g, '')}`}>{CFG.phone}</a>
        </p>
        <div className="cta" style={{ marginTop: 14 }}>
          <Btn ghost optional external href={CFG.linkedin}>LinkedIn</Btn>
          <Btn ghost optional external href={CFG.github}>GitHub</Btn>
          <Btn ghost optional external href={CFG.leetcode}>LeetCode</Btn>
          <Btn id="dl" onClick={download}>Download Resume</Btn>
        </div>
      </Card>
    </Section>
  )
}
