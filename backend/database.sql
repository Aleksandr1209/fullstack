create TABLE categories(
    id SERIAL PRIMARY KEY,
    key VARCHAR(255),
    name VARCHAR(255)
);

create TABLE goods(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    img VARCHAR(255),
    descr VARCHAR(255),
    category VARCHAR(255),
    price VARCHAR(255)
);
