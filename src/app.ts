import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import { Request, Response, NextFunction } from "express";
import http from "http";
import pkg from "body-parser";
const { json } = pkg;
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import AppError from "./utils/appError";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers/resolvers";
import bodyParser from "body-parser";

// Load environment variables
dotenv.config({ path: "./config.env" });

// Initialize express app and create HTTP server.
const app = express();
const httpServer = http.createServer(app);

// Trust first proxy
app.set("trust proxy", 1);

// Logging for development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json({ limit: "10kb" }));

// Rate limiting
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Start Apollo Server and set up middleware for it
(async () => {
  await server.start();
  app.use(cors(), bodyParser.json(), expressMiddleware(server));
})();

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    error: err.message || "Internal Server Error",
  });
});

export { app, httpServer };

/*

// Enable CORS
// const corsOptions = {
//   origin: "https://timely-lollipop-f90b7b.netlify.app",
//   // origin: "http://localhost:5173",
//   credentials: true,
// };

// app.use(cors(corsOptions));

// 404 route
// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

(async () => {
  await server.start();
  app.use(cors(), bodyParser.json(), expressMiddleware(server));
})();
*/
