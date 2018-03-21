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

const routes = require('./routes');

// var html_routes = require("./routes/html_routes");
// var api_routes = require("./routes/api_routes");
app.use(routes);

// app.use(html_routes);
// app.use(api_routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});
