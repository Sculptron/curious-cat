import { mascotSvgUrl } from '../lib/assets'
import type { MascotMood } from '../types/journey'

export default function CatMascot({
  mood,
  className = 'w-16 h-16',
}: {
  mood: MascotMood
  className?: string
}) {
  return (
    <img
      src={mascotSvgUrl(mood)}
      alt={`Curious Cat mascot, ${mood.replace('_', ' ')} mood`}
      className={`${className} drop-shadow-md select-none`}
      draggable={false}
    />
  )
}
