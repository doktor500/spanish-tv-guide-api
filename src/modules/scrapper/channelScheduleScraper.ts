import { HTMLElement } from "node-html-parser";

import { parseTime, plusOneDay } from "@/modules/utils/dateTimeUtils";
import { last } from "@/modules/utils/collectionUtils";
import { toString } from "@/modules/utils/stringUtils";
import { Program, Schedule } from "@/modules/domain/schedule";

const CHANNEL_SCHEDULE_SELECTOR = "ul.program-info > li.fila > div";
const CHANNEL_URL_SELECTOR = "a";
const CHANNEL_NAME_SELECTOR = "li.title";
const CHANNEL_START_TIME_SELECTOR = "li.time";

const CHANNEL_URL_ATTRIBUTE = "href"

const toChannelSchedule = (html: HTMLElement) => {
    const channelScheduleElement = html.querySelectorAll(CHANNEL_SCHEDULE_SELECTOR);
    const channelSchedule = channelScheduleElement.map(toProgram);
    return toFixedChannelSchedule(channelSchedule);
};

const toProgram = (channelProgramElement: HTMLElement): Program => {
    return {
      url: toString(channelProgramElement.querySelector(CHANNEL_URL_SELECTOR)?.getAttribute(CHANNEL_URL_ATTRIBUTE)),
      name: toString(channelProgramElement.querySelector(CHANNEL_NAME_SELECTOR)?.innerText),
      startTime: parseTime(toString(channelProgramElement.querySelector(CHANNEL_START_TIME_SELECTOR)?.innerText)),
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

export const channelScheduleScraper = { toChannelSchedule };