-- =================================================================
-- QUERY UNTUK MENGETAHUI PROFESSOR IDs YANG ADA
-- =================================================================

-- 1. Cek semua professor yang ada di database
SELECT id, name, position, faculty FROM professors ORDER BY id;

-- =================================================================
-- SETELAH MENGETAHUI ID PROFESSOR, GUNAKAN QUERY INI UNTUK MENAMBAH HOMEBASE
-- =================================================================

-- 2. Template untuk menambahkan homebase (ganti X dengan ID yang sebenarnya)
-- INSERT INTO homebase_by_professor (id, professor_id, homebase, department) VALUES
-- (1, X, 'Informatika', 'Fakultas Teknologi Informasi'),        -- Ganti X dengan ID professor
-- (2, Y, 'Sistem Informasi', 'Fakultas Teknologi Informasi'),   -- Ganti Y dengan ID professor
-- (3, Z, 'Informatika', 'Fakultas Teknologi Informasi');        -- Ganti Z dengan ID professor

-- 3. Update homebase di tabel professors setelah data homebase_by_professor ditambahkan
-- UPDATE professors 
-- SET homebase = hbp.homebase 
-- FROM homebase_by_professor hbp 
-- WHERE professors.id = hbp.professor_id;

-- 4. Update statistik homebase
-- UPDATE professors_by_homebase SET 
--     count = (SELECT COUNT(*) FROM professors WHERE homebase = 'Informatika'),
--     percentage = (SELECT COUNT(*) * 100.0 / (SELECT COUNT(*) FROM professors WHERE homebase IS NOT NULL) FROM professors WHERE homebase = 'Informatika')
-- WHERE homebase = 'Informatika';

-- UPDATE professors_by_homebase SET 
--     count = (SELECT COUNT(*) FROM professors WHERE homebase = 'Sistem Informasi'),
--     percentage = (SELECT COUNT(*) * 100.0 / (SELECT COUNT(*) FROM professors WHERE homebase IS NOT NULL) FROM professors WHERE homebase = 'Sistem Informasi')
-- WHERE homebase = 'Sistem Informasi';

-- =================================================================
-- CONTOH PENGGUNAAN LENGKAP
-- =================================================================

-- Langkah 1: Jalankan query #1 untuk melihat professor yang ada
-- Langkah 2: Sesuaikan ID di query #2 dengan ID yang benar
-- Langkah 3: Jalankan query #2 untuk menambah data homebase
-- Langkah 4: Jalankan query #3 untuk update kolom homebase di tabel professors
-- Langkah 5: Jalankan query #4 untuk update statistik
