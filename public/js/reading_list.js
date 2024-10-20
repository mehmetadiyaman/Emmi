/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

//Okuma kısmı buttonları
const $readingListBtn = document.querySelector("[data-reading-list-btn]");
const $readingListNumber = document.querySelector("[data-reading-list-number]");

const addToReadingList = async () => {
  try {
    //Okuma listesine göre bir put isteği gönder
    const response = await fetch(`${window.location}/readingList`, {
      method: "PUT",
    });

    if (response.ok) {
      //okuma  butonu ile okuma sayısını artır(okumalistesi)
      $readingListBtn.classList.add("active");
      $readingListNumber.textContent =
        Number($readingListNumber.textContent) + 1;
    }

    //401 oturum açmamış durumu elle al
    if (response == 401) {
      //giriş için iletişim kutusu göster
      console.log("giriş yapınız");
    }
  } catch (error) {
    console.log("Okuma listesine eklenirken bir hatta oluştu", error.message);
  }
};

/**
 * @throws {Error}
 */
const removeFromReadingList = async () => {
  try {
    const response = await fetch(`${window.location}/readingList`, {
      method: "DELETE",
    });

    if (response.ok) {
      $readingListBtn.classList.remove("active");
      $readingListNumber.textContent =
        Number($readingListNumber.textContent) - 1;
    }
  } catch (error) {
    console.log(
      "Okuma listesi silme işlemi sırasında bir hatta oluştu",
      error.message
    );
  }
};

//Okuma olayı için olay dinleyicisi
$readingListBtn.addEventListener("click", async function () {
  $readingListBtn.setAttribute("disabled", "");
  if (!$readingListBtn.classList.contains("active")) {
    await addToReadingList();
  } else {
    await removeFromReadingList();
  }
  $readingListBtn.removeAttribute("disabled");
});
