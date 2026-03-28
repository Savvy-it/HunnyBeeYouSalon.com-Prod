# Hunny, bee you! Salon Web Project - Setup & Deployment Guide

## Project Overview

This is a full-stack salon management and booking website built with:
- **Frontend**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS v4 with custom theme
- **Animations**: Motion (Framer Motion v12)
- **Backend**: Supabase (PostgreSQL) for data persistence
- **AI Integration**: Google Gemini for smart email drafts and service descriptions
- **Email Service**: Resend for email notifications

## Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Git
- API Keys for:
  - Supabase (optional - demo mode works without it)
  - Google Gemini (optional - fallback descriptions provided)
  - Resend (optional - for email notifications)

### Installation

```bash
# Clone the repository (already done)
# Install dependencies
npm install

# Configure environment variables
# Edit .env.local with your API keys:
# VITE_SUPABASE_URL=your_supabase_project_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
# GEMINI_API_KEY=your_gemini_api_key
# RESEND_API_KEY=your_resend_api_key
# RESEND_FROM_EMAIL=your_email@example.com

# Run development server
npm run dev

# The app will start on http://localhost:3000
```

## Project Structure

```
/
├── src/
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # React entry point
│   ├── types.ts               # TypeScript type definitions
│   ├── supabase.ts            # Supabase client configuration
│   ├── sampleData.ts          # Mock data for demo mode
│   ├── index.css              # Global styles
│   ├── services/
│   │   ├── geminiService.ts   # Google Gemini AI integration
│   │   └── emailService.ts    # Resend email service
│   └── vite-env.d.ts          # Vite type definitions
├── public/                     # Static assets
├── package.json               # Dependencies
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── index.html                 # HTML entry point
├── .env.local                 # Environment variables (not in git)
├── vercel.json                # Vercel deployment config
└── supabase-setup.sql         # Database schema (optional)
```

## Core Features

### Calendar Management
- Month, week, and day view
- Appointment scheduling
- Event management
- Business hours configuration

### Service Management
- Add/edit/delete services
- Service descriptions (AI-generated)
- Pricing and duration
- Service categories

### Appointment System
- Client booking interface
- Appointment confirmation emails
- Stylist assignment
- Appointment notes and status tracking

### Gallery
- Upload salon images
- Before/after gallery
- Gallery management

### Client Communication
- Email notifications (Resend)
- AI-generated professional email drafts
- Appointment reminders

### Admin Dashboard (Owner-only)
- Calendar view
- Service management
- Appointment management
- Event creation
- Gallery uploads
- Settings and configuration

## Environment Variables

Create a `.env.local` file with:

```env
# Supabase (Optional - demo mode works without)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Google Gemini API (Optional - fallback provided)
GEMINI_API_KEY=your_gemini_api_key_here
# or VITE_GEMINI_API_KEY for Vite environment

# Resend Email (Optional - for email notifications)
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Environment
VITE_ENV=development
```

## Database Setup (Optional)

If using Supabase, run the `supabase-setup.sql` script in your Supabase SQL editor to create the necessary tables.

## Building for Production

```bash
# Build the project
npm run build

# Preview the production build locally
npm run preview

# Clean build artifacts
npm run clean
```

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel project settings
4. Deploy with `npm run build` and root output directory

```bash
# Deploy
vercel
```

### Docker Deployment

```bash
# Build Docker image
docker build -t salon-app .

# Run container
docker run -p 3000:3000 salon-app
```

## Customization

### Color Scheme
Edit Tailwind CSS configuration in `tailwind.config.ts` or update CSS variables in `src/index.css`:
- Primary: Purple (`--bee-purple`)
- Accent: Blue (`--bee-blue`)
- Warning: Yellow (`--bee-yellow`)
- Error: Red (`--bee-red`)
- Background: Black (`--bee-black`)

### Business Information
Update in `src/App.tsx` Footer component and salon details

### Services & Hours
Modify `src/sampleData.ts` for demo data or connect to Supabase for persistent data

## Troubleshooting

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
npm install
```

### Build Errors
```bash
# Type check
npm run lint

# Clear vite cache
rm -rf .vite
npm run build
```

### Environment Variable Not Found
- Ensure `.env.local` is in project root
- Prefix browser variables with `VITE_`
- Restart dev server after changing `.env.local`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run clean` - Remove build artifacts
- `npm run lint` - Type check with TypeScript

## Support & Maintenance

For issues or feature requests, contact Savvy IT:
- Email: Savvy_i_t@outlook.com
- Phone: (217) 986-0863

## License

All rights reserved. Hunny, bee you! Salon 2026
