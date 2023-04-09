import { Map } from './components/Map';
import { Fishing, Goal } from './components/Fishing';
import { FishingLog } from './components/FishingLog';
import { Button } from './components/Button';
import { useState } from 'react';
import { Popup } from './components/Popup';

const GOAL_WIDTH = 30;

const goals: Goal[] = [
  { id: 1, start: 0, width: GOAL_WIDTH },
  { id: 2, start: 80, width: GOAL_WIDTH },
  { id: 3, start: 250, width: GOAL_WIDTH },
];

export default function App() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="text-3xl">Fishing Simulator</h1>

      <div className="flex gap-2">
        <Button
          text="Map"
          onClick={() => {
            setIsMapOpen(true);
          }}
        />
      </div>

      <Fishing goals={goals} />

      <FishingLog />

      <Popup title="Map" isOpen={isMapOpen}>
        <div className="flex flex-col">
          <Map />
          <div className="p-2 flex flex-row-reverse gap-2">
            <Button
              text="Close"
              variant="outlined"
              onClick={() => {
                setIsMapOpen(false);
              }}
            />
          </div>
        </div>
      </Popup>
    </div>
  );
}
