import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log('Veritabanına başarıyla bağlanıldı'))
  .catch((error) => console.log('Veritabanı bağlantı hatası:', error));

export default pool;