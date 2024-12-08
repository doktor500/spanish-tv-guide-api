import { DateTime, Duration, FixedOffsetZone } from "luxon";

const EUROPE_MADRID_OFFSET_TO_UTC = "UTC+1";

const oneDay = Duration.fromObject({ day: 1 });
const zone = FixedOffsetZone.parseSpecifier(EUROPE_MADRID_OFFSET_TO_UTC);

const now = () => DateTime.now().setZone(zone).toJSDate();
const parseTime = (time: string) => DateTime.fromISO(`${currentDate()}${time}`, { zone }).toJSDate();
const plusOneDay = (date: Date) => DateTime.fromJSDate(date).plus(oneDay).toJSDate();
const currentDate = () => now().toISOString().substring(0, 11);

export { now, parseTime, plusOneDay };