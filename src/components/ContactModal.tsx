import { useEffect, useRef, useState } from 'react'
import './ContactModal.css'

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwsIK7Zit3S-q-zFKveGpMO2LdLXWVp5s_GuiynqtqvGGxWJcG_kpgZD3UYoJ1j-5o2Nw/exec'
const WEBHOOK_SITE_URL = 'https://webhook.site/5881d9d3-2381-49e6-9662-2e1102f5cf55'

declare global {
  interface Window {
    turnstileToken?: string
    onTurnstileSuccess?: (token: string) => void
    onTurnstileExpired?: () => void
  }
}

interface ContactModalProps {
  onClose: () => void
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const [status, setStatus] = useState<{ msg: string; type: 'success' | 'error' | '' }>({ msg: '', type: '' })
  const [sending, setSending] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Set up Turnstile callbacks
  useEffect(() => {
    window.turnstileToken = ''
    window.onTurnstileSuccess = (token: string) => { window.turnstileToken = token }
    window.onTurnstileExpired = () => { window.turnstileToken = '' }

    // Capture UTM params
    const params = new URLSearchParams(window.location.search)
    ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach(key => {
      const el = document.getElementById(`cm-${key}`) as HTMLInputElement | null
      if (el) el.value = params.get(key) || ''
    })

    // Close on Escape
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formRef.current) return

    // Honeypot check
    const hp = formRef.current.querySelector<HTMLInputElement>('input[name="website"]')
    if (hp?.value) {
      setStatus({ msg: 'Thank you! We will get back to you soon.', type: 'success' })
      return
    }

    if (!window.turnstileToken) {
      setStatus({ msg: 'Please complete the security check.', type: 'error' })
      return
    }

    setSending(true)
    setStatus({ msg: '', type: '' })

    const data: Record<string, string> = {}
    new FormData(formRef.current).forEach((val, key) => {
      if (key !== 'website') data[key] = val as string
    })
    data['cf-turnstile-response'] = window.turnstileToken || ''
    data.lead_timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ')

    await Promise.all([
      sendToGoogleSheet(data),
      sendToWebhookSite(data),
    ])

    setStatus({ msg: 'Thank you! We will get back to you soon.', type: 'success' })
    formRef.current.reset()
    window.turnstileToken = ''
    setSending(false)
  }

  async function sendToGoogleSheet(payload: Record<string, string>) {
    try {
      const params = new URLSearchParams()
      params.append('form_name', 'InklikDevs Contact')
      Object.entries(payload).forEach(([k, v]) => params.append(k, v))
      await fetch(GOOGLE_SHEET_URL, { method: 'POST', body: params, mode: 'no-cors' })
    } catch (err) { console.log('Google Sheet error:', err) }
  }

  async function sendToWebhookSite(payload: Record<string, string>) {
    try {
      await fetch(WEBHOOK_SITE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      })
    } catch (err) { console.log('Webhook.site error:', err) }
  }

  return (
    <div
      className="cm-overlay"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Contact form"
    >
      <div className="cm-modal">
        <button className="cm-close" onClick={onClose} aria-label="Close">×</button>
        <h2 className="cm-heading">Get in Touch</h2>

        <form className="cm-form" id="inklik-contact-form" ref={formRef} onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Full Name *" required />
          <input
            name="phone" type="tel" placeholder="Phone Number *"
            pattern="[0-9]{10}" maxLength={10}
            onInput={(e) => {
              const t = e.currentTarget
              t.value = t.value.replace(/[^0-9]/g, '')
            }}
            required
          />
          <input name="email" type="email" placeholder="Email Address *" required />
          <input name="city" type="text" placeholder="City, Country" />
          <textarea name="message" placeholder="Tell us about your project..." />

          {/* Hidden UTM fields */}
          {['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'].map(k => (
            <input key={k} id={`cm-${k}`} name={k} type="hidden" />
          ))}

          {/* Honeypot */}
          <input
            type="text" name="website"
            style={{ position: 'absolute', left: '-9999px' }}
            tabIndex={-1} autoComplete="off" aria-hidden="true"
          />

          {/* Cloudflare Turnstile */}
          <div
            className="cf-turnstile"
            data-sitekey="xxxxxxxx"
            data-callback="onTurnstileSuccess"
            data-expired-callback="onTurnstileExpired"
            style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}
          />

          <button type="submit" className="btn btn-dark cm-submit" disabled={sending}>
            {sending ? 'SENDING...' : 'SEND MESSAGE'}
          </button>

          {status.msg && (
            <p className={`cm-status ${status.type}`}>{status.msg}</p>
          )}
        </form>
      </div>
    </div>
  )
}
