// src/lib/theme/presets.ts

export type Theme = {
  colors: {
    primary: string
    accent: string
    background: string
    muted: string
    success?: string
    warning?: string
    error?: string
  }
  typography: {
    heading: string
    body: string
    sizes: {
      hero: string
      h1: string
      h2: string
      h3: string
      body: string
      small: string
    }
    weights: {
      heading: number
      body: number
      bold: number
    }
  }
  spacing: {
    section: string
    card: string
    containerPadding: string
  }
  components: {
    hero: 'full-bleed' | 'video-loop' | 'split-screen' | 'centered-overlay' | '3d-product'
    productGrid: 'sparse-3' | 'dense-4' | 'balanced-3' | 'masonry' | 'specs-2'
    buttons: 'pill' | 'sharp' | 'rounded' | 'minimal'
    animations: 'slow-fade' | 'snap' | 'smooth-spring' | 'page-turn' | 'physics'
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    full: string
  }
}

export const themes: Record<string, Theme> = {
  'minimal-luxury': {
    colors: {
      primary: '#1A1A1A',
      accent: '#C9A96E',
      background: '#FAFAF8',
      muted: '#8B8B83',
      success: '#2D5C3F',
      warning: '#D4AF37',
      error: '#8B4513',
    },
    typography: {
      heading: 'var(--font-serif)',
      body: 'var(--font-sans)',
      sizes: {
        hero: 'clamp(2.5rem, 8vw, 4.5rem)',
        h1: 'clamp(2rem, 5vw, 3rem)',
        h2: 'clamp(1.5rem, 4vw, 2.25rem)',
        h3: 'clamp(1.25rem, 3vw, 1.75rem)',
        body: '1.125rem',
        small: '0.875rem',
      },
      weights: { heading: 400, body: 400, bold: 500 },
    },
    spacing: {
      section: '8rem',
      card: '3rem',
      containerPadding: '5%',
    },
    components: {
      hero: 'full-bleed',
      productGrid: 'sparse-3',
      buttons: 'pill',
      animations: 'slow-fade',
    },
    borderRadius: {
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      full: '9999px',
    },
  },

  'bold-hype': {
    colors: {
      primary: '#FF0000',
      accent: '#000000',
      background: '#FFFFFF',
      muted: '#666666',
      success: '#00FF00',
      warning: '#FFFF00',
      error: '#FF0000',
    },
    typography: {
      heading: 'var(--font-sans)',
      body: 'var(--font-sans)',
      sizes: {
        hero: 'clamp(3rem, 10vw, 6rem)',
        h1: 'clamp(2rem, 6vw, 3.5rem)',
        h2: 'clamp(1.5rem, 4vw, 2.5rem)',
        h3: 'clamp(1.25rem, 3vw, 2rem)',
        body: '1rem',
        small: '0.875rem',
      },
      weights: { heading: 900, body: 400, bold: 700 },
    },
    spacing: {
      section: '4rem',
      card: '1.5rem',
      containerPadding: '4%',
    },
    components: {
      hero: 'video-loop',
      productGrid: 'dense-4',
      buttons: 'sharp',
      animations: 'snap',
    },
    borderRadius: {
      sm: '0',
      md: '0.25rem',
      lg: '0.5rem',
      full: '0',
    },
  },

  'clean-dtc': {
    colors: {
      primary: '#2D5C3F',
      accent: '#E8775E',
      background: '#F7F7F5',
      muted: '#6B7280',
      success: '#059669',
      warning: '#F59E0B',
      error: '#DC2626',
    },
    typography: {
      heading: 'var(--font-sans)',
      body: 'var(--font-sans)',
      sizes: {
        hero: 'clamp(2.25rem, 6vw, 3.5rem)',
        h1: 'clamp(1.75rem, 4vw, 2.5rem)',
        h2: 'clamp(1.5rem, 3vw, 2rem)',
        h3: 'clamp(1.25rem, 2vw, 1.5rem)',
        body: '1.0625rem',
        small: '0.875rem',
      },
      weights: { heading: 600, body: 400, bold: 600 },
    },
    spacing: {
      section: '6rem',
      card: '2.5rem',
      containerPadding: '5%',
    },
    components: {
      hero: 'split-screen',
      productGrid: 'balanced-3',
      buttons: 'rounded',
      animations: 'smooth-spring',
    },
    borderRadius: {
      sm: '0.5rem',
      md: '0.75rem',
      lg: '1rem',
      full: '9999px',
    },
  },

  'editorial-mag': {
    colors: {
      primary: '#1C1C1C',
      accent: '#D4AF37',
      background: '#FFFEF9',
      muted: '#757575',
      success: '#2D5C3F',
      warning: '#D4AF37',
      error: '#8B4513',
    },
    typography: {
      heading: 'var(--font-serif)',
      body: 'var(--font-serif)',
      sizes: {
        hero: 'clamp(2.5rem, 8vw, 5rem)',
        h1: 'clamp(2rem, 6vw, 3.75rem)',
        h2: 'clamp(1.75rem, 4vw, 2.5rem)',
        h3: 'clamp(1.5rem, 3vw, 2rem)',
        body: '1.25rem',
        small: '0.9375rem',
      },
      weights: { heading: 400, body: 400, bold: 600 },
    },
    spacing: {
      section: '10rem',
      card: '4rem',
      containerPadding: '6%',
    },
    components: {
      hero: 'centered-overlay',
      productGrid: 'masonry',
      buttons: 'minimal',
      animations: 'page-turn',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      full: '9999px',
    },
  },

  'tech-precision': {
    colors: {
      primary: '#000000',
      accent: '#0071E3',
      background: '#FFFFFF',
      muted: '#86868B',
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
    },
    typography: {
      heading: 'system-ui, -apple-system, sans-serif',
      body: 'system-ui, -apple-system, sans-serif',
      sizes: {
        hero: 'clamp(2.5rem, 7vw, 4rem)',
        h1: 'clamp(2rem, 5vw, 3rem)',
        h2: 'clamp(1.5rem, 4vw, 2.25rem)',
        h3: 'clamp(1.25rem, 3vw, 1.75rem)',
        body: '1.0625rem',
        small: '0.875rem',
      },
      weights: { heading: 600, body: 400, bold: 600 },
    },
    spacing: {
      section: '7rem',
      card: '2rem',
      containerPadding: '5%',
    },
    components: {
      hero: '3d-product',
      productGrid: 'specs-2',
      buttons: 'pill',
      animations: 'physics',
    },
    borderRadius: {
      sm: '0.75rem',
      md: '1rem',
      lg: '1.25rem',
      full: '9999px',
    },
  },
}

export function getTheme(preset: string): Theme {
  return themes[preset] || themes['minimal-luxury']
}