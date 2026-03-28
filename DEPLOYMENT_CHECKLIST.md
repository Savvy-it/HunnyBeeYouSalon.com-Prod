# Deployment Checklist for Hunny, bee you! Salon Web

## Pre-Deployment Verification

### Code & Dependencies
- [x] All source files in `/src` directory
- [x] Package.json with all required dependencies
- [x] TypeScript configuration valid
- [x] Vite configuration set up
- [x] Tailwind CSS v4 configured
- [x] Environment variables template created (`.env.local`)

### Configuration Files
- [x] `vite.config.ts` - Vite bundler config
- [x] `tsconfig.json` - TypeScript config
- [x] `vercel.json` - Vercel deployment config
- [x] `tailwind.config.ts` - Tailwind styling config (if exists)
- [x] `index.html` - HTML entry point
- [x] `.gitignore` - Git ignore rules

### Build & Testing
- [ ] Run `npm install` to verify dependencies resolve
- [ ] Run `npm run lint` to verify TypeScript compiles
- [ ] Run `npm run build` to verify production build
- [ ] Run `npm run dev` to verify local development works
- [ ] Test in browser at http://localhost:3000

### Environment Setup

#### Local Development
```bash
# Create .env.local with your API keys
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```

#### Vercel Production
In Vercel Project Settings → Environment Variables, add:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `GEMINI_API_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

### Database Setup (if using Supabase)
- [ ] Create Supabase project
- [ ] Get Project URL and Anon Key
- [ ] Run `supabase-setup.sql` in Supabase SQL editor
- [ ] Verify tables created: appointments, services, gallery, events, business_hours
- [ ] Enable Row Level Security (RLS) policies if needed

### API Keys & Services

#### Google Gemini
- [ ] Create Google AI account
- [ ] Generate API key for Gemini 2.0
- [ ] Add to environment as `GEMINI_API_KEY`

#### Resend (Email)
- [ ] Sign up for Resend account
- [ ] Create API key
- [ ] Verify domain (optional but recommended)
- [ ] Add to environment as `RESEND_API_KEY`

#### Supabase (Database)
- [ ] Create Supabase project
- [ ] Get URL and Anon Key
- [ ] Configure CORS if needed
- [ ] Add to environment variables

### Deployment Steps

#### Deploy to Vercel
```bash
# Method 1: Via Vercel CLI
vercel

# Method 2: Connect GitHub repository
# 1. Push code to GitHub
# 2. Go to vercel.com/new
# 3. Select "Import Git Repository"
# 4. Choose your repository
# 5. Set environment variables
# 6. Deploy
```

#### Production URL Setup
- [ ] Set custom domain in Vercel
- [ ] Configure DNS settings
- [ ] Set up SSL certificate (automatic with Vercel)
- [ ] Update OAuth redirect URIs if using auth

### Post-Deployment Verification
- [ ] Website loads at production URL
- [ ] No console errors in browser DevTools
- [ ] Calendar loads and displays
- [ ] Services list displays
- [ ] Gallery images load
- [ ] Responsive design works on mobile
- [ ] All navigation links work
- [ ] Try booking flow (if public)

### Performance & Security
- [ ] Run Lighthouse audit in Chrome DevTools
- [ ] Check Core Web Vitals
- [ ] Verify HTTPS enabled
- [ ] Enable CORS headers if needed
- [ ] Set up monitoring/error tracking (optional)

### Monitoring & Maintenance
- [ ] Set up error logging (Sentry, LogRocket, etc.)
- [ ] Monitor API usage (Gemini, Resend)
- [ ] Set up backup strategy (Supabase auto backups)
- [ ] Document admin password procedures
- [ ] Create runbook for common issues

## Essential Files Included

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main application component (2000+ lines) |
| `src/main.tsx` | React entry point |
| `src/types.ts` | Type definitions |
| `src/supabase.ts` | Supabase client |
| `src/sampleData.ts` | Demo/fallback data |
| `src/index.css` | Global styles |
| `src/services/geminiService.ts` | AI integration |
| `src/services/emailService.ts` | Email notifications |
| `package.json` | Dependencies |
| `vite.config.ts` | Build config |
| `tsconfig.json` | TypeScript config |
| `vercel.json` | Vercel config |
| `index.html` | HTML entry |

## Troubleshooting Common Issues

### Build Fails with "Cannot find module"
```bash
rm -rf node_modules pnpm-lock.yaml
npm install
npm run build
```

### Environment Variables Not Loading
- Check `.env.local` is in project root
- Ensure variables start with `VITE_` for client-side
- Restart dev server after changes
- Variables in Vercel must be set in Project Settings

### Supabase Connection Fails
- Verify URL and Anon Key are correct
- Check CORS settings in Supabase
- Confirm network request in browser DevTools

### Styling Issues
- Clear browser cache
- Rebuild with `npm run build`
- Check Tailwind is processing all files

## Contact & Support

**Developer**: Savvy IT
- Email: Savvy_i_t@outlook.com
- Phone: (217) 986-0863

**Salon Owner**: Alexis Tucker
- Email: alexistucker220@gmail.com
- Phone: (217) 820-0675
- Location: 1627 West Park Ave, Taylorville, IL 62568

## Final Notes

- The application works in demo mode without Supabase (using sample data)
- Google Gemini and Resend are optional - fallback text is used if unavailable
- All core features are self-contained in the React app
- No backend server needed (Supabase handles API)
- Static hosting suitable for Vercel, Netlify, or any static host

---

**Last Updated**: March 2026
**Status**: Ready for Deployment
