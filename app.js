/**
 * @license MIT
 * @copyright 2024 EMMİ
 */
"use strict";

/**
 * node modüller
 */
const express = require("express");
require("dotenv").config();

/**
 * özel modüller
 */
const register = require("./src/routes/register_route");
const { connectDB, disconnectDB } = require("./src/config/mongoose_config");

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
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
  console.log(`Servis Dinleme Portu http://localhost:${PORT}`); // Düzeltildi
  await connectDB(process.env.MONGO_CONNECTION_URI);
});

server.on("kapat", async () => await disconnectDB());
