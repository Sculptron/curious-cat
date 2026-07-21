import { useState } from 'react'
import { Compass, Map, Layers } from 'lucide-react'
import LandingScreen from './screens/LandingScreen'
import ChartingScreen from './screens/ChartingScreen'
import JourneyScreen from './screens/JourneyScreen'
import ExplainItBackScreen from './screens/ExplainItBackScreen'
import MintScreen from './screens/MintScreen'
import ConstellationScreen from './screens/ConstellationScreen'
import SparkFeedScreen from './screens/SparkFeedScreen'
import { getJourney } from './lib/journeySource'
import { loadCalibration, saveCalibration, loadConstellation, recordCompletedJourney } from './lib/journeyStore'
import type { UiCalibration } from './lib/calibration'
import type { Journey } from './types/journey'

type HubTab = 'explore' | 'constellation' | 'sparks'
type Screen = { kind: 'hub' } | { kind: 'charting'; query: string } | { kind: 'journey' } | { kind: 'explain' } | { kind: 'mint' }

export default function App() {
  const [screen, setScreen] = useState<Screen>({ kind: 'hub' })
  const [hubTab, setHubTab] = useState<HubTab>('explore')
  const [calibration, setCalibration] = useState<UiCalibration>(() => loadCalibration())
  const [journey, setJourney] = useState<Journey | null>(null)
  const [journeyReady, setJourneyReady] = useState(false)
  const [constellation, setConstellation] = useState(() => loadConstellation())

  function updateCalibration(level: UiCalibration) {
    setCalibration(level)
    saveCalibration(level)
  }

  async function launchExpedition(query: string) {
    setJourneyReady(false)
    setScreen({ kind: 'charting', query })
    try {
      const result = await getJourney(query, calibration)
      setJourney(result)
      setJourneyReady(true)
    } catch (err) {
      // No dedicated error screen exists yet (frontend-owned; out of scope
      // here) — surface the failure and return to the hub rather than
      // leaving the charting screen spinning forever on a real API error.
      window.alert(err instanceof Error ? err.message : 'Something went wrong charting that expedition. Please try again.')
      setScreen({ kind: 'hub' })
    }
  }

  function finishJourney() {
    setScreen({ kind: 'explain' })
  }

  function mintCard() {
    if (journey) {
      const node = recordCompletedJourney(journey, Date.now())
      setConstellation((prev) => [...prev, node])
    }
    setScreen({ kind: 'mint' })
  }

  function returnToHub(tab: HubTab) {
    setJourney(null)
    setHubTab(tab)
    setScreen({ kind: 'hub' })
  }

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#1A1A1A]">
      <div className="w-full max-w-md min-h-screen bg-[#F9F6F0] flex flex-col shadow-2xl relative overflow-hidden">
        {screen.kind === 'hub' && (
          <>
            <div className="flex-1 flex flex-col overflow-hidden">
              {hubTab === 'explore' && (
                <LandingScreen
                  calibration={calibration}
                  onCalibrationChange={updateCalibration}
                  onLaunch={launchExpedition}
                  onOpenSparks={() => setHubTab('sparks')}
                />
              )}
              {hubTab === 'constellation' && <ConstellationScreen nodes={constellation} />}
              {hubTab === 'sparks' && <SparkFeedScreen onLaunch={launchExpedition} />}
            </div>
            <nav className="grid grid-cols-3 border-t border-[#E9E4DB] bg-white shrink-0">
              {(
                [
                  { id: 'explore', label: 'Explore', Icon: Compass },
                  { id: 'constellation', label: 'Constellation', Icon: Map },
                  { id: 'sparks', label: 'Spark Feed', Icon: Layers },
                ] as const
              ).map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setHubTab(id)}
                  className={`py-3 text-xs font-bold flex flex-col items-center gap-1 border-t-2 transition ${
                    hubTab === id ? 'border-[#D97706] text-[#D97706]' : 'border-transparent text-[#5C574F]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </>
        )}

        {screen.kind === 'charting' && <ChartingScreen query={screen.query} ready={journeyReady} onDone={() => setScreen({ kind: 'journey' })} />}

        {screen.kind === 'journey' && journey && <JourneyScreen journey={journey} onFinish={finishJourney} />}

        {screen.kind === 'explain' && journey && <ExplainItBackScreen journey={journey} calibration={calibration} onMint={mintCard} />}

        {screen.kind === 'mint' && journey && (
          <MintScreen journey={journey} onBranch={launchExpedition} onViewConstellation={() => returnToHub('constellation')} />
        )}
      </div>
    </div>
  )
}
