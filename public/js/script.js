/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

const $topAppBar = document.querySelector("[data-top-app-bar]");
let lastScrollPos = 0;

/**
 * olay dinleyicisini pencere kaydırma olayına ekler, kaydırma konumuna göre üst uygulama çubuğunda sınıflar arasında geçiş yapar
 */
window.addEventListener("scroll", (event) => {
  $topAppBar.classList[window.scrollY > 50 ? "add" : "remove"]("active");
  $topAppBar.classList[
    window.scrollY > lastScrollPos && window.scrollY > 50 ? "add" : "remove"
  ]("hide");
  lastScrollPos = window.scrollY;
});

/**
 * Geçiş Menüsü
 */

const $menuWrappers = document.querySelectorAll("[data-menu-wrapper]");

$menuWrappers?.forEach(function ($menuWrapper) {
  const $menuToggler = $menuWrapper.querySelector("[data-menu-toggler]");
  const $menu = $menuWrapper.querySelector("[data-menu]");

  $menuToggler.addEventListener("click", () => {
    $menu.classList.toggle("active");
  });
});

/**
 * Blog oluşturma sayfasında geri düğmesi işlevi
 */
const $backBtn = document.querySelector("[data-back-btn]");
const handleBackward = function () {
  window.history.back();
};
$backBtn?.addEventListener("click", handleBackward);

/**
 * form yazı yüksekliği otomatik ayarla
 */
const $autoHeightTextarea = document.querySelector(
  "[data-textarea-auto-height]"
);
const textareaAutoHeight = function () {
  this.style.height = this.scrollHeight + "px";
  this.style.maxHeight = this.scrollHeight + "px";
};
$autoHeightTextarea?.addEventListener("input", textareaAutoHeight);

//başlangıç ​​metin alanı yüksekliğini ayarla
$autoHeightTextarea && textareaAutoHeight.call($autoHeightTextarea);
