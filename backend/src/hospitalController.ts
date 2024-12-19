import { Request, Response } from 'express';
import pool from './db';

// Doktor oluşturma
export const createDoctor = async (req: Request, res: Response) => {
  try {
    const { ad, soyad, uzmanlik, telefon } = req.body;
    const newDoctor = await pool.query(
      'INSERT INTO doktorlar (ad, soyad, uzmanlik, telefon) VALUES ($1, $2, $3, $4) RETURNING *',
      [ad, soyad, uzmanlik, telefon]
    );
    res.json(newDoctor.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json('Sunucu hatası');
  }
};

// Tüm doktorları getirme
export const getDoctors = async (_req: Request, res: Response) => {
  try {
    const allDoctors = await pool.query('SELECT * FROM doktorlar');
    res.json(allDoctors.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json('Sunucu hatası');
  }
};

// ID'ye göre doktor getirme 
export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doctor = await pool.query('SELECT * FROM doktorlar WHERE id = $1', [id]);
    
    if (doctor.rows.length === 0) {
      return res.status(404).json('Doktor bulunamadı');
    }
    
    res.json(doctor.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json('Sunucu hatası');
  }
};

// Doktor güncelleme
export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { ad, soyad, uzmanlik, telefon } = req.body;
    
    const updateDoctor = await pool.query(
      'UPDATE doktorlar SET ad = $1, soyad = $2, uzmanlik = $3, telefon = $4 WHERE id = $5 RETURNING *',
      [ad, soyad, uzmanlik, telefon, id]
    );

    if (updateDoctor.rows.length === 0) {
      return res.status(404).json('Doktor bulunamadı');
    }

    res.json(updateDoctor.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json('Sunucu hatası');
  }
};

// Doktor silme
export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteDoctor = await pool.query('DELETE FROM doktorlar WHERE id = $1 RETURNING *', [id]);

    if (deleteDoctor.rows.length === 0) {
      return res.status(404).json('Doktor bulunamadı');
    }

    res.json('Doktor başarıyla silindi');
  } catch (err) {
    console.error(err);
    res.status(500).json('Sunucu hatası');
  }
};
