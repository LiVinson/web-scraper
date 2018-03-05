const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");


const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

const PORT = 3000;

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
    extended: false
}));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/myapp");

const url = `https://www.reddit.com/r/worldnews/`;

axios
    .get(url)
    .then((response) => {

        const $ = cheerio.load(response.data);

        let results = [];

        $("div.top-matter").each((i, element) => {
            const title = $(element).children("p.title").text();
            const link = $(element).find("p").find("a").attr("href");
            // const link = $(element).children().attr("href");
            results.push({
                title,
                link
            });


        })
        console.log(results)
    }).catch(error => {
        console.log(error);
    });