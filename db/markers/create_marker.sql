INSERT INTO locations (name, lat, lng, description)
VALUES (
    ${name},
    ${lat},
    ${lng},
    ${description}
)
returning *;