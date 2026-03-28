# Deployment Instructions for Vercel

This project is a React + Vite application using Supabase for the backend and Resend for emails. It is fully production-ready and can be deployed to Vercel in a few simple steps.

## Prerequisites

1. **Supabase Account**: Create a project on [Supabase](https://supabase.com/).
2. **Resend Account**: Create an account on [Resend](https://resend.com/) and get an API key.
3. **Vercel Account**: Create an account on [Vercel](https://vercel.com/).

## 1. Database Setup (Supabase)

1. Go to your Supabase project dashboard.
2. Open the **SQL Editor**.
3. Copy the contents of `supabase-setup.sql` and run it.
4. Go to **Project Settings > API** and copy your `Project URL` and `anon public` key.

## 2. Environment Variables

You will need to set the following environment variables in Vercel:

- `VITE_SUPABASE_URL`: Your Supabase Project URL.
- `VITE_SUPABASE_ANON_KEY`: Your Supabase `anon public` key.
- `GEMINI_API_KEY`: Your Google Gemini API key.
- `RESEND_API_KEY`: Your Resend API key.
- `RESEND_FROM_EMAIL`: The email address you'll be sending from (must be verified in Resend).

## 3. Deployment Options

### Option A: Vercel Dashboard (Recommended)

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Import the project into Vercel.
3. Vercel will automatically detect Vite.
4. Add the environment variables listed above in the **Environment Variables** section of the project settings.
5. Click **Deploy**.

### Option B: Vercel CLI

1. Install the Vercel CLI: `npm i -g vercel`.
2. Run `vercel login`.
3. Run `vercel` in the root of your project.
4. Follow the prompts to link your project.
5. Add environment variables using the Vercel dashboard or CLI: `vercel env add VITE_SUPABASE_URL`.
6. Deploy to production: `vercel --prod`.

## 4. Verification

Once deployed, visit your Vercel URL.
- If environment variables are missing, the app will run in **Demo Mode** with sample data.
- If configured correctly, the app will connect to your Supabase database and send real emails via Resend.
