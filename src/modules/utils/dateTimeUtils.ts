import { DateTime, Duration, FixedOffsetZone } from "luxon";

const EUROPE_MADRID_OFFSET_TO_UTC = "UTC+1";
const nightHours = [1, 2, 3, 4, 5];

const oneDay = Duration.fromObject({ day: 1 });
const zone = FixedOffsetZone.parseSpecifier(EUROPE_MADRID_OFFSET_TO_UTC);

const now = () => DateTime.now().setZone(zone).toJSDate();
const parseTime = (time: string) => DateTime.fromISO(`${currentDate()}${time}`, { zone }).toJSDate();
const plusOneDay = (date: Date) => DateTime.fromJSDate(date).plus(oneDay).toJSDate();
const minusOneDay = (date: Date) => DateTime.fromJSDate(date).minus(oneDay).toJSDate();

const currentDate = () => {
  const currentHour = now().getHours();
  const atNight = nightHours.includes(currentHour);
  const time = atNight ? minusOneDay(now()) : now();

  return time.toISOString().substring(0, 11);
}

export { parseTime, plusOneDay };