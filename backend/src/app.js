import  "./config/env.js";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import contractRoutes from "./routes/contractRoutes.js";
import dropdownOptionRoutes from "./routes/dropdownOptionRoutes.js";
import { authMiddleware } from "./middleware/auth.js";
import { initDB } from "./config/dbInit.js";

const app = express();

app.use(cors());
app.use(express.json());

// Global API rate limit (fixes CodeQL warnings)
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Prevent server crash on unexpected errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

app.use("/api", apiLimiter);

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});

app.disable("etag");

app.use("/api/auth", authRoutes);
app.use("/api/contracts", authMiddleware, contractRoutes);
app.use("/api/dropdownOptions", authMiddleware, dropdownOptionRoutes);

app.get("/api/health", (_, res) => res.send("OK"));

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const start = async () => {
  await initDB();
  app.listen(8000, () => console.log("Server running"));
};

start();