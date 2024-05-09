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

import { parseISO, differenceInCalendarDays } from 'date-fns';

export function getCurrentWeek(startDate, breaks) {
    const start = parseISO(startDate);
    let today = new Date();
    let days = differenceInCalendarDays(today, start);

    // Loop through each break period and adjust days count
    breaks.forEach(breakPeriod => {
        const breakStart = parseISO(breakPeriod.start);
        const breakEnd = parseISO(breakPeriod.end);

        if (today > breakEnd) {
            // Subtract the number of days in the break period
            days -= differenceInCalendarDays(breakEnd, breakStart) + 1;
        } else if (today >= breakStart && today <= breakEnd) {
            // If today is during the break, adjust days to the start of the break
            days = differenceInCalendarDays(breakStart, start) - 1;
        }
    });

    // Calculate current week number
    return Math.ceil(days / 7);
}
