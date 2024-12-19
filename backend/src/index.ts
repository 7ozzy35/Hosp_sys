import express from 'express';
import cors from 'cors';
import path from 'path';
import { AppDataSource } from './data_source';


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Veritabanı bağlantısı
AppDataSource.initialize()
  .then(() => console.log('Veritabanına başarıyla bağlanıldı.'))
  .catch((error) => console.log('Veritabanı bağlantı hatası:', error));

// Ana sayfa
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/index.tsx'));
});

// API Routes
app.use('/api', );

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
  console.log(`http://localhost:${PORT} adresinden erişebilirsiniz`);
});
