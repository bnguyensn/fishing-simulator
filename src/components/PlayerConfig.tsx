import { Button } from './Button';
import { Input } from './Input';
import { Popup } from './Popup';
import { useAppStore } from '../store/store';
import { useState } from 'react';
import { Select, SelectOption } from './Select';

const avatarOptions: SelectOption[] = [
  { value: '', label: 'None' },
  { value: '/captain-male.webp', label: 'Male captain' },
  { value: '/captain-female.webp', label: 'Female captain' },
];

export interface PlayerConfigProps {
  isOpen: boolean;
  close: () => void;
}

export function PlayerConfig({ isOpen, close }: PlayerConfigProps) {
  const playerName = useAppStore((state) => state.player.name);
  const playerAvatar = useAppStore((state) => state.player.avatar);
  const updatePlayer = useAppStore((state) => state.updatePlayer);

  const [playerNameLocal, setPlayerNameLocal] = useState(playerName);
  const [playerAvatarLocal, setPlayerAvatarLocal] = useState(playerAvatar);

  return (
    <Popup
      title={`Hello, ${playerName || 'mysterious stranger'}!`}
      isOpen={isOpen}
    >
      <div className="p-2 flex flex-col">
        <div className="p-2 flex flex-row-reverse gap-2">
          <Button
            text="Close"
            variant="outlined"
            onClick={() => {
              setPlayerNameLocal(playerName);
              setPlayerAvatarLocal(playerAvatar);
              close();
            }}
          />
          <Button
            text="Save"
            variant="contained"
            onClick={() => {
              updatePlayer({
                name: playerNameLocal,
                avatar: playerAvatarLocal,
              });
            }}
            disabled={
              playerName === playerNameLocal &&
              playerAvatar === playerAvatarLocal
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          {playerAvatarLocal ? (
            <img
              src={playerAvatarLocal}
              alt="Your profile"
              className="w-20 h-20 rounded-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-md bg-gray-300 flex justify-center items-center text-center text-sm">
              No photo available
            </div>
          )}

          <Input
            label="Name"
            value={playerNameLocal}
            setValue={(newValue) => {
              setPlayerNameLocal(newValue);
            }}
            placeholder="mysterious stranger"
          />

          <Select
            label="Avatar"
            value={playerAvatarLocal}
            setValue={(newValue) => setPlayerAvatarLocal(newValue)}
            options={avatarOptions}
          />
        </div>
      </div>
    </Popup>
  );
}
