import openai
import json
import os
import sys
sys.path.append('../')

from shared.db import Db

openai.organization = os.environ['OPENAI_ORG_ID']
openai.api_key = os.environ['OPENAI_API_KEY']

db = Db()

meaningful_threads = db.query("""
    SELECT id
    FROM threads
    WHERE (
        SELECT count(id)
        FROM posts
        WHERE thread_id = threads.id
        AND is_meaningful = true
        AND is_solution_processed = true
        ) > 0
    AND model = 'Mondeo'
    """)

for thread in meaningful_threads:

    posts = db.query(f"""
        SELECT content
        FROM posts, threads
        WHERE threads.id = {thread[0]}
        AND posts.thread_id = threads.id
        ORDER BY posts.external_post_id ASC
        LIMIT 1""")


    post = posts[0]

    prompt = f"""Opis: Problem z moim samochodzie z silnikiem 2.0 tdci. Jadąc prosto, auto zjeżdża w lewo.\nProblem: Auto zjeżdża w lewo\n\nOpis: Ogólnie wszystko dobrze, ale czasami czuję dziwną wibrację na pedale hamulca.\nProblem: Wibracja na pedale hamulca.\n\nOpis: {post[0]}\nProblem: """

    print(prompt)

    try:
        result = openai.ChatCompletion.create(
            messages=[{
                "role": "user",
                "content": prompt
            }],
            model="gpt-3.5-turbo",
            temperature=0,
            max_tokens=256,
            top_p=0,
            frequency_penalty=2,
            presence_penalty=2
        )

        solution = result["choices"][0]["message"].content
        print("symptoms: ", solution)

        db.execute("UPDATE threads SET symptoms = %s WHERE id = %s", (solution, thread[0]))


    except Exception as e:
        print(e)