module.exports = function () {
    var router = require("express").Router();


    var api_routes = require("./api_routes");
    router.use("/", api_routes);

    var html_routes = require("./html_routes");
    router.use("/", html_routes);

    return router;
}