// Memuat environment variables dari file .env
require('dotenv').config();

// --> TAMBAHKAN BARIS INI UNTUK DEBUGGING <--
console.log('DATABASE_URL yang terbaca:', process.env.DATABASE_URL);

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

// Membuat aplikasi Express
const app = express();
const port = 3001; // Port untuk server backend

// Menggunakan middleware CORS untuk mengizinkan permintaan dari frontend
app.use(cors());

// Konfigurasi koneksi ke database Neon
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Membuat endpoint API untuk mengambil semua data dalam format JSON yang terstruktur
app.get('/api/all-data', async (req, res) => {
    try {
        // 1. Jalankan semua query secara paralel untuk efisiensi (DENGAN PERBAIKAN)
        const [
            studentsByYear,
            studentsByProdi,
            studentsByLevel,
            professorsByEducation,
            professorsByPosition,
            professorsByStatus,
            professorProfiles,
            generalStats,
            metadata
        ] = await Promise.all([
            // Menggunakan tanda kutip ganda untuk nama kolom yang merupakan reserved words
            pool.query('SELECT "year", "count" FROM students_by_year ORDER BY "year" DESC'),
            pool.query('SELECT "name", "value" FROM students_by_prodi'),
            pool.query('SELECT "name", "value" FROM students_by_level'),
            pool.query('SELECT "name", "value" FROM professors_by_education'),
            pool.query('SELECT "name", "value" FROM professors_by_position'),
            pool.query('SELECT "name", "value" FROM professors_by_status'),
            // PERBAIKAN DI SINI: Mengganti nama kolom rank_info menjadi rank
            pool.query('SELECT id, name, photo_url, nuptk, position, start_date, verified, faculty, academic_profile, rank_info AS rank, certification, sinta_profile FROM professors'),
            pool.query('SELECT "category", "metric", "value" FROM general_stats'),
            pool.query('SELECT "value" FROM metadata WHERE "key" = \'lastUpdated\'')
        ]);

        // 2. Susun data menjadi format JSON yang sama seperti file asli
        const responseData = {
            students: {
                byYear: studentsByYear.rows,
                byProdi: studentsByProdi.rows,
                byLevel: studentsByLevel.rows,
            },
            professors: {
                byEducation: professorsByEducation.rows,
                byPosition: professorsByPosition.rows,
                byStatus: professorsByStatus.rows,
                // PERBAIKAN DI SINI: Parsing kolom JSON sebelum mengirim
                profiles: professorProfiles.rows.map(p => ({
                    ...p,
                    // Pastikan parsing hanya terjadi jika data ada (bukan null)
                    academic_profile: typeof p.academic_profile === 'string' ? JSON.parse(p.academic_profile) : p.academic_profile,
                    rank: typeof p.rank === 'string' ? JSON.parse(p.rank) : p.rank,
                    certification: typeof p.certification === 'string' ? JSON.parse(p.certification) : p.certification,
                    sinta_profile: typeof p.sinta_profile === 'string' ? JSON.parse(p.sinta_profile) : p.sinta_profile,
                })),
            },
            stats: {
                professors: {},
                students: {},
                graduation: {},
                applicants: {},
            },
            lastUpdated: metadata.rows[0]?.value || new Date().toISOString(),
        };

        // Mengisi data stats dari tabel general_stats
        generalStats.rows.forEach(stat => {
            // Pastikan objek kategori ada sebelum mengisi
            if (!responseData.stats[stat.category]) {
                responseData.stats[stat.category] = {};
            }
            // Konversi nilai numerik dari string jika perlu
            responseData.stats[stat.category][stat.metric] = parseFloat(stat.value);
        });

        // 3. Kirim data yang sudah disusun
        res.json(responseData);

    } catch (err) {
        console.error('Error fetching all data:', err);
        res.status(500).send('Server Error');
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});