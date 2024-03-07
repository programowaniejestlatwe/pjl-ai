import logging
import psycopg2

class Db(object):

    db = "app"
    password = "password"
    user = "postgres"
    host = "db"

    socket = None


    """Db jest singletonem, wystarczy
     db = Db()
    """
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(Db, cls).__new__(cls)

            logging.info(
                "Łączę do bazy danych" + cls.instance.db + " na" + cls.instance.host
                + " jako " + cls.instance.user    + " z hasłem " + cls.instance.password
            )

            cls.instance.socket = psycopg2.connect(
                dbname=cls.instance.db,
                host=cls.instance.host,
                user=cls.instance.user,
                password=cls.instance.password,
                port=5432
            )
        return cls.instance


    """Uruchamia query w bazie danych i zwraca wynik
    """
    def query(self, q):
        with self.socket.cursor() as cursor:
            cursor.execute(q)
            records = cursor.fetchall()

        return records




    """Dodaje wątek do bazy danych
    """
    def insert_thread(self, thread):
        try:
            with self.socket.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO threads (create_time, source, brand, title, model, external_thread_id, thread_url) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                    ("NOW()", thread['source'], thread['brand'], thread['title'], thread['model'], thread['id'], thread['link'])
                )
                self.socket.commit()
        except Exception as e:
            logging.error("Błąd dodawania wątku: %s", e)

        return


    """Zwraca wszystkie wątki z bazy danych
    """
    def select_threads(self):
        with self.socket.cursor() as cursor:
            cursor.execute("SELECT id, brand, model, external_thread_id, thread_url from threads")
            records = cursor.fetchall()

        return records


    """Dodaje post do bazy danych
    """
    def insert_post(self, post):

        try:
            with self.socket.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO posts (create_time, thread_id, external_post_id, content, model_version, engine_model) VALUES (%s, %s, %s, %s, %s, %s)",
                    ("NOW()", post['thread_id'], post['id'], post['content'], post['model'], post['engine'])
                )
                self.socket.commit()
        except Exception as e:
            logging.error("Błąd dodawania posta: %s", e)

        return



    """Uruchamia zapytanie typu INSERT/UPDATE
    """
    def execute(self, q, params = None):

        try:
            with self.socket.cursor() as cursor:
                cursor.execute(q, params)
                self.socket.commit()
        except Exception as e:
            logging.error("Error executing query: %s", e)

        return


    """Dodaje część do bazy danych.
    """
    def insert_part(self, part):

        try:
            with self.socket.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO parts (create_time, model_version, engine_model, year, parent_category_path, category_name, url, parts) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                    (
                        "NOW()",
                        part['model_version'],
                        part['engine_model'],
                        part['year'],
                        part['parent_category_path'],
                        part['category_name'] ,
                        part['url'],
                        part['parts']
                    )
                )
                self.socket.commit()
        except Exception as e:
            logging.error("Error inserting part: %s", e)

        return