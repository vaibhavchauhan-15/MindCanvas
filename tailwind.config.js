/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class
  theme: {
    extend: {
      colors: {
        // Using CSS variables for colors
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        '2xl': 'var(--radius-2xl)',
      },
      spacing: {
        2: 'var(--space-2)',
        4: 'var(--space-4)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
        24: 'var(--space-24)',
        32: 'var(--space-32)',
      },
      fontSize: {
        'display': ['var(--font-display)', { lineHeight: 'var(--line-height-display)' }],
        'h1': ['var(--font-h1)', { lineHeight: 'var(--line-height-h1)' }],
        'h2': ['var(--font-h2)', { lineHeight: 'var(--line-height-h2)' }],
        'h3': ['var(--font-h3)', { lineHeight: 'var(--line-height-h3)' }],
        'h4': ['var(--font-h4)', { lineHeight: 'var(--line-height-h4)' }],
        'h5': ['var(--font-h5)', { lineHeight: 'var(--line-height-h5)' }],
        'h6': ['var(--font-h6)', { lineHeight: 'var(--line-height-h6)' }],
        'body': ['var(--font-body)', { lineHeight: 'var(--line-height-body)' }],
        'caption': ['var(--font-caption)', { lineHeight: 'var(--line-height-caption)' }],
      },
      transitionDuration: {
        100: 'var(--duration-100)',
        200: 'var(--duration-200)',
        300: 'var(--duration-300)',
        500: 'var(--duration-500)',
      },
      transitionTimingFunction: {
        'standard': 'var(--easing-standard)',
        'enter': 'var(--easing-enter)',
        'exit': 'var(--easing-exit)',
      },
      zIndex: {
        'navbar': 'var(--z-navbar)',
        'sidebar': 'var(--z-sidebar)',
        'modal': 'var(--z-modal)',
        'tooltip': 'var(--z-tooltip)',
        'context-menu': 'var(--z-context-menu)',
        'command-palette': 'var(--z-command-palette)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce-subtle 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
