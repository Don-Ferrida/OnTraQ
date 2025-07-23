const express = require("express");
const router = express.Router();
const TimeLog = require("../models/TimeLog");
const classify = require("../utils/classify");

router.post("/track", async (req, res) => {
  const { userId, domain, secondsSpent } = req.body;
  if (!userId || !domain || !secondsSpent) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const log = new TimeLog({ userId, domain, secondsSpent });
    await log.save();
    res.status(200).json({ message: "Time logged successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/report", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: "Missing userId" });

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  try {
    const logs = await TimeLog.find({
      userId,
      date: { $gte: startOfWeek },
    });

    const summary = {};
    for (const log of logs) {
      const category = classify(log.domain);
      if (!summary[category]) summary[category] = 0;
      summary[category] += log.secondsSpent;
    }

    res.status(200).json({ summary, logs });
  } catch (err) {
    res.status(500).json({ message: "Error generating report" });
  }
});

router.get("/logs/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const logs = await TimeLog.find({ userId });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching logs" });
  }
});

module.exports = router;
