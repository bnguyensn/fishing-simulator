import { Map } from './components/Map';
import { Fishing, Goal } from './components/Fishing';
import { FishingLog } from './components/FishingLog';
import { Button } from './components/Button';
import { useState } from 'react';
import { Popup } from './components/Popup';
import { ControlPanel } from './components/ControlPanel';
import { PlayerConfig } from './components/PlayerConfig';
import { Inventory } from './components/Inventory';
import { WorldStatus } from './components/WorldStatus';
import { useAppStore, WorldLocation } from './store/store';
import { DEFAULT_UNNAMED_PLAYER_NAME } from './config/config';
import { Avatar } from './components/Avatar';

const GOAL_WIDTH = 30;

const goals: Goal[] = [
  { id: 1, start: 0, width: GOAL_WIDTH },
  { id: 2, start: 80, width: GOAL_WIDTH },
  { id: 3, start: 250, width: GOAL_WIDTH },
];

export default function App() {
  const { name, avatar, hp, terror } = useAppStore((state) => state.player);

  const [isPlayerConfigOpen, setIsPlayerConfigOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const playerLocation = useAppStore((state) => state.playerLocation);
  const setPlayerLocation = useAppStore((state) => state.setPlayerLocation);

  return (
    <div className="relative h-screen bg-slate-900 text-white flex flex-col font-serif">
      <div className="px-4 py-2 flex flex-col gap-3">
        <div className="flex gap-2">
          <Avatar src={avatar} alt="Your photo" />
          <div className="overflow-hidden">
            <h1 className="truncate">
              Captain {name || DEFAULT_UNNAMED_PLAYER_NAME}
            </h1>
            <p>{`Health: ${hp}`}</p>
            <p>{`Terror: ${terror}`}</p>
          </div>
        </div>

        <WorldStatus />

        <div className="flex gap-2 flex-wrap justify-center">
          <Button
            text="To the sea!"
            disabled={playerLocation === WorldLocation.THE_SEA}
            onClick={() => setPlayerLocation(WorldLocation.THE_SEA)}
          />
          <Button
            text="Return home"
            disabled={playerLocation === WorldLocation.THE_DOCKS}
            onClick={() => setPlayerLocation(WorldLocation.THE_DOCKS)}
          />
        </div>

        {playerLocation === WorldLocation.THE_SEA && (
          <div className="flex w-full justify-center">
            <Fishing goals={goals} />
          </div>
        )}
      </div>

      <ControlPanel
        togglePlayerConfig={() => {
          setIsPlayerConfigOpen(true);
        }}
        toggleInventory={() => {
          setIsInventoryOpen(true);
        }}
        toggleMap={() => {
          setIsMapOpen(true);
        }}
      />

      <PlayerConfig
        isOpen={isPlayerConfigOpen}
        close={() => setIsPlayerConfigOpen(false)}
      />

      <FishingLog />

      <Inventory
        isOpen={isInventoryOpen}
        close={() => setIsInventoryOpen(false)}
      />

      <Popup title="Map" isOpen={isMapOpen}>
        <div className="p-2 flex flex-col">
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
