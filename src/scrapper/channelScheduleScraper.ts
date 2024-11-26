import { HTMLElement } from "node-html-parser";

import { now, parseTime, plusOneDay } from "../utils/dateTimeUtils";
import { findLast, last, replace } from "../utils/collectionUtils";
import { toString } from "../utils/stringUtils";
import { Program, Schedule } from "../domain/schedule";

const CHANNEL_SCHEDULE_SELECTOR = "ul.program-info > li.fila > div";
const CHANNEL_URL_SELECTOR = "a.j_ficha";
const CHANNEL_NAME_SELECTOR = "li.title";
const CHANNEL_START_TIME_SELECTOR = "li.time";

const CHANNEL_URL_ATTRIBUTE = "href"

const toChannelSchedule = (html: HTMLElement) => {
    const channelScheduleElement = html.querySelectorAll(CHANNEL_SCHEDULE_SELECTOR);
    const channelSchedule = channelScheduleElement.map(toProgram);
    const fixedChannelSchedule = toFixedChannelSchedule(channelSchedule);
  
    return channelScheduleWithLiveProgram(fixedChannelSchedule);
};

const toProgram = (channelProgramEelement: HTMLElement): Program => {
    return {
      url: toString(channelProgramEelement.querySelector(CHANNEL_URL_SELECTOR)?.getAttribute(CHANNEL_URL_ATTRIBUTE)),
      name: toString(channelProgramEelement.querySelector(CHANNEL_NAME_SELECTOR)?.innerText),
      startTime: parseTime(toString(channelProgramEelement.querySelector(CHANNEL_START_TIME_SELECTOR)?.innerText)),
      isCurrentlyLive: false
    }
};

const toFixedChannelSchedule = (schedule: Schedule) => {
    return schedule.reduce((programs: Schedule, program: Program) => {
        const currentProgram = toFixedProgram(program, last(programs));
        return [...programs, currentProgram];
    }, []);
};
  
const toFixedProgram = (program: Program, lastProgram: Program | undefined) => {
    const { startTime } = program;
    const fixedTime = lastProgram?.startTime && lastProgram.startTime > startTime ? plusOneDay(startTime) : startTime;
  
    return { ...program, startTime: fixedTime };
};
  
const channelScheduleWithLiveProgram = (programs: Program[]): Program[] => {
    const currentProgram = findLast(programs, (program) => program.startTime < now());
    return currentProgram ? scheduleWithLiveProgram(programs, currentProgram) : programs;
};
  
const scheduleWithLiveProgram = (programs: Program[], currentProgram: Program): Program[] => {
    return replace(currentProgram)
        .in(programs)
        .with({ ...currentProgram, isCurrentlyLive: true });
};
  
export const channelScheduleScraper = { toChannelSchedule };