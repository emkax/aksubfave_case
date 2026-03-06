const { v4: uuidv4 } = require('uuid');

const allowedGenres = [
  "Fiction",
  "Non-Fiction",
  "Technology",
  "Horror",
  "History",
  "Biography",
  "Science",
  "Romance"
];

let books = [
];

exports.listBooks = (req,res) => {
    try {
        res.status(200).json({data : books});
    } catch (error){
        console.log("Error retrieving book:",error);
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

exports.addBook = (req,res) => {
    try {
        const {judul,penulis,genre,tahunTerbit,stok} = req.body;

        if (!judul || !penulis || !genre || !tahunTerbit || !stok) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!allowedGenres.includes(genre)) {
            return res.status(400).json({ message: "Invalid genre" });
        }

        const payload = {
            id : uuidv4(),
            judul,
            penulis,
            genre,
            tahunTerbit,
            stok,
        }

        books.push(payload);

        res.status(201).json({
            message:`successfully added book with id ${payload.id}`,
            data: payload
        });
    } catch (error){
        console.log("Error adding book :",error);
        return res
            .status(500)
            .json({ message: "Internal server error", error : error.message });
    }
}

exports.editBook = (req,res) => {
    try {
        const { id } = req.params;
        const {judul,penulis,genre,tahunTerbit,stok} = req.body;

        const index = books.findIndex(book => book.id === id);

        if (!judul || !penulis || !genre || !tahunTerbit || stok === undefined) {
            return res.status(400).json({message: "All fields are required"});
        }

        if (typeof tahunTerbit !== 'number' || typeof stok !== 'number') {
            return res.status(400).json({message: "tahunTerbit and stok must be numbers"});
        }

        if (index === -1){
            return res.status(404).json({message : `Book with id ${id} not found`});
        }

        books[index] = {
            ...books[index],
            judul,
            penulis,
            genre,
            tahunTerbit,
            stok
        }


        res.status(200).json({
            message : `book with id : ${id} succesfully updated`,
            data : books[index]
        });
    } catch (error){
        console.error("Error updating book:", error);
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

exports.deleteBook = (req,res) => {
    try {
        const {id} = req.params;
        const index = books.findIndex(books => books.id === id);
        
        if (index === -1){
            return res.status(404).json({message : `Book with id ${id} not found`});
        }

        deletedBook = books[index];
        books.splice(index,1);
        
        return res.status(202).json({
            message: `Book with id ${id} successfully deleted`,
            data: deletedBook,
        });
    } catch (error){
        console.error("Error deleting book:", error);
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}