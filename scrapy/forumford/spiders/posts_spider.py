from pathlib import Path
import logging
import json
from bs4 import BeautifulSoup

import scrapy
from forumford.db import Db

db = Db()

class PostsSpider(scrapy.Spider):
    name = "posts"

    def start_requests(self):

        threads = db.select_threads()

        for thread in threads:

            logging.info("Wątek:  %s", "https://forum.fordclubpolska.org/" + thread[4])

            yield scrapy.Request(
                url="https://forum.fordclubpolska.org/" + thread[4],
                cookies= {
                    'bbsessionhash': 'XXXX',
                    'bbpassword': 'XXXX',
                    'bbuserid': 'XXX',
                    'bblastvisit': 'XXXX',
                    'bblastactivity': '0',
                    'bbnp_notices_displayed': '4',
                    'banmod_ids': '%2C407959'

                },
                callback=self.parse,
                cb_kwargs=dict(thread=thread)
            )
        
        return
    
    def parse(self, response, thread):

        logging.info("Przetwarzam: %s", thread)

        # Pobieram wszystkie posty z tej strony
        posts = response.css("div[id*='post_message_']")

        # dla każdego posta
        for post in posts:

            # pobieram id posta
            id = post.css("::attr(id)").get(default="").strip()
            numericId = id.split("_")[2]

            # usuwam wszystkie divy z posta (np. "cytat")
            post.css("div").remove()

            # pobieram treść posta
            content = self.innertext(post)

            # usuwa wszystkie znaki nowej linii i tabulacji
            content = content.replace("\n", " ").replace("\t", " ")

            # usuwa wszystkie podwójne spacje
            content = " ".join(content.split())

            # usuwa tekst "Bump: "
            content = content.replace("Bump: ", "")

            logging.info("Post ID: %s, treść: %s", numericId, content)

            db.insert_post({
                "id": numericId,
                "thread_id": thread[0],
                "content": content,
                "model": "",
                "engine": "",
            })


        # pobieram linki do kolejnych podstron
        pagination_links = response.css("a[rel='next']")

        if len(pagination_links) > 0:
            pagination_links.pop()
            logging.info(pagination_links)
            yield from response.follow_all(pagination_links, self.parse, cb_kwargs=dict(thread=thread))
    

    # metoda pomocnicza do pobierania tekstu z elementu html
    def innertext(self, selector):
        html = selector.get()
        soup = BeautifulSoup(html, 'html.parser')
        return soup.get_text().strip()