import type { Config } from 'tailwindcss'
import { BASE_POSITION_VH, BASE_SIZE_PX } from './app/gallery/galleryConstants'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        top: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        moveRight: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(calc(100vw))' },
        },
        scaleUp: {
          from: {
            transform: 'scale(0) translateX(-150%) translateY(-150%)',
            opacity: '0',
            top: `${BASE_POSITION_VH}vh`,
          },
          to: {
            transform: 'scale(1) translateX(-50%) translateY(-50%)',
            opacity: '1',
            top: '50%',
          },
        },
        presenterFrames: {
          '0%': {
            transform: 'translateX(-100%)',
            left: '0%',
            width: `${BASE_SIZE_PX}px`,
            top: `${BASE_POSITION_VH}vh`,
            padding: '0rem',
            backgroundColor: 'transparent',
          },
          '20%': {
            transform: 'translateX(-50%)',
            left: '50%',
            width: `${BASE_SIZE_PX}px`,
            top: `${BASE_POSITION_VH}vh`,
            padding: '0rem',
            backgroundColor: 'transparent',
          },
          '25%': {
            width: '600px',
            top: `${BASE_POSITION_VH}vh`,
            left: '50%',
            transform: `translateX(-50%) translateY(calc((${
              BASE_POSITION_VH - 50
            }vh + 50%) * -1))`,
            padding: '1.5rem',
            backgroundColor: 'hsl(var(--card))',
          },
          '75%': {
            width: '600px',
            top: `${BASE_POSITION_VH}vh`,
            left: '50%',
            transform: `translateX(-50%) translateY(calc((${
              BASE_POSITION_VH - 50
            }vh + 50%) * -1))`,
            padding: '1.5rem',
            backgroundColor: 'hsl(var(--card))',
          },
          '80%': {
            transform: 'translateX(-50%)',
            left: '50%',
            width: `${BASE_SIZE_PX}px`,
            top: `${BASE_POSITION_VH}vh`,
            padding: '0rem',
            backgroundColor: 'transparent',
          },
          '100%': {
            transform: 'translateX(100%)',
            left: '100%',
            width: `${BASE_SIZE_PX}px`,
            top: `${BASE_POSITION_VH}vh`,
            padding: '0rem',
            backgroundColor: 'transparent',
          },
        },
        presenterPromptFrames: {
          '0%': {
            marginTop: '0px',
            transform: 'scale(0)',
          },
          '20%': {
            marginTop: '0px',
            transform: 'scale(0)',
          },
          '25%': {
            marginTop: '1rem',
            transform: 'scale(0)',
          },
          '26%': {
            marginTop: '1rem',
            transform: 'scale(1)',
          },
          '74%': {
            marginTop: '1rem',
            transform: 'scale(1)',
          },
          '75%': {
            marginTop: '1rem',
            transform: 'scale(0)',
          },
          '80%': {
            marginTop: '0px',
            transform: 'scale(0)',
          },
          '100%': {
            marginTop: '0px',
            transform: 'scale(0)',
          },
        },
        presenterReflectionFrames: {
          '0%': {
            transform:
              'translateX(-100%) rotateX(45deg) translateY(100%) scaleY(-1)',
            left: '0',
            width: `${BASE_SIZE_PX}px`,
            top: `${BASE_POSITION_VH}vh`,
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
            filter: 'blur(0.5rem)',
            opacity: '0.66',
          },
          '20%': {
            transform:
              'translateX(-50%) rotateX(45deg) translateY(100%) scaleY(-1)',
            left: '50%',
            opacity: '0.66',
          },
          '25%': {
            transform:
              'translateX(-50%) rotateX(45deg) translateY(100%) scaleY(-1)',
            opacity: '0',
          },
          '75%': {
            transform:
              'translateX(-50%) rotateX(45deg) translateY(100%) scaleY(-1)',
            opacity: '0',
          },
          '80%': {
            transform:
              'translateX(-50%) rotateX(45deg) translateY(100%) scaleY(-1)',
            left: '50%',
            opacity: '0.66',
          },
          '100%': {
            transform:
              'translateX(100%) rotateX(45deg) translateY(100%) scaleY(-1)',
            left: '100%',
            width: `${BASE_SIZE_PX}px`,
            top: `${BASE_POSITION_VH}vh`,
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
            filter: 'blur(0.5rem)',
            opacity: '0.66',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        fadeIn: 'fadeIn .3s ease-out forwards',
        moveRight: 'moveRight 10s linear forwards',
        scaleUp: 'scaleUp 0.5s ease-out forwards',
        presenter: 'presenterFrames 20s linear forwards',
        presenterPrompt: 'presenterPromptFrames 20s linear forwards',
        presenterReflection: 'presenterReflectionFrames 20s linear forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
