import express from "express";
import app from "./app.js";
import "dotenv/config";
import { prisma, connectDb, disconnectDb } from "../src/config/db.js";
import http from "http";

await connectDb();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running at Port: ${PORT}`);
});

//Error handling

//Handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection: ${err}`);
  server.close(async () => {
    await disconnectDb();
    process.exit(1);
  });
});

//Handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err}`);
  server.close(async () => {
    await disconnectDb();
    process.exit(1);
  });
});

//SIGTERM - SIGNAL FOR GRACEFUL SHUTDOWN
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDb();
    process.exit(0);
  });
});
