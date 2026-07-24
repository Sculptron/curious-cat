import { useState } from 'react'
import CardScreenChrome from '../components/CardScreenChrome'
import ConceptCardView from '../components/cards/ConceptCardView'
import PredictCardView from '../components/cards/PredictCardView'
import CheckpointCardView from '../components/cards/CheckpointCardView'
import SitWithItCardView from '../components/cards/SitWithItCardView'
import type { Journey } from '../types/journey'

export default function JourneyScreen({ journey, onFinish }: { journey: Journey; onFinish: () => void }) {
  const [cardIndex, setCardIndex] = useState(0)
  const [interactionDone, setInteractionDone] = useState(false)

  const card = journey.journey_deck[cardIndex]
  const isLast = cardIndex === journey.journey_deck.length - 1

  // concept_card has no interaction gate; every other card type must be
  // answered/both-perspectives-viewed before Next unlocks.
  const nextEnabled = card.type === 'concept_card' || interactionDone

  function goNext() {
    if (isLast) {
      onFinish()
      return
    }
    setCardIndex((i) => i + 1)
    setInteractionDone(false)
  }

  const boatMood =
    card.type === 'concept_card'
      ? card.mascot_state.mood
      : card.type === 'predict_card'
        ? 'thinking'
        : card.type === 'checkpoint_card'
          ? 'thinking'
          : 'thinking'

  return (
    <CardScreenChrome
      topicLabel={journey.expedition_metadata.assigned_visual_theme.replace(/_/g, ' ')}
      cardIndex={cardIndex}
      totalCards={journey.journey_deck.length}
      boatMood={boatMood}
      onNext={goNext}
      nextEnabled={nextEnabled}
    >
      {card.type === 'concept_card' && <ConceptCardView key={card.card_id} card={card} theme={journey.expedition_metadata.assigned_visual_theme} />}
      {card.type === 'predict_card' && (
        <PredictCardView
          key={card.card_id}
          card={card}
          theme={journey.expedition_metadata.assigned_visual_theme}
          onAnswered={() => setInteractionDone(true)}
        />
      )}
      {card.type === 'checkpoint_card' && <CheckpointCardView key={card.card_id} card={card} onAnswered={() => setInteractionDone(true)} />}
      {card.type === 'sit_with_it_card' && <SitWithItCardView key={card.card_id} card={card} onBothViewed={() => setInteractionDone(true)} />}
    </CardScreenChrome>
  )
}
