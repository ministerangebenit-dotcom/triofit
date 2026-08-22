# Triofit

Bilingual (FR/EN) AI stylist PWA. React + Vite, Tailwind CSS, Framer Motion, Axios, Supabase (optional realtime).

## Setup

```bash
npm install
npm run dev
```

## Environment variables

Create a `.env` file (not included) with:

```
VITE_API_BASE_URL=https://your-backend.example.com/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Until these are set, the app runs fully in the UI with graceful fallbacks — API calls will
fail silently and show placeholder states (e.g. "connect the backend to see live
recommendations").

## What's included

- Full onboarding flow: Landing → Goal → Name → Conversation
- Perception analysis flow: situation intake → AI extraction/confirm → processing animation →
  analysis reveal → refine questions or quick advice → outfit recommendations → free chat
- Side menu: About, Register Store, YourFits gallery, Wardrobe Analysis, Body Measurements,
  Memorial page
- Shareable perception result card (html2canvas + Web Share API)
- Google Maps links on every outfit recommendation
- Dark/light theme toggle, FR/EN language toggle (both persisted to localStorage)
- WhatsApp-style tiled SVG chat background, gender-responsive variant support

## What's NOT included (you said you'd handle later)

- Backend implementation for the endpoints listed in `src/lib/api.js`
- SQL schemas / Supabase table setup
- Any LLM/Groq API wiring
- Deployment configuration

## New endpoints expected by the frontend

- `POST /api/wardrobe` — multipart image upload, expects `{ items: string[] }`
- `POST /api/measurements` — multipart image upload, expects
  `{ chest, waist, hip, inseam, shoeSize, shoulderWidth, ...Confidence fields }`

## Notes

- The Memorial page has placeholder text (`[Name]`, dates, tribute) — replace with the actual
  content, and swap the placeholder icon for a real photo.
- `ChatBackground` supports `variant="neutral" | "feminine" | "masculine"` — wire this to
  whatever gender-responsive signal you use elsewhere in the app.
