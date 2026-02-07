import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A1628',
          light: '#132038',
        },
        secondary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#DBEAFE',
        },
        accent: {
          DEFAULT: '#0D9488',
          hover: '#0F766E',
        },
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
        },
        info: {
          DEFAULT: '#3B82F6',
          light: '#DBEAFE',
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
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            fontWeight: '700',
          },
        ],
        h1: [
          '3rem',
          {
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
            fontWeight: '700',
          },
        ],
        h2: [
          '2.25rem',
          {
            lineHeight: '1.2',
            letterSpacing: '-0.015em',
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
        overline: [
          '0.75rem',
          {
            lineHeight: '1.5',
            letterSpacing: '0.08em',
            fontWeight: '600',
          },
        ],
      },
      maxWidth: {
        content: '1280px',
        prose: '720px',
        'prose-wide': '800px',
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        lg: '12px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.08)',
        dropdown: '0 8px 32px rgba(0,0,0,0.12)',
        nav: '0 1px 4px rgba(0,0,0,0.06)',
        modal: '0 16px 48px rgba(0,0,0,0.2)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
