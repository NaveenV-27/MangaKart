// lib/db.js
import { Pool } from 'pg';

let pool;

if (!global.pgPool) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  global.pgPool = pool;
} else {
  pool = global.pgPool;
}

export default {
  query: (text, params) => pool.query(text, params),
};
