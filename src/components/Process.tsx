import './Process.css'

const steps = [
  { num: '01', title: 'Discovery Call', desc: 'We start with a free 30-minute call to understand your goals, constraints, and timeline.' },
  { num: '02', title: 'Proposal & Scope', desc: 'You get a clear proposal with deliverables, timeline, and fixed pricing — no surprises.' },
  { num: '03', title: 'Build & Iterate', desc: 'We build in sprints with regular demos. You see progress every week and can give feedback.' },
  { num: '04', title: 'Ship & Support', desc: 'We deploy to production and provide 30 days of post-launch support included.' },
]

export default function Process() {
  return (
    <section className="sup-section" id="process">
      <div className="sup-inner">
        <div className="sup-left">
          <span className="eyebrow sup-eyebrow">Our Process</span>
          <h2 className="section-heading sup-heading">
            How we<br />work with you
          </h2>
          <p className="body-text sup-description">
            A straightforward process designed to keep you informed and in control
            at every stage of the project.
          </p>
        </div>
        <div className="sup-timeline">
          {steps.map((step) => (
            <div className="sup-step" key={step.num}>
              <div className="sup-step-marker">
                <span className="sup-step-num">{step.num}</span>
              </div>
              <div>
                <h3 className="sup-step-title">{step.title}</h3>
                <p className="body-text sup-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
