import { ReelRecordType, useAppStore } from '../store/store';

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'short',
  timeStyle: 'long',
});

export function FishingLog() {
  const reelRecords = useAppStore((state) => state.reelRecords);

  return (
    <div className="flex flex-col-reverse gap-1">
      {reelRecords.map(({ timestamp, type }) => {
        const formattedTimestamp = timeFormatter.format(timestamp);
        const text = `${formattedTimestamp}: ${
          type === ReelRecordType.HIT ? '✅' : '❌'
        } ${type}`;
        return <div key={timestamp}>{text}</div>;
      })}
    </div>
  );
}
