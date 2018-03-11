const db = require("../models/");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

var exports = module.exports = {}; //determine why this does not work as let...

exports.scrape = (req, res) => {
    const url = `https://www.reddit.com/r/worldnews/`;

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
                    .then(function (headline) {
                        console.log(headline)
                    })
                    .catch(function (err) {
                        return res.json(err)
                    })
            });
            res.send("Scrape Complete");

        })
}


