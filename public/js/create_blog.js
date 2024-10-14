/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

import imagePreview from "./utils/imagePreview.js";

// Görüntü alanı, önizleme ve önizlemeyi temizle düğmesi
const $imageField = document.querySelector("[data-image-field]");
const $previewElement = document.querySelector("[data-image-preview]"); // Değişken adı değiştirildi
const $imagePreviewClear = document.querySelector("[data-image-preview-clear]");

$imageField.addEventListener("change", () => {
  imagePreview($imageField, $previewElement); // Yeni isimle çağırılıyor
});
