export const STATE = {
  empty: null,
  draft: "draft",
  final: "final",
};
export const EMPTY = null;
export const DRAFT = "draft";
export const FINAL = "final";

export const weeks = [
  "Week 1",
  "Week 2",
  "Week 3",
  "Week 4",
  "Week 5",
  "Week 6",
  "Week 7",
  "Week 8",
  "Week 9",
  "Week 10",
  "Week 11",
  "Week 12",
];

export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export const inputFields = {
  week: "week",
  state: "state",
  Mon: {
    date: "mon-date",
    start: "mon-start",
    end: "mon-end",
    task: "mon-task",
    fit: "mon-fit",
    outcome: "mon-outcome",
  },
  Tue: {
    date: "tue-date",
    start: "tue-start",
    end: "tue-end",
    task: "tue-task",
    fit: "tue-fit",
    outcome: "tue-outcome",
  },
  Wed: {
    date: "wed-date",
    start: "wed-start",
    end: "wed-end",
    task: "wed-task",
    fit: "wed-fit",
    outcome: "wed-outcome",
  },
  Thu: {
    date: "thu-date",
    start: "thu-start",
    end: "thu-end",
    task: "thu-task",
    fit: "thu-fit",
    outcome: "thu-outcome",
  },
  Fri: {
    date: "fri-date",
    start: "fri-start",
    end: "fri-end",
    task: "fri-task",
    fit: "fri-fit",
    outcome: "fri-outcome",
  },
};

export const SEMESTER_START_DATE = "2024-02-26"; // YYYY-MM-DD format

export const SEMESTER_BREAKS = [
  { start: "2024-04-08", end: "2024-04-21" }
];

import { parseISO, differenceInCalendarDays, isWithinInterval } from 'date-fns';

export function getCurrentWeek(startDate, breaks) {
    const start = parseISO(startDate);
    let today = new Date();
    let days = differenceInCalendarDays(today, start);

    console.log(`Today's date: ${today.toISOString()}`);
    console.log(`Semester start date: ${start.toISOString()}`);
    console.log(`Days since semester start: ${days}`);

    breaks.forEach(breakPeriod => {
        const breakStart = parseISO(breakPeriod.start);
        const breakEnd = parseISO(breakPeriod.end);

        console.log(`Break from ${breakStart.toISOString()} to ${breakEnd.toISOString()}`);

        if (isWithinInterval(today, { start: breakStart, end: breakEnd })) {
            console.log(`Today is within the break.`);
            const daysInBreak = differenceInCalendarDays(today, breakStart) + 1;
            console.log(`Days in current break (up to today): ${daysInBreak}`);
            days -= daysInBreak;
        } else if (today > breakEnd) {
            const breakDuration = differenceInCalendarDays(breakEnd, breakStart) + 1;
            console.log(`Past break duration subtracted: ${breakDuration} days`);
            days -= breakDuration;
        }
    });

    const currentWeek = Math.ceil((days+1) / 7);
    console.log(`Calculated current week: ${currentWeek}`);
    return currentWeek;
}
