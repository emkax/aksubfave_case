import express from "express";
import dotenv from "dotenv";
import newsRoute from "./routes/news.route.js"
import userRoute from "./routes/user.route.js"

import { errorHandler } from "./middleware/errorHandler.js";

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: {message : "too many requests, try again later"}
})

dotenv.config();

const app = express();

app.use(express.json());

app.use(limiter);

app.use("/api/news",newsRoute);
app.use("/api/user",userRoute);

app.use(errorHandler);

const PORT = 8000;
app.listen(PORT,() => {
    console.log(`Listening on ${PORT}`);
})