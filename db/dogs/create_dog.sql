INSERT INTO dogs (user_id, name, breed, image, age, vaccinated, fixed, description)
VALUES (
    ${id},
    ${name},
    ${breed},
    ${image},
    ${age},
    ${vaccinated},
    ${fixed},
    ${description}
)
returning *;