
    var router = require("express").Router();

    var api_routes = require("./api_routes.js");
    router.use("/api", api_routes);

    var html_routes = require("./html_routes.js");
    router.use("/", html_routes);

    module.exports = router;
