/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

/**
 * Ana sayfaya blog verilerini işleme ve denetleme
 * @param {object} req
 * @param {object} res
 * @throws {Error}
 */
const renderHome = async (req, res) => {
  try {
    res.render("./pages/home", {
      sessionUser: req.session.user,
    });
  } catch (error) {
    //Ana sayfa oluşturulmasında hatta varsa log kontrolü yap
    console.error("Ana sayfa oluşturulurken bir hata oluştu", error.message);
    throw error;
  }
};
module.exports = renderHome;
