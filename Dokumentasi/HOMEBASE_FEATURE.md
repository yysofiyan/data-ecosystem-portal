# Homebase Feature Implementation

## 🏠 Homebase untuk Data Dosen

Implementasi fitur homebase (program studi) untuk mengategorikan dosen berdasarkan program studi Informatika dan Sistem Informasi.

## 📊 Database Schema

### 1. Tabel `homebase_by_professor`
```sql
CREATE TABLE homebase_by_professor (
    id INT PRIMARY KEY,
    professor_id INT REFERENCES professors(id) ON DELETE CASCADE,
    homebase VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Tabel `professors_by_homebase` (Agregat)
```sql
CREATE TABLE professors_by_homebase (
    homebase VARCHAR(100) PRIMARY KEY,
    count INT NOT NULL,
    percentage DECIMAL(5,2)
);
```

### 3. Kolom Homebase di Tabel `professors`
```sql
ALTER TABLE professors ADD COLUMN IF NOT EXISTS homebase VARCHAR(100);
```

## 🔧 Data Setup

### Sample Data untuk Copy ke Neon DB:

```sql
-- Insert homebase relationships
INSERT INTO homebase_by_professor (id, professor_id, homebase, department) VALUES
(1, 1, 'Informatika', 'Fakultas Teknologi Informasi'),
(2, 2, 'Sistem Informasi', 'Fakultas Teknologi Informasi'),
(3, 3, 'Informatika', 'Fakultas Teknologi Informasi'),
(4, 4, 'Sistem Informasi', 'Fakultas Teknologi Informasi'),
(5, 5, 'Informatika', 'Fakultas Teknologi Informasi');

-- Insert agregat data for charts
INSERT INTO professors_by_homebase (homebase, count, percentage) VALUES
('Informatika', 3, 60.00),
('Sistem Informasi', 2, 40.00);

-- Update homebase in professors table
UPDATE professors 
SET homebase = hbp.homebase 
FROM homebase_by_professor hbp 
WHERE professors.id = hbp.professor_id;
```

## 🎯 Frontend Implementation

### 1. Updated Interface (`ProfessorProfile`)
```typescript
export interface ProfessorProfile {
  id: number;
  name: string;
  nuptk: string;
  position: string;
  startDate: string;
  verified: boolean;
  photoUrl?: string;
  academicProfile: ProfessorAcademicProfile;
  rank: ProfessorRank;
  certification: ProfessorCertification;
  faculty: string;
  homebase?: string;  // New field
  sintaProfile?: SintaProfile;
}
```

### 2. Form Data Interface (`ProfessorFormData`)
```typescript
interface ProfessorFormData {
    name: string;
    photoUrl: string;
    nuptk: string;
    position: string;
    startDate: string;
    verified: boolean;
    faculty: string;
    homebase: string;  // New field
}
```

### 3. Form Field Implementation
```tsx
<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
        Homebase
    </label>
    <select
        value={formData.homebase}
        onChange={(e) => setFormData({ ...formData, homebase: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
    >
        <option value="">Pilih Homebase</option>
        <option value="Informatika">Informatika</option>
        <option value="Sistem Informasi">Sistem Informasi</option>
    </select>
</div>
```

## 🗂️ Table Display

### Updated Table Headers
```tsx
<thead className="bg-gray-50">
    <tr>
        <th>Dosen</th>
        <th>Jabatan</th>
        <th>Homebase</th>     <!-- New column -->
        <th>NUPTK</th>
        <th>Status</th>
        <th>Aksi</th>
    </tr>
</thead>
```

### Homebase Display with Styling
```tsx
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        professor.homebase === 'Informatika' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-purple-100 text-purple-800'
    }`}>
        {professor.homebase || 'Belum diset'}
    </span>
</td>
```

## 🔗 Backend API Updates

### 1. Updated CREATE Endpoint
```javascript
app.post('/api/professors', async (req, res) => {
    const { name, photo_url, nuptk, position, start_date, verified, faculty, homebase, ... } = req.body;
    
    const query = `
        INSERT INTO professors (id, name, photo_url, nuptk, position, start_date, verified, faculty, homebase, ...)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, ...)
    `;
    
    const values = [
        nextId, name, photo_url, nuptk, position, start_date, verified, faculty,
        homebase || 'Informatika',  // Default homebase
        ...
    ];
});
```

### 2. Updated UPDATE Endpoint
```javascript
app.put('/api/professors/:id', async (req, res) => {
    const { name, photo_url, nuptk, position, start_date, verified, faculty, homebase } = req.body;
    
    const query = `
        UPDATE professors 
        SET name = $1, photo_url = $2, nuptk = $3, position = $4, start_date = $5, verified = $6, faculty = $7, homebase = $8
        WHERE id = $9
    `;
    
    const values = [name, photo_url, nuptk, position, start_date, verified, faculty, homebase || 'Informatika', id];
});
```

### 3. Updated GET Query
```javascript
pool.query('SELECT id, name, photo_url, nuptk, position, start_date, verified, faculty, homebase, academic_profile, rank_info AS rank, certification, sinta_profile FROM professors')
```

## 🎨 Visual Design

### Homebase Badge Colors:
- **Informatika**: Blue badge (`bg-blue-100 text-blue-800`)
- **Sistem Informasi**: Purple badge (`bg-purple-100 text-purple-800`) 
- **Belum diset**: Gray fallback

### Form Layout:
```
┌─────────────────┬─────────────────┐
│ Nama Lengkap    │ NUPTK          │
├─────────────────┼─────────────────┤
│ Jabatan         │ Tanggal Mulai  │
├─────────────────┼─────────────────┤
│ Homebase        │                │
├─────────────────┴─────────────────┤
│ Foto Dosen (Upload/URL)          │
├──────────────────────────────────┤
│ ☑ Verified                      │
└──────────────────────────────────┘
```

## 📈 Data Analytics Support

### View untuk Analytics
```sql
CREATE OR REPLACE VIEW professors_with_homebase AS
SELECT 
    p.id, p.name, p.photo_url, p.nuptk, p.position, p.start_date, 
    p.verified, p.faculty, p.homebase, hbp.department,
    hbp.created_at as homebase_assigned_at
FROM professors p
LEFT JOIN homebase_by_professor hbp ON p.id = hbp.professor_id;
```

### Query Examples
```sql
-- Statistik homebase
SELECT homebase, COUNT(*) as total_professor 
FROM professors 
WHERE homebase IS NOT NULL 
GROUP BY homebase 
ORDER BY total_professor DESC;

-- Professor berdasarkan homebase
SELECT name, position, nuptk 
FROM professors 
WHERE homebase = 'Informatika' 
ORDER BY name;
```

## 🔄 CRUD Operations dengan Homebase

### CREATE (Tambah Dosen):
1. **Form Input**: Pilih homebase dari dropdown
2. **Validation**: Homebase wajib diisi
3. **Default Value**: "Informatika" jika kosong
4. **API Call**: POST dengan field homebase
5. **Database**: Insert dengan homebase value

### READ (Tampil Data):
1. **Query**: Select dengan kolom homebase
2. **Display**: Badge dengan warna berdasarkan homebase
3. **Table**: Kolom terpisah untuk homebase
4. **Filtering**: Future enhancement - filter by homebase

### UPDATE (Edit Dosen):
1. **Load Data**: Homebase dari database
2. **Form**: Pre-populate dropdown homebase
3. **Change**: User dapat mengubah homebase
4. **API Call**: PUT dengan updated homebase
5. **Database**: Update homebase field

### DELETE (Hapus Dosen):
1. **Confirmation**: Standard delete confirmation
2. **Cascade**: homebase_by_professor akan terhapus otomatis
3. **Update Stats**: Agregat data perlu diupdate manual

## 🚀 Integration Benefits

### Admin Dashboard:
- ✅ **Visual Categorization**: Warna badge untuk identifikasi cepat
- ✅ **Form Validation**: Dropdown selection untuk konsistensi
- ✅ **Data Integrity**: Required field untuk semua dosen
- ✅ **Scalable**: Mudah tambah homebase baru

### Analytics Ready:
- ✅ **Reporting**: Data siap untuk chart homebase distribution
- ✅ **Filtering**: Basis untuk filter dosen by homebase
- ✅ **Statistics**: Aggregated data untuk dashboard metrics
- ✅ **Performance**: Indexed untuk query cepat

### Future Enhancements:
- 🔄 **Chart Integration**: Homebase distribution pie chart
- 🔄 **Filter Feature**: Filter tabel by homebase
- 🔄 **Bulk Update**: Mass update homebase for multiple professors
- 🔄 **Dynamic Options**: Admin-configurable homebase options

**Fitur homebase sekarang terintegrasi penuh dengan CRUD operations dan siap untuk analytics! 🏠📊**
