import json
import re
import time
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pymongo import MongoClient
from gridfs import GridFS

def setup_driver():
    """WebDriver'ı ayarlayın."""
    driver = webdriver.Chrome()
    return driver

def setup_database():
    """MongoDB bağlantısını ayarlayın ve Emmi veritabanını seçin."""
    client = MongoClient("mongodb://localhost:27017/")
    db = client['Emmi']  # "Emmi" veritabanını seçiyoruz
    collection = db['news']  # "siber" koleksiyonunu seçiyoruz
    return db, collection

def setup_gridfs(db):
    """GridFS ayarlarını yap."""
    return GridFS(db)

def download_image(image_url):
    """URL'den görseli indir ve binary olarak döndür."""
    try:
        response = requests.get(image_url)
        if response.status_code == 200:
            return response.content
    except Exception as e:
        print(f"Görsel indirilemedi: {image_url}, Hata: {e}")
    return None

def save_image_to_gridfs(fs, image_data, filename):
    """Görseli GridFS'e kaydet."""
    try:
        return fs.put(image_data, filename=filename)
    except Exception as e:
        print(f"Görsel kaydedilemedi: {filename}, Hata: {e}")
        return None

def extract_image_url(article):
    """Görsel URL'sini çıkarın."""
    image_element = article.find_element(By.CSS_SELECTOR, "figure.onizleme")
    image_url = image_element.value_of_css_property('background-image')
    match = re.search(r'url\((.*?)\)', image_url)
    return match.group(1).strip("'\"") if match else None

def extract_tags(article):
    """Tag'leri çıkarın."""
    tags_elements = article.find_elements(By.CSS_SELECTOR, "a.news-tag")
    return [tag.text for tag in tags_elements]

def extract_articles(driver, fs, category):
    """Sayfadaki makaleleri çıkarın ve bir listeye ekleyin."""
    articles_data = []
    articles = driver.find_elements(By.CSS_SELECTOR, "article.blogItem")
    
    for article in articles:
        title_element = article.find_element(By.CSS_SELECTOR, "h3 a.baslik")
        link = title_element.get_attribute("href")
        title = title_element.text
        image_url = extract_image_url(article)
        description = article.find_element(By.CSS_SELECTOR, ".aciklama").text
        tags = extract_tags(article)

        # Görseli indir ve GridFS'e kaydet
        image_data = download_image(image_url)
        image_id = None
        if image_data:
            image_id = save_image_to_gridfs(fs, image_data, f"{title}.jpg")
        
        articles_data.append({
            "title": title,
            "link": link,
            "image_id": image_id,  # GridFS'teki görsel ID'si
            "description": description,
            "tags": tags,
            "category": category  # Kategori bilgisi eklendi
        })

    return articles_data

def save_to_mongo(data, collection):
    """Veriyi MongoDB'ye kaydedin."""
    for article in data:
        if not collection.find_one({"link": article["link"]}):  # Aynı makale varsa eklemez
            collection.insert_one(article)

def main(urls_with_categories):
    """Ana fonksiyon. Birden fazla URL'yi ve kategoriyi işler."""
    driver = setup_driver()
    db, collection = setup_database()
    fs = setup_gridfs(db)  # GridFS bağlantısını ayarla

    for url, category in urls_with_categories:
        print(f"{category} kategorisi için {url} işleniyor...")

        # Sayfayı ziyaret et
        driver.get(f"{url}?sayfa=1")

        # Sayfa tamamen yüklendiğinde makaleleri çıkar
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "article.blogItem"))
        )

        articles_data = extract_articles(driver, fs, category)
        save_to_mongo(articles_data, collection)

    driver.quit()

if __name__ == "__main__":
    URLS_WITH_CATEGORIES = [
        ("https://www.donanimhaber.com/yapay-zeka", "Yapay Zeka"),
        ("https://www.donanimhaber.com/oyunlar", "Oyunlar"),
        ("https://www.donanimhaber.com/siber-guvenlik", "Siber Güvenlik"),
        ("https://www.donanimhaber.com/web-siteleri", "Web Siteleri"),
        ("https://www.donanimhaber.com/sosyal-medya", "Sosyal Medya"),
        ("https://www.donanimhaber.com/blockchain", "Blockchain"),
    ]

    main(URLS_WITH_CATEGORIES)
