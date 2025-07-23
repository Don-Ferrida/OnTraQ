require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const classifyRoutes = require("./routes/classify");
const trackerRoutes = require("./routes/tracker");
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api", trackerRoutes);
app.use("/api/classify", classifyRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`OnTraQ backend running on port ${PORT}`));
