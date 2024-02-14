FROM python:3

WORKDIR /usr/src/app

RUN curl https://sh.rustup.rs -sSf | sh -s -- --default-toolchain stable -y
RUN pip install cryptography --no-cache-dir --only-binary=:all: --force-reinstall --upgrade
ENV PATH="/root/.cargo/bin:${PATH}"

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt



COPY . .

EXPOSE 8888
EXPOSE 5000
VOLUME [ "/usr/src/app" ]
CMD /bin/bash