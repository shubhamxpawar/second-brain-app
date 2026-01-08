import dotenv from "dotenv"
dotenv.config()

import express from "express";
import all_routes from "./routes";

const app = express();
const PORT = 3000;

//db connection
import connectDB from "./db";
connectDB()

app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send("API running on port : " + PORT);
});

app.use("/api", all_routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
