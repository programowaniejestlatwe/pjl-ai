from pathlib import Path
import logging
import json
from forumford.shared.db import Db
import scrapy

db = Db()

# Ten skrypt jest przykładem scrapera, który pobiera dane z serwisu https://ford.7zap.com/pl/car/39/2.21224,6.35568/0/1597/
# i zapisuje je do bazy danych.
# Pobiera on listę części samochodowych dla Forda Mondeo MK4 z silnikiem 2.2 TDCi 129kW 175KM z 2008 roku.
# Jeżeli chcesz pobrać inne/wszystkie dla Forda, musisz odpowiednio zmodyfikować ten skrypt. Pull requesty mile widziane!
MODEL = "Mondeo"
MODEL_VERSION = "MK4"
MODEL_YEAR = "2008"
ENGINE_MODEL = "2.2 TDCi 129kW 175KM"
BASE_URL = "https://ford.7zap.com"
START_URL = "https://ford.7zap.com/pl/car/39/2.21224,6.35568/"

class PartsSpider(scrapy.Spider):
    name = "parts"

    def start_requests(self):

        baseUrl = START_URL

        yield scrapy.Request(
            url=baseUrl,
            callback=self.parse,
            cb_kwargs=dict(baseUrl=baseUrl)
        )

    def parse(self, response, baseUrl, category = None, stopAtNoParts = False):
        logging.info("Przetwarzam: %s", response)
        groups = response.css('.panel.panel-default')

        # jeżeli ilość group w kategorii jest równa 0, znaczy, że jesteśmy na ostatnim poziomie
        if (len(groups) == 0):

            # ALBO! strona nie zwróciła danych...
            # można to sprawdzić, gdy ilość części jest równa 0 - wtedy można skorzystać z tego adresu:
            # https://ford.7zap.com/cat_scripts/get_subgroup.php?lang=pl&category_type=car&catalog_code=39&filter=2.21224,6.35568&group=0&groupsub=XXXX

            category_name = response.css('h1::text').get(default="").strip()

            # nazwy części są umieszczone w tabeli, pobieram wszystkie z 3ciej kolumny
            parts =  ', '.join(dict().fromkeys(response.css('table > tr[style^="cursor"] td:nth-child(3)::text').getall()).keys())

            if (len(parts) == 0):
                if (stopAtNoParts):
                    logging.info(">>>> Nie znaleziono żadnych części. Kończę <<<<<<");
                    return

                logging.info(">>>> Nie znaleziono części, spróbuję pobrać kategorie za pomocą tego adresu <<<<<<");
                categoryID = response.url.split('/')[-2]
                scrapy.Request(
                    url='https://ford.7zap.com/cat_scripts/get_subgroup.php?lang=pl&category_type=car&catalog_code=39&filter=2.21224,6.35568&group=0&groupsub=' + categoryID,
                    callback=self.parse,
                    cb_kwargs=dict(baseUrl=baseUrl, category=category, stopAtNoParts=True)
                )
                return

            logging.info(">>>> Nie znaleziono żadnych podkategorii, znaczy, że jest to ostatnia strona z listą części i schematem <<<<<<");
            logging.info("Kategoria: %s", category_name)
            logging.info("Ścieżka: %s", category)


            part = {
                'year': MODEL_YEAR,
                'model_version': MODEL_VERSION,
                'engine_model': ENGINE_MODEL,
                'category_name': category_name,
                'parent_category_path': category,
                'url': baseUrl,
                'parts':  parts
            }

            has_category = db.query(f"SELECT * FROM parts where url = '{baseUrl}' LIMIT 1")
            if (len(has_category) == 0):
                logging.info("Zapisuję części do bazy: %s", part)
                db.insert_part(part)
            else:
                logging.info("####################################### Część już istnieje: %s", part)

        for group in groups:
            groupName = group.css('.panel-heading').css('::text').get(default="").strip()
            logging.info("Nazwa grupy: %s", groupName)
            categoryUrl = group.css('a::attr(href)').get(default="").strip()

            url = BASE_URL + categoryUrl

            logging.info("Następna kategoria, url: %s", url)

            categoryPath = ( (category + "/") if category else "") +  groupName

            yield scrapy.Request(
                url=url,
                callback=self.parse,
                cb_kwargs=dict(baseUrl=url, category=categoryPath)
            )


