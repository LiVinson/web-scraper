var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

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
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.get("/scrape", function (req, res) {
    var url = `https://www.reddit.com/r/worldnews/`;

    axios
        .get(url)
        .then((response) => {

            var $ = cheerio.load(response.data);

            $("div.top-matter").each((i, element) => {

                var results = {};
                results.title = $(element).find("p.title").find("a.title").text();
                results.link = $(element).find("p").find("a").attr("href");
                results.source = $(element).find("p.title").find("span.domain").find("a").text();
                //Create a new Article for each scraped result
                db.Article.create(results)
                    .then(function (response) {
                        // console.log(response);
                    })
                    .catch(function (err) {
                        return res.json(err)
                    })
            });

            res.send("Scrape Complete");
        })
});

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});