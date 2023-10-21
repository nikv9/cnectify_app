import express from "express";
import "dotenv/config";

// app config
const app = express();
const port = process.env.port || 5000;

// database connection
import connectDB from "./config/db.js";
connectDB();

// import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import errorMdlwr from "./middlewares/error_mdlwr.js";
import authRoute from "./routes/auth_route.js";
import userRoute from "./routes/user_route.js";
import postRoute from "./routes/post_route.js";
import cloudinary from "cloudinary";

// middlewares
// app.use(cors());

// app.use(express.limit("4mb"));
app.use(express.json());

// app.use(bodyParser.json({ limit: "150mb" }));
// app.use(
//   bodyParser.urlencoded({
//     // to support URL-encoded bodies
//     limit: "150mb",
//     extended: true,
//   })
// );

// app.use(
//   fileUpload({
//     limits: { fileSize: 2000 * 1024 * 1024 },
//   })
// );
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
