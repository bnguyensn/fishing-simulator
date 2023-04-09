import { Map } from './components/Map';
import { Fishing, Goal } from './components/Fishing';
import { FishingLog } from './components/FishingLog';

const GOAL_WIDTH = 30;

const goals: Goal[] = [
  { id: 1, start: 0, width: GOAL_WIDTH },
  { id: 2, start: 80, width: GOAL_WIDTH },
  { id: 3, start: 250, width: GOAL_WIDTH },
];

export default function App() {
  return (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="text-3xl">Fishing Simulator</h1>

      <Fishing goals={goals} />

      <FishingLog />

      <Map />
    </div>
  );
}
