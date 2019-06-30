INSERT INTO dogs (user_id, name, breed, image, age, vaccinated, fixed, description)
VALUES (
    ${user_id},
    ${name},
    ${breed},
    ${image},
    ${age},
    ${vaccinated},
    ${fixed},
    ${description}
)
returning *;