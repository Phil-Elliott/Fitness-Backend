import express from "express";
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import AppError from "./utils/appError";

dotenv.config({ path: "./config.env" });

const app = express();

// Trust first proxy
app.set("trust proxy", 1);

// Global middleware

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate limiting
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser
app.use(express.json({ limit: "10kb" }));

// Set security HTTP headers
app.use(helmet());

// Enable CORS
// const corsOptions = {
//   origin: "https://timely-lollipop-f90b7b.netlify.app",
//   // origin: "http://localhost:5173",
//   credentials: true,
// };

// app.use(cors(corsOptions));

// ROUTES

// 404 route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    error: err.message || "Internal Server Error",
  });
});

export default app;
