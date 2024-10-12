/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

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
    alert("Lütfen aynı şifreyi girdiğinizden emin olun.");
    return;
  }

  //sunucuya hesap oluşturma isteği gönder
  try {
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
      window.location = response.url;
    } else {
      alert("Hesap oluşturulurken bir hata oluştu.");
    }
  } catch (error) {
    alert(`Ağ hatası oluştu: ${error.message}`);
    $submitBtn.removeAttribute("disabled");
  }
});
