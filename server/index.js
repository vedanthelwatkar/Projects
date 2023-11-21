import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import commentRoutes from "./routes/comment.js";
import videoRoutes from "./routes/video.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();

// Use cors middleware for more concise setup
app.use(
  cors({
    origin: "https://vtube-ytclone.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE",
    allowedHeaders: "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers",
    credentials: true,
    exposedHeaders: ["Access-Control-Allow-Private-Network"],
    maxAge: 7200,
  })
);

dotenv.config();
console.log('CORS middleware applied');
app.use(express.json());

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err);

  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8000, () => {
  connect();
  console.log("Server ready");
});
