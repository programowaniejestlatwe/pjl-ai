import openai;
import os
from shared.db import Db

openai.organization = os.environ['OPENAI_ORG_ID']
openai.api_key = os.environ['OPENAI_API_KEY']

db = Db()
posts = db.query("SELECT id, parent_category_path, category_name, parts FROM parts WHERE embedding is null LIMIT 10000")

for post in posts:
    id = post[0]
    content = post[1] + "/" + post[2] + ": " + post[3]

    result = openai.Embedding.create(
        model=os.environ['OPENAI_EMBEDDING_MODEL'],
        input=content
    )

    print("Część ID: %s", (id))

    db.execute("UPDATE parts SET embedding = %s WHERE id = %s", (result['data'][0]['embedding'], id))
