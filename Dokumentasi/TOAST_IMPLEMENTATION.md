# Toast Notifications dengan Sonner

## 🎨 Modern UI Alerts Implementation

Mengganti alert standar dengan **Sonner toast notifications** yang lebih menarik dan user-friendly di AdminDashboard.

## 📦 Components Used

### 1. Sonner Package
- **Library**: `sonner` v1.5.0 (sudah terinstall)
- **Theme Support**: `next-themes` v0.3.0 untuk dark/light mode
- **Component**: `src/components/ui/sonner.tsx`

### 2. Integration Points
- **Main App**: `main.tsx` - Toaster provider
- **Theme**: `App.tsx` - ThemeProvider wrapper
- **Usage**: `AdminDashboard.tsx` - Toast notifications

## 🚀 Implementation Features

### 1. Form Validation Toast
```tsx
toast.error('Field Wajib', {
    description: 'Nama, NUPTK, Jabatan, dan Tanggal Mulai wajib diisi!',
    duration: 4000,
});
```

### 2. Loading States
```tsx
const loadingToast = toast.loading('Menambahkan dosen baru...');
// ... async operation
toast.dismiss(loadingToast);
```

### 3. Success Notifications
```tsx
toast.success('Berhasil!', {
    description: 'Dosen baru berhasil ditambahkan',
    duration: 3000,
});
```

### 4. Error Handling
```tsx
toast.error('Tambah Dosen Gagal', {
    description: result.error,
    duration: 4000,
});
```

### 5. Confirmation Dialog
```tsx
toast('Konfirmasi Hapus', {
    description: 'Apakah Anda yakin ingin menghapus data dosen ini?',
    action: {
        label: 'Hapus',
        onClick: async () => { /* delete logic */ },
    },
    cancel: {
        label: 'Batal',
        onClick: () => { /* cancel logic */ }
    },
    duration: 5000,
});
```

### 6. Info Messages
```tsx
toast.info('Mode Edit', {
    description: `Mengedit data: ${professor.name}`,
    duration: 2000,
});
```

## 🎯 Toast Types & Use Cases

### ✅ Success Toast
- **Use**: Data berhasil disimpan/diupdate/dihapus
- **Duration**: 3000ms
- **Style**: Green background, checkmark icon
- **Examples**: 
  - "Dosen baru berhasil ditambahkan"
  - "Data dosen berhasil diupdate"
  - "Data dosen berhasil dihapus"

### ❌ Error Toast
- **Use**: Validasi gagal, API error, koneksi error
- **Duration**: 4000-5000ms
- **Style**: Red background, X icon
- **Examples**:
  - "Field Wajib" (validation error)
  - "NUPTK sudah terdaftar" (duplicate error)
  - "Koneksi Error" (network error)

### ⏳ Loading Toast
- **Use**: Operasi async dalam progress
- **Duration**: Manual dismiss
- **Style**: Spinner animation
- **Examples**:
  - "Menambahkan dosen baru..."
  - "Mengupdate data dosen..."
  - "Menghapus data dosen..."

### ℹ️ Info Toast
- **Use**: Informasi umum, status change
- **Duration**: 2000ms
- **Style**: Blue background, info icon
- **Examples**:
  - "Mode Edit"
  - "Dibatalkan"
  - "Data Dimuat"

### ⚠️ Warning/Confirmation Toast
- **Use**: Konfirmasi action yang destructive
- **Duration**: 5000ms dengan action buttons
- **Style**: Yellow/Orange background dengan action buttons
- **Examples**:
  - Delete confirmation dengan action buttons

## 🔧 Technical Setup

### 1. Toast Provider (`main.tsx`)
```tsx
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <App />
            <Toaster />
        </ClerkProvider>
    </StrictMode>
);
```

### 2. Theme Provider (`App.tsx`)
```tsx
import { ThemeProvider } from "next-themes";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Router>
        {/* routes */}
      </Router>
    </ThemeProvider>
  );
}
```

### 3. Usage in Components (`AdminDashboard.tsx`)
```tsx
import { toast } from 'sonner';

// Use in async functions
const handleSubmit = async () => {
    const loadingToast = toast.loading('Processing...');
    try {
        // API call
        toast.success('Success!');
    } catch (error) {
        toast.error('Failed!');
    } finally {
        toast.dismiss(loadingToast);
    }
};
```

## 🎨 Visual Design

### Toast Styling
- **Position**: Top-right corner (default)
- **Animation**: Slide in from right with bounce
- **Theme**: Follows system theme (light/dark mode)
- **Duration**: Auto-dismiss with different timings based on type
- **Stacking**: Multiple toasts stack vertically

### Action Buttons
- **Primary**: Action button (e.g., "Hapus") - colored
- **Secondary**: Cancel button (e.g., "Batal") - muted
- **Hover Effects**: Button hover states
- **Accessibility**: Keyboard navigation support

## 🔄 Before vs After

### ❌ Before (Standard Alert)
```tsx
alert('Data profesor berhasil diupdate!');
confirm('Apakah Anda yakin ingin menghapus?');
```
- **Problems**: 
  - Blocks UI thread
  - No styling control
  - Poor UX
  - No loading states
  - Browser-dependent appearance

### ✅ After (Sonner Toast)
```tsx
toast.success('Berhasil!', {
    description: 'Data dosen berhasil diupdate',
    duration: 3000,
});

toast('Konfirmasi Hapus', {
    action: { label: 'Hapus', onClick: deleteFunction },
    cancel: { label: 'Batal', onClick: cancelFunction }
});
```
- **Benefits**:
  - Non-blocking UI
  - Consistent design
  - Better UX with animations
  - Loading states support
  - Customizable appearance
  - Action buttons support
  - Theme-aware (dark/light mode)

## 📱 Responsive Behavior

### Desktop
- **Position**: Top-right corner
- **Width**: Fixed width with responsive content
- **Stack**: Vertical stacking of multiple toasts

### Mobile
- **Position**: Top-center (auto-adjusts)
- **Width**: Full-width with margins
- **Touch**: Swipe to dismiss support

## 🎊 Enhanced UX Features

### 1. Smart Duration
- **Success**: 3000ms (quick confirmation)
- **Error**: 4000-5000ms (more time to read)
- **Info**: 2000ms (brief notification)
- **Loading**: Manual dismiss only

### 2. Interactive Elements
- **Action Buttons**: Primary/secondary actions
- **Dismiss**: Click X or auto-dismiss
- **Hover**: Pause auto-dismiss on hover
- **Progress**: Visual countdown indicator

### 3. Content Structure
- **Title**: Short, descriptive header
- **Description**: Detailed message
- **Actions**: Call-to-action buttons when needed

**Modern toast notifications sekarang menggantikan alert standar untuk pengalaman admin yang lebih profesional! 🎨✨**
