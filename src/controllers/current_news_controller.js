/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

/**
 * Özel modüller
 */
const Guncel = require("../models/guncel_model");
const getPagination = require("../utils/get_pagination_util");

/**
 * Güncel haberleri göster ve sayfalama yap
 * @param {object} req
 * @param {object} res
 * @throws {Error}
 */

const renderCurrentNews = async (req, res) => {
  try {
    const totalNews = await Guncel.countDocuments();
    const pagination = getPagination("/currentnews", req.query, 10, totalNews); // Current news için "/currentnews?page=1"

    const latestNews = await Guncel.find()
      .select("title link published summary")
      .sort({ published: "desc" })
      .limit(pagination.limit)
      .skip(pagination.skip);

    res.render("./pages/currentnews", {
      sessionUser: req.session.user,
      articles: latestNews,
      pagination,
    });
  } catch (error) {
    console.error("Güncel haberleri çekerken bir hata oluştu:", error.message);
    throw error;
  }
};

module.exports = renderCurrentNews;
