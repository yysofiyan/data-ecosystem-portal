# Photo Upload Feature

## 🖼️ Fitur Upload Foto untuk Admin Dashboard

Implementasi lengkap fitur upload foto dosen dengan dukungan drag & drop, preview, dan validasi file.

## 🎯 Features Overview

### 1. **Dual Input Mode**
- **URL Input**: Masukkan link foto yang sudah tersedia online
- **File Upload**: Upload foto baru dari komputer dengan drag & drop

### 2. **File Upload Capabilities**
- **Drag & Drop**: Seret file langsung ke area upload
- **Click to Browse**: Klik untuk membuka file picker
- **Real-time Preview**: Preview foto sebelum submit
- **Progress Feedback**: Loading state dengan toast notifications

### 3. **File Validation**
- **Format Support**: JPG, PNG, GIF, WebP
- **Size Limit**: Maksimal 5MB per file
- **Type Validation**: Hanya file gambar yang diterima
- **Error Handling**: Pesan error yang jelas dan informatif

## 🔧 Technical Implementation

### Frontend Component: `PhotoUpload.tsx`

#### Key Features:
```tsx
interface PhotoUploadProps {
    value: string;           // Current photo URL
    onChange: (url: string) => void;  // Callback when URL changes
    placeholder?: string;    // Placeholder text for URL input
}
```

#### Upload Process:
1. **File Validation**: Format dan ukuran file
2. **FormData Creation**: Prepare file untuk upload
3. **API Call**: POST ke `/api/upload-photo`
4. **URL Update**: Set photo URL dari response
5. **Preview Update**: Update preview dengan foto baru

#### UI States:
- **Idle**: Ready untuk input URL atau upload file
- **Loading**: Sedang upload dengan loading spinner
- **Preview**: Menampilkan foto dengan option untuk hapus
- **Error**: Error state dengan pesan yang jelas

### Backend API: `backend/index.js`

#### Multer Configuration:
```javascript
const storage = multer.diskStorage({
    destination: '../public/images/professors',
    filename: `${timestamp}_${originalname}`
});

const upload = multer({
    fileFilter: image files only,
    limits: { fileSize: 5MB }
});
```

#### Upload Endpoint:
```
POST /api/upload-photo
Content-Type: multipart/form-data
Body: photo file

Response: {
    success: true,
    data: {
        filename: "1234567890_photo.jpg",
        url: "/images/professors/1234567890_photo.jpg",
        size: 1024000,
        mimetype: "image/jpeg"
    }
}
```

#### File Storage:
- **Location**: `public/images/professors/`
- **Naming**: `{timestamp}_{original_filename}`
- **Access**: `http://localhost:3001/images/professors/{filename}`

## 🎨 UI/UX Design

### Toggle Buttons
```tsx
[URL] [Upload]  // Switch between input modes
```

### URL Input Mode
```tsx
<input type="url" placeholder="https://..." />
```

### File Upload Mode
```tsx
<div className="drag-drop-area">
    📤 Klik untuk memilih foto atau drag & drop
    JPG, PNG, GIF, WebP (Max: 5MB)
</div>
```

### Preview Card
```tsx
<div className="preview">
    <img src="preview" />
    <div>
        <p>Preview Foto</p>
        <p className="url-truncated">/images/professors/...</p>
    </div>
    <button onClick="clear">❌</button>
</div>
```

## 🔄 User Flow

### Upload File Flow:
1. **Select Upload Tab**: Klik tombol "Upload"
2. **Choose File**: Drag & drop atau klik untuk browse
3. **File Validation**: Automatic validation
4. **Upload Progress**: Loading toast dengan progress
5. **Success Feedback**: Success toast + preview
6. **Form Update**: URL otomatis terisi

### URL Input Flow:
1. **Select URL Tab**: Klik tombol "URL"
2. **Paste URL**: Input URL foto existing
3. **Preview Update**: Preview otomatis update
4. **Form Update**: Value tersimpan di form

## 🛡️ Validation & Security

### Frontend Validation:
- **File Type**: `file.type.startsWith('image/')`
- **File Size**: `file.size <= 5MB`
- **Error Messages**: Toast notifications untuk semua error

### Backend Validation:
- **Multer Filter**: Hanya image MIME types
- **Size Limit**: 5MB enforced oleh multer
- **Directory Safety**: Path validation untuk prevent directory traversal

### Error Handling:
```tsx
// Frontend errors
toast.error('File Tidak Valid', {
    description: 'Hanya file gambar yang diperbolehkan',
    duration: 4000,
});

// Backend errors
{
    success: false,
    error: 'File terlalu besar. Maksimal 5MB'
}
```

## 🚀 Integration with AdminDashboard

### Form Integration:
```tsx
<PhotoUpload
    value={formData.photoUrl}
    onChange={(url) => setFormData({ ...formData, photoUrl: url })}
    placeholder="https://example.com/photo.jpg atau /images/professors/name.jpg"
/>
```

### CRUD Operations:
- **CREATE**: Upload foto sebelum submit form
- **UPDATE**: Ganti foto existing dengan upload baru
- **DELETE**: Hapus foto dengan clear button
- **READ**: Preview foto dalam form edit

## 📱 Responsive Design

### Desktop Experience:
- **Drag & Drop**: Full drag and drop support
- **Large Preview**: 64px preview dengan detail URL
- **Hover Effects**: Interactive hover states

### Mobile Experience:
- **Touch Upload**: Tap to open file picker
- **Compact Preview**: Smaller preview untuk mobile
- **Touch-friendly**: Large touch targets

## 🎊 Toast Notifications

### Upload States:
```tsx
// Loading
toast.loading('Mengunggah foto...');

// Success
toast.success('Upload Berhasil!', {
    description: 'Foto filename.jpg berhasil diunggah',
    duration: 3000,
});

// Error
toast.error('Upload Gagal', {
    description: 'Terjadi kesalahan saat mengunggah foto',
    duration: 4000,
});

// File removed
toast.info('Foto Dihapus', {
    description: 'Foto dosen telah dihapus',
    duration: 2000,
});
```

## 🔧 File Management

### Storage Structure:
```
public/
  images/
    professors/
      1703721234567_yanyan_sofiyan.jpg
      1703721234568_john_doe.png
      1703721234569_jane_smith.webp
```

### URL Patterns:
- **Uploaded Files**: `/images/professors/{timestamp}_{filename}`
- **External URLs**: `https://example.com/photo.jpg`
- **Relative URLs**: `/images/professors/existing-photo.jpg`

### Cleanup (Future Enhancement):
```javascript
// TODO: Implement cleanup for unused uploaded files
app.delete('/api/photos/:filename', cleanupHandler);
```

## ✅ Benefits

### User Experience:
- **Intuitive**: Familiar drag & drop interface
- **Flexible**: Support URL dan file upload
- **Fast**: Real-time preview dan feedback
- **Reliable**: Comprehensive error handling

### Developer Experience:
- **Reusable**: Component dapat digunakan di tempat lain
- **Type Safe**: Full TypeScript support
- **Well Documented**: Clear API dan props
- **Error Handled**: Graceful error management

### Admin Benefits:
- **Easy Upload**: Drag & drop untuk quick upload
- **Preview**: Lihat foto sebelum save
- **Validation**: Automatic file validation
- **Feedback**: Clear success/error messages

**Fitur upload foto sekarang memberikan pengalaman admin yang lebih modern dan user-friendly! 🖼️✨**
