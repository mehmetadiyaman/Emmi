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
  renderSettings,
  updateBasicInfo,
  updatePassword,
} = require("../controllers/settings_controller");

//GET route:Ayarlar sayfasını getirir
router.get("/", renderSettings);
//PUT route:Kullanıcı bilgilerini güncelle
router.put("/basic_info", updateBasicInfo);
//PUT route:Kullanıcı şifre güncelle
router.put("/password", updatePassword);

module.exports = router;
