const mongoose = require("mongoose");

const timeLogSchema = new mongoose.Schema({
  userId: String,
  domain: String,
  secondsSpent: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TimeLog", timeLogSchema);
