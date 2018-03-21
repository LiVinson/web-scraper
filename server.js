const express = require("express"); //server
const logger = require("morgan"); //logs HTTP methods
const mongoose = require("mongoose");
const path = require("path");
const exphbs = require("express-handlebars");

// Initialize Express
const app = express();

const routes = require('./routes');

// Use express.static to serve the public folder as a static directory
app.use(express.static(__dirname + "/public"));

// Use morgan logger for logging requests
app.use(logger("dev"));


const PORT = process.env.PORT || 3000;




app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use body-parser for handling form submissions
app.use(express.urlencoded({extended : false}));
app.use(express.json());


app.use(routes);


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
