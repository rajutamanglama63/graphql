const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name : {
        type : String
    },
    genre : {
        type : String
    },
    authorId : {
        type : String
    }
});

const Book = mongoose.model("book", bookSchema);

module.exports = Book;