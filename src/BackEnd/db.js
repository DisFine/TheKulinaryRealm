// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TheKulinaryRealm',
  password: '1234',
  port: 5432,
});

pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

export default {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect()
};
