import express from "express";
import mongoose, { mongo } from "mongoose";
import userRouter from './routes/user.route.js';
import dotenv from "dotenv";

dotenv.config();
const app = express();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MONGODB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

app.use("/api/user", userRouter);