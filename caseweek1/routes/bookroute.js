const express = require('express');
const router = express.Router();
const path = require('path')

const bookController = require(path.join(__dirname,"..","controllers","bookController.js"));

router.get('/listBooks',bookController.listBooks);
router.post('/addBook',bookController.addBook);
router.put('/editBook/:id',bookController.editBook);
router.delete('/deleteBook/:id',bookController.deleteBook)

module.exports = router;