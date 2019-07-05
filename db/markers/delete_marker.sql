DELETE FROM locations
WHERE lat = ${lat} and lng = ${lng};

SELECT * FROM locations;