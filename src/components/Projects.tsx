import './Projects.css'

const projects = [
  { label: 'AI Lead Scoring Engine' },
  { label: 'E-commerce Recommendation System' },
  { label: 'Automated Invoice Processing' },
  { label: 'Real-time Analytics Dashboard' },
  { label: 'Multi-tenant SaaS Platform' },
  { label: 'LLM-powered Customer Support Bot' },
  { label: 'Computer Vision QA System' },
  { label: 'Crypto Trading Algorithm' },
]

export default function Projects() {
  return (
    <section className="pj-section" id="projects">
      <div className="pj-inner">
        <h2 className="section-heading pj-heading">Past Projects</h2>
        <div className="pj-divider" />
        <div className="pj-grid">
          {projects.map((p, i) => (
            <div className="pj-item" key={p.label}>
              <span className="num-label">{String(i + 1).padStart(2, '0')}</span>
              <span className="pj-label">{p.label}</span>
            </div>
          ))}
        </div>
        <p className="pj-more">+ many more under NDA</p>
      </div>
    </section>
  )
}
