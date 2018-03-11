const express = require("express");
const router = express.Router();
const article_controller = require("../controllers/article")



//GET all Articles from article collection for rendering
router.get("/", article_controller.getHeadlines);

module.exports = router;