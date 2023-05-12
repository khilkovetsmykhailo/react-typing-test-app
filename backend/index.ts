import express from "express";
import dotenv from "dotenv";
import apiRouter from "./routes";
import dbConnect from "./config/mongoose";

dotenv.config();

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/typing-test";

dbConnect(DB_URL).then(() => {
  const app = express();

  app.use(express.json());

  app.use("/api", apiRouter);

  app.listen(3001, () => {
    console.log("listening on http://localhost:3001");
  });
});
