const db = require("../models/");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

var exports = module.exports = {}; //determine why this does not work as let...


exports.displayNotes = (req, res) => {
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
};

exports.deleteNotes = (req, res) => {
    db.Note.remove({
        _id: req.params.id
    }, function (response) {
        console.log(response);
    }).then(function (article) {
        res.send("comment Deleted")
    }).catch(function (err) {
        res.json(err);
    });

}