# Fix Photo URL Database Issues

## Problem Identified
Foto profesor di database NEON tidak tampil karena:

1. **Field Mapping Issue**: Database menggunakan `photo_url` (snake_case) tetapi frontend mengharapkan `photoUrl` (camelCase)
2. **URL Path Issues**: Ada dua jenis URL:
   - Path relatif: `/images/professors/yanyan-sofiyan.jpeg`
   - URL eksternal: `https://fti.unsap.ac.id/wp-content/uploads/2024/11/8.png`

## Solutions Implemented

### 1. Backend Field Mapping Fix
**File**: `backend/index.js`

```javascript
// BEFORE: Field tidak di-map, frontend menerima photo_url
profiles: professorProfiles.rows.map(p => ({
    ...p,
    academic_profile: typeof p.academic_profile === 'string' ? JSON.parse(p.academic_profile) : p.academic_profile,
    // ... other fields
}))

// AFTER: Field di-map ke camelCase
profiles: professorProfiles.rows.map(p => ({
    ...p,
    // Mapping snake_case ke camelCase untuk konsistensi frontend
    photoUrl: p.photo_url,
    startDate: p.start_date,
    academicProfile: typeof p.academic_profile === 'string' ? JSON.parse(p.academic_profile) : p.academic_profile,
    // ... other mappings
    // Hapus field snake_case yang sudah dimapping
    photo_url: undefined,
    start_date: undefined,
    academic_profile: undefined,
}))
```

### 2. Enhanced Photo URL Processing
**File**: `src/components/ProfessorAvatar.tsx`

```typescript
// Fungsi untuk memproses URL foto
const processPhotoUrl = (photoUrl?: string): string | undefined => {
    if (!photoUrl) return undefined;
    
    // Jika sudah URL lengkap (http/https), gunakan langsung
    if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
        return photoUrl;
    }
    
    // Jika path relatif, pastikan dimulai dengan /
    if (!photoUrl.startsWith('/')) {
        return `/${photoUrl}`;
    }
    
    return photoUrl;
};
```

### 3. Debugging Tools
**File**: `src/pages/PhotoDebugger.tsx`

- Test component untuk melihat URL yang diterima dari database
- Visual testing untuk berbagai jenis URL
- Error debugging untuk foto yang gagal dimuat

**Access**: `http://localhost:5173/debug-photos`

## Database Schema
Table `professors` di NEON menggunakan struktur:

```sql
CREATE TABLE professors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    photo_url VARCHAR(255),  -- Field ini yang bermasalah
    nuptk VARCHAR(255),
    position VARCHAR(255),
    start_date DATE,
    verified BOOLEAN,
    faculty VARCHAR(255),
    academic_profile JSON,
    rank_info JSON,
    certification JSON,
    sinta_profile JSON
);
```

## URL Types Handled

### 1. Local Paths (dari public folder)
```
Database: /images/professors/yanyan-sofiyan.jpeg
Frontend: /images/professors/yanyan-sofiyan.jpeg (unchanged)
Browser: http://localhost:5173/images/professors/yanyan-sofiyan.jpeg
```

### 2. External URLs
```
Database: https://fti.unsap.ac.id/wp-content/uploads/2024/11/8.png
Frontend: https://fti.unsap.ac.id/wp-content/uploads/2024/11/8.png (unchanged)
Browser: https://fti.unsap.ac.id/wp-content/uploads/2024/11/8.png
```

### 3. Fallback Behavior
- Jika URL tidak ada → Tampilkan inisial
- Jika URL gagal dimuat → Tampilkan inisial
- Inisial: 2 karakter pertama dari nama (uppercase)
- Background: Gradient blue to purple

## Testing Steps

### 1. Test Field Mapping
1. Start backend: `cd backend && npm start`
2. Test API endpoint: `http://localhost:3001/api/all-data`
3. Check `professors.profiles[].photoUrl` (bukan `photo_url`)

### 2. Test Avatar Display
1. Go to Dashboard → Detail Dosen
2. Check if photos appear correctly
3. Check fallback for missing photos

### 3. Use Debug Page
1. Go to `http://localhost:5173/debug-photos`
2. Compare test URLs vs database data
3. Check image loading status

## Common Issues & Solutions

### Issue 1: Photo masih tidak tampil
**Cause**: Backend belum restart setelah perubahan
**Solution**: Restart backend server

### Issue 2: External URL blocked
**Cause**: CORS or HTTPS mixed content
**Solution**: Check browser console for security errors

### Issue 3: Path relatif tidak ditemukan
**Cause**: File tidak ada di public/images/professors/
**Solution**: Verify file exists or fallback akan aktif

### Issue 4: Field masih snake_case
**Cause**: Backend mapping tidak bekerja
**Solution**: Check backend logs dan restart server

## Files Modified

```
backend/
├── index.js                     # ✅ Field mapping fix

src/components/
├── ProfessorAvatar.tsx          # ✅ URL processing function

src/pages/
├── PhotoDebugger.tsx            # ✅ Debug tool

src/
└── App.tsx                      # ✅ Debug route added
```

## Environment Variables
Backend membutuhkan:
```env
DATABASE_URL="postgresql://neondb_owner:npg_1XSlsqow4MHP@ep-wild-voice-adess8p8-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

## Next Steps
1. Restart backend server untuk apply perubahan
2. Test foto yang sudah ada di database
3. Verify external URLs work dengan HTTPS
4. Remove debug route setelah testing selesai
