require("dotenv").config();
const mongoose = require("mongoose");
const TimeLog = require("../models/TimeLog");

const demoLogs = [];
const userId = "demo";

const domains = [
  "github.com",
  "stackoverflow.com",
  "w3schools.com",
  "google.com",
  "youtube.com",
  "twitter.com",
  "instagram.com",
];

for (let day = 0; day < 7; day++) {
  const date = new Date();
  date.setDate(date.getDate() - (6 - day));
  date.setHours(10, 0, 0, 0);

  for (let i = 0; i < 3; i++) {
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const secondsSpent = Math.floor(Math.random() * 1200) + 60;
    demoLogs.push({ userId, domain, secondsSpent, date: new Date(date) });
    date.setHours(date.getHours() + 1);
  }
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await TimeLog.deleteMany({ userId });
    await TimeLog.insertMany(demoLogs);
    console.log("Demo data inserted");
    process.exit();
  })
  .catch((err) => console.error(err));
