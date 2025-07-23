const express = require("express");
const router = express.Router();
const classify = require("../utils/classify");

router.get("/", (req, res) => {
  const { domain } = req.query;
  if (!domain) {
    return res.status(400).json({ message: "Missing domain parameter" });
  }

  const classification = classify(domain);
  res.status(200).json({ domain, classification });
});

module.exports = router;
