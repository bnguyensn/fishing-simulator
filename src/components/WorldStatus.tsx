import { WorldState, useAppStore, WeatherStatus } from '../store/store';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

type DateTimeTexts = Partial<
  Record<keyof Intl.DateTimeFormatPartTypesRegistry, string>
>;

const getDateTimeTexts = ({
  date,
  time,
}: Pick<WorldState, 'date' | 'time'>): DateTimeTexts => {
  return dateFormatter
    .formatToParts(
      new Date(date.year, date.month, date.day, time.hour, time.minute)
    )
    .reduce<DateTimeTexts>((acc, cur) => {
      acc[cur.type] = cur.value;
      return acc;
    }, {});
};

const weatherIcon: Record<WeatherStatus, string> = {
  [WeatherStatus.SUNNY]: '☀️',
  [WeatherStatus.CLOUDY]: '☁️',
  [WeatherStatus.RAINY]: '🌧️',
  [WeatherStatus.THUNDERSTORM]: '⛈️',
};

export function WorldStatus() {
  const { date, time, weather } = useAppStore((state) => state.worldState);

  const dateTime = getDateTimeTexts({ date, time });

  const statusText = `${dateTime.day} ${dateTime.month}, ${dateTime.year} | ${dateTime.hour}:${dateTime.minute} | ${weather} ${weatherIcon[weather]}`;

  return (
    <div className="flex flex-col gap-0.5">
      <div>{statusText}</div>
    </div>
  );
}
