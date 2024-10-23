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

  //form verilerini yakalamak için formdata nesnesi oluşturma
  const formData = new FormData($form);

  //sunucuya hesap oluşturma isteği gönder
  const response = await fetch(`${window.location.origin}/login`, {
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
      message: "Giriş başarılı! Yönlendiriliyor...",
    });

    // 1 saniye bekle, ardından yönlendirme yap
    setTimeout(() => {
      window.location = response.url;
    }, 1000); // 1 saniye gecikme ile yönlendirme
    return;
  }

  //Yanıt durumu 400 olanları elle al
  if (response.status == 400) {
    //gönder düğmesini etkinleştir ve hata mesajını göster
    $submitBtn.removeAttribute("disabled");
    const { message } = await response.json();
    Snackbar({
      type: "error",
      message,
    });
  }
});
