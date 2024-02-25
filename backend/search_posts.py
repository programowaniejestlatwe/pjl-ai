
import sys
import openai
import os
import json
from shared.db import Db

sys.path.append('../')

db = Db()
openai.api_key = os.environ['OPENAI_API_KEY']
openai.organization = os.environ['OPENAI_ORGANIZATION']


# take first argument from command line as search term
search_term = sys.argv[1]

print("Szukany temat: " + search_term + ", pobieram embedding...")
# create embedding for search term
result = openai.Embedding.create(
    model=os.environ['OPENAI_EMBEDDING_MODEL'],
    input=search_term
)
embedding = result['data'][0]['embedding']
print("Embedding: ", embedding)
print("\n\nSzuakm postów o podobnej treści...")
# search for posts similar to search term
posts = db.query(
    f"""
    SELECT 1 - (posts.embedding <-> '{embedding}') as similarity,
    posts.id, posts.content, threads.id, threads.title, threads.external_thread_id
    FROM posts, threads
    WHERE posts.thread_id = threads.id
    AND posts.embedding is not null
    ORDER BY similarity DESC
    LIMIT 3"""
)

print("Znalezione posty:")
# print posts
for post in posts:
    print("Podobieństwo: ", post[0])
    print("Wątek ID: ", post[3], ", forum ID: ", post[5], ", tytuł: ", post[4])
    print("Post ID: ", post[1], " treść: ", post[2])
    print("\n\n\n")
