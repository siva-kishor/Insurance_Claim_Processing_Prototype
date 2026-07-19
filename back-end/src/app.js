import express from "express";
import authRoutes from "../src/routes/authRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

//middleware
app.use(express.json());

//API routes
app.use("/auth", authRoutes);

//Test
app.get("/test", (req, res) => {
  res.json({ message: "You reached Test Route" });
});
export default app;
