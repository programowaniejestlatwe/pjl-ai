import openai;
import os
from shared.db import Db

openai.organization = os.environ['OPENAI_ORG_ID']
openai.api_key = os.environ['OPENAI_API_KEY']

db = Db()
posts = db.query("""
    SELECT id, part, solution
    FROM posts
    WHERE part_name_id IS NULL
    AND posts.is_meaningful = true
    AND posts.is_solution_processed = true
    AND posts.solution IS NOT NULL
    LIMIT 10000""")

for post in posts:
    id = post[0]
    content = post[1].strip(",.- \n")

    if (content == ""):
        content = post[2].strip(",.- \n")

    result = openai.Embedding.create(
        model=os.environ['OPENAI_EMBEDDING_MODEL'],
        input=content
    )
    embedding = result['data'][0]['embedding']
    print("part id: %s, name: %s", (id, content))

    query = f"""
                SELECT
                    1 - (embedding <-> '{embedding}') as similarity,
                    id,
                    name
                FROM part_names
                ORDER BY similarity DESC
                LIMIT 1
                """

    parts = db.query(query)
    part = parts[0]

    print(part)

    db.execute("UPDATE posts SET part_name_id = %s WHERE id = %s", (part[1], id))
