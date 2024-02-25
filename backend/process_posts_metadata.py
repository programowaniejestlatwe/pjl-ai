import openai
import json
import os
import sys

from langchain.chains.summarize import load_summarize_chain
from langchain import OpenAI

from langchain.text_splitter import TokenTextSplitter
from langchain.prompts import PromptTemplate

sys.path.append('../')

from shared.db import Db

openai.organization =  os.environ['OPENAI_ORG_ID']
openai.api_key = os.environ['OPENAI_API_KEY']

# Funkcja do wywołania ChatCompletion API OpenAI do modelu GPT-3.5
def call_openai_chat_completion_api(prompt, max_tokens = 128):
#    try:
        result = openai.ChatCompletion.create(
            messages=[{
                "role": "user",
                "content": prompt
            }],
            model="gpt-3.5-turbo",
            temperature=0,
            max_tokens=max_tokens,
            top_p=0,
            frequency_penalty=2,
            presence_penalty=2
        )
        print(result)
        return result
#    except Exception as e:
#        print(e)
#        return None


# prompty dla langchain do streszczenia
prompt_template = "Napisz zwięzłe streszczenie poniższego\n{text}\nZWIĘZŁE STRESZCZENIE:"

prompt = PromptTemplate.from_template(prompt_template)
llm = OpenAI(openai_api_key=openai.api_key, max_tokens=512)
refine_template = (
    "Twoim zadaniem jest sporządzenie końcowego podsumowania\n"
    "Do pewnego momentu przedstawiliśmy istniejące podsumowanie: {existing_answer}\n"
    "Mamy możliwość udoskonalenia istniejącego podsumowania"
    "(tylko w razie potrzeby) z dodatkowym kontekstem poniżej.\n"
    "------------\n"
    "{text}\n"
    "------------\n"
    "Biorąc pod uwagę nowy kontekst, dopracuj oryginalne podsumowanie"
    "Jeśli kontekst nie jest przydatny, zwróć oryginalne podsumowanie."
)

refine_prompt = PromptTemplate.from_template(refine_template)

summary_chain = load_summarize_chain(
        llm=llm,
        chain_type="refine",
        question_prompt=prompt,
        refine_prompt=refine_prompt,
        return_intermediate_steps=True,
        input_key="input_documents",
        output_key="output_text",
        verbose=True
    )

# Splitter tekstu do streszczenia, używany gdy post jest zbyt długi
text_splitter = TokenTextSplitter(chunk_size=4000, chunk_overlap=0)

def summarize_post(docs):
    split_docs = text_splitter.split_documents(
        text_splitter.create_documents(docs)
    )
    result = summary_chain({"input_documents": split_docs}, return_only_outputs=True)

    return result['output_text']


db = Db()
# Pobranie postów, które nie zostały jeszcze przetworzone
all_posts = db.query("""
    SELECT p.content, p.id, t.title
    FROM posts p, threads t
    WHERE p.thread_id = t.id
    AND p.is_meaningful = true
    AND p.is_solution_processed is false
    AND t.model = 'B-Max'
    LIMIT 1
    """)

for post in all_posts:

    postContent = post[0]

    texts = text_splitter.split_text(postContent)

    if (len(texts) > 1):
        print("Post za długi, streszczam... ")
        postContent = summarize_post(texts)


    # Fragment promptu dla kontekstu LLM
    basePrompt = f"""Problem operatora: "{post[2]}"\nUżytkownik napisał: {postContent}\n\n"""

    # Prompt dla pytania czy problem został rozwiązany
    problemSolvedPrompt = basePrompt + "Czy użytkownikowi udało się rozwiązać problem? Tak albo Nie."""

    # Prompt dla pytania o czynność, która rozwiązała problem
    fixPrompt = basePrompt + "Użytkownik napisał, że problem rozwiązał, wykonując następującą czynność (odpowiedz w bezokoliczniku zdania w trybie dokonanym): "

    # Prompt dla pytania o część, która była przyczyną usterki
    partPrompt = basePrompt + "Jeżeli nie można jednoznacznie określić, która cześć była przyczyną usterki, napisz \"-\", w przeciwnym wypadku element, który był przyczyną usterki to (wymień tylko nazwę części): "


    try:
        print("Post ID: ", post[1])


        result = call_openai_chat_completion_api(problemSolvedPrompt, 2)

        print(problemSolvedPrompt)
        print(result)
        solution = result["choices"][0]["message"].content
        print("Zawiera rozwiązanie: ", solution)


        if (solution.lower().find("nie") >= 0):
            # Problem nie został rozwiązany, oznaczenie posta jako przetworzony
            print("Brak rozwiazan dla postu ", post[1])
            db.execute("UPDATE posts SET is_solution_processed = true, solution = NULL WHERE id = %s", (post[1], ))
            continue

        result = call_openai_chat_completion_api(fixPrompt)

        solution = result["choices"][0]["message"].content
        print("Rozwiązanie: ", solution)
        db.execute("UPDATE posts SET solution = %s, is_solution_processed = true WHERE id = %s", (solution, post[1]))


        result = call_openai_chat_completion_api(partPrompt)

        part = result["choices"][0]["message"].content
        print("Część: ", part)
        db.execute("UPDATE posts SET part = %s WHERE id = %s", (part, post[1]))

    except Exception as e:
        print(e)

