/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";
/**
 * import modüller
 */
import Snackbar from "./snackbar.js";
const $blogDeleteBtnAll = document.querySelectorAll("[data-blog-delete-btn]");

/**
 * Sunucu tarafında blog silme işlemleri
 * @async
 * @param {string} blogId
 * @returns {Promise<void>}
 */
const handleBlogDelete = async (blogId) => {
  const confirmDelete = confirm("Bu blogu silmek istediğinizden emin misiniz?");
  if (!confirmDelete) return;
  const response = await fetch(
    `${window.location.origin}/blogs/${blogId}/delete`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    Snackbar({
      message: "Blog silindi",
    });
    window.location.reload();
  }
};

//handleBlogDelete fonsksiyonunu tetiklemek için tüm butonları dinler
$blogDeleteBtnAll.forEach(($deleteBtn) => {
  const blogId = $deleteBtn.dataset.blogDeleteBtn;
  $deleteBtn.addEventListener("click", handleBlogDelete.bind(null, blogId));
});
