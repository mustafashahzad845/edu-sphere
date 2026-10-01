import express from "express";
import { PORT, MONGODB_URI } from "./config/env.js";
import connectDB from "./config/db.js";
import { setServers } from "node:dns/promises";
import { signUp } from "./controllers/auth.js";

const app = express();

setServers(["8.8.8.8", "1.1.1.1"]);

connectDB(MONGODB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, response) => {
  response.json({
    success: true,
  });
});

app.post("/api/signup", signUp);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
