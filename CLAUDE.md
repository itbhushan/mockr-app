  This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

  ## Project: Mockr - AI-Powered Satirical Political Cartoon Generator

  ### Project Overview
  Mockr is a web-based AI-powered platform that generates witty, satirical political cartoons in black and white caricature style, inspired by R.K. Laxman's artistic approach combined with xkcd's sharp wit. Users can     
  create shareable content that intelligently critiques politicians, celebrities, and societal issues through consistent, brand-recognizable cartoon format.

  ### Project Structure
  This repository contains a Next.js application with the following structure:

  - **Next.js 15** with App Router architecture
  - **React 19** with TypeScript
  - **Tailwind CSS v4** for styling with custom design system
  - **Framer Motion** for beautiful animations and transitions
  - **ESLint** with Next.js configuration for linting

  ### Development Commands
  All commands should be run from the root directory:

  ```bash
  # Install dependencies
  npm install

  # Development server
  npm run dev

  # Build for production
  npm run build

  # Start production server
  npm start

  # Run linting
  npm run lint

  # Type checking
  npm run type-check

  Architecture & Tech Stack

  Frontend

  - Framework: Next.js 15 with App Router
  - UI Library: Tailwind CSS v4 with custom design system
  - Animations: Framer Motion for polished interactions
  - Icons: Lucide React
  - Forms: React Hook Form with Zod validation
  - State Management: React Context + useReducer

  Backend & Services

  - Database: Supabase PostgreSQL (500MB free tier)
  - Authentication: Clerk (10,000 MAU free tier)
  - File Storage: Supabase Storage (1GB free)
  - Serverless Functions: Supabase Edge Functions
  - Deployment: Netlify (100GB bandwidth free)

  AI Integration

  - Text Generation: Google Gemini 1.5 Flash API (free tier)
  - Image Generation: Stable Diffusion via Hugging Face Inference API
  - Fallback: Local template system for high-traffic scenarios

  Design System

  - Color Palette: Deep blues (#1e40af) with warm accents (#f59e0b)
  - Typography: Clean, readable fonts with clear hierarchy
  - Spacing: 8px grid system with generous negative space
  - Components: Rounded corners, subtle shadows, gradients
  - Animations: Subtle, meaningful micro-interactions

  File Structure

  mockr-app/
  ├── src/
  │   ├── app/                 # App Router pages and layouts
  │   │   ├── layout.tsx       # Root layout
  │   │   ├── page.tsx         # Homepage
  │   │   ├── create/          # Comic creation pages
  │   │   ├── dashboard/       # User dashboard
  │   │   └── globals.css      # Global styles
  │   ├── components/          # Reusable UI components
  │   │   ├── ui/              # Base UI components
  │   │   ├── forms/           # Form components
  │   │   └── layout/          # Layout components
  │   ├── lib/                 # Utilities and configurations
  │   │   ├── supabase.ts      # Supabase client
  │   │   ├── clerk.ts         # Clerk configuration
  │   │   └── ai/              # AI service integrations
  │   ├── types/               # TypeScript type definitions
  │   └── styles/              # Additional styling
  ├── public/                  # Static assets
  ├── .env.local              # Environment variables (local)
  └── netlify.toml            # Netlify deployment config

  Environment Variables

  # Supabase
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=

  # Clerk Authentication
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
  CLERK_SECRET_KEY=

  # AI Services
  GOOGLE_GEMINI_API_KEY=
  HUGGINGFACE_API_TOKEN=

  # App Configuration
  NEXT_PUBLIC_APP_URL=https://mockr-app.netlify.app

  Key Features (MVP)

  1. Landing Page: Hero section with sample comics and call-to-action
  2. Comic Creator: Progressive disclosure form for character, situation, and tone selection
  3. AI Generation: Integrated pipeline for text and image generation
  4. User Authentication: Clerk-powered sign-up/sign-in
  5. Comic Gallery: User dashboard with created comics
  6. Sharing: Social media integration and download options

  Content Philosophy

  - Tone: 60% R.K. Laxman's thoughtful intelligence + 40% xkcd's irreverent wit
  - Style: Black and white caricature with consistent character design
  - Focus: Political satire, social commentary, economic critique
  - Safety: Automated content moderation with AI safety filters

  Deployment

  - Primary: Netlify with automatic GitHub deployments
  - Branch Strategy: feature branches → main branch workflow
  - Environment: Separate staging and production environments

  Development Guidelines

  - Mobile-First: Responsive design (MVP focuses on web)
  - Performance: Optimize for fast loading and smooth animations
  - Accessibility: WCAG 2.1 AA compliance
  - SEO: Meta tags and Open Graph optimization for viral sharing
  - Security: API key protection and input sanitization

  Important Notes

  - All AI content generation includes safety filters
  - Comics include "Created with Mockr" watermark
  - Free tier optimized for solo developer sustainability
  - Content suitable for social media platform policies

  ---
  Document Version: 1.0Last Updated: September 16, 2025Status: Development Ready
