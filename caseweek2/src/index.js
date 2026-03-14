import express from "express";
import dotenv from "dotenv";
import newsRoute from "./routes/news.route.js"

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api",newsRoute)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

const PORT = 8000;
app.listen(PORT,() => {
    console.log(`Listening on ${PORT}`);
})