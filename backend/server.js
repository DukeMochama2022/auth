require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "https://auth-git-main-projects-projects-17ce6fbc.vercel.app",
  })
);
app.use(helmet());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// TODO: Add routes for authentication and users

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
