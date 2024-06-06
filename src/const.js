import { parseISO, differenceInCalendarDays, isWithinInterval } from "date-fns";

let MongoClient;
if (typeof window === 'undefined') {
  MongoClient = require('mongodb').MongoClient;
}

let client;
if (typeof window === 'undefined') {
  client = new MongoClient(process.env.MONGODB_URI);
}

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
  weeklyTotalHours: "weekly-total-hours",
  Mon: {
    date: "mon-date",
    start: "mon-start",
    end: "mon-end",
    task: "mon-task",
    fit: "mon-fit",
    outcome: "mon-outcome",
    totalHours: "mon-total-hours",
  },
  Tue: {
    date: "tue-date",
    start: "tue-start",
    end: "tue-end",
    task: "tue-task",
    fit: "tue-fit",
    outcome: "tue-outcome",
    totalHours: "tue-total-hours",
  },
  Wed: {
    date: "wed-date",
    start: "wed-start",
    end: "wed-end",
    task: "wed-task",
    fit: "wed-fit",
    outcome: "wed-outcome",
    totalHours: "wed-total-hours",
  },
  Thu: {
    date: "thu-date",
    start: "thu-start",
    end: "thu-end",
    task: "thu-task",
    fit: "thu-fit",
    outcome: "thu-outcome",
    totalHours: "thu-total-hours",
  },
  Fri: {
    date: "fri-date",
    start: "fri-start",
    end: "fri-end",
    task: "fri-task",
    fit: "fri-fit",
    outcome: "fri-outcome",
    totalHours: "fri-total-hours",
  },
};

export async function fetchSemesterInfo() {
  try {
    await client.connect();
    const database = client.db('TimesheetDashboard');
    const configCollection = database.collection('semesterInfo');
    const config = await configCollection.findOne({ semesterName: '2024S1' });

    if (!config) {
      throw new Error('Semester info not found');
    }

    console.log('Fetched semester info:', config);
    return {
      semesterStart: config.semesterStart,
      breaks: [
        { start: config.middleBreakStart, end: config.middleBreakEnd }
      ]
    };
  } catch (error) {
    console.error('Failed to fetch semester info:', error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function getCurrentWeek() {
  try {
    await client.connect();
    const database = client.db('TimesheetDashboard');
    const semesterInfoCollection = database.collection('semesterInfo');
    const semesterInfo = await semesterInfoCollection.findOne({});
    const { semesterStart, middleBreakStart, middleBreakEnd } = semesterInfo;

    if (!semesterStart) {
      throw new Error('Semester start date is undefined');
    }

    const start = parseISO(semesterStart);
    let today = new Date();
    let days = differenceInCalendarDays(today, start);

    console.log(`Today's date: ${today.toISOString()}`);
    console.log(`Semester start date: ${start.toISOString()}`);
    console.log(`Days since semester start: ${days}`);

    const breaks = [{ start: middleBreakStart, end: middleBreakEnd }];
    breaks.forEach((breakPeriod) => {
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

    const currentWeek = Math.ceil((days + 1) / 7);
    console.log(`Calculated current week: ${currentWeek}`);
    return currentWeek;
  } finally {
    await client.close();
  }
}

export async function fetchSemesterDates() {
  if (typeof window === 'undefined') {
    await client.connect();
    const database = client.db("TimesheetDashboard");
    const semesterInfo = database.collection("semesterInfo");
    const result = await semesterInfo.findOne({});
    await client.close();
    return result;
  } else {
    return {}; // return empty object if executed on client side
  }
}
