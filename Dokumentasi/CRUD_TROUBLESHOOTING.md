# Troubleshooting CRUD Operations

## 🔧 Fix for "null value in column id" Error

### Masalah
Error: `null value in column "id" of relation "professors" violates not-null constraint`

### Penyebab
- Database table `professors` memiliki kolom `id` sebagai PRIMARY KEY tapi bukan AUTO_INCREMENT
- Backend tidak mengirim nilai ID saat CREATE operation
- Struktur database mengharuskan ID di-set manual

### Solusi yang Diterapkan

#### 1. Backend Fix (`backend/index.js`)
```javascript
// Sebelum INSERT, dapatkan ID tertinggi + 1
const maxIdResult = await pool.query('SELECT COALESCE(MAX(id), 0) + 1 as next_id FROM professors');
const nextId = maxIdResult.rows[0].next_id;

// INSERT dengan ID manual
INSERT INTO professors (id, name, photo_url, ...)
VALUES ($1, $2, $3, ...)
```

#### 2. Input Validation
- Validasi required fields: name, nuptk, position, start_date
- Cek NUPTK duplicate sebelum INSERT
- Trim whitespace dari input fields

#### 3. Error Handling
- Better error messages untuk user
- Specific error untuk NUPTK duplicate
- Connection error handling

## 🚀 Cara Menjalankan Server

### 1. Start Backend Server
```bash
cd /Applications/ServBay/www/data-ecosystem-portal/backend
node index.js
```

### 2. Start Frontend (Terminal baru)
```bash
cd /Applications/ServBay/www/data-ecosystem-portal
npm run dev
```

### 3. Access Admin Portal
- URL: `http://localhost:5173/admin`
- Login menggunakan Clerk authentication
- Test CRUD operations

## 🔍 Testing CRUD Operations

### CREATE (Tambah Dosen)
1. Klik "Tambah Dosen"
2. Isi form dengan data:
   - Nama Lengkap: "Test Professor, M.Kom"
   - NUPTK: "1234567890123456" (16 digit unik)
   - Jabatan: Pilih dari dropdown
   - Tanggal Mulai: Set tanggal valid
   - URL Foto: Opsional
   - Verified: Check/uncheck

### READ (Lihat Data)
- Otomatis load saat buka admin dashboard
- Refresh data setelah CREATE/UPDATE/DELETE

### UPDATE (Edit Dosen)
1. Klik icon Edit (pensil) pada row professor
2. Ubah data yang diperlukan
3. Klik "Update"

### DELETE (Hapus Dosen)
1. Klik icon Delete (trash) pada row professor
2. Konfirmasi penghapusan
3. Data akan terhapus dari database

## 🛡️ Validasi Form

### Required Fields
- ✅ Nama Lengkap (tidak boleh kosong)
- ✅ NUPTK (16 digit, harus unik)
- ✅ Jabatan (pilih dari dropdown)
- ✅ Tanggal Mulai (format date valid)

### Optional Fields
- URL Foto (akan menggunakan avatar fallback jika kosong)
- Status Verified (default: false)
- Fakultas (default: "Fakultas Teknologi Informasi")

## 🔧 Database Schema Fix (Opsional)

Jika ingin menggunakan AUTO_INCREMENT, ubah schema:

```sql
-- Alter table untuk auto-increment ID
ALTER TABLE professors ALTER COLUMN id SET DEFAULT nextval('professors_id_seq');
CREATE SEQUENCE IF NOT EXISTS professors_id_seq OWNED BY professors.id;
SELECT setval('professors_id_seq', COALESCE(MAX(id), 0)) FROM professors;
```

## 🚨 Common Errors & Solutions

### 1. "NUPTK sudah terdaftar"
- **Penyebab**: NUPTK duplicate
- **Solusi**: Gunakan NUPTK yang unik

### 2. "Backend server tidak berjalan"
- **Penyebab**: Backend tidak running di port 3001
- **Solusi**: Jalankan `node index.js` di folder backend

### 3. "Database connection error"
- **Penyebab**: Environment variable DATABASE_URL tidak benar
- **Solusi**: Cek file `.env` di folder backend

### 4. "Field wajib diisi"
- **Penyebab**: Required fields kosong
- **Solusi**: Isi semua field yang wajib (nama, NUPTK, jabatan, tanggal)

## 📊 API Endpoints

### CREATE Professor
```
POST http://localhost:3001/api/professors
Content-Type: application/json

{
  "name": "Test Professor, M.Kom",
  "photo_url": "/images/professors/test.jpg",
  "nuptk": "1234567890123456",
  "position": "Lektor",
  "start_date": "2024-01-01",
  "verified": true,
  "faculty": "Fakultas Teknologi Informasi"
}
```

### UPDATE Professor
```
PUT http://localhost:3001/api/professors/{id}
Content-Type: application/json

{
  "name": "Updated Professor Name",
  "photo_url": "/images/professors/updated.jpg",
  // ... other fields
}
```

### DELETE Professor
```
DELETE http://localhost:3001/api/professors/{id}
```

## ✅ Status
- ✅ CREATE: Fixed dengan auto-generated ID
- ✅ READ: Working dengan avatar fallback
- ✅ UPDATE: Working dengan field validation
- ✅ DELETE: Working dengan confirmation
- ✅ Validation: Form validation dan error handling
- ✅ Authentication: Clerk protection untuk admin routes

**CRUD Operations untuk admin portal sekarang berfungsi dengan baik! 🎊**
