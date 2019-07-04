INSERT INTO locations (name, lat, lng)
VALUES (
    ${name},
    ${lat},
    ${lng}
)
returning *;