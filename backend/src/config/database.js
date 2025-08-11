import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config({ path: './.env' });

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("DATABASE Connected Successfully");
    connection.release();
  } catch(err) {
    console.log("Error Connected to MYSQL !!!", err);
    throw err;
  }
}
