require('dotenv').config();
const express = require('express');
const cors = require('cors'); //configure the web API's security
const morgan = require('morgan'); //for log HTTP requests and errors
const app = express();


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// setup morgan
app.use(morgan("dev"));

//middleware
app.use(express.json());
app.use(cors());

app.get("/new", (req, res) => {
    res.json({ message: "Welcome in Product Management Project" })
});


module.exports = app;