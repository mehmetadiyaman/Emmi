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
const {
  renderRegister,
  postRegister,
} = require("../controllers/register_controller");

/**
 * özel modüller
 */
const { renderCreateBlog } = require("../controllers/create_blog_controller");

//GET route:Blog oluşturma sayfasını oluştur
router.get("/", renderCreateBlog);

module.exports = router;
