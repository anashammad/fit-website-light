import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#002B7F',
          light: '#0041A8',
          dark: '#001F5C',
        },
        secondary: {
          DEFAULT: '#1E40AF',
          hover: '#1E3A8A',
          light: '#3B82F6',
        },
        accent: {
          DEFAULT: '#D4A843',
          hover: '#C4982E',
          light: '#E8C96A',
          muted: 'rgba(212, 168, 67, 0.15)',
        },
        terminal: {
          green: '#16A34A',
          red: '#DC2626',
          amber: '#D97706',
          blue: '#2563EB',
          cyan: '#0891B2',
          muted: '#F1F5F9',
          border: '#E2E8F0',
          surface: '#F8FAFC',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          light: '#F8FAFC',
          lighter: '#F1F5F9',
        },
        success: {
          DEFAULT: '#16A34A',
          light: 'rgba(22, 163, 74, 0.1)',
        },
        warning: {
          DEFAULT: '#D97706',
          light: 'rgba(217, 119, 6, 0.1)',
        },
        error: {
          DEFAULT: '#DC2626',
          light: 'rgba(220, 38, 38, 0.1)',
        },
        info: {
          DEFAULT: '#2563EB',
          light: 'rgba(37, 99, 235, 0.1)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        display: [
          '3.5rem',
          {
            lineHeight: '1.08',
            letterSpacing: '-0.03em',
            fontWeight: '700',
          },
        ],
        h1: [
          '3rem',
          {
            lineHeight: '1.12',
            letterSpacing: '-0.025em',
            fontWeight: '700',
          },
        ],
        h2: [
          '2.25rem',
          {
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            fontWeight: '600',
          },
        ],
        h3: [
          '1.5rem',
          {
            lineHeight: '1.3',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        h4: [
          '1.25rem',
          {
            lineHeight: '1.4',
            letterSpacing: '-0.005em',
            fontWeight: '600',
          },
        ],
        h5: ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        h6: ['1rem', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        body: ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        caption: [
          '0.75rem',
          {
            lineHeight: '1.5',
            letterSpacing: '0.01em',
            fontWeight: '400',
          },
        ],
        label: [
          '0.75rem',
          {
            lineHeight: '1.5',
            letterSpacing: '0.12em',
            fontWeight: '600',
          },
        ],
        ticker: [
          '0.8125rem',
          {
            lineHeight: '1',
            letterSpacing: '0.02em',
            fontWeight: '500',
          },
        ],
      },
      maxWidth: {
        content: '1280px',
        prose: '720px',
        'prose-wide': '800px',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        lg: '8px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,43,127,0.06)',
        'card-hover': '0 8px 32px rgba(0,43,127,0.12), 0 0 0 1px rgba(0,43,127,0.1)',
        dropdown: '0 8px 32px rgba(0,0,0,0.12)',
        nav: '0 1px 0 rgba(0,0,0,0.05)',
        modal: '0 16px 48px rgba(0,0,0,0.15)',
        glow: '0 0 20px rgba(0, 43, 127, 0.1)',
        'glow-green': '0 0 12px rgba(22, 163, 74, 0.15)',
        'glow-red': '0 0 12px rgba(220, 38, 38, 0.15)',
        'inner-light': 'inset 0 1px 0 rgba(255,255,255,0.8)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0,43,127,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,43,127,0.04) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-terminal': 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      backgroundSize: {
        'grid-40': '40px 40px',
      },
      animation: {
        'ticker-scroll': 'ticker-scroll 30s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scroll-left': 'scrollLeft 25s linear infinite',
        'market-ticker': 'scrollLeft 20s linear infinite',
      },
      keyframes: {
        'ticker-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
