require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const contentRoutes = require("./routes/content.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// // Routes
app.use("/api/auth", authRoutes);
app.use("/api/contents", contentRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Content Subscription API is running!");
});

app.use(errorHandler);

module.exports = app;
