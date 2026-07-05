import { DateTime, Duration, IANAZone } from "luxon";

const EUROPE_MADRID_ZONE = "Europe/Madrid";
const nightHours = [1, 2, 3, 4, 5];

const oneDay = Duration.fromObject({ day: 1 });
// The API always subtracts Spain's standard (non-DST) offset when serializing times, so
// the "Z" digits are actually Madrid local time minus a fixed hour, year-round. Add that
// hour back to recover the true Madrid local time, then let the DST-aware Europe/Madrid
// zone derive the correct UTC instant (this differs from a fixed +1h correction in winter,
// when Spain's real offset already matches the API's incorrect assumption).
const zone = IANAZone.create(EUROPE_MADRID_ZONE);

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