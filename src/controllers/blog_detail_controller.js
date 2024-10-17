/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

/**
 * node modülleri
 */
const mongoose = require("mongoose");

/**
 * özel modüller
 */
const Blog = require("../models/blog_model");

/**
 * @param {object} req
 * @param {object} res
 * @throws {Error}
 */
const renderBlogDetail = async (req, res) => {
  try {
    // blogId istek parametrelerini parçala
    const { blogId } = req.params;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(blogId);
    if (!isValidObjectId) {
      return res.render("./pages/404");
    }

    // Bloğun bulunamadığı durumu ele al
    const blogExists = await Blog.exists({
      _id: new mongoose.Types.ObjectId(blogId),
    });
    if (!blogExists) {
      return res.render("./pages/404");
    }

    // Blog ayrıntılarını ele al ve sahip bilgilerini doldur
    const blog = await Blog.findById(blogId).populate({
      path: "owner",
      select: "name username profilePhoto",
    });
    console.log(blog);

    // Sahibinden daha fazla blog al
    const ownerBlogs = await Blog.find({ owner: blog.owner._id }) // 'blog' nesnesini burada kullanıyoruz
      .select("title reaction totalBookmark owner readingTime createdAt")
      .populate({
        path: "owner",
        select: "name username profilePhoto",
      })
      .where("_id")
      .nin(blogId) // Düzeltildi
      .sort({ createdAt: "desc" }) // 'createAt' yerine 'createdAt'
      .limit(3); // Limit değeri verildi

    res.render("./pages/blog_detail", {
      SessionUser: req.session.user,
      blog,
      ownerBlogs,
    });
  } catch (error) {
    console.error(
      "Blog ayrıntı sayfası oluşturulurken hata oluştu:",
      error.message
    );
  }
};

module.exports = renderBlogDetail; // Sadece fonksiyonu dışa aktar