/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

/**
 * özel modüller
 */
const User = require("../models/user_model");
const Blog = require("../models/blog_model");
/**
 * @async
 * @function renderSettings
 * @param {Object} req
 * @param {Object} res
 * @throws {Error}
 */
const renderSettings = async (req, res) => {
  try {
    const { username } = req.session.user;
    const currentUser = await User.findOne({ username });

    //Ayarlar sayfasını işle
    res.render("./pages/settings", {
      sessionUser: req.session.user,
      currentUser,
    });
  } catch (error) {
    console.error("Ayarlar sayfasında bir hatta oluştu", error.message);
    throw error;
  }
};
module.exports = {
  renderSettings,
};
