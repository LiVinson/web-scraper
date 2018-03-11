const express = require("express");
const router = express.Router();
const db = require("../models/");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
//GET Method - Scrape from site, and add unique articles to db.
router.get("/scrape", function (req, res) {
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
                        res.send("scrape complete!")
                    })
                    .catch(function (err) {
                        return res.json(err)
                    })
            });

            res.send("Scrape Complete");
        })
});

//GET specified Articles from article collection for rendering

router.get("/articles/:id", function (req, res) {
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
});

//POST New Comment for specified article:

router.post("/articles/:id", function (req, res) {
    db.Note.create(req.body).
    then(function (dbNote) {
        return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                $push: {
                    notes: dbNote._id
                }
            }, {
                new: true
            }).then(function (article) {
                res.send("New comment added")
            })
            .catch(function (err) {
                res.json(err);
            });
    });
});


//DELETE the clicked note:

router.delete("/note/:id", function (req, res) {
    db.Note.remove({
        _id: req.params.id
    }, function (response) {
        console.log(response);
    }).then(function (article) {
        res.send("comment Deleted")
    }).catch(function (err) {
        res.json(err);
    });

});

module.exports = router;