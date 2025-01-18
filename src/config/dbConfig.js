// src/config/dbConfig.js
import pg from 'pg'; 
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg; 


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const query = (text, params) => pool.query(text, params);

pool.query(`
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public'  -- Assuming your tables are in the 'public' schema
`)
  .then(result => {
    console.log('Tables in the database:', result.rows);
  })
  .catch(err => {
    console.error('Error fetching table names:', err);
  });
