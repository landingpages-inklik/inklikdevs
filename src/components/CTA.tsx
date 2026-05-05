import './CTA.css'

interface CTAProps {
  onContactClick: () => void
}

export default function CTA({ onContactClick }: CTAProps) {
  return (
    <section className="cta-section">
      <div className="cta-inner">
        <h2 className="section-heading cta-heading">
          Ready to build something great?
        </h2>
        <p className="body-text cta-description">
          Tell us about your project and we'll get back to you within 24 hours
          with a free consultation.
        </p>
        <button className="btn btn-dark" onClick={onContactClick}>
          Start a Project →
        </button>
      </div>
    </section>
  )
}
