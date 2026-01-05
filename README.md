# Luna 360 Expo

Professional trade show and exhibition organization platform built with Next.js 15 and modern web technologies.

## About Luna 360 Expo

Luna 360 Expo is a comprehensive trade show organization company offering end-to-end services for international exhibitions. This website showcases our services, project portfolio, and upcoming fairs calendar.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Authentication**: Clerk (with Turkish localization)
- **Email**: Resend + React Email
- **Icons**: Lucide React
- **Date Formatting**: date-fns (with Turkish locale)
- **Form Handling**: React Hook Form + Zod
- **Animation**: Framer Motion
- **Deployment**: Vercel (via GitHub)

## Features

- **9 Selectable Services**: Modular service offerings (not packages) including stand design, hostess support, accommodation, catering, photography/video, transportation, corporate gifts, gala organization, and consulting
- **Project Portfolio**: Showcase of completed trade show projects with detailed case studies
- **Fair Calendar**: Upcoming international fairs and events
- **Member Area**: User authentication with Clerk, supporting superadmin role
- **Bilingual Support**: Turkish and English (TR/EN) - ready for internationalization
- **WhatsApp Integration**: Direct contact button with pre-filled messages
- **Contact Form**: Quote request system with email integration
- **Responsive Design**: Mobile-first approach with dark theme
- **SEO Optimized**: Meta tags and structured data

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd luna360expo
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

   Note: Use `--legacy-peer-deps` flag due to Next.js 15 compatibility requirements.

3. **Set up environment variables**

   Copy `.env.example` to `.env.local` and fill in your credentials:
   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/giris
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/kayit
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/uye-alani
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/uye-alani

   # Resend Email
   RESEND_API_KEY=re_...

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_WHATSAPP_NUMBER=905555555555
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
luna360expo/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (main)/            # Main site pages
│   │   │   ├── fuarlar/       # Fair calendar
│   │   │   ├── hizmetler/     # Services
│   │   │   ├── projeler/      # Projects portfolio
│   │   │   ├── hakkimizda/    # About page
│   │   │   ├── iletisim/      # Contact page
│   │   │   └── teklif-al/     # Quote request
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── uye-alani/         # Member dashboard
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── layout/            # Header, Footer, Navigation
│   │   ├── sections/          # Page sections (Hero, Services, etc.)
│   │   ├── shared/            # Shared components (WhatsApp button)
│   │   └── ui/                # Shadcn UI components
│   ├── data/                  # Static data files
│   │   ├── services.ts        # Service data (9 services)
│   │   ├── projects.ts        # Project portfolio (6 projects)
│   │   └── fairs.ts           # Fair calendar (5 fairs)
│   ├── lib/
│   │   ├── data.ts            # Data helper functions
│   │   └── utils.ts           # Utility functions
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
│   └── referanslar/           # Project images
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## Data Management

This project uses **static TypeScript data files** instead of a CMS. All content is managed through code:

- **Services**: Edit `src/data/services.ts` to add/update services
- **Projects**: Edit `src/data/projects.ts` to add/update portfolio projects
- **Fairs**: Edit `src/data/fairs.ts` to add/update fair calendar

Each data file includes:
- TypeScript interfaces for type safety
- Bilingual content (TR/EN)
- Full metadata and descriptions

To add new content:
1. Edit the appropriate data file
2. Commit changes to GitHub
3. Vercel will automatically redeploy

## Deployment to Vercel via GitHub

This project is designed for seamless GitHub → Vercel deployment:

### Initial Setup

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Add environment variables from `.env.local`
   - Click "Deploy"

3. **Configure Custom Domain** (Optional)
   - In Vercel project settings, go to "Domains"
   - Add your custom domain
   - Update DNS records as instructed by Vercel

### Continuous Deployment

Once connected, every push to the `main` branch triggers automatic deployment:

```bash
# Make changes
git add .
git commit -m "Update services data"
git push

# Vercel automatically builds and deploys
```

### Environment Variables

Add all environment variables in Vercel dashboard:
- Project Settings → Environment Variables
- Add each variable from `.env.local`
- Redeploy if variables are added after initial deployment

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes and test locally**
   ```bash
   npm run dev
   ```

3. **Commit and push**
   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

4. **Create pull request on GitHub**
   - Review changes
   - Merge to main
   - Vercel auto-deploys

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support

For issues or questions:
- Website: [www.luna360expo.com](https://www.luna360expo.com)
- Email: info@luna360expo.com
- WhatsApp: +90 555 555 5555

## License

© 2024 Luna 360 Expo. All rights reserved.

