/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

/**
 * @param {object} req
 * @param {object} res
 */
const logout = async (req, res) => {
  try {
    // Kullanıcı oturumunu sil
    req.session.destroy((err) => {
      if (err) {
        console.error("Çıkış yaparken bir hata oluştu:", err.message);
        return res.status(500).send("Çıkış işlemi sırasında hata oluştu."); // Hata durumunda uygun bir yanıt döndür
      }
      res.redirect("/"); // Başarıyla çıkış yapıldığında login sayfasına yönlendir
    });
  } catch (error) {
    console.error("Çıkış yaparken bir hata oluştu:", error.message);
    return res.status(500).send("Çıkış işlemi sırasında hata oluştu."); // Hata durumunda uygun bir yanıt döndür
  }
};

module.exports = logout;
