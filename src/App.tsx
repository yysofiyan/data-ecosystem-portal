// Kode ini mengatur konfigurasi routing untuk aplikasi React menggunakan react-router-dom
// Mengimpor komponen yang diperlukan dan mendefinisikan struktur rute

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard"; 
import SatuData from "./pages/SatuData";
import NotFound from "./pages/NotFound";

// Komponen App menangani logika routing utama
// - "/" mengarahkan ke halaman Index/beranda
// - "/dashboard" mengarahkan ke halaman Dashboard
// - "/satu-data" mengarahkan ke halaman SatuData
// - "*" menangkap semua rute yang tidak terdefinisi dan menampilkan halaman NotFound
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/satu-data" element={<SatuData />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
