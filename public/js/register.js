/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

/**
 * import module
 */

import Snackbar from "./snackbar.js";

const $form = document.querySelector("[data-form]");
const $submitBtn = document.querySelector("[data-submit-btn]");

//kayıt formu göndrimini işlemek
$form.addEventListener("submit", async (event) => {
  //varsayılan form gönderim davranışını engelleme
  event.preventDefault();

  //birden fazla gönderim için button devre dışı bırakma

  $submitBtn.setAttribute("disabled", "");

  //form verilerini yakalamak için formdata nesnesi oluşturm
  const formData = new FormData($form);
  //şifre ve tekrarının eşleşmediği durumlarda
  if (formData.get("password") !== formData.get("confirm_password")) {
    //gönder butonu etkinleştir ve hatta mesajını göster
    $submitBtn.removeAttribute("disabled");
    Snackbar({
      type: "error",
      message: "Lütfen aynı şifreyi girdiğinizden emin olun.",
    });
    return;
  }

  //sunucuya hesap oluşturma isteği gönder
  const response = await fetch(`${window.location.origin}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(
      Object.fromEntries(formData.entries())
    ).toString(),
  });

  if (response.ok) {
    // Başarılı giriş Snackbar mesajını göster
    Snackbar({
      type: "success", // Başarı durumu için yeşil tarzı
      message:
        "Emmi'ye Hoşgeldin , içeride inovasyonun tadını çıkartın! Yönlendiriliyor...",
    });

    // 1 saniye bekle, ardından yönlendirme yap
    setTimeout(() => {
      window.location = response.url;
    }, 1000); // 1 saniye gecikme ile yönlendirme
    return;
  }

  //Yanıt durumu 400 olanları elle al
  if (response.status == 400) {
    //gönder düğmesini etkinleştir ve hatta mesajını göster
    $submitBtn.removeAttribute("disabled");
    const { message } = await response.json();
    Snackbar({
      type: "error",
      message,
    });
  }
});
