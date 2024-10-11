/**
 * @license MIT
 * @copyright 2024 EMMİ
 */
"use strict";

/**
 * node modüller
 */

const express = require("express");

/**
 * özel modüller
 */
const register = require("./src/routes/register_route");

/**
 * ilk ekspres
 */
const app = express();

/**
 * görünüm kısmını ayarla
 */
app.set("view engine", "ejs");

/**
 * public dizini ayarla
 */
app.use(express.static(__dirname + "/public"));

/**
 * gövdeyi urlencoded ile ayrıştır
 */

app.use(express.urlencoded({ extended: true }));

app.use("/register", register);
/**
 * başlama servisi
 */
app.listen(3000, () => {
  console.log("Servis Dinleme Portu http://localhost:3000");
});
