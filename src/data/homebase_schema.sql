-- =================================================================
-- TABEL HOMEBASE BY PROFESSOR - DATA ECOSYSTEM PORTAL
-- =================================================================

-- Hapus tabel jika sudah ada untuk memulai dari awal
DROP TABLE IF EXISTS homebase_by_professor;

-- =================================================================
-- TABEL: HOMEBASE_BY_PROFESSOR
-- Menyimpan data homebase/program studi untuk setiap dosen
-- =================================================================
CREATE TABLE homebase_by_professor (
    id INT PRIMARY KEY,
    professor_id INT REFERENCES professors(id) ON DELETE CASCADE,
    homebase VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =================================================================
-- INSERT DATA HOMEBASE BY PROFESSOR
-- Data homebase untuk dosen Informatika dan Sistem Informasi
-- =================================================================

-- CATATAN: Sample data di-comment karena professor_id harus sesuai dengan data yang ada
-- Uncomment dan sesuaikan dengan ID professor yang benar-benar ada di database Anda

-- Contoh data homebase (sesuaikan dengan ID professor yang ada)
-- INSERT INTO homebase_by_professor (id, professor_id, homebase, department) VALUES
-- (1, 1, 'Informatika', 'Fakultas Teknologi Informasi'),
-- (2, 2, 'Sistem Informasi', 'Fakultas Teknologi Informasi'),
-- (3, 3, 'Informatika', 'Fakultas Teknologi Informasi'),
-- (4, 4, 'Sistem Informasi', 'Fakultas Teknologi Informasi'),
-- (5, 5, 'Informatika', 'Fakultas Teknologi Informasi');

-- Untuk mengetahui ID professor yang ada, jalankan query ini terlebih dahulu:
-- SELECT id, name FROM professors ORDER BY id;

-- =================================================================
-- AGREGAT DATA HOMEBASE (untuk dashboard charts)
-- =================================================================

-- Tabel agregat untuk chart homebase
DROP TABLE IF EXISTS professors_by_homebase;

CREATE TABLE professors_by_homebase (
    homebase VARCHAR(100) PRIMARY KEY,
    count INT NOT NULL,
    percentage DECIMAL(5,2)
);

-- Insert data agregat homebase (akan diupdate setelah data professor ditambahkan)
-- INSERT INTO professors_by_homebase (homebase, count, percentage) VALUES
-- ('Informatika', 0, 0.00),
-- ('Sistem Informasi', 0, 0.00);

-- =================================================================
-- ALTER TABLE PROFESSORS - TAMBAH KOLOM HOMEBASE
-- =================================================================

-- Tambah kolom homebase ke tabel professors untuk kemudahan akses
ALTER TABLE professors ADD COLUMN IF NOT EXISTS homebase VARCHAR(100);

-- Update data homebase di tabel professors berdasarkan relasi
UPDATE professors 
SET homebase = hbp.homebase 
FROM homebase_by_professor hbp 
WHERE professors.id = hbp.professor_id;

-- =================================================================
-- INDEX UNTUK PERFORMANCE
-- =================================================================

-- Index untuk foreign key
CREATE INDEX IF NOT EXISTS idx_homebase_professor_id ON homebase_by_professor(professor_id);

-- Index untuk homebase lookup
CREATE INDEX IF NOT EXISTS idx_homebase_name ON homebase_by_professor(homebase);
CREATE INDEX IF NOT EXISTS idx_professors_homebase ON professors(homebase);

-- =================================================================
-- VIEW UNTUK KEMUDAHAN QUERY
-- =================================================================

-- View untuk join professor dengan homebase detail
CREATE OR REPLACE VIEW professors_with_homebase AS
SELECT 
    p.id,
    p.name,
    p.photo_url,
    p.nuptk,
    p.position,
    p.start_date,
    p.verified,
    p.faculty,
    p.homebase,
    hbp.department,
    hbp.created_at as homebase_assigned_at
FROM professors p
LEFT JOIN homebase_by_professor hbp ON p.id = hbp.professor_id;

-- =================================================================
-- SAMPLE QUERIES UNTUK TESTING
-- =================================================================

-- Query untuk mendapatkan semua professor dengan homebase
-- SELECT * FROM professors_with_homebase ORDER BY name;

-- Query untuk statistik homebase
-- SELECT homebase, COUNT(*) as total_professor 
-- FROM professors 
-- WHERE homebase IS NOT NULL 
-- GROUP BY homebase 
-- ORDER BY total_professor DESC;

-- Query untuk professor berdasarkan homebase tertentu
-- SELECT name, position, nuptk 
-- FROM professors 
-- WHERE homebase = 'Informatika' 
-- ORDER BY name;

-- =================================================================
-- CLEANUP COMMANDS (jika diperlukan)
-- =================================================================

-- Hapus semua data homebase
-- DELETE FROM homebase_by_professor;
-- DELETE FROM professors_by_homebase;
-- UPDATE professors SET homebase = NULL;

-- Hapus tabel homebase
-- DROP TABLE IF EXISTS homebase_by_professor;
-- DROP TABLE IF EXISTS professors_by_homebase;
-- ALTER TABLE professors DROP COLUMN IF EXISTS homebase;
