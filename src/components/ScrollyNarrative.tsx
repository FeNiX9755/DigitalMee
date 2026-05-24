import { speechScenes } from '../data/speech'
import { FinalScene } from './FinalScene'
import { NarrativeIntro } from './NarrativeIntro'
import { ScrollScene } from './ScrollScene'

export function ScrollyNarrative() {
  return (
    <main className="relative w-full touch-pan-y">
      <NarrativeIntro />
      {speechScenes.map((scene, index) => (
        <ScrollScene
          key={scene.id}
          scene={scene}
          index={index}
          total={speechScenes.length}
        />
      ))}
      <FinalScene />
    </main>
  )
}
