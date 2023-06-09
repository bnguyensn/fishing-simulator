import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { ItemId } from '../data/items';

export interface Player {
  name: string;
  avatar: string;
  hp: number;
  terror: number;
  position: [number, number];
  inventoryCapacity: number;
}

export interface InventoryItem {
  itemId: ItemId;
  obtainedTimestamp: number;
}

export enum WorldLocation {
  THE_DOCKS = 'THE_DOCKS',
  THE_SEA = 'THE_SEA',
}

export enum ReelRecordType {
  'HIT' = 'HIT',
  'MISS' = 'MISS',
}

export interface ReelRecord {
  timestamp: number;
  type: ReelRecordType;
}

export enum WeatherStatus {
  'SUNNY' = 'Sunny',
  'CLOUDY' = 'Cloudy',
  'RAINY' = 'Rainy',
  'THUNDERSTORM' = 'Thunderstorm',
}

export interface WorldState {
  date: {
    year: number;
    month: number;
    day: number;
  };
  time: {
    hour: number;
    minute: number;
  };
  weather: WeatherStatus;
}

export interface AppState {
  player: Player;
  updatePlayer: (newValue: Partial<Player>) => void;
  inventory: Record<string, InventoryItem>;
  playerLocation: WorldLocation;
  setPlayerLocation: (newValue: WorldLocation) => void;
  reelRecords: ReelRecord[];
  addReelRecord: (reelRecord: ReelRecord) => void;
  worldState: WorldState;
}

export const useAppStore = create<AppState>()(
  immer(
    devtools((set) => ({
      player: {
        name: '',
        avatar: '',
        terror: 0,
        hp: 10,
        position: [5, 5],
        inventoryCapacity: 25, // Should be divisible by 5 to fit the inventory grid
      },
      updatePlayer: (newValue) =>
        set((state) => {
          state.player = { ...state.player, ...newValue };
        }),
      inventory: {
        '4': { itemId: 'fish-1', obtainedTimestamp: 0 },
      },
      playerLocation: WorldLocation.THE_DOCKS,
      setPlayerLocation: (newLocation) =>
        set((state) => {
          state.playerLocation = newLocation;
        }),
      reelRecords: [],
      addReelRecord: (reelRecord) =>
        set((state) => {
          state.reelRecords.push(reelRecord);
        }),
      worldState: {
        date: { day: 1, month: 7, year: 1894 },
        time: { hour: 6, minute: 0 },
        weather: WeatherStatus.CLOUDY,
      },
    }))
  )
);
