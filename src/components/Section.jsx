import useReveal from '../hooks/useReveal'
import SplitText from './SplitText'

export default function Section({ id, title, children, style }) {
  const ref = useReveal()
  return (
    <section className="s" id={id} ref={ref} style={style}>
      {title && <SplitText text={title} />}
      {children}
    </section>
  )
}
