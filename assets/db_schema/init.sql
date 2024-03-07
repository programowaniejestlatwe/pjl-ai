CREATE
EXTENSION IF NOT EXISTS vector;

create TABLE threads
(
    id                 int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time        DATE,
    title              VARCHAR(255),
    source             VARCHAR(255),
    brand              VARCHAR(255),
    model              VARCHAR(255),
    external_thread_id VARCHAR(255),
    thread_url         VARCHAR(255)
);


CREATE TABLE posts
(
    id               int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time      DATE,
    thread_id        int,
    external_post_id VARCHAR(255),
    model_version    VARCHAR(255),
    engine_model     VARCHAR(255),
    year             VARCHAR(255),
    content          TEXT,
    embedding        vector(1536)
);


CREATE INDEX posts_thread_id_idx ON posts (thread_id);
CREATE UNIQUE INDEX threads_source_id_unique_idx ON threads (source, external_thread_id);


ALTER TABLE posts
    ADD COLUMN is_meaningful BOOLEAN;



ALTER TABLE posts
    ADD COLUMN is_solution_processed BOOLEAN DEFAULT false;
ALTER TABLE posts
    ADD COLUMN solution TEXT DEFAULT NULL;
ALTER TABLE posts
    ADD COLUMN part VARCHAR(128) DEFAULT NULL;

CREATE TABLE parts
(
    id                   INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time          DATE,
    brand                VARCHAR(255),
    model                VARCHAR(255),
    model_version        VARCHAR(255),
    year                 VARCHAR(255),
    engine_model         VARCHAR(255),
    parent_category_path VARCHAR(255),
    category_name        VARCHAR(255),
    parts                TEXT,
    url                  VARCHAR(255),
    embedding            vector(1536)
);


ALTER TABLE posts ADD part_name_id INT DEFAULT NULL;
CREATE INDEX part_name_id_idx ON posts(part_name_id);


CREATE TABLE part_names
(
    id        int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name      VARCHAR(255),
    category_name      VARCHAR(255),
    embedding vector(1536)
);


ALTER TABLE threads ADD symptoms VARCHAR(128) DEFAULT NULL;

