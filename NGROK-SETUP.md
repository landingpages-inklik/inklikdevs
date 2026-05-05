# Ngrok Setup Guide

## Prerequisites
- Node.js installed
- Ngrok installed at `D:\ngrok\ngrok.exe`
- Ngrok auth token configured

## Run Locally + Expose via Ngrok

### Step 1: Start Vite dev server
```bash
npx vite --host
```
Runs on `http://localhost:5173`

### Step 2: Start Ngrok
```bash
D:\ngrok\ngrok.exe http 5173
```
Gives a public URL like `https://xxxx.ngrok-free.dev`

## Vite Config
`allowedHosts: true` is set in `vite.config.ts` to allow ngrok domains.

## Notes
- Free plan gives a random URL each restart
- Ngrok dashboard: http://127.0.0.1:4040
- Both Vite and Ngrok must be running simultaneously
