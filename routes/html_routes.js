const express = require("express");
const router = express.Router();
const db = require("../models/");
const mongoose = require("mongoose");

//GET all Articles from article collection for rendering

router.get("/", function (req, res) {
    db.Article.find({}).then(function (results) {
        // console.log(results);
        var hbsObject = {
            article: results
        };
        res.render("all_articles", hbsObject);
    });
});


module.exports = router;