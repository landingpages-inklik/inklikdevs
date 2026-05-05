import './WhatWeOffer.css'

const services = [
  { icon: '🤖', title: 'AI Agents & Automation', desc: 'Custom AI agents, LLM integrations, and workflow automation that save hours of manual work every day.' },
  { icon: '🌐', title: 'Full-Stack Web Apps', desc: 'React, Next.js, Node.js — we build fast, scalable web applications from scratch or extend your existing stack.' },
  { icon: '📊', title: 'Data Pipelines', desc: 'ETL pipelines, dashboards, and analytics systems that turn raw data into actionable insights.' },
  { icon: '🔗', title: 'API Development', desc: 'RESTful and GraphQL APIs, third-party integrations, and microservices architecture.' },
  { icon: '☁️', title: 'Cloud & DevOps', desc: 'AWS, GCP, Docker, CI/CD — we set up infrastructure that scales with your business.' },
  { icon: '🔒', title: 'Security & Compliance', desc: 'Secure coding practices, auth systems, and compliance-ready implementations.' },
]

export default function WhatWeOffer() {
  return (
    <section className="wo-section" id="what-we-offer">
      <div className="wo-inner">
        <h2 className="section-heading wo-heading">What We Offer</h2>
        <div className="wo-grid">
          {services.map((s) => (
            <div className="wo-card" key={s.title}>
              <span className="wo-icon">{s.icon}</span>
              <h3 className="wo-card-title">{s.title}</h3>
              <p className="body-text wo-card-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
