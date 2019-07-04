CREATE TABLE users ( -- one to many
    id SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    image TEXT
);

CREATE TABLE dogs ( --one to many
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR,
    breed VARCHAR,
    image TEXT,
    age INTEGER,
    vaccinated VARCHAR,
    fixed VARCHAR
);

ALTER TABLE dogs
ADD description VARCHAR;

CREATE TABLE locations ( --one to many
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    lat DECIMAL,
    lng DECIMAL
);

CREATE TABLE markers ( -- many to many table
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    location_id INTEGER REFERENCES locations(id)
); 
