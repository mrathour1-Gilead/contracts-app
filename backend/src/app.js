import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
// import authRoutes from "./routes/authRoutes.js";
import resetRoutes from "./routes/resetRoutes.js";
import contractsRoutes from "./routes/contractsRoutes.js";
// import { authMiddleware } from "./middleware/auth.js";

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

// app.use("/api/auth", authRoutes);
app.use("/api/reset", resetRoutes);
app.use("/api/contracts", contractsRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

app.use((err, req, res, next) => {
  console.error("Express Route Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(8000, () => console.log("🚀 Server running on http://localhost:8000"));
