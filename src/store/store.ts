import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

export enum ReelRecordType {
  'HIT' = 'HIT',
  'MISS' = 'MISS',
}

export interface ReelRecord {
  timestamp: number;
  type: ReelRecordType;
}

export interface AppState {
  reelRecords: ReelRecord[];
  addReelRecord: (reelRecord: ReelRecord) => void;
}

export const useAppStore = create<AppState>()(
  immer(
    devtools((set) => ({
      reelRecords: [],
      addReelRecord: (reelRecord) =>
        set((state) => {
          state.reelRecords.push(reelRecord);
        }),
    }))
  )
);
