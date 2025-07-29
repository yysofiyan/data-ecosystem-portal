Langkah Selanjutnya:

1. Salin & Tempel: Salin seluruh kode SQL di atas.
2. Buka Neon: Masuk ke akun Neon Anda dan pilih proyek Anda.
3. Buka SQL Editor: Navigasi ke bagian "SQL Editor".
4. Jalankan Query: Tempel kode ke dalam editor dan klik tombol "Run".


Ah, saya mengerti masalahnya. Terima kasih atas informasinya.

Error syntax error at or near "DROP" yang Anda lihat, terutama dengan adanya EXPLAIN (ANALYZE, ...) di depannya, menunjukkan bahwa SQL Editor di Neon mencoba untuk menganalisis rencana eksekusi (EXPLAIN ANALYZE) dari query Anda, bukan hanya menjalankannya.

Perintah EXPLAIN digunakan untuk query yang mengambil atau memodifikasi data (seperti SELECT, INSERT, UPDATE), tetapi tidak bisa digunakan untuk perintah yang mengubah struktur database (seperti DROP TABLE atau CREATE TABLE). Inilah penyebab errornya.

Solusi: Jalankan Query Secara Bertahap
Untuk mengatasinya, kita perlu menjalankan query dalam beberapa bagian terpisah. Ini juga praktik yang lebih baik karena memungkinkan Anda untuk melihat di mana tepatnya error terjadi jika ada masalah lain.

Solusi: Jalankan Query Secara Bertahap

Untuk mengatasinya, kita perlu menjalankan query dalam beberapa bagian terpisah. Ini juga praktik yang lebih baik karena memungkinkan Anda untuk melihat di mana tepatnya error terjadi jika ada masalah lain.

Silakan ikuti langkah-langkah berikut:

Hapus semua teks yang ada di SQL Editor Neon Anda saat ini.
Salin dan jalankan setiap blok kode di bawah ini satu per satu, secara berurutan.

Tahap 1: Buat Semua Tabel

Salin seluruh blok di bawah ini, tempel ke SQL Editor, dan klik "Run".

```sql
-- =================================================================
-- TAHAP 1: MEMBUAT STRUKTUR TABEL
-- =================================================================

-- Tabel Utama untuk Profil Dosen
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

-- Tabel Agregat Mahasiswa
CREATE TABLE students_by_year ( year VARCHAR(4) PRIMARY KEY, count INT );
CREATE TABLE students_by_prodi ( name VARCHAR(100) PRIMARY KEY, value INT );
CREATE TABLE students_by_level ( name VARCHAR(10) PRIMARY KEY, value INT );

-- Tabel Agregat Dosen
CREATE TABLE professors_by_education ( name VARCHAR(10) PRIMARY KEY, value INT );
CREATE TABLE professors_by_position ( name VARCHAR(100) PRIMARY KEY, value INT );
CREATE TABLE professors_by_status ( name VARCHAR(50) PRIMARY KEY, value INT );

-- Tabel Statistik Umum & Metadata
CREATE TABLE general_stats ( id SERIAL PRIMARY KEY, category VARCHAR(50), metric VARCHAR(50), value NUMERIC );
CREATE TABLE metadata ( key VARCHAR(50) PRIMARY KEY, value TIMESTAMPTZ );
```

Tahap 2: Masukkan Data ke Dalam Tabel

Setelah Tahap 1 berhasil tanpa error, hapus teks di editor, lalu salin dan jalankan blok di bawah ini.

```
-- =================================================================
-- TAHAP 2: MENGISI DATA (INSERT)
-- =================================================================

-- Mengisi Tabel 'professors'
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

-- Mengisi Tabel Agregat Mahasiswa
INSERT INTO students_by_year (year, count) VALUES ('2024', 0), ('2023', 0), ('2022', 0), ('2021', 0), ('2020', 0);
INSERT INTO students_by_prodi (name, value) VALUES ('Informatika', 600), ('Sistem Informasi', 500);
INSERT INTO students_by_level (name, value) VALUES ('S1', 800), ('S2', 0);

-- Mengisi Tabel Agregat Dosen
INSERT INTO professors_by_education (name, value) VALUES ('S3', 2), ('S2', 30);
INSERT INTO professors_by_position (name, value) VALUES ('Profesor', 0), ('Lektor Kepala', 10), ('Lektor', 5), ('Asisten Ahli', 2), ('Tenaga Pengajar', 0);
INSERT INTO professors_by_status (name, value) VALUES ('PNS', 2), ('DLB', 2), ('Tetap', 30);

-- Mengisi Tabel Statistik & Metadata
INSERT INTO general_stats (category, metric, value) VALUES
('professors', 'total', 30), ('professors', 's3Percentage', 2),
('students', 'total', 1000), ('students', 'yearlyIncreasePercentage', 12),
('graduation', 'total', 1514), ('graduation', 'yearlyDecreasePercentage', 83),
('applicants', 'total', 1000), ('applicants', 'yearlyDecreasePercentage', 25);

INSERT INTO metadata (key, value) VALUES ('lastUpdated', '2025-06-14T08:30:00Z');
```

Tahap 3: Verifikasi Data (Opsional)

Setelah Tahap 2 berhasil, Anda bisa menjalankan query ini untuk memastikan data sudah masuk.

```sql

SELECT 'professors' as table_name, count(*) FROM professors
UNION ALL
SELECT 'students_by_year', count(*) FROM students_by_year;

```


Dengan membaginya menjadi beberapa bagian, Anda menghindari masalah dengan EXPLAIN dan dapat membuat database Anda dengan benar.


http://localhost:3001/api/all-data