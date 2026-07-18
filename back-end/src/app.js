import express from "express";

const app = express();

//middleware
app.use(express.json());

//API routes

//Test
app.get("/test", (req, res) => {
  res.json({ message: "You reached Test Route" });
});
export default app;
