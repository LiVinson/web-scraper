const express = require("express");
const router = express.Router();
const scrape_controller = require("../controllers/scrape");
const article_controller = require("../controllers/article")
const note_controller = require("../controllers/note")


//GET Method - Scrape from site, and add unique articles to db.
router.get("/scrape", scrape_controller.scrape);

//GET specified Articles from article collection for rendering
router.get("/articles/:id", article_controller.displayArticle);

//POST New Note for specified article:
router.post("/articles/:id", note_controller.displayNotes);

//DELETE the clicked note:
router.delete("/note/:id", note_controller.deleteNotes);

module.exports = router;