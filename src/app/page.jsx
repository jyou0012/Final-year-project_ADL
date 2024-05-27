import React from "react";
import loginAction from "./actions";
import LoginForm from "../components/Login";
import sendDraftReminders from "../sendEmail";
const cron = require("node-cron");

//At 16:00 on Friday send draft reminders
//https://crontab.guru/#00_16_*_*_5
cron.schedule("*/2 * * * *", () => {
  console.log("Running scheduled task to send draft reminders...");
  sendDraftReminders();
});

export default function LoginPage() {
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
