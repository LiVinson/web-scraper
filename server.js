const express = require("express"); //server
const bodyParser = require("body-parser");
const logger = require("morgan"); //logs HTTP methods
const mongoose = require("mongoose");

// Require all models
const db = require("./models");

// Initialize Express
const app = express();

const PORT = process.env.PORT || 3000;

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
    extended: false
}));
// Use express.static to serve the public folder as a static directory
app.use(express.static(__dirname + "/public"));

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Require routes:


// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const html_routes = require("./routes/html_routes");
const api_routes = require("./routes/api_routes");


app.use(html_routes);
app.use(api_routes);


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});