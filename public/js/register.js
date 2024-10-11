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
  console.log(formData.get("password"));

  //şifre ve tekrarının eşleşmediği durumlarda
  if (formData.get("password") !== formData.get("confirm_password")) {
    //gönder butonu etkinleştir ve hatta mesajını göster
    $submitBtn.removeAttribute("disabled");
    console.error("Lütfen aynı şifreyi girdiğinizden emin olun.");
    return;
  }

  //sunucuya hesap oluşturma isteği gönder
  const response = await fetch("${window.location.origin}/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(
      Object.fromEntries(formData.entries())
    ).toString(),
  });

  if (response.ok) {
    return (window.location = response.url);
  }
});
