# Quick Reference Card

## Installation (Copy & Paste)
```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# http://localhost:3000
```

## Build & Deploy
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel
```

## Environment Variables (.env.local)
```
# Optional - app works without these!
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```

## Key Files
```
App.tsx              → Main application (2010 lines)
src/types.ts         → Type definitions
src/supabase.ts      → Database config
src/sampleData.ts    → Demo data
src/services/        → AI & Email services
package.json         → Dependencies
vite.config.ts       → Build config
vercel.json          → Deploy config
```

## Documentation
```
README.md                    → Overview
SETUP_GUIDE.md              → Detailed setup
DEPLOYMENT_CHECKLIST.md     → Pre-deploy checklist
PROJECT_SUMMARY.md          → This project's summary
```

## NPM Scripts
```bash
npm run dev          # Start dev server
npm run build        # Create production build
npm run preview      # Preview build locally
npm run clean        # Remove artifacts
npm run lint         # Type check
```

## Features Included
✅ Calendar (Month/Week/Day views)  
✅ Appointment booking & management  
✅ Service management  
✅ Gallery with image management  
✅ Event scheduling  
✅ Business hours tracking  
✅ Email notifications  
✅ AI-powered descriptions  
✅ Admin dashboard  
✅ Mobile responsive  
✅ Dark theme  
✅ Beautiful animations  

## Tech Stack
React 19 • TypeScript • Vite • Tailwind CSS • Supabase • Google Gemini • Resend • Motion

## Demo Mode
Works perfectly WITHOUT any API keys!  
Add credentials to enable:
- Supabase → Persistent data storage
- Gemini → AI email/description generation
- Resend → Email notifications

## Troubleshooting
```bash
# Port in use?
npm run dev -- --port 3001

# Dependencies error?
rm -rf node_modules pnpm-lock.yaml
npm install

# TypeScript errors?
npm run lint

# Build failed?
npm run clean
npm run build
```

## Support
Savvy IT: Savvy_i_t@outlook.com (217) 986-0863  
Salon: Alexis Tucker (217) 820-0675  
Location: 1627 West Park Ave, Taylorville, IL 62568

---

**Status**: ✅ READY TO DEPLOY
**Next**: `npm install && npm run dev`
