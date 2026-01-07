import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API running on port : " + PORT);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
