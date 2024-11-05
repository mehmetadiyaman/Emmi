"use strict";

const router = require("express").Router();
const renderCurrentNews = require("../controllers/current_news_controller");

// GET route: Güncel Haberler sayfasını göster
router.get("/", renderCurrentNews);

module.exports = router;
