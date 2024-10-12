/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

/**
 * node modülleri
 */
const bcrypt = require("bcrypt");

/**
 * Özel modüller
 */
const User = require("../models/user_model");
const genarateUsername = require("../utils/genarate_username_util");
/**
 *kayıt sayfasını işleme alınır
 * @param {object} req
 * @param {object} res
 */

const renderRegister = (req, res) => {
  res.render("./pages/register");
};

/**
 *kullanıcı kaydı için form kaydını yönetir
 * @param {object} req
 * @param {object} res
 */

const postRegister = async (req, res) => {
  try {
    //kullanıcı veri formunu çıkartma
    const { name, email, password } = req.body;

    //isim ekleme
    const username = genarateUsername(name);

    //şifre hashleme
    const hashedPassword = await bcrypt.hash(password, 10);

    //sağlanan verilerle kullanıcı oluştur
    await User.create({ name, email, password: hashedPassword, username });

    //başarılı kayıt sonrası kullanıcıyı oturum açmaya yönlendir
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Bir hata oluştu.");
  }
};

module.exports = {
  renderRegister,
  postRegister,
};
