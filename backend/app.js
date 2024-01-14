import express from "express";
import "dotenv/config";

// app config
const app = express();
const port = process.env.port || 5000;

// database connection
import connectDB from "./config/db.js";
connectDB();

import cors from "cors";
import cookieParser from "cookie-parser";
import errorMdlwr from "./middlewares/errMdlwr.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import cloudinary from "cloudinary";

// middlewares
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// routes
app.use(authRoute);
app.use(userRoute);
app.use(postRoute);

// cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

// listen
app.listen(port, (req, res) => {
  console.log(`server is running at ${port}`);
});

// error handling middleware
app.use(errorMdlwr);
