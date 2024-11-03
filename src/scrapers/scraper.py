from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import json
import time
from bs4 import BeautifulSoup

# Selenium için ayarlar
chrome_options = Options()
 
chromedriver_path = "chromedriver.exe"
service = Service(chromedriver_path)

# WebDriver'ı başlat
driver = webdriver.Chrome(service=service, options=chrome_options)

# Web sayfasını aç
url = "https://www.donanimhaber.com/"
driver.get(url)

# Sayfanın yüklenmesi için bekleme
time.sleep(3)  # Gerekirse süreyi artırabilirsiniz

# Sayfanın HTML içeriğini al
soup = BeautifulSoup(driver.page_source, 'html.parser')

articles = []
for item in soup.find_all('article'):
    title_tag = item.find('h2')
    title = title_tag.get_text(strip=True) if title_tag else "Başlık Bulunamadı"
    
    link_tag = item.find('a')
    link = link_tag['href'] if link_tag else "Link Bulunamadı"
    
    summary_tag = item.find('p')
    summary = summary_tag.get_text(strip=True) if summary_tag else "Özet Bulunamadı"
    
    date_tag = item.find('time')
    date = date_tag['datetime'] if date_tag else "Tarih Bulunamadı"
    
    author_tag = item.find('span', class_='author-name')
    author = author_tag.get_text(strip=True) if author_tag else "Yazar Bulunamadı"
    
    category_tag = item.find('span', class_='category-name')
    category = category_tag.get_text(strip=True) if category_tag else "Kategori Bulunamadı"

    articles.append({
        "title": title,
        "link": link,
        "summary": summary,
        "date": date,
        "author": author,
        "category": category
    })

# Verileri JSON dosyasına yazma
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, ensure_ascii=False, indent=4)

print("Veriler başarıyla çekildi ve data.json dosyasına kaydedildi.")

# Tarayıcıyı kapat
driver.quit()