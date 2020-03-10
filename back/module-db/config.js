const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'calendar2',
  user: 'postgres',
  password: 'password',
  port: 5432,
});

module.exports = pool;