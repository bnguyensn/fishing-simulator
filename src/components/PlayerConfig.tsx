import { Button } from './Button';
import { Input } from './Input';
import { Popup } from './Popup';
import { useAppStore } from '../store/store';
import { useState } from 'react';

export interface PlayerConfigProps {
  isOpen: boolean;
  close: () => void;
}

export function PlayerConfig({ isOpen, close }: PlayerConfigProps) {
  const playerName = useAppStore((state) => state.player.name);
  const updatePlayer = useAppStore((state) => state.updatePlayer);

  const [playerNameLocal, setPlayerNameLocal] = useState(playerName);

  return (
    <Popup
      title={`Hello, ${playerName || 'mysterious stranger'}!`}
      isOpen={isOpen}
    >
      <div className="flex flex-col">
        <div className="p-2 flex flex-row-reverse gap-2">
          <Button
            text="Close"
            variant="outlined"
            onClick={() => {
              setPlayerNameLocal(playerName);
              close();
            }}
          />
          <Button
            text="Save"
            variant="contained"
            onClick={() => {
              updatePlayer({ name: playerNameLocal });
            }}
            disabled={playerName === playerNameLocal}
          />
        </div>

        <Input
          label="Name"
          value={playerNameLocal}
          setValue={(newValue) => {
            setPlayerNameLocal(newValue);
          }}
          placeholder="mysterious stranger"
        />
      </div>
    </Popup>
  );
}
