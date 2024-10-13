/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

const $snackbarWrapper = document.querySelector("[data-snackbar-wrapper]");
let lastTimeout = null;

/**
 * snacbar özelliklerini ve bileşenlerini oluştuma
 * @param {Object} props
 * @param {string} props.message
 * @param {string} [props.type]
 */
const Snackbar = (props) => {
  //snackbar elementlerini oluşturma
  const $snackbar = document.createElement("div");
  $snackbar.classList.add("snackbar");
  props.type && $snackbar.classList.add(props.type);
  $snackbar.innerHTML = `<p class="body-medium snackbar-text">${props.message}</p>
`;
  //öncekini temizle ve yenisini ekle
  $snackbarWrapper.innerHTML = "";
  $snackbarWrapper.append($snackbar);
  //snackbar 10 sn sonra sil
  clearTimeout(lastTimeout);
  lastTimeout = setTimeout(() => {
    $snackbarWrapper.removeChild($snackbar);
  }, 3000);
};

export default Snackbar;
