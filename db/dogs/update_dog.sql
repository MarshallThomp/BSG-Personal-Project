UPDATE dogs
SET 
    name = ${name},
    breed = ${breed},
    image = ${image},
    age = ${age},
    vaccinated = ${vaccinated},
    fixed = ${fixed},
    description = ${description}
    
WHERE id = ${id};

SELECT * FROM dogs;