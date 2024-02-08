# Fixcar

 *Prototyp aplikacji web do diagnostyki pojazdów samochodowych wykorzystująca AI.* 

Aplikacja web, która pobiera posty z forum internetowego a następnie za pomocą AI umożliwia wyszukanie rozwiązania
usterki, którą ma użytkownik.

Obejrzyj jak działa aplikacja:

[![Oglądaj wideo](https://img.youtube.com/vi/uGTLIF0exWI/maxresdefault.jpg)](https://youtu.be/uGTLIF0exWI)
 
## Opis projektu

Aplikacja składa się z następujących modułów:
1. Scrapy - pobiera posty z forum internetowego forum.fordclubpolska.org

Kolejne moduły zostaną dodane wraz z postępem prac. 


## Przygotowanie środowiska
W pliku `/scrapy/assets/models.json` znajdują się linki do sekcji forum, w których znajdują się wątki dotyczące
konkretnego modelu Forda. To repozytorium zawiera link tylko do jednego modelu. Jeśli chcesz pobrać wszystkie wątki
przypisane do wszystkich modeli, musisz uzupełnić ten plik. Więcej o tym jak to zrobić znajdziesz tym
filmie: [https://youtu.be/H46cg0sQMUk](https://youtu.be/H46cg0sQMUk)

### Klucze do API
Aplikacja korzysta z API od OpenAI. Żeby móc korzystać z API, musisz posiadać klucz. 
Skopiuj plik `.env.template` do `.env` i uzupełnij go swoim kluczem.

## Uruchomienie

Potrzebujesz [docker](https://docker.com). Pobierz to repozytorium i uruchom:

```bash
docker-compose up
```

### Scrapy
Aby móc korzystać ze Scrapy w trybie interaktywnym, wejdź do powłoki kontenera:
```bash 
docker-compose exec scrapy bash
```

A następnie albo uruchom shell Scrappy
```bash
scrapy shell
```

albo uruchom Scrappy z wybranym spiderem
```bash
scrapy crawl threads
```