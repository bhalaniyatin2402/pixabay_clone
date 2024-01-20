import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectToDB from "./config/db.config.js";

config();
connectToDB();

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.CLIENT_URL],
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true,
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
    ],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.status(200).send("welcome to paxibay_api");
});

// importing all routes
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

// assign different routes to base urls
app.use("/api/user", userRoutes);

// error handler
app.use(errorMiddleware);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
