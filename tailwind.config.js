/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        secondary: 'var(--color-secondary)',
        'secondary-foreground': 'var(--color-secondary-foreground)',
        accent: 'var(--color-accent)',
        'accent-foreground': 'var(--color-accent-foreground)',
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        popover: 'var(--color-popover)',
        'popover-foreground': 'var(--color-popover-foreground)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        success: 'var(--color-success)',
        'success-foreground': 'var(--color-success-foreground)',
        warning: 'var(--color-warning)',
        'warning-foreground': 'var(--color-warning-foreground)',
        error: 'var(--color-error)',
        'error-foreground': 'var(--color-error-foreground)',
        destructive: 'var(--color-destructive)',
        'destructive-foreground': 'var(--color-destructive-foreground)',
      },
      ringWidth: {
        3: '3px',
      },
      ringOffsetWidth: {
        3: '3px',
      },
    },
  },
  plugins: [],
}
