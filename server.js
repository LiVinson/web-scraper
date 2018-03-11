const express = require("express"); //server
const logger = require("morgan"); //logs HTTP methods
const mongoose = require("mongoose");
const path = require("path");
const exphbs = require("express-handlebars");

// Initialize Express
const app = express();

const PORT = process.env.PORT || 3000;

// Require all models
const models = require("./models");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(express.urlencoded({extended : false}));
app.use(express.json());
// Use express.static to serve the public folder as a static directory
app.use(express.static(__dirname + "/public"));



app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Require routes:

const routes = require('./routes')();

// var html_routes = require("./routes/html_routes");
// var api_routes = require("./routes/api_routes");
app.use('/', routes);

// app.use(html_routes);
// app.use(api_routes);




// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines");
// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});