/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

/**
 * özel modüller
 */

//Reacsiyon düğmesi ve numarasını seçme
const $reactionBtn = document.querySelector("[data-reaction-btn]");
const $reactionNumber = document.querySelector("[data-reaction-number]");

/**
 * Mevcut bloğa reaksiyon ekleme
 * @function addReaction
 * @throws {Error}
 */

/**
 * Mevcut bloğtan reaksiyon silme
 * @function removeReaction
 * @throws {Error}
 */

const addReaction = async () => {
  try {
    //Reaksiyona göre bir put isteği gönder
    const response = await fetch(`${window.location}/reactions`, {
      method: "PUT",
    });

    if (response.ok) {
      //Aktif tepki butonu ile tepki sayısını artır(reaksiyonlar)
      $reactionBtn.classList.add("active", "reaction-anim-add");
      $reactionBtn.classList.remove("reaction-anim-remove");
      $reactionNumber.textContent = Number($reactionNumber.textContent) + 1;
    }

    //401 oturum açmamış durumu elle al
    if (response == 401) {
      //giriş için iletişim kutusu göster
      console.log("giriş yapınız");
    }
  } catch (error) {
    console.log("Reaksiyon eklenirken bir hatta oluştu", error.message);
  }
};

const removeReaction = async () => {
  try {
    const response = await fetch(`${window.location}/reactions`, {
      method: "DELETE",
    });

    if (response.ok) {
      $reactionBtn.classList.add("reaction-anim-remove");
      $reactionBtn.classList.remove("active", "reaction-anim-add");
      $reactionNumber.textContent = Number($reactionNumber.textContent) - 1;
    }
  } catch (error) {
    console.log(
      "Reaksiyon silme işlemi sırasında bir hatta oluştu",
      error.message
    );
  }
};

//Tıklama olayı için olay dinleyicisi
$reactionBtn.addEventListener("click", async function () {
  $reactionBtn.setAttribute("disabled", "");
  if (!$reactionBtn.classList.contains("active")) {
    await addReaction();
  } else {
    await removeReaction();
  }
  $reactionBtn.removeAttribute("disabled");
});
