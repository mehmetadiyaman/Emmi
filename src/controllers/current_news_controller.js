// controllers/current_news_controller.js

"use strict";

const Guncel = require("../models/guncel_model");

/**
 * Güncel haberleri göster
 * @param {object} req
 * @param {object} res
 * @throws {Error}
 */
const renderCurrentNews = async (req, res) => {
  try {
    const news = await Guncel.find().sort({ published: "desc" }); // Yayınlanma tarihine göre sırala
    res.render("./pages/currentnews", {
      sessionUser: req.session.user,
      news,
    });
  } catch (error) {
    console.error("Güncel haberleri çekerken bir hata oluştu:", error.message);
    throw error;
  }
};

module.exports = renderCurrentNews;
