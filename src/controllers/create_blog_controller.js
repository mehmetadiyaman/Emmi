/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

const { Router } = require("express");

/**
 * Blog oluşturma sayfasını getir
 * @param {object} req
 * @param {object} res
 */

const renderCreateBlog = (req, res) => {
  res.render("./pages/create_blog", {
    sessionUser: req.session.user,
    route: req.originalUrl,
  });
};
module.exports = { renderCreateBlog };
