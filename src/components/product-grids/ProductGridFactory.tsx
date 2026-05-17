import { getTheme } from '../../lib/theme/presets'
import { siteConfig } from '../../site.config'
import { SparseGrid } from './SparseGrid'
import { DenseGrid } from './DenseGrid'

export function ProductGridFactory({ products }: { products: any[] }) {
  const theme = getTheme(siteConfig.brand.preset)
  
  const grids: Record<string, any> = {
    'sparse-3': SparseGrid,
    'dense-4': DenseGrid,
    'balanced-3': SparseGrid,
    'masonry': SparseGrid,
    'specs-2': DenseGrid,
  }
  
  const GridComponent = grids[theme.components.productGrid] || SparseGrid
  return <GridComponent products={products} />
}