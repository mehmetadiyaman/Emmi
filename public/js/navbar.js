document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".categories-btn"); // Kategoriler butonunu seç
  const categoriesMenu = document.querySelector(".categories-menu"); // Menü
  const categoryLinks = document.querySelectorAll(".category-link"); // Tüm kategori bağlantılarını seç

  // Butona tıklandığında menüyü aç/kapat
  toggleButton.addEventListener("click", function () {
    const isMenuVisible = categoriesMenu.classList.toggle("show"); // Menü görünür hale getirme

    // Menü açıldığında bağlantıları etkinleştir, kapatıldığında gizle
    toggleCategoryLinks(isMenuVisible);
  });

  // Dışarıya tıklama ile menüyü kapatma
  document.addEventListener("click", function (event) {
    if (
      !toggleButton.contains(event.target) &&
      !categoriesMenu.contains(event.target)
    ) {
      closeMenu(); // Menü gizle
    }
  });

  // Menüyü kapat
  function closeMenu() {
    categoriesMenu.classList.remove("show");
    toggleCategoryLinks(false); // Bağlantıları devre dışı bırak
  }

  // Koyu renk oluşturma fonksiyonu
  function getRandomColor(letters, length) {
    let color = "#";
    for (let i = 0; i < length; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  // Her kategori bağlantısına koyu bir arka plan ve açık bir metin rengi uygula
  function applyRandomColors() {
    const darkColorLetters = "0123456789"; // Koyu renk tonları
    const lightColorLetters = "ABCDEF"; // Açık renk tonları

    categoryLinks.forEach((link) => {
      link.style.backgroundColor = getRandomColor(darkColorLetters, 6);
      link.style.color = getRandomColor(lightColorLetters, 6); // Açık metin rengi
    });
  }

  // Kategori bağlantılarını etkinleştir veya devre dışı bırak
  function toggleCategoryLinks(isEnabled) {
    categoryLinks.forEach((link) => {
      if (isEnabled) {
        link.style.pointerEvents = "auto"; // Tıklamaya açık
        link.style.opacity = "1"; // Görünür hale getir
      } else {
        link.style.pointerEvents = "none"; // Tıklamaya kapalı
        link.style.opacity = "0.5"; // Daha şeffaf görünüm
      }
    });
  }

  // Renkleri uygula
  applyRandomColors();
});
