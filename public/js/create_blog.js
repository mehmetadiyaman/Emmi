/**
 * @license MIT
 * @copyright 2024 EMMİ
 */

"use strict";

import imagePreview from "./utils/imagePreview.js";
import Snackbar from './snackbar.js';
import config from "./config.js";


// Görüntü alanı, önizleme ve önizlemeyi temizle düğmesi
const $imageField = document.querySelector("[data-image-field]");
const $previewElement = document.querySelector("[data-image-preview]"); // Değişken adı değiştirildi
const $imagePreviewClear = document.querySelector("[data-image-preview-clear]");

$imageField.addEventListener("change", () => {
  imagePreview($imageField, $previewElement); // Yeni isimle çağırılıyor
});

/** 
* Görüntü önizlemesini temizler
* @function clearImagePreview
*/
const clearImagePreview = function () {
  $previewElement.classList.remove('show');
  $previewElement.innerHTML = '';
}

$imagePreviewClear.addEventListener('click', clearImagePreview);

//Blog yayınlama
const $form = document.querySelector('[data-form');
const $publishBtn = document.querySelector('[data-publish-btn]');
const handlePublishBlog = async function(event) {

  //Default form gönderme davranışı önlenir.
  event.preventDefault();

  //Birden fazla gönderimi engellemek için yayınla butonu devre dışı bırakıldı
  $publishBtn.setAttribute('disable', '');

  //Form verilerini yakalamak için FormData nesnesi oluşturuluyor.
  const formData = new FormData($form);
  
  //Blog oluştururken kullanıcı banner için herhangi bir resim seçme durumu ele alındı.
  if (!formData.get('banner').size){
    //Yayınla butonunu etkinleştir
    $publishBtn.removeAttribute('disabled');
    Snackbar({type: 'error', message: 'Blog için resim seçmelisin.'});
    return;
  }



  //Seçilen resim boyutunun 5MB'tan büyük oldupu durumlar
  if(formData.get('banner').size>config.blogBanner.maxByteSize){
      //Yayınla butonunu etkinleştir
      $publishBtn.removeAttribute('disabled');
      Snackbar({type: 'error', message: "Resim 5MB'den küçük olmalıdır."});
      return;
  }
}
$form.addEventListener('submit', handlePublishBlog);