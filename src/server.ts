import app from "./app";
import { prisma } from "./prisma";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../config.env") });

const PORT: number = +process.env.PORT! || 3000;

const server = app.listen(PORT, (error?: any) => {
  if (error) {
    console.error(`[server]: Error starting server: ${error.message}`);
    return;
  }
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  prisma.$disconnect().then(() => {
    server.close(() => {
      console.log("Process terminated!");
    });
  });
});

process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
