# Photography Portfolio (client preview)

Static React + Vite + Tailwind site. No backend.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
```

- **All text, contacts, albums, films, testimonials:** `src/content/site.ts`
- **Placeholders** (`Photo 1`, `Video 1`): `src/components/Placeholder.tsx` — swap for real `<img>/<video>` once storage (Cloudflare R2) is approved.
- **Enquiry form:** set `VITE_WEB3FORMS_KEY` in `.env` to receive emails; without it the form sends the enquiry via WhatsApp.
- **Deploy:** push to GitHub → import on Vercel (SPA rewrites in `vercel.json`).
