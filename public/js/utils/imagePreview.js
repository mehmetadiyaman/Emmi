/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

/**
 * @param {HTMLInputElement} $imageField
 * @param {HTMLElement} $previewElement
 * @returns {Promise<string>}
 */

const imagePreview = async function ($imageField, $previewElement) {
  console.log($imageField.files);
  const imageObjectUrl = URL.createObjectURL($imageField.files[0]);
  console.log(imageObjectUrl);
  // Resmi önizleme alanına atama gibi işlemleri burada yapabilirsiniz.
};

export default imagePreview;
