import './Security.css'

const items = [
  { icon: '🔐', num: '256-bit', label: 'AES Encryption' },
  { icon: '🛡️', num: 'SOC 2', label: 'Ready Practices' },
  { icon: '🔑', num: 'OAuth 2.0', label: 'Auth Standards' },
  { icon: '📋', num: 'GDPR', label: 'Compliant Builds' },
  { icon: '🔍', num: 'OWASP', label: 'Top 10 Covered' },
  { icon: '⚡', num: '99.9%', label: 'Uptime SLA' },
]

export default function Security() {
  return (
    <section className="sec-section">
      <div className="sec-inner">
        <h2 className="section-heading sec-heading">
          Security<br />by default
        </h2>
        <div className="sec-grid">
          {items.map((item) => (
            <div className="sec-item" key={item.label}>
              <span className="sec-icon">{item.icon}</span>
              <div className="sec-row">
                <span className="num-label sec-num">{item.num}</span>
                <span className="body-text sec-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
