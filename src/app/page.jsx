import React from "react";
import loginAction from "./actions";
import LoginForm from "../components/Login";
import sendDraftReminders from "../sendEmail";
import { getScheduler } from "../database/scheduler";
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");
export const timeScheduler = database.collection("scheduler");

const cron = require("node-cron");

const scheduler = await timeScheduler.findOne({ scheduleName: 'draftReminderSchedule' });
const cronSchedule = scheduler.cronSchedule;

//At 16:00 on Friday send draft reminders
//https://crontab.guru/#00_16_*_*_5
cron.schedule(cronSchedule, () => {
  console.log("Running scheduled task to send draft reminders...");
  sendDraftReminders();
});

export default function LoginPage() {
  console.log("Scheduler: ", cronSchedule);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>LOGIN</h1>
      <LoginForm action={loginAction} />
    </div>
  );
}
