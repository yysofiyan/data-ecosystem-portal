// Kode ini mengatur konfigurasi routing untuk aplikasi React menggunakan react-router-dom
// Mengimpor komponen yang diperlukan dan mendefinisikan struktur rute

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard"; 
import SatuData from "./pages/publikasi";
import NotFound from "./pages/NotFound";

// Komponen App menangani logika routing utama
// - "/" mengarahkan ke halaman Index/beranda
// - "/dashboard" mengarahkan ke halaman Dashboard
// - "/publikasi" mengarahkan ke halaman Publikasi
// - "*" menangkap semua rute yang tidak terdefinisi dan menampilkan halaman NotFound
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/publikasi" element={<SatuData />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
