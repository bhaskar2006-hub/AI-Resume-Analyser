# AI Resume Coach

**AI Resume Coach** is a modern, production-ready SaaS application designed to help job seekers land their dream roles using advanced AI. 

Built on a robust Next.js stack, it offers two core premium features powered by Google Gemini AI:

1. **Strict AI Resume Analyzer**: Users can upload their resumes (PDF or TXT) to receive a highly critical assessment. Acting as a senior engineering manager, the AI evaluates ATS compatibility, identifies missing keywords, critiques bullet points, and suggests improvements based on the XYZ impact formula.
2. **AI Mock Interview Generator**: Tailored to specific roles (e.g., Frontend Engineer) and experience levels, the AI generates highly relevant technical deep-dive questions and behavioral scenarios, complete with ideal answers and what interviewers are specifically testing for.

## Tech Stack Breakdown
- **Frontend & Routing**: Next.js 14 (App Router), React, Tailwind CSS, Lucide React Icons.
- **Backend APIs**: Next.js Serverless Route Handlers.
- **Artificial Intelligence**: Google Gemini (via `@google/genai` SDK) using the `gemini-2.5-flash` model.
- **Authentication & Database**: Supabase (PostgreSQL) handling user accounts and tracking free-tier usage limits.
- **Payments & Subscriptions**: Stripe Checkout handling premium "Pro Coach" upgrades for unlimited access.
- **File Parsing**: `pdf2json` for extracting text from uploaded PDFs securely on the server.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
