  import type { Config } from 'tailwindcss'

  const config: Config = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        // Mockr Brand Colors - Minimalistic with Viral Potential
        colors: {
          // Primary brand colors
          primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#1e40af', // Main brand blue
            700: '#1d4ed8',
            800: '#1e3a8a',
            900: '#1e293b',
          },
          // Accent colors for CTAs and highlights
          accent: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b', // Main accent amber
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          },
          // Neutral grays for backgrounds and text
          neutral: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          },
          // Success, warning, error states
          success: {
            50: '#f0fdf4',
            500: '#22c55e',
            600: '#16a34a',
          },
          warning: {
            50: '#fffbeb',
            500: '#f59e0b',
            600: '#d97706',
          },
          error: {
            50: '#fef2f2',
            500: '#ef4444',
            600: '#dc2626',
          },
        },

        // Typography scale
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },

        // Spacing scale (8px grid system)
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
          '128': '32rem',
        },

        // Border radius for rounded corners
        borderRadius: {
          'xl': '1rem',
          '2xl': '1.5rem',
          '3xl': '2rem',
        },

        // Box shadows for depth
        boxShadow: {
          'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
          'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
          'glow': '0 0 0 1px rgba(59, 130, 246, 0.15), 0 0 15px rgba(59, 130, 246, 0.2)',
        },

        // Gradients for beautiful backgrounds
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'hero-gradient': 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
          'accent-gradient': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
          'subtle-gradient': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        },

        // Animation and transitions
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-up': 'slideUp 0.3s ease-out',
          'slide-down': 'slideDown 0.3s ease-out',
          'scale-in': 'scaleIn 0.2s ease-out',
          'bounce-gentle': 'bounceGentle 2s infinite',
          'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },

        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          scaleIn: {
            '0%': { transform: 'scale(0.95)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          bounceGentle: {
            '0%, 100%': { transform: 'translateY(-5%)' },
            '50%': { transform: 'translateY(0)' },
          },
          pulseSoft: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.8' },
          },
        },

        // Custom utilities for Mockr
        screens: {
          'xs': '475px',
        },
        // Custom shadow utilities
        utilities: {
          '.mockr-shadow-soft': {
            'box-shadow': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)'
          },
          '.mockr-shadow-medium': {
            'box-shadow': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          },
          '.mockr-shadow-strong': {
            'box-shadow': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.04)'
          },
        },
      },
    },
    plugins: [],
  }

  export default config
