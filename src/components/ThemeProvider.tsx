'use client'
import { useEffect } from 'react'
import { siteConfig } from '../site.config'
import { getTheme } from '../lib/theme/presets'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = getTheme(siteConfig.brand.preset)

  useEffect(() => {
    const root = document.documentElement
    
    // Apply CSS variables
    root.style.setProperty('--color-primary', theme.colors.primary)
    root.style.setProperty('--color-accent', theme.colors.accent)
    root.style.setProperty('--color-background', theme.colors.background)
    root.style.setProperty('--color-muted', theme.colors.muted)
    root.style.setProperty('--color-success', theme.colors.success || '#059669')
    root.style.setProperty('--color-warning', theme.colors.warning || '#F59E0B')
    root.style.setProperty('--color-error', theme.colors.error || '#DC2626')
    
    root.style.setProperty('--font-heading', theme.typography.heading)
    root.style.setProperty('--font-body', theme.typography.body)
    
    root.style.setProperty('--spacing-section', theme.spacing.section)
    root.style.setProperty('--spacing-card', theme.spacing.card)
    
    root.style.setProperty('--radius-sm', theme.borderRadius.sm)
    root.style.setProperty('--radius-md', theme.borderRadius.md)
    root.style.setProperty('--radius-lg', theme.borderRadius.lg)
    root.style.setProperty('--radius-full', theme.borderRadius.full)
  }, [theme])

  return <>{children}</>
}