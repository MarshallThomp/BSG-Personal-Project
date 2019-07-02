UPDATE users
SET 
    first_name = ${first_name},
    last_name = ${last_name},
    image = ${image},
    email = ${email}

WHERE id = ${id};

SELECT * FROM users;