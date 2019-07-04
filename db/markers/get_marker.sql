SELECT l.name, l.id as location_id, l.lat, l.lng, m.id, u.id
FROM locations l
JOIN marker m
ON m.location_id = l.id 
JOIN users u
ON m.user_id = u.id
WHERE u.id = $1;