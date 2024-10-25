/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

/**
 * import modüller
 */

import Snackbar from "./snackbar.js";
import imagePreview from "./utils/imagePreview.js";
import imageAsDataURL from "./utils/imageAsDataUrl.js";
import config from "./config.js";

/**
 * özel modüller
 */

//Görüntü alanı ve tamizliyicileri
const $imageField = document.querySelector("[data-image-field]");
const $imagePreview = document.querySelector("[data-image-preview]");
const $imagePreviewClear = document.querySelector("[data-image-preview-clear]");

//profil foto yükleme
$imageField.addEventListener("change", () => {
  imagePreview($imageField, $imagePreview);
});

//profil foto silme
const clearImagePreview = function () {
  $imagePreview.classList.remove("show");
  $imagePreview.innerHTML = "";
  $imageField.value = "";
};
$imagePreviewClear.addEventListener("click", clearImagePreview);

//Temel bilgiler kısmı
const $basicInfoForm = document.querySelector("[data-basic-info-form]");
const $basicInfoSubmit = document.querySelector("[data-basic-info-submit]");
const oldFormData = new FormData($basicInfoForm);
const $progressBar = document.querySelector("[data-progress-bar]");

/**
 * Temel bilgileri güncelleme
 * @param {Event} event
 */

const updateBasicInfo = async (event) => {
  event.preventDefault();

  $basicInfoSubmit.setAttribute("disabled", "");

  const formData = new FormData($basicInfoForm);

  //görsel boyutunu max 1mb olarak ayarla
  if (formData.get("profilePhoto").size > config.profilePhoto.maxByteSize) {
    $basicInfoSubmit.removeAttribute("disabled");

    Snackbar({
      type: "error",
      message: "Profil fotoğrafını en fazla 1MB boyutunda seçmelisiniz.",
    });
    return;
  }
  //Kulanıcın herhangi bir profil seçmediği durumu el al
  if (!formData.get("profilePhoto").size) {
    formData.delete("profilePhoto");
  }
  if (formData.get("profilePhoto")) {
    //base64 ile çevirme
    formData.set("profilePhoto", await imageAsDataURL($imageField.files[0]));
  }

  if (formData.get("username") == oldFormData.get("username")) {
    formData.delete("username");
  }

  if (formData.get("email") == oldFormData.get("email")) {
    formData.delete("email");
  }

  const body = Object.fromEntries(formData.entries());
  $progressBar.classList.add("loading");
  const response = await fetch(`${window.location.href}/basic_info`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    $basicInfoSubmit.removeAttribute("disabled");
    $progressBar.classList.add("loading-end");
    Snackbar({ message: "Profiliniz güncellendi", type: "success" }); // snackbar-success sınıfı için type ekledik
    setTimeout(() => {
      window.location.reload();
    }, 1000); // 1 saniye bekle
  }

  //400 durumunu ele al
  if (response.status == 400) {
    $basicInfoForm.removeAttribute("disabled");
    $progressBar.classList.add("loading-end");
    const { message } = await response.json();
    Snackbar({
      type: "error",
      message,
    });
  }
};
$basicInfoForm.addEventListener("submit", updateBasicInfo);

//Şifre işlemleri

const $passwordForm = document.querySelector("[data-password-form]");
const $passwordSubmit = document.querySelector("[data-password-submit]");

const updatePassword = async (event) => {
  event.preventDefault();

  $basicInfoSubmit.setAttribute("disabled", "");

  const formData = new FormData($passwordForm);

  //Şifre yanlış ise
  if (formData.get("password") !== formData.get("confirm_password")) {
    $passwordSubmit.removeAttribute("disabled");
    Snackbar({
      type: "error",
      message: "Lütfen doğru şifreyi girdiğinizden emin olun.",
    });
    return;
  }
  const body = Object.fromEntries(formData.entries());

  $progressBar.classList.add("loading");

  const response = await fetch(`${window.location.href}/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    $passwordSubmit.removeAttribute("disabled");
    $progressBar.classList.add("loading-end");
    Snackbar({
      message: "Şifre değiştirme işlemi başarılı",
      type: "success", // snackbar-success sınıfı için type ekledik
    });
    // Sayfayı yenilemeden snackbar'ı göster
  }

  //400 Durumunu ele al

  if (response.status == 400) {
    $passwordSubmit.removeAttribute("disabled");
    $progressBar.classList.add("loading-end");
    const { message } = await response.json();
    Snackbar({
      type: warning,
      message,
    });
  }
};
$passwordForm.addEventListener("submit", updatePassword);

/**
 * Hesabı silme
 */
const $accountDeleteBtn = document.querySelector("[data-account-delete]");
const deleteAccount = async () => {
  const confirmDelete = confirm("Hesabınızı silmek istediğinize emin misiniz?");
  if (!confirmDelete) {
    return;
  }
  $accountDeleteBtn.setAttribute("disabled", "");
  $progressBar.classList.add("loading");
  const response = await fetch(`${window.location.href}/account`, {
    method: "DELETE",
  });
  if (response.ok) {
    $progressBar.classList.add("loading");
    window.location = `${window.location.origin}/`;
  }
};

$accountDeleteBtn.addEventListener("click", deleteAccount);
