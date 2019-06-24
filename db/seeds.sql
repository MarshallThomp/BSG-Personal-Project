CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    image TEXT
)

CREATE TABLE dogs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR,
    breed VARCHAR,
    image TEXT,
    age INTEGER,
    vaccinated VARCHAR,
    fixed VARCHAR
)