const { Pool } = require('pg');
const config = require('../credentials/config');

const pool = new Pool(config);

const createUsers = `
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER NOT NULL PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    cards INTEGER[],
    preferred_card INTEGER
)`;

const createCards = `
  CREATE TABLE IF NOT EXISTS cards (
    card_id SERIAL NOT NULL PRIMARY KEY,
    card_number INTEGER,
    expiration INTEGER,
    cvv INTEGER
)`;

pool.query(createUsers)
  .then(() => pool.query(createCards))
  .then(() => pool.end())
  .catch(e => console.error(e.stack));
