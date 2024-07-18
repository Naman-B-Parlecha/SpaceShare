import "dotenv/config";
import express from "express";
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import testRouter from "./routes/test.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/post", postRouter);

app.use("/api/auth", authRouter);

app.use("/api/test", testRouter);

app.listen(8080, () => {
  console.log("Connected to server!");
});
