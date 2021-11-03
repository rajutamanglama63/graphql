const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name : {
        type : String
    },
    age : {
        type : Number
    }
});

const Author = mongoose.model("author", authorSchema);

module.exports = Author;