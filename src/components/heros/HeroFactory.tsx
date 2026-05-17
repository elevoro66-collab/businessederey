import { siteConfig } from '../../site.config'
import { getTheme } from '../../lib/theme/presets'
import { FullBleedHero } from './FullBleedHero'
import { SplitScreenHero } from './SplitScreenHero'

export function HeroFactory() {
  const theme = getTheme(siteConfig.brand.preset)
  
  const heroes: Record<string, any> = {
    'full-bleed': FullBleedHero,
    'video-loop': FullBleedHero,
    'split-screen': SplitScreenHero,
    'centered-overlay': FullBleedHero,
    '3d-product': SplitScreenHero,
  }
  
  const HeroComponent = heroes[theme.components.hero] || FullBleedHero
  return <HeroComponent />
}