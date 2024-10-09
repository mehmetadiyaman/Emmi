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

module.exports = {
  renderRegister,
};
