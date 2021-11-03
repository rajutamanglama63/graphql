const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoURI, {
            useNewUrlParser : true
        });
        console.log("MongoDB connection established...");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;