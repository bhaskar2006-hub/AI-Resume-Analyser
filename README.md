# AI Resume Coach

AI Resume Coach is a modern, production-ready SaaS application designed to help job seekers land their dream roles using advanced AI.

![AI Resume Coach](https://github.com/user-attachments/assets/48c31b17-f3f2-46bf-a73c-4b7f9e9243aa)

## Features

- **AI Resume Analyzer** — Upload a PDF or TXT resume and receive a brutally honest, critical assessment from an AI that thinks like a senior engineering manager. Covers ATS compatibility, missing keywords, bullet point rewrites using the XYZ impact formula, and a prioritised fix list.
- **AI Mock Interview Generator** — Enter a target job role and experience level to generate highly relevant technical deep-dive questions and behavioral scenarios, complete with ideal answers and what interviewers are testing for.
- **Free Tier** — 3 resume analyses and 3 interview generations at no cost.
- **Pro Coach** — Unlimited analyses and generations via a Stripe-powered subscription ($29/month).

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend & Routing | Next.js 14 (App Router), React, Tailwind CSS, Lucide React |
| Backend APIs | Next.js Serverless Route Handlers |
| AI | Google Gemini 2.5 Flash (`@google/genai`) |
| Auth & Database | Supabase (PostgreSQL) |
| Payments | Stripe Checkout |
| File Parsing | `pdf2json` (server-side) |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `GEMINI_API_KEY` | Google Gemini API key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRO_PRICE_ID` | Stripe Price ID for the Pro Coach plan |
| `NEXT_PUBLIC_APP_URL` | Public URL of your deployment |

### 3. Set up Supabase

Run the migration in `supabase/migrations/001_initial.sql` in your Supabase SQL editor. This creates the `profiles` table with usage tracking columns and an auto-create trigger for new users.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/
  page.tsx                     # Landing page
  auth/login/page.tsx          # Login / sign-up
  auth/callback/route.ts       # Supabase OAuth callback
  dashboard/page.tsx           # User dashboard with usage stats
  resume-analyzer/page.tsx     # Resume upload & analysis
  interview-generator/page.tsx # Interview question generator
  pricing/page.tsx             # Pricing page
  api/
    analyze-resume/route.ts    # Gemini resume analysis endpoint
    generate-interview/route.ts# Gemini interview generation endpoint
    create-checkout/route.ts   # Stripe checkout session
    stripe-webhook/route.ts    # Stripe subscription webhooks
components/
  Header.tsx
  Footer.tsx
  AnalysisResults.tsx
  InterviewResults.tsx
lib/
  supabase/client.ts           # Browser Supabase client
  supabase/server.ts           # Server Supabase client
  gemini.ts                    # Gemini AI helpers
  stripe.ts                    # Stripe client
middleware.ts                  # Auth-protected route middleware
supabase/migrations/001_initial.sql
```

## Deployment

Deploy to [Vercel](https://vercel.com). Set all environment variables in the Vercel project settings, and configure your Stripe webhook endpoint to `https://<your-domain>/api/stripe-webhook`.
