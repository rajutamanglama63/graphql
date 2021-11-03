const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {graphqlHTTP} = require('express-graphql');

dotenv.config();

const schema = require("./schema/schema");
const connectDB = require("./config/db");

connectDB();

const app = express();

const Port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}));

// app.get("/", (req, res) => {
//     res.send("Hey, Raju you are doing great! It's working.");
// });

app.listen(Port, () => {
    console.log(`Server running on port http://localhost:${Port}`);
});