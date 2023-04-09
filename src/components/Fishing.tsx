import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { ReelRecordType, useAppStore } from '../store/store';

export interface Goal {
  id: number;
  start: number;
  width: number;
}

export interface FishingProps {
  goals: Goal[];
}

const TOTAL_WIDTH = 300; // px

function normalizeStart(start: number, max: number): number {
  return start % max;
}

export type GoalRange = [number, number];

function getGoalRanges(goals: Goal[]): GoalRange[] {
  return goals.map(({ start, width }) => [start, start + width]);
}

function isInGoalRange(goalRange: GoalRange, x: number): boolean {
  const [start, end] = goalRange;
  return x >= start && x <= end;
}

export function Fishing({ goals }: FishingProps) {
  const addReelRecord = useAppStore((state) => state.addReelRecord);

  const x = useMotionValue(0);

  const primitiveGoals = `${goals.map(({ id }) => id)}`;
  const goalRanges = useMemo(() => getGoalRanges(goals), [primitiveGoals]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'f') {
        const xValue = x.get();
        const isValidHit = goalRanges.some((goalRange) =>
          isInGoalRange(goalRange, xValue)
        );
        if (isValidHit) {
          addReelRecord({
            type: ReelRecordType.HIT,
            timestamp: new Date().getTime(),
          });
        } else {
          addReelRecord({
            type: ReelRecordType.MISS,
            timestamp: new Date().getTime(),
          });
        }
      }
    };

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [x, goalRanges]);

  return (
    <div className="relative h-10 border" style={{ width: `${TOTAL_WIDTH}px` }}>
      {goals.map(({ id, start, width }) => (
        <div
          key={id}
          className="absolute top-0 h-full bg-green-500"
          style={{
            left: `${normalizeStart(start, TOTAL_WIDTH)}px`,
            width: `${width}px`,
          }}
        />
      ))}

      <motion.div
        className="absolute top-0 w-[5px] h-full bg-gray-500"
        style={{ x }}
        animate={{ x: 295 }}
        transition={{
          type: 'tween',
          ease: 'linear',
          duration: 1,
          repeat: Infinity,
        }}
      />
    </div>
  );
}
