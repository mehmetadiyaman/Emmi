/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

/**
 * node modüller
 */
const router = require("express").Router(); // Düzeltildi

/**
 * özel modüller
 */
const renderBlogDetail = require("../controllers/blog_detail_controller"); // Doğru fonksiyonu içe aktar

// GET route: Blog ayrıntı sayfası
router.get("/:blogId", renderBlogDetail); // Doğru fonksiyonu kullanmalısınız

module.exports = router;
