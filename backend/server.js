import express from "express";
import { PORT, MONGODB_URI } from "./config/env.js";
import connectDB from "./config/db.js";
import { setServers } from "node:dns/promises";

const app = express();

connectDB(MONGODB_URI);

setServers(["8.8.8.8", "1.1.1.1"]);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
