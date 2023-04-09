import { Map } from './components/Map';
import { Fishing, Goal } from './components/Fishing';
import { FishingLog } from './components/FishingLog';
import { Button } from './components/Button';
import { useState } from 'react';
import { Popup } from './components/Popup';
import { ControlPanel } from './components/ControlPanel';
import { Input } from './components/Input';
import { useAppStore } from './store/store';
import { PlayerConfig } from './components/PlayerConfig';

const GOAL_WIDTH = 30;

const goals: Goal[] = [
  { id: 1, start: 0, width: GOAL_WIDTH },
  { id: 2, start: 80, width: GOAL_WIDTH },
  { id: 3, start: 250, width: GOAL_WIDTH },
];

export default function App() {
  const [isPlayerConfigOpen, setIsPlayerConfigOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="text-3xl">Fishing Simulator</h1>

      <ControlPanel
        togglePlayerConfig={() => {
          setIsPlayerConfigOpen(true);
        }}
        toggleMap={() => {
          setIsMapOpen(true);
        }}
      />

      <p>Day: 7, week: 15, year: 1864</p>

      <p>Weather report: endless waves</p>

      <p>Temperature: 15 Celcius</p>

      <div className="flex gap-2 flex-wrap justify-center">
        <Button text="To the sea!" />
        <Button text="Return home" />
        <Button text="Visit the shops" />
        <Button text="Go to the chapel" />
      </div>

      <Fishing goals={goals} />

      <FishingLog />

      <PlayerConfig
        isOpen={isPlayerConfigOpen}
        close={() => setIsPlayerConfigOpen(false)}
      />

      <Popup title="Map" isOpen={isMapOpen}>
        <div className="flex flex-col">
          <div className="p-2 flex flex-row-reverse gap-2">
            <Button
              text="Close"
              variant="outlined"
              onClick={() => {
                setIsMapOpen(false);
              }}
            />
          </div>
          <Map />
        </div>
      </Popup>
    </div>
  );
}
