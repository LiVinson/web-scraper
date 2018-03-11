const db = require("../models/");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

var exports = module.exports = {}; //determine why this does not work as let...


exports.getHeadlines = (req, res) => {
    db.Article.find({}).then(function (results) {
        // console.log(results);
        var hbsObject = {
            article: results
        };
        res.render("all_articles", hbsObject);
    });
}

exports.displayArticle = (req,res) => {
    db.Article.find({
        _id: req.params.id
    }).populate("notes").then(function (results) {
        console.log(results);
        // var hbsObject = {
        //     article: results
        // };
        res.render("one_article", results[0]);
    }).catch(function (err) {
        res.json(err);
    });
}