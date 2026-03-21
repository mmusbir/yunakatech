export const UI_DENSITY_MODES = ['compact', 'comfortable'] as const

export type UiDensity = (typeof UI_DENSITY_MODES)[number]

export function getUiDensity(): UiDensity {
  const density = process.env.UI_DENSITY

  if (density === 'comfortable') {
    return density
  }

  return 'compact'
}
