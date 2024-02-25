import openai;
import os
from shared.db import Db

openai.organization = os.environ['OPENAI_ORG_ID']
openai.api_key = os.environ['OPENAI_API_KEY']

db = Db()
posts = db.query("""
                 SELECT posts.id, posts.content
                 FROM posts
                 WHERE posts.embedding IS NULL
                 AND posts.is_meaningful = true
                 AND posts.is_solution_processed = true
                 AND posts.solution IS NOT NULL
                 LIMIT 10000""")
for post in posts:
    id = post[0]
    content = post[1]

    print("Embedding post ID: " + id + "....")
    result = openai.Embedding.create(
        model=os.environ['OPENAI_EMBEDDING_MODEL'],
        input=content
    )
    print("Done for ID: " + id + ", saving to DB")

    db.execute("UPDATE posts SET embedding = %s WHERE id = %s", (result['data'][0]['embedding'], id))
