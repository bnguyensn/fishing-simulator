import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

export interface Player {
  name: string;
  avatar: string;
  hp: number;
  terror: number;
  position: [number, number];
}

export interface Item {
  id: string;
  name: string;
  description: string;
  obtainedTimestamp: number;
}

export enum ReelRecordType {
  'HIT' = 'HIT',
  'MISS' = 'MISS',
}

export interface ReelRecord {
  timestamp: number;
  type: ReelRecordType;
}

export interface AppState {
  player: Player;
  updatePlayer: (newValue: Partial<Player>) => void;
  inventory: Item[];
  reelRecords: ReelRecord[];
  addReelRecord: (reelRecord: ReelRecord) => void;
}

export const useAppStore = create<AppState>()(
  immer(
    devtools((set) => ({
      player: {
        name: '',
        avatar: '',
        hp: 10,
        position: [5, 5],
      },
      updatePlayer: (newValue) =>
        set((state) => {
          state.player = { ...state.player, ...newValue };
        }),

      inventory: [],

      reelRecords: [],
      addReelRecord: (reelRecord) =>
        set((state) => {
          state.reelRecords.push(reelRecord);
        }),
    }))
  )
);
