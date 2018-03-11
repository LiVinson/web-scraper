var express = require("express"); //server
var bodyParser = require("body-parser");
var logger = require("morgan"); //logs HTTP methods
var mongoose = require("mongoose");
var path = require("path");
// Require all models
var db = require("./models");

// Initialize Express
var app = express();

var PORT = process.env.PORT || 3000;

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Use express.static to serve the public folder as a static directory
app.use(express.static(__dirname + "/public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Require routes:


// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var html_routes = require("./routes/html_routes");
var api_routes = require("./routes/api_routes");


app.use(html_routes);
app.use(api_routes);


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});