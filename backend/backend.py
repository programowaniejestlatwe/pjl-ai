''' to jest prosty serwer http, który będzie działał jako backend '''
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import openai
import os
import sys

sys.path.append('../')

from shared.db import Db

db = Db()

app = Flask(__name__)
CORS(app)


@app.route('/api/diagnose', methods=['POST'])
def symptoms():
    """
        Pobierz objawy usterek na podstawie opisu. Przyjmuje obiekt JSON z atryburami:
        :param prompt: opis problemu
        :param model: model samochodu
        :param model_version: wersja modelu samochodu
        :param chassis: wersja nadwozia
        :param engine_type: wersja silnika

        Zwraca JSON z tablicą obiektów, w której każdy obiekt ma atrybuty:
        :param probability: prawdopodobieństwo wystąpienia objawu (a raczej podobieństwo objawów do opisu podanego w :prompt)
        :param thread_id: id wątku
        :param symptoms: objawy problemu na podstawie wątku
    """
    data = request.get_json()
    response = createEmbedding(data['prompt'])

    symptoms = db.get_most_significant_threads(
        response.data[0].embedding,
        data['model'],
        3
    )

    symptoms_json = []
    for symptom in symptoms:
        symptoms_json.append({
            'probability': symptom[0],
            'thread_id': symptom[1],
            'symptoms': symptom[2]
        })

    return jsonify(symptoms_json)



@app.route('/api/parts_summary/<thread_id>', methods=['GET'])
def parts_summary(thread_id):
    """
        Pobiera podsumowanie części na podstawie ID wątku.
        :param thread_id: the thread id to get the parts summary for
        Zwraca JSON z tablicą obiektów, w której każdy obiekt ma atrybuty:
        :param category_name: nazwa kategorii
        :param total: liczba wystąpień wszystkich części z tej kategorii w wątku
        :param parts: tablica obiektów, w której każdy obiekt ma atrybuty:
            :param id: id części
            :param name: nazwa części
            :param total: liczba wystąpień części w wątku

    """
    parts = db.get_thread_part_categories(thread_id)

    # parts jest tablicą, w której każdy element ma następującą strukturę:
    # [0] => id
    # [1] => name
    # [2] => category_name
    # [3] => total

    # parts_tree ma następującą strukturę:
    # [
    #   {
    #       category_name: 'category_name',
    #       parts: [
    #           {
    #               id: 1,
    #               name: 'name',
    #               total: 1
    #           }
    #       ]
    #   }
    # ]

    parts_tree = []
    for part in parts:
        category_name = part[2]
        name = part[1]
        id = part[0]
        total = part[3]

        category_part = {
                    'id': id,
                    'name': name,
                    'total': total
                }

        # Sprawdź, czy kategoria istnieje
        category_exists = False
        for category in parts_tree:
            
            if category['category_name'] == category_name:
                category_exists = True
                category['parts'].append(category_part)
                category['total'] += total
                break

        if not category_exists:
            parts_tree.append({
                'category_name': category_name,
                'parts': [
                    category_part                              
                ],
                'total': total
                
            })

    return jsonify(parts_tree)




@app.route('/api/solutions/<thread_id>/<part_name_id>', methods=['GET'])
def solutions(thread_id, part_name_id):
    """
        Zwraca rozwiązania dla danego wątku i wybranej części
        :param thread_id: ID wątku, w którym będą szukane rozwiązania
        :param part_name_id: ID części, dla której będą szukane rozwiązania
        W odpowiedzi, zwróci JSON z tablicą obiektów, w której każdy obiekt ma atrybuty:
        :param id: id postu, w którym znajduje się rozwiązanie
        :param description: opis rozwiązania
        :param external_post_id: id postu na zewnętrznej stronie
        :param solution: rozwiązanie
    """
    solutions = db.get_thread_solutions_by_part_name_id(thread_id, part_name_id)

    # solutions to tablica, w której każdy element ma następującą strukturę:
    # [0] => id
    # [1] => solution

    # konwersja struktury do json, tak, aby każdy element miał następującą strukturę:
    # {
    #   id: 1,
    #   solution: 'solution'
    # }

    solutions_json = []
    for solution in solutions:
        solutions_json.append({
            'id': solution[0],
            'solution': solution[1],
            'external_post_id': solution[2],
            'description': solution[3],
        })

    return jsonify(solutions_json)





@app.route('/api/parts/<part_name_id>', methods=['GET'])
def parts(part_name_id):
    """
        Zwraca schematy na podstawie podanego ID nazwy części.
        :param part_name_id: ID nazwy części
        Zwraca JSON z tablicą obiektów, w której każdy obiekt ma atrybuty:
        :param similarity: podobieństwo schematu do nazwy części
        :param category_name: nazwa kategorii
        :param url: URL do schematu

    """
    parts = db.get_parts_by_part_name_id(part_name_id, 3)

    parts_json = []
    for part in parts:
        parts_json.append({
            'similarity': part[0],
            'category_name': part[3],
            'url': part[4],
        })

    return jsonify(parts_json)



@app.route('/api/solution_summary', methods=['POST'])
def solution_summary():
    """
        Tworzy podsumowanie rozwiązania na podstawie modelu, opisu problemu i diagnostyki.
        Przyjmuje obiekt JSON z atrybutami:
        :param model_summary: podsumowanie modelu
        :param problem_description: opis problemu
        :param diagnostics_summary: podsumowanie diagnostyki
        Zwraca string z podsumowaniem rozwiązania.
    """

    data = request.get_json()
    response = create_solution_summary(
        data['model_summary'],
        data['problem_description'],
        data['diagnostics_summary'],
    )

    return jsonify(response)



def createEmbedding(content):
    """
        Funkcja, która zamieni podaną treść na embedding vector za pomocą OpenAI.
        :param content: treść, która ma zostać zamieniona na wektor
        :return: vector
    """
    return openai.Embedding.create(
        model=os.environ['OPENAI_EMBEDDING_MODEL'],
        input=content
    )


def create_solution_summary(model_summary, problem_description, diagnostics_summary):
    """
        Funkcja, która na podstawie modelu, opisu problemu i diagnostyki,
        stworzy podsumowanie rozwiązania.
        :param model_summary: podsumowanie modelu
        :param problem_description: opis problemu
        :param diagnostics_summary: podsumowanie diagnostyki
        :return: the solution summary
    """
    
    prompt = f"""
Na podstawie poniszych danych stwórz podsumowanie:

Samochód: {model_summary}

Problem: {problem_description}
        
Diagnostyka: {diagnostics_summary}


"""
    response = openai.ChatCompletion.create(
        messages=[{
            "role": "user",
            "content": prompt
        }],
        model="gpt-3.5-turbo",
        temperature=1,
        max_tokens=512,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    return response["choices"][0]["message"].content



app.run(host='0.0.0.0', port=5000, debug=True)