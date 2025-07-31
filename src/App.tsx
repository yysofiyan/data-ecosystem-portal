// Kode ini mengatur konfigurasi routing untuk aplikasi React menggunakan react-router-dom
// Mengimpor komponen yang diperlukan dan mendefinisikan struktur rute

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard"; 
import SatuData from "./pages/publikasi";
import NotFound from "./pages/NotFound";
import PhotoDebugger from "./pages/PhotoDebugger";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthWrapper } from "./components/auth/AuthWrapper";

// Komponen App menangani logika routing utama
// - "/" mengarahkan ke halaman Index/beranda
// - "/dashboard" mengarahkan ke halaman Dashboard (public)
// - "/admin" mengarahkan ke halaman Admin Dashboard (protected)
// - "/publikasi" mengarahkan ke halaman Publikasi
// - "*" menangkap semua rute yang tidak terdefinisi dan menampilkan halaman NotFound
function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/publikasi" element={<SatuData />} />
          <Route path="/debug-photos" element={<PhotoDebugger />} />
          <Route 
            path="/admin" 
            element={
              <AuthWrapper>
                <AdminDashboard />
              </AuthWrapper>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
