"use strict";

const $snackbarWrapper = document.querySelector("[data-snackbar-wrapper]");
let lastTimeout = null;

/**
 * Snackbar özelliklerini ve bileşenlerini oluşturma
 * @param {Object} props
 * @param {string} props.message
 * @param {string} [props.type]
 */
const Snackbar = (props) => {
  // Snackbar elementlerini oluşturma
  const $snackbar = document.createElement("div");
  $snackbar.classList.add("snackbar");
  props.type && $snackbar.classList.add(props.type);
  $snackbar.innerHTML = `<p class="body-medium snackbar-text">${props.message}</p>`;

  // Öncekini temizle ve yenisini ekle
  $snackbarWrapper.innerHTML = "";
  $snackbarWrapper.append($snackbar);

  // Snackbar 3 saniye sonra çıkış animasyonuna başla ve sonra sil
  clearTimeout(lastTimeout);
  lastTimeout = setTimeout(() => {
    $snackbar.style.animation = "slide-out 0.3s ease-in forwards";
    setTimeout(() => {
      $snackbarWrapper.removeChild($snackbar);
    }, 300); // Çıkış animasyonunun süresiyle uyumlu
  }, 3000);
};

export default Snackbar;
