import { buildWatercolorAnimation } from '@/animations/watercolor'
import { buildAndAnimateGrid } from '@/animations/grid'

export enum CanvasType {
    BLOOM = 'bloom',
    GRID = 'grid',
}

const map = new Map()
map.set(CanvasType.BLOOM, buildWatercolorAnimation)
map.set(CanvasType.GRID, buildAndAnimateGrid)

export const CanvasMap = map
