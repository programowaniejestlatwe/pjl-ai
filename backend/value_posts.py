'''
Skrypt ocenia posty pod kątem ich znaczenia.
Jeśli post jest zbyt długi, to zostaje pominięty. Jeśli post jest krótki, to zostaje oceniony przez model językowy.
Ocena jest zapisywana w bazie danych.

Skrypt korzysta z API OpenAI. Aby skrypt działał, musisz mieć ustawioną zmienne środowiskowe OPENAI_API_KEY,
OPENAI_ORG_ID, OPENAI_FINE_TUNE_MODEL.

Skrypt zakłada, że użyty zostanie stary model LLM: babbage, curie czy davinci. Jeżeli chcesz użyć nowego modelu,
to musisz zmienić zmienną OPENAI_MODEL na nowy model a także zmienić wywołanie openai.Completion na
openai.ChatCompletion.create(model="nazwa_modelu", messages=[{"role": "system", "content": content}, {"role": "user", "content": content}])
Odpowiedź od ChageCompletion.create czytasz: isMeaningful = completion.choices[0].message.content[0] == "T"

'''
import openai;
import os
from shared.db import Db

openai.organization =  os.environ['OPENAI_ORG_ID']
openai.api_key = os.environ['OPENAI_API_KEY']

db = Db()
posts = db.query("SELECT posts.id, posts.content FROM posts")

for post in posts:
    id = post[0]
    content = post[1]

    isMeaningful = False

    if len(content) > 2040:
        isMeaningful = True
        print("Post is too long, skipping")
    else:
        result = openai.Completion.create(
            model=os.environ['OPENAI_FINE_TUNE_MODEL'],
            prompt=content + "\n -> ",
            max_tokens=1,
            logprobs=1,
        )


    print("Post id: " + str(id))
    print("Post content: " + content)
    print("Response: " + str(result.choices[0]))

    isMeaningful = result.choices[0].text[1] == "T"

    print("Post is meaningful: %s", (isMeaningful))

    db.execute("UPDATE posts SET is_meaningful = %s WHERE id = %s", (isMeaningful, id))
