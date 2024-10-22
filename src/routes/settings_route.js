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
const { renderSettings } = require("../controllers/settings_controller");

//GET route:Ayarlar sayfasını getirir
router.get("/", renderSettings);

module.exports = router;
