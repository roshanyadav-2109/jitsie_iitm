# JITSIE — IIT Madras

The website of the **Jamsetji Tata Society for Innovation and Entrepreneurship** at IIT Madras: the startup directory, the openings board, initiatives, past speakers, events and leadership.

## Stack

| | |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS, shadcn/ui (Radix primitives) |
| Data | Supabase (Postgres, Storage, Edge Functions) |
| Server state | TanStack Query |
| Routing | React Router |
| Tests | Vitest |
| Hosting | Vercel |

Type is Fraunces for headings and long-form, Hanken Grotesk for UI.

## Running locally

Requires Node.js 18+.

```sh
npm install
npm run dev        # http://localhost:8080
```

Other scripts:

```sh
npm run build      # production build to dist/
npm run preview    # serve the build locally
npm run test       # vitest
npm run lint       # eslint
```

## Environment

Copy the keys into a `.env` at the project root:

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon key>
VITE_SUPABASE_PROJECT_ID=<project-ref>
```

Only the anon key belongs here — it ships to the browser. Anything privileged (service role keys, mail credentials) goes in Supabase function secrets, never in this file.

## Structure

```
src/
  pages/          one file per route
  components/     shared UI; components/ui is shadcn
  hooks/          one hook per table, wrapping TanStack Query
  integrations/   Supabase client and generated types
  lib/            types and small helpers
supabase/
  migrations/     schema and content changes, applied in filename order
  functions/      edge functions
```

Pages read through the hooks in `src/hooks`; each one owns a single query and returns typed rows from `src/lib/types.ts`.

## Content

Almost everything on the site is data, not markup — startups, openings, gallery images, speakers, partners, initiatives and events all come from Supabase. Editing content means writing a migration, not changing a component.

Images live in the `public-assets` Storage bucket rather than being hotlinked from Drive, LinkedIn or a CDN, so nothing breaks when a share link expires.

## Database

Migrations are plain SQL, named `<timestamp>_<what_it_does>.sql`, applied in order. Add a new file rather than editing an old one — the applied ones are already in production.

Row-level security is on for every table: public read, admin write. Two exceptions worth knowing:

- `opening_requests` accepts an insert from anyone, so a founder can submit a hiring request without an account. A `CHECK` constraint requires the contact address to be an `iitm.ac.in` one (sub-domains included).
- `image_gallery`, `companies` and the rest are read-only to the public.

## Hiring requests

A startup posts a role at `/post-opening`. The request is written to `opening_requests` first, then the `notify-opening-request` edge function emails it to the JITSIE inbox. Saving before sending means a delivery failure never loses a submission.

The function needs `RESEND_API_KEY` in the project's function secrets. Without it the form still records requests; only the email is skipped.

## Deploying

Vercel builds on push to `main`. `vercel.json` rewrites all routes to `index.html` for client-side routing.

Database changes are applied separately from the code deploy — a migration takes effect as soon as it runs against the project, whether or not the site has been rebuilt.
