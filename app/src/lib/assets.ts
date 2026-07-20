// Real asset lookup, sourced from the AI Engineer's committed, verified
// mappings (payload/theme_assets.json, payload/mascot_assets.json) rather
// than re-deriving paths — those files are read-only inputs, not edited here.
import themeAssetsJson from '../../../payload/theme_assets.json'
import mascotAssetsJson from '../../../payload/mascot_assets.json'
import type { MascotMood, SemanticTheme } from '../types/journey'

const themeImageUrls = import.meta.glob('../../../assets/themes/*/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const mascotSvgUrls = import.meta.glob('../../../assets/mascot/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function basename(p: string): string {
  return p.split('/').pop() ?? p
}

const themeImagesByBasename = new Map(
  Object.entries(themeImageUrls).map(([path, url]) => [basename(path), url]),
)
const mascotSvgsByBasename = new Map(
  Object.entries(mascotSvgUrls).map(([path, url]) => [basename(path), url]),
)

interface ThemeAssetEntry {
  hero: string
  interact: string
}
const themeAssets = themeAssetsJson as unknown as Record<string, ThemeAssetEntry>
const mascotAssets = mascotAssetsJson as unknown as Record<MascotMood, string>

export function themeImageUrl(theme: SemanticTheme, variant: 'hero' | 'interact'): string {
  const entry = themeAssets[theme]
  const name = basename(entry[variant])
  const url = themeImagesByBasename.get(name)
  if (!url) {
    throw new Error(`No bundled asset for theme "${theme}" variant "${variant}" (expected file "${name}")`)
  }
  return url
}

export function mascotSvgUrl(mood: MascotMood): string {
  const name = basename(mascotAssets[mood])
  const url = mascotSvgsByBasename.get(name)
  if (!url) {
    throw new Error(`No bundled mascot asset for mood "${mood}" (expected file "${name}")`)
  }
  return url
}
