/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

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

const postRegister = (req, res) => {
  console.log(req.body);
};

module.exports = {
  renderRegister,
  postRegister,
};
