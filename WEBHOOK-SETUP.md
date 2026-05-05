# Webhook Setup — InklikDevs

## All Webhook URLs

| # | Name | URL | Type |
|---|------|-----|------|
| 1 | Google Sheet | `https://script.google.com/macros/s/AKfycbwsIK7Zit3S-q-zFKveGpMO2LdLXWVp5s_GuiynqtqvGGxWJcG_kpgZD3UYoJ1j-5o2Nw/exec` | Apps Script |
| 2 | Integrately | `https://webhooks.integrately.com/a/webhooks/03806157e6c74027893f90766fcb5023` | Production |
| 3 | Webhook.site | `https://webhook.site/fbf54570-cedb-4704-954a-f6fdfe9911bd` | Testing |

## Forms Using These Webhooks

| Form | File | Form ID | Webhooks Used |
|------|------|---------|---------------|
| Contact Modal (React) | `src/components/ContactModal.tsx` | `inklik-contact-form` | Google Sheet + Webhook.site |
| Contact Page (Static) | `contact.html` | `contact-form` | All 3 (Sheet + Integrately + Webhook.site) |

## Form Fields

| Field ID | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| `name` | `name` | text | Yes | Full Name |
| `phone` | `phone` | tel | Yes | Phone (10-digit, numbers only) |
| `email` | `email` | email | Yes | Email Address |
| `city` | `city` | text | No | City, Country |
| `message` | `message` | textarea | No | Project Description |

## Hidden UTM / Tracking Fields (auto-captured from URL)

| Field ID | Name | Description |
|----------|------|-------------|
| `utm_source` | `utm_source` | Traffic source (google, fb) |
| `utm_medium` | `utm_medium` | Medium (cpc, email, social) |
| `utm_campaign` | `utm_campaign` | Campaign name |
| `utm_term` | `utm_term` | Paid keyword |
| `utm_content` | `utm_content` | Ad variation |
| `gclid` | `gclid` | Google Ads click ID |

## Auto-Generated Fields

| Name | Description |
|------|-------------|
| `lead_timestamp` | Submission time (YYYY-MM-DD HH:MM:SS) |
| `form_name` | Sheet name identifier (only for Google Sheet) |

---

## Webhook 1: Google Sheet (Apps Script)

- Script source: [Google Apps Script (Gist)](https://gist.githubusercontent.com/bainternet/4b539b00a4bd7490ac3809d7ff86bd14/raw/a82e97ee89d5523249b73f36723e51ec133293c9/script.gs)
- Script type: Elementor-style `doPost` using `e.parameter`
- Requires `form_name` field to name the sheet tab
- Data format: `application/x-www-form-urlencoded` (URLSearchParams)
- CORS: Not supported — use `mode: 'no-cors'`

### Code Example
```javascript
async function sendToGoogleSheet(payload) {
  var params = new URLSearchParams();
  params.append('form_name', 'InklikDevs Contact');
  Object.keys(payload).forEach(function (key) { params.append(key, payload[key]); });
  await fetch(GOOGLE_SHEET_URL, {
    method: 'POST',
    body: params,
    mode: 'no-cors',
  });
}
```

### Terminal Test
```powershell
$body = "form_name=InklikDevs+Contact&name=Test&phone=9876543210&email=test@test.com&city=Delhi&message=hello"
Invoke-WebRequest -Uri "https://script.google.com/macros/s/AKfycbwsIK7Zit3S-q-zFKveGpMO2LdLXWVp5s_GuiynqtqvGGxWJcG_kpgZD3UYoJ1j-5o2Nw/exec" -Method POST -Body $body -ContentType "application/x-www-form-urlencoded" -UseBasicParsing
```

---

## Webhook 2: Integrately (Production)

- Data format: `application/json`
- CORS: Supported — works from deployed domains
- Note: From `localhost`, CORS preflight may block it. Use `text/plain` + `no-cors` for local testing, or test via terminal.

### Code Example
```javascript
async function sendToIntegrately(payload) {
  await fetch(INTEGRATELY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
```

### Localhost Workaround (if CORS blocks)
```javascript
await fetch(INTEGRATELY_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain' },
  body: JSON.stringify(payload),
  mode: 'no-cors',
});
```

### Terminal Test
```powershell
$body = '{"name":"Test","phone":"9876543210","email":"test@test.com","lead_timestamp":"2026-02-26 14:30:00"}'
Invoke-RestMethod -Uri "https://webhooks.integrately.com/a/webhooks/03806157e6c74027893f90766fcb5023" -Method POST -ContentType "application/json" -Body $body
```

---

## Webhook 3: Webhook.site (Testing)

- Data format: `text/plain` (to avoid CORS preflight)
- CORS: Not supported — always use `mode: 'no-cors'`
- Purpose: Quick testing only, URL changes on free plan

### Code Example
```javascript
async function sendToWebhookSite(payload) {
  await fetch(WEBHOOK_SITE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
    mode: 'no-cors',
  });
}
```

### Terminal Test
```powershell
Invoke-RestMethod -Uri "https://webhook.site/fbf54570-cedb-4704-954a-f6fdfe9911bd" -Method POST -ContentType "application/json" -Body '{"name":"Test","phone":"9876543210"}'
```

---

## JSON Payload Example (sent to Integrately & Webhook.site)
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "city": "New Delhi, India",
  "message": "Looking for AI developers for our CRM project.",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "ai-devs-2026",
  "utm_term": "hire ai developers",
  "utm_content": "",
  "gclid": "abc123xyz",
  "lead_timestamp": "2026-02-26 14:30:00"
}
```

## Quick Reference: CORS Behavior

| Webhook | Content-Type | mode | CORS | Works from localhost | Works from deployed |
|---------|-------------|------|------|---------------------|-------------------|
| Google Sheet | `x-www-form-urlencoded` | `no-cors` | No | ✅ | ✅ |
| Integrately | `application/json` | (none) | Yes | ❌ (preflight blocked) | ✅ |
| Integrately | `text/plain` | `no-cors` | No | ✅ | ✅ |
| Webhook.site | `text/plain` | `no-cors` | No | ✅ | ✅ |

---

## Anti-Spam Protection

### Cloudflare Turnstile
- Site Key: `xxxxxxxx` (set in both `ContactModal.tsx` and `contact.html`)
- Secret Key: `xxxxxxxx` (used in Google Apps Script for server-side verification)
- Turnstile script loaded in `index.html` and `contact.html` via `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>`
- Widget renders a challenge; form submit is blocked until the user passes it
- Token is sent as `cf-turnstile-response` in the payload
- Server-side: Apps Script calls `https://challenges.cloudflare.com/turnstile/v0/siteverify` with the secret key to verify the token. If verification fails, the submission is rejected (data not saved, email not sent). If the Cloudflare API itself is unreachable, it fails open (allows submission) so you don't lose leads.
- The `cf-turnstile-response` field is stripped from the data before saving to the sheet
- Manage keys at: https://dash.cloudflare.com/turnstile

### Honeypot Field
- Hidden `<input name="website">` positioned off-screen (`left: -9999px`)
- Invisible to humans, but bots auto-fill it
- If filled → form silently "succeeds" without sending any data to webhooks
- No server-side check needed — purely client-side trap

---

## Flow
1. User fills form → completes Turnstile challenge → clicks SUBMIT
2. Honeypot check — if filled, fake success (bot detected)
3. Turnstile check — if no token, show error
4. UTM params + timestamp auto-added to payload
5. Data sent to all configured webhooks in parallel
6. Success message shown → form resets
