# Mockr - AI-Powered Political Cartoon Generator

<div align="center">
  <img src="public/icon-512.png" alt="Mockr Logo" width="120" />

  <p><strong>Create intelligent satirical political cartoons in 60 seconds with AI</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
</div>

---

## 🎯 Overview

Mockr is a web-based AI-powered platform that generates witty, shareable political cartoons in classic editorial style. Users can create professional-quality satirical content in seconds without any design skills.

**Live Demo:** [mockr-app.netlify.app](https://mockr-app.netlify.app)

---

## ✨ Key Features

### Core Functionality
- **AI-Powered Generation**: Advanced AI models create satirical text and editorial-style cartoons
- **60-Second Creation**: From idea to shareable cartoon in under a minute
- **Classic Editorial Style**: Black & white cartoons with signature "Common Man" character
- **No Design Skills Required**: Simple text input generates professional results
- **Gallery Management**: Save, organize, and manage your created comics locally

### User Experience
- **Daily Free Credits**: 10 comic generations per day for all users
- **MVP Capacity Control**: Maximum 100 registered users with automatic waitlist
- **Rate Limiting**: Smart usage tracking with visual indicators
- **Social Sharing**: One-click sharing to X (Twitter), LinkedIn, and more
- **Mobile Responsive**: Fully optimized for all screen sizes
- **PWA Support**: Add to home screen for app-like experience

### Launch Features
- **Google Analytics**: Track user behavior and conversion metrics
- **Product Hunt Banner**: Auto-showing launch day promotion
- **Error Boundaries**: Graceful error handling with user-friendly messages
- **Waitlist System**: Email collection for overflow users

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.3 with App Router
- **UI Library**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React
- **Image Optimization**: Next/Image with Sharp

### Backend & Services
- **Authentication**: Clerk (user management + metadata storage)
- **AI Text Generation**: Google Gemini 1.5 Flash API
- **AI Image Generation**: FLUX.1-dev via Hugging Face Inference API
- **Storage**: Browser localStorage (no server storage)
- **Deployment**: Netlify with automatic GitHub deployments

### Development Tools
- **Language**: TypeScript 5.x
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: npm
- **Version Control**: Git + GitHub

---

## 📁 Project Structure

```
mockr/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Homepage
│   │   ├── error.tsx            # Global error boundary
│   │   ├── generate/            # Comic generation page
│   │   ├── gallery/             # User gallery page
│   │   ├── waitlist/            # Waitlist form page
│   │   ├── about/               # About page
│   │   ├── privacy/             # Privacy policy
│   │   ├── terms/               # Terms of service
│   │   └── api/                 # API routes
│   │       ├── generate-comic/  # Main comic generation
│   │       ├── generate-quote/  # AI satirical text
│   │       ├── generate-description/ # AI scene description
│   │       ├── check-limit/     # Rate limiting check
│   │       ├── mvp-register/    # MVP user registration
│   │       ├── waitlist/        # Waitlist management
│   │       └── feedback/        # User feedback collection
│   ├── components/              # Reusable React components
│   │   ├── layout/             # Header, Footer
│   │   ├── MVPRegistration.tsx # Auto-registration flow
│   │   ├── UsageIndicator.tsx  # Daily limit display
│   │   ├── GoogleAnalytics.tsx # GA tracking
│   │   ├── ProductHuntBanner.tsx # Launch day banner
│   │   └── ErrorBoundary.tsx   # Error handling
│   ├── lib/                     # Utilities and configs
│   │   ├── rateLimiting.ts     # MVP user cap + daily limits
│   │   └── sampleScenarios.ts  # Pre-defined comic scenarios
│   └── styles/                  # Global styles
├── public/                      # Static assets
│   ├── samples/                # Sample comics for homepage
│   ├── brand/                  # Branding assets
│   ├── common-man-poses/       # Character overlay images
│   ├── favicon.ico             # Browser favicon
│   ├── og-image.png            # Social media preview
│   └── manifest.json           # PWA manifest
├── scripts/                     # Build and utility scripts
│   └── generate-icons.js       # Icon generation script
└── .env.example                # Environment variables template
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Clerk account (for authentication)
- Google Gemini API key (for text generation)
- Hugging Face API token (for image generation)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/mockr-app.git
cd mockr-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```

4. **Configure `.env.local`** with your API keys:
```env
# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key

# AI Services
GOOGLE_GEMINI_API_KEY=your_gemini_key
HUGGINGFACE_API_TOKEN=hf_your_token

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Product Hunt (optional)
NEXT_PUBLIC_PRODUCT_HUNT_URL=https://www.producthunt.com/posts/mockr
```

5. **Generate icons and assets:**
```bash
node scripts/generate-icons.js
```

6. **Run development server:**
```bash
npm run dev
```

7. **Open browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server (port 3000)

# Production
npm run build            # Build for production
npm start                # Start production server

# Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
```

---

## 📊 MVP Configuration

### User Limits
- **Maximum Users**: 100 registered users
- **Daily Comics**: 10 generations per user per day
- **Unlimited Access**: Configured email addresses bypass limits
- **Waitlist**: Automatic email collection for user 101+

### Rate Limiting Details
```typescript
// src/lib/rateLimiting.ts
export const DAILY_COMIC_LIMIT = 10
export const MAX_MVP_USERS = 100

const UNLIMITED_ACCESS_EMAILS = [
  'bhuvnagreens@gmail.com',
  'refundreturn8@gmail.com'
]
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Neutral grey gradients (`#1f2937` to `#4b5563`)
- **Accents**: Amber for highlights, Red for errors, Green for success
- **Background**: White with subtle neutral tints

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, 2xl to 6xl sizes
- **Body**: Regular, base to lg sizes

### Components
- **Rounded Corners**: 8px to 24px
- **Shadows**: Subtle elevation with lg to 2xl shadows
- **Animations**: Framer Motion with spring physics
- **Spacing**: 8px grid system

---

## 🔐 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk authentication public key |
| `CLERK_SECRET_KEY` | ✅ | Clerk authentication secret key |
| `GOOGLE_GEMINI_API_KEY` | ✅ | Google Gemini API for text generation |
| `HUGGINGFACE_API_TOKEN` | ✅ | Hugging Face for FLUX image generation |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ⚠️ Recommended | Google Analytics tracking ID |
| `NEXT_PUBLIC_PRODUCT_HUNT_URL` | ⬜ Optional | Product Hunt launch page URL |
| `NEXT_PUBLIC_APP_URL` | ⬜ Optional | Production app URL |

---

## 🚢 Deployment

### Netlify Deployment

1. **Connect GitHub repository** to Netlify
2. **Set environment variables** in Netlify dashboard
3. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. **Deploy** - Netlify auto-deploys on push to main

### Pre-Launch Checklist
- [ ] Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Netlify
- [ ] Set `NEXT_PUBLIC_PRODUCT_HUNT_URL` with actual PH link
- [ ] Update launch date in `ProductHuntBanner.tsx`
- [ ] Test all API routes in production
- [ ] Verify OG image displays correctly on X/Twitter
- [ ] Test mobile responsiveness
- [ ] Check rate limiting works correctly

---

## 📝 AI Generation Pipeline

### Text Generation (Google Gemini)
1. User inputs political situation
2. Gemini generates satirical quote
3. Gemini creates scene description
4. Text optimized for FLUX model

### Image Generation (FLUX.1-dev)
1. Enhanced prompt sent to Hugging Face
2. FLUX generates base cartoon (20 steps)
3. "Common Man" character overlaid (top-left)
4. Mockr signature added (bottom-right)
5. Final composite image returned

### Fallback System
- If AI fails: SVG placeholder generated
- User sees "Try Again" button
- No credits deducted on failure

---

## 🤝 Contributing

This is a private repository. For bug reports or feature requests, please contact the repository owner.

---

## 📄 License

Proprietary - All rights reserved

---

## 👨‍💻 Author

**Mockr Team**
- Website: [mockr.art](https://mockr.art)
- X (Twitter): [@MockrArt](https://x.com/MockrArt)

---

## 🙏 Acknowledgments

- **Clerk** - Authentication infrastructure
- **Google Gemini** - Satirical text generation
- **Hugging Face** - FLUX.1-dev image model
- **Netlify** - Hosting and deployment
- **Next.js Team** - Amazing React framework
- **Tailwind CSS** - Beautiful styling system

---

<div align="center">
  <p>Made with ❤️ for free speech</p>
  <p>© 2025 Mockr. All rights reserved.</p>
</div>
