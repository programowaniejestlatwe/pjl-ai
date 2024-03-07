import openai;
import os
from shared.db import Db

openai.organization = os.environ['OPENAI_ORG_ID']
openai.api_key = os.environ['OPENAI_API_KEY']

db = Db()
parts = db.query("SELECT id, name, category_name FROM part_names  WHERE embedding is null LIMIT 10000")

for part in parts:
    id = part[0]
    content = f"{part[1]} {part[2]}"

    result = openai.Embedding.create(
        model=os.environ['OPENAI_EMBEDDING_MODEL'],
        input=content
    )

    print("part id: %s", (id))

    db.execute("UPDATE part_names SET embedding = %s WHERE id = %s", (result['data'][0]['embedding'], id))
