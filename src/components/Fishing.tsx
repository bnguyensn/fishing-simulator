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

export function Fishing({ goals }: FishingProps) {
  return (
    <div
      className={`relative h-10 border`}
      style={{ width: `${TOTAL_WIDTH}px` }}
    >
      {goals.map(({ id, start, width }) => (
        <div
          key={id}
          className={`absolute top-0 h-full bg-green-500`}
          style={{
            left: `${normalizeStart(start, TOTAL_WIDTH)}px`,
            width: `${width}px`,
          }}
        />
      ))}
    </div>
  );
}
