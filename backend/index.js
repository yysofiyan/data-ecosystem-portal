// Memuat environment variables dari file .env
require('dotenv').config();

// --> TAMBAHKAN BARIS INI UNTUK DEBUGGING <--
console.log('DATABASE_URL yang terbaca:', process.env.DATABASE_URL);

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Membuat aplikasi Express
const app = express();
const port = 3001; // Port untuk server backend

// Menggunakan middleware CORS untuk mengizinkan permintaan dari frontend
app.use(cors());

// Serve static files untuk gambar yang diupload
app.use('/images', express.static(path.join(__dirname, '../public/images')));

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
            // Tambah homebase kolom kembali ke query
            pool.query('SELECT id, name, photo_url, nuptk, position, start_date, verified, faculty, homebase, academic_profile, rank_info AS rank, certification, sinta_profile FROM professors'),
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
                    // Mapping snake_case ke camelCase untuk konsistensi frontend
                    photoUrl: p.photo_url,
                    startDate: p.start_date,
                    academicProfile: typeof p.academic_profile === 'string' ? JSON.parse(p.academic_profile) : p.academic_profile,
                    rank: typeof p.rank === 'string' ? JSON.parse(p.rank) : p.rank,
                    certification: typeof p.certification === 'string' ? JSON.parse(p.certification) : p.certification,
                    sintaProfile: typeof p.sinta_profile === 'string' ? JSON.parse(p.sinta_profile) : p.sinta_profile,
                    // Hapus field snake_case yang sudah dimapping
                    photo_url: undefined,
                    start_date: undefined,
                    academic_profile: undefined,
                    sinta_profile: undefined,
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

// Middleware untuk parsing JSON dan authentication check
app.use(express.json());

// Multer configuration untuk upload foto
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../public/images/professors');
        // Buat folder jika belum ada
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Generate unique filename dengan timestamp
        const timestamp = Date.now();
        const originalName = file.originalname.replace(/\s+/g, '_');
        const fileName = `${timestamp}_${originalName}`;
        cb(null, fileName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Validasi tipe file
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Hanya file gambar yang diperbolehkan'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Upload endpoint
app.post('/api/upload-photo', upload.single('photo'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'Tidak ada file yang diupload'
            });
        }

        const photoUrl = `/images/professors/${req.file.filename}`;
        
        res.json({
            success: true,
            data: {
                filename: req.file.filename,
                url: photoUrl,
                size: req.file.size,
                mimetype: req.file.mimetype
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            error: 'Gagal mengupload foto'
        });
    }
});

// Error handler untuk multer
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'File terlalu besar. Maksimal 5MB'
            });
        }
    }
    if (error.message === 'Hanya file gambar yang diperbolehkan') {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
    next(error);
});

// CRUD API Endpoints untuk Admin
// CREATE - Tambah professor baru
app.post('/api/professors', async (req, res) => {
    try {
        const { name, photo_url, nuptk, position, start_date, verified, faculty, homebase, academic_profile, rank, certification, sinta_profile } = req.body;
        
        // Validasi input yang diperlukan
        if (!name || !nuptk || !position || !start_date) {
            return res.status(400).json({ 
                success: false, 
                error: 'Name, NUPTK, position, dan start_date wajib diisi' 
            });
        }
        
        // Cek apakah NUPTK sudah ada
        const existingNuptk = await pool.query('SELECT id FROM professors WHERE nuptk = $1', [nuptk]);
        if (existingNuptk.rows.length > 0) {
            return res.status(400).json({ 
                success: false, 
                error: 'NUPTK sudah terdaftar' 
            });
        }
        
        // Dapatkan ID tertinggi yang ada dan tambahkan 1
        const maxIdResult = await pool.query('SELECT COALESCE(MAX(id), 0) + 1 as next_id FROM professors');
        const nextId = maxIdResult.rows[0].next_id;
        
        const query = `
            INSERT INTO professors (id, name, photo_url, nuptk, position, start_date, verified, faculty, homebase, academic_profile, rank_info, certification, sinta_profile)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING *
        `;
        
        const values = [
            nextId,  // Tambahkan ID sebagai parameter pertama
            name, 
            photo_url, 
            nuptk, 
            position, 
            start_date, 
            verified, 
            faculty,
            homebase || 'Informatika',  // Default homebase
            JSON.stringify(academic_profile || {}),
            JSON.stringify(rank || {}),
            JSON.stringify(certification || {}),
            JSON.stringify(sinta_profile || null)
        ];
        
        const result = await pool.query(query, values);
        res.json({ success: true, data: result.rows[0] });
        
    } catch (err) {
        console.error('Error creating professor:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// UPDATE - Update professor
app.put('/api/professors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, photo_url, nuptk, position, start_date, verified, faculty, homebase } = req.body;
        
        const query = `
            UPDATE professors 
            SET name = $1, photo_url = $2, nuptk = $3, position = $4, start_date = $5, verified = $6, faculty = $7, homebase = $8
            WHERE id = $9
            RETURNING *
        `;
        
        const values = [name, photo_url, nuptk, position, start_date, verified, faculty, homebase || 'Informatika', id];
        const result = await pool.query(query, values);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Professor not found' });
        }
        
        res.json({ success: true, data: result.rows[0] });
        
    } catch (err) {
        console.error('Error updating professor:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE - Hapus professor
app.delete('/api/professors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const query = 'DELETE FROM professors WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Professor not found' });
        }
        
        res.json({ success: true, message: 'Professor deleted successfully' });
        
    } catch (err) {
        console.error('Error deleting professor:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET single professor
app.get('/api/professors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const query = 'SELECT * FROM professors WHERE id = $1';
        const result = await pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Professor not found' });
        }
        
        res.json({ success: true, data: result.rows[0] });
        
    } catch (err) {
        console.error('Error fetching professor:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});