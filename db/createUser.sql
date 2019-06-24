INSERT INTO users (image, first_name, last_name, email, password)
VALUES (${image}, ${first_name}, ${last_name}, ${email}, ${hash})
returning *;