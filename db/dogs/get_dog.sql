SELECT d.name, d.id as dog_id, d.breed, d.image, d.age, d.vaccinated, d.fixed, d.description, u.id as user_id, u.first_name
FROM dogs d
JOIN users u
ON d.user_id = u.id
WHERE d.id = $1;