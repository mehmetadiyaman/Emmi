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
 * Bookmark güncellemeleri
 * @param {object} req
 * @param {object} res
 * @throws {Error}
 */

const addToReadingList = async (req, res) => {
  try {
    //Kullanıcı oturum izni
    if (!req.session.user) return res.sendStatus(401);
    const { username } = req.session.user;
    const { blogId } = req.params;

    //Oturum açmış kullanıcıyı bul ve kontrol et
    const loggedUser = await User.findOne({ username }).select("readingList");
    if (loggedUser.readingList.includes(blogId)) {
      return res.sendStatus(400);
    }

    //Oturum açmış kullanıcının okuma listesini kaydet veya güncelleme yap
    loggedUser.readingList.push(blogId);
    await loggedUser.save();

    //Yer imini bul ve güncelle
    const readingListedBlog = await Blog.findById(blogId).select(
      "totalBookmark"
    );
    readingListedBlog.totalBookmark++;
    await readingListedBlog.save();
    res.sendStatus(200);
  } catch (error) {
    console.log("Okuma listesi güncellenirken bir hatta oluştu", error.message);
    throw error;
  }
};

/**
 * Bookmark güncellemeleri
 * @param {object} req
 * @param {object} res
 * @throws {Error}
 */

const removeFromReadingList = async (req, res) => {
  try {
    //Kullanıcı oturum izni
    if (!req.session.user) return res.sendStatus(401);
    const { username } = req.session.user;
    const { blogId } = req.params;

    const loggedUser = await User.findOne({ username }).select("readingList");
    if (!loggedUser.readingList.includes(blogId)) {
      return res.sendStatus(400);
    }

    //Okuma listesi güncelleme işlemi
    loggedUser.readingList.splice(loggedUser.readingList.indexOf(blogId), 1);
    await loggedUser.save();

    //Bul ve güncelle
    const readingListedBlog = await Blog.findById(blogId).select(
      "totalBookmark"
    );
    readingListedBlog.totalBookmark--;
    await readingListedBlog.save();
    res.sendStatus(200);
  } catch (error) {
    console.log("Okuma listesi silinirken bir hatta oluştu", error.message);
    throw error;
  }
};

module.exports = {
  addToReadingList,
  removeFromReadingList,
};