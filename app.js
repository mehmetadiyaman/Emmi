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
const session = require("express-session"); // express-session kullanımı
const MongoStore = require("connect-mongo");
/**
 * özel modüller
 */
const register = require("./src/routes/register_route");
const login = require("./src/routes/login_route");
const { connectDB, disconnectDB } = require("./src/config/mongoose_config");
const { collection } = require("./src/models/user_model");
const home = require("./src/routes/home_route");
const createBlog = require("./src/routes/create_blog_route");
const logout = require("./src/routes/logout_route");
const userAuth = require("./src/middlewares/user_auth_middleware");
const blogDetail = require("./src/routes/blog_detail_route");
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

/**
 * json gövdelerini ayrıştır
 */
app.use(express.json({ limit: "10mb" }));

/**
 * sessions depolanması
 */
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_CONNECTION_URI,
  collectionName: "sessions",
  dbName: "Emmi",
});

/**
 * express sessions
 */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store, // Doğru şekilde store kullanımı
    cookie: {
      maxAge: Number(process.env.SESSION_MAX_AGE),
    },
  })
);

/**
 * kayıt sayfası
 */
app.use("/register", register);

/**
 * kullanıcı yetkilendirmesi
 */

app.use(userAuth);

/**
 *  Blog ayrıntı sayfası
 */
app.use("/blog", blogDetail);

/**
 * giriş sayfası
 */
app.use("/login", login);

/**
 * Çıkış yap
 */
app.use("/logout", logout);

/**
 * Ana sayfa
 */
app.use("/", home);

/**
 * Blog oluşturma sayfası
 */
app.use("/createblog", createBlog);

/**
 * başlama servisi
 */
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, async () => {
  console.log(`Servis Dinleme Portu http://localhost:${PORT}`); // Düzeltildi
  await connectDB(process.env.MONGO_CONNECTION_URI);
});

server.on("kapat", async () => await disconnectDB());
