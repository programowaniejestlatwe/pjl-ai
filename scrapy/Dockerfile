FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ENV PATH="/root/.cargo/bin:${PATH}"

COPY . .

EXPOSE 8888
EXPOSE 5000
VOLUME [ "/usr/src/app" ]
CMD /bin/bash