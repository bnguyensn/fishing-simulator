import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

export interface Player {
  name: string;
  avatar: string;
  hp: number;
  position: [number, number];
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
      reelRecords: [],
      addReelRecord: (reelRecord) =>
        set((state) => {
          state.reelRecords.push(reelRecord);
        }),
    }))
  )
);
