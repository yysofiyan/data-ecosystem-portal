-- =================================================================
-- SKEMA DATABASE UNTUK DATA ECOSYSTEM PORTAL
-- =================================================================
-- Hapus tabel jika sudah ada untuk memulai dari awal (opsional)
DROP TABLE IF EXISTS professors, students_by_year, students_by_prodi, students_by_level, professors_by_education, professors_by_position, professors_by_status, general_stats, metadata;

-- =================================================================
-- 1. TABEL UTAMA: PROFILES
-- Menyimpan profil detail dari setiap dosen.
-- Menggunakan tipe data JSONB untuk menyimpan data terstruktur yang kompleks.
-- =================================================================
CREATE TABLE professors (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    photo_url VARCHAR(255),
    nuptk VARCHAR(50) UNIQUE,
    position VARCHAR(100),
    start_date DATE,
    verified BOOLEAN,
    faculty VARCHAR(50),
    academic_profile JSONB,
    rank_info JSONB,
    certification JSONB,
    sinta_profile JSONB
);

-- =================================================================
-- 2. TABEL DATA AGREGAT
-- Tabel-tabel ini menyimpan data yang sudah diagregasi untuk ditampilkan di chart.
-- =================================================================

-- Data Mahasiswa
CREATE TABLE students_by_year (
    year VARCHAR(4) PRIMARY KEY,
    count INT
);

CREATE TABLE students_by_prodi (
    name VARCHAR(100) PRIMARY KEY,
    value INT
);

CREATE TABLE students_by_level (
    name VARCHAR(10) PRIMARY KEY,
    value INT
);

-- Data Dosen
CREATE TABLE professors_by_education (
    name VARCHAR(10) PRIMARY KEY,
    value INT
);

CREATE TABLE professors_by_position (
    name VARCHAR(100) PRIMARY KEY,
    value INT
);

CREATE TABLE professors_by_status (
    name VARCHAR(50) PRIMARY KEY,
    value INT
);

-- =================================================================
-- 3. TABEL STATISTIK UMUM & METADATA
-- =================================================================
CREATE TABLE general_stats (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50),
    metric VARCHAR(50),
    value NUMERIC
);

CREATE TABLE metadata (
    key VARCHAR(50) PRIMARY KEY,
    value TIMESTAMPTZ
);


-- =================================================================
-- PENGISIAN DATA (INSERT)
-- Mengisi tabel dengan data dari file database.json
-- =================================================================

-- 1. Mengisi Tabel 'professors'
INSERT INTO professors (id, name, photo_url, nuptk, position, start_date, verified, faculty, academic_profile, rank_info, certification, sinta_profile) VALUES
(
  1,
  'Yanyan Sofiyan, M.Kom.',
  '/images/professors/yanyan-sofiyan.jpeg',
  '4048767668131023',
  'Asisten Ahli',
  '2019-04-01',
  true,
  'FT',
  '{ "fieldOfScience": "RUMPUN ILMU FORMAL", "knowledgeTree": "KOMPUTER", "branch": "SISTEM INFORMASI" }',
  '{ "title": "Penata Muda Tk. I - III/b", "startDate": "2019-11-01" }',
  '{ "fieldOfStudy": "Sistem Informasi", "educatorRegistrationNumber": "21104109704697", "decreNumber": "21-001022-20758", "certificationYear": 2021 }',
  '{ "id": "6655767", "url": "https://sinta.kemdikbud.go.id/authors/profile/6655767", "SINTA Score Overall": 233, "SINTA Score 3Yr": 23, "Affl Score": 0, "Affl Score 3Yr": 0, "metrics": { "scopus": { "articles": 5, "citations": 23, "citedDocuments": 4, "hIndex": 3, "i10Index": 1, "gIndex": 3 }, "googleScholar": { "articles": 34, "citations": 127, "citedDocuments": 12, "hIndex": 7, "i10Index": 5, "gIndex": 1 } }, "citations": { "scopus": 25, "googleScholar": 127 }, "documents": { "scopus": 15, "googleScholar": 45 }, "hIndex": { "scopus": 3, "googleScholar": 6 }, "i10Index": { "googleScholar": 4 } }'
);
-- Anda bisa menambahkan data dosen lain di sini dengan format yang sama

-- 2. Mengisi Tabel Agregat Mahasiswa
INSERT INTO students_by_year (year, count) VALUES
('2024', 0), ('2023', 0), ('2022', 0), ('2021', 0), ('2020', 0);

INSERT INTO students_by_prodi (name, value) VALUES
('Informatika', 600), ('Sistem Informasi', 500);

INSERT INTO students_by_level (name, value) VALUES
('S1', 800), ('S2', 0);

-- 3. Mengisi Tabel Agregat Dosen
INSERT INTO professors_by_education (name, value) VALUES
('S3', 2), ('S2', 30);

INSERT INTO professors_by_position (name, value) VALUES
('Profesor', 0), ('Lektor Kepala', 10), ('Lektor', 5), ('Asisten Ahli', 2), ('Tenaga Pengajar', 0);

INSERT INTO professors_by_status (name, value) VALUES
('PNS', 2), ('DLB', 2), ('Tetap', 30);

-- 4. Mengisi Tabel Statistik & Metadata
INSERT INTO general_stats (category, metric, value) VALUES
('professors', 'total', 30),
('professors', 's3Percentage', 2),
('students', 'total', 1000),
('students', 'yearlyIncreasePercentage', 12),
('graduation', 'total', 1514),
('graduation', 'yearlyDecreasePercentage', 83),
('applicants', 'total', 1000),
('applicants', 'yearlyDecreasePercentage', 25);

INSERT INTO metadata (key, value) VALUES
('lastUpdated', '2025-06-14T08:30:00Z');

-- Verifikasi data telah dimasukkan
SELECT * FROM professors;
SELECT * FROM students_by_year;
