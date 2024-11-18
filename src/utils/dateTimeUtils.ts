import { DateTime, Duration, FixedOffsetZone } from "luxon";

export const DATE_PATTERN = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
const EUROPE_MADRID_OFFSET_TO_UTC = "UTC+1";

const oneDay = Duration.fromObject({ day: 1 });
const zone = FixedOffsetZone.parseSpecifier(EUROPE_MADRID_OFFSET_TO_UTC);

const now = () => DateTime.now().toJSDate();
const parseTime = (time: string) => DateTime.fromISO(`${currentDate()}${time}`, { zone }).toJSDate();
const plusOneDay = (date: Date) => DateTime.fromJSDate(date).plus(oneDay).toJSDate();
const currentDate = () => now().toISOString().substring(0, 11);

export { now, parseTime, plusOneDay };