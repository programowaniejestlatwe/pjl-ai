from pathlib import Path
import logging
import json
import scrapy

from forumford.db import Db

class ThreadsSpider(scrapy.Spider):
    # wymagane przez Scrapy
    name = "threads"

    # główna metoda, która jest wywoływana przez Scrapy
    def start_requests(self):

        # wczytujemy plik z linkami do wątków
        urls = []
        with open("assets/models.json") as f:
            urls = json.load(f)

        # dla każdego linku z pliku
        for url in urls:
            # logujemy informacje o linku
            logging.info("Sekcja: %s", url)

            # tworzymy request do linku i przekazujemy go do metody parse
            yield scrapy.Request(
                url=url['url'],
                # ustawienia cookies do autoryzacji
                cookies= {
                    'bbsessionhash': 'XXX',
                    'bbpassword': 'XXX',
                    'bbuserid': 'XXXX',
                    'bblastvisit': 'XXX',
                    'bblastactivity': '0',
                    'bbnp_notices_displayed': '4',
                    'banmod_ids': 'XXX'
                },
                # funnkcja zwrotna
                callback=self.parse,
                # przekazujemy dodatkowe parametry do funkcji zwrotnej - adres, z którego pochodzi link
                cb_kwargs=dict(source=url)
            )

    # metoda, która jest wywoływana przez Scrapy po pobraniu odpowiedzi z serwera
    # dla każdej strony z linku czyli zawiera listę wątków dla danej sekcji (modelu)
    def parse(self, response, source):

        db = Db()
        logging.info("Przetwarzam: %s", source)

        # pobieramy wszystkie linki do wątków
        threads_links = response.css("a[id*='thread_title_']")

        # dla każdego linku do wątku
        for link in threads_links:
            # pobieramy id wątku
            id = link.css("::attr(id)").get(default="").strip()

            # wyciągamy z id same cyfry
            numericId = id.split("_")[2]

            # pobieramy tytuł wątku
            threadTitle = link.css("::text").get(default="").strip()

            # sprawdzamy czy wątek jest przyklejony lub globalny
            isSticky = response.css("td[id*='td_threadtitle_"+numericId+"']")[0].css('img[alt="Przyklejony Temat"]')
            isGlobal = response.css("td[id*='td_threadtitle_"+numericId+"']")[0].css('img[alt="Global Thread"]')

            # jeśli jest przyklejony lub globalny to pomijamy
            if isSticky or isGlobal:
                logging.info(
                    "Pomijam: %s: %s. Przyklejony: %s, Globalny: %d", numericId, threadTitle, bool(isSticky), bool(isGlobal)
                    )
                continue

            logging.info("Wątek ID: %s, tytuł: %s", numericId, threadTitle)

            # tworzymy obiekt z danymi wątku
            thread = {
                "id": numericId,
                "model": source['model'],
                "link": link.css("::attr(href)").get(default="").strip(),
                "title": link.css("::text").get(default="").strip(),
                "brand": "ford",
                "source": "forumford"
            }

            logging.info("Dodaję wątek: %s", thread)
            db.insert_thread(thread)

        # pobieramy link do następnej strony
        pagination_links = response.css("a[rel='next']")
        pagination_links.pop()

        logging.info(pagination_links)

        yield from response.follow_all(pagination_links, self.parse, cb_kwargs=dict(source=source))

