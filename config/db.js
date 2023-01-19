const mongoose = require("mongoose"); // Mongoose Library
require('dotenv').config();

// const url = `mongodb+srv://khushbuw:hXBgDFSozQNtZKFr@cluster0.fvzypzl.mongodb.net/product-management?retryWrites=true&w=majority`
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`

// DB Connection Start

mongoose.set('strictQuery', false);

mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to database!"))
    .catch((error) => console.log('Unable to connect to database!', error));

