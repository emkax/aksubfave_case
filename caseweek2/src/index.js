import express from "express";
import dotenv from "dotenv";
import newsRoute from "./routes/news.route.js"
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api",newsRoute);

app.use(errorHandler);

const PORT = 8000;
app.listen(PORT,() => {
    console.log(`Listening on ${PORT}`);
})