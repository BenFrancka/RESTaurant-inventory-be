DROP TABLE IF EXISTS inventory;

CREATE TABLE inventory (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_name TEXT NOT NULL,
    category TEXT NOT NULL,
    item_price INTEGER NOT NULL,
    total_items INTEGER NOT NULL,
    total_price INTEGER NOT NULL
);