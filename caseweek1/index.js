const express = require('express');

const app = express();

const PORT = 8000;

app.use(express.json());

const booksRoutes = require("./routes/bookroute.js");

app.use('/books',booksRoutes)

app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`)
})