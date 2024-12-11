const express = require("express");
const router = express.Router();
const {
  getNewsByCategory,
  getImage,
} = require("../controllers/news_controller");

// Kategori bazlı route
router.get("/:category", getNewsByCategory);
router.get("/:category/page/:pageNumber", getNewsByCategory);

// Görsel route'u
router.get("/image/:id", getImage);

module.exports = router;
