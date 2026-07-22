import express from "express";
import authRoutes from "../src/routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import claimRoutes from "./routes/claimRoutes.js";

const app = express();

//Parsing Middleware
app.use(express.json());
app.use(cookieParser());

//API routes
app.use("/auth", authRoutes);
app.use("/claims", claimRoutes);

//Test
app.get("/test", (req, res) => {
  res.json({ message: "You reached Test Route" });
});

app.use(globalErrorHandler);
export default app;
