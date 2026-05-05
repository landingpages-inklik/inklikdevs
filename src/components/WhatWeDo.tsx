import './WhatWeDo.css'

export default function WhatWeDo() {
  return (
    <section className="wwd-section">
      <div className="wwd-inner">
        <div className="wwd-card-wrap">
          <div className="wwd-glass-card">
            <div className="wwd-blueprint-grid" />
            <div className="wwd-visualizer">
              <svg className="wwd-blueprint-svg" viewBox="0 0 300 200">
                {/* Connection lines */}
                <line className="wwd-bp-line" x1="150" y1="40" x2="60" y2="120" />
                <line className="wwd-bp-line" x1="150" y1="40" x2="150" y2="120" />
                <line className="wwd-bp-line" x1="150" y1="40" x2="240" y2="120" />
                {/* Nodes */}
                <circle className="wwd-bp-node" cx="150" cy="40" r="8" />
                <circle className="wwd-bp-node" cx="60" cy="120" r="6" />
                <circle className="wwd-bp-node" cx="150" cy="120" r="6" />
                <circle className="wwd-bp-node" cx="240" cy="120" r="6" />
                {/* Labels */}
                <text className="wwd-bp-label" x="158" y="38">AI CORE</text>
                <text className="wwd-bp-label" x="20" y="140">DATA</text>
                <text className="wwd-bp-label" x="130" y="140">API</text>
                <text className="wwd-bp-label" x="220" y="140">UI</text>
                {/* Animated packet */}
                <circle className="wwd-packet" r="4">
                  <animateMotion dur="2s" repeatCount="indefinite" path="M150,40 L60,120" />
                </circle>
              </svg>
            </div>
            <div className="wwd-status-footer">
              <span className="wwd-status-text">SYSTEM ACTIVE</span>
              <div className="wwd-p-dot" />
            </div>
          </div>
        </div>

        <div className="wwd-content">
          <span className="eyebrow wwd-eyebrow">What We Do</span>
          <h2 className="section-heading wwd-heading">
            We engineer<br />intelligent systems
          </h2>
          <p className="body-text wwd-description">
            From AI agents and automation pipelines to full-stack web apps —
            we turn complex requirements into clean, production-ready software.
            Our team ships fast without cutting corners.
          </p>
          <a href="#what-we-offer" className="btn btn-light">
            See Our Services →
          </a>
        </div>
      </div>
    </section>
  )
}
