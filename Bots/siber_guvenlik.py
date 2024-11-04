import json
import re
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def setup_driver():
    """WebDriver'ı ayarlayın."""
    driver = webdriver.Chrome()  
    return driver


def extract_articles(driver):
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

        articles_data.append({
            "title": title,
            "link": link,
            "image_url": image_url,
            "description": description,
            "tags": tags
        })

    return articles_data


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


def save_to_json(data, filename='siberguvenlik.json'):
    """Veriyi JSON dosyasına kaydedin."""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def main(base_url, max_pages=10):
    """Ana fonksiyon."""
    driver = setup_driver()
    all_articles = []

    for page in range(1, max_pages + 1):
        url = f"{base_url}?sayfa={page}"
        driver.get(url)

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "article.blogItem"))
        )
        
        articles_data = extract_articles(driver)
        all_articles.extend(articles_data)

        time.sleep(2)

    save_to_json(all_articles)

    driver.quit()


if __name__ == "__main__":
    BASE_URL = "https://www.donanimhaber.com/siber-guvenlik"  
    main(BASE_URL)
