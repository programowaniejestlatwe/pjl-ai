import logging
import psycopg2

class Db(object):
    """
        Db jest singletonem, wystarczy
        db = Db()
    """
    db = "app"
    password = "password"
    user = "postgres"
    host = "db"

    socket = None

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



    def query(self, q):
        """
            Uruchamia query w bazie danych i zwraca wynik
        """
        with self.socket.cursor() as cursor:
            cursor.execute(q)
            records = cursor.fetchall()

        return records




    def insert_thread(self, thread):
        """
            Dodaje wątek do bazy danych
        """
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


    def select_threads(self):
        """
            Zwraca wszystkie wątki z bazy danych
        """
        with self.socket.cursor() as cursor:
            cursor.execute("SELECT id, brand, model, external_thread_id, thread_url from threads")
            records = cursor.fetchall()

        return records


    def insert_post(self, post):
        """
            Dodaje post do bazy danych
        """

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



    def execute(self, q, params = None):
        """
            Uruchamia zapytanie typu INSERT/UPDATE
        """

        try:
            with self.socket.cursor() as cursor:
                cursor.execute(q, params)
                self.socket.commit()
        except Exception as e:
            logging.error("Error executing query: %s", e)

        return


    def insert_part(self, part):
        """
            Dodaje część do bazy danych.
        """

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

    def get_most_significant_threads(self, embeddings, model, limit = 3):
        """
            Zwraca wątki z największym podobieństwem do podanych embeddings.

            :param embeddings: embeddings do porównania
            :param model: model do porównania
            :param limit: ilość wątków do zwrócenia
            :return: wątki z największym podobieństwem
        """

        # tablica do stringy oddzielonego przecinkami
        embedding = ','.join(map(str, embeddings))

        query = f"""
                SELECT
                    1 - (embedding <-> '[{embedding}]') as similarity,
                    threads.id,
                    threads.symptoms
                FROM posts, threads
                WHERE posts.thread_id = threads.id
                AND threads.model = '{model}'
                ORDER BY similarity DESC
                LIMIT {limit}
                """

        return self.query(query)

    def get_thread_part_categories(self, thread_id):
        """
            Zwraca części z wątku.
            :param thread_id: id wątku
            :return: części z wątku
        """
        return self.query(f"""
            SELECT part_names.id, part_names.name, part_names.category_name, count(part_names.id) as total
            FROM posts,
            part_names
            where thread_id = {thread_id}
            AND posts.part_name_id = part_names.id
            group by part_names.id
            order by total desc
        """)


    def get_thread_solutions_by_part_name_id(self, thread_id, part_name_id):
        """
            Zwraca rozwiązania wątku dla danej części.
            :param thread_id: id wątku
            :param part_name_id: id części
            :return: rozwiązania wątku dla danej części
        """
        return self.query(f"""
            SELECT posts.id, posts.solution, posts.external_post_id, posts.content
            FROM posts
            where thread_id = {thread_id}
            AND posts.part_name_id = {part_name_id}
        """)


    def get_parts_by_part_name_id(self, part_name_id, limit = 3):
        """
            Zwraca części na podstawie id nazwy części.
            :param part_name_id: id nazwy części
            :param limit: ilość części do zwrócenia
            :return: części na podstawie id nazwy części
        """

        return self.query(f"""
            SELECT 1 - (part_names.embedding <-> parts.embedding) as similarity,
            part_names.category_name,
            part_names.name,
            parts.category_name,
            url
            FROM part_names, parts
            WHERE part_names.id = {part_name_id}
            ORDER BY similarity desc
            LIMIT {limit}
        """)