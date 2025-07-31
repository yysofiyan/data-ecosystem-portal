import { useEffect, useState } from 'react';
import { getDatabaseData, DatabaseData } from "../utils/databaseService";
import NavBar from "../components/dashboard/NavBar";
import StatSection from "../components/dashboard/StatSection";
import StudentSection from "../components/dashboard/StudentSection";
import ProfessorSection from "../components/dashboard/ProfessorSection";
import Footer from "../components/dashboard/Footer";
import { DashboardSkeletonEnhanced } from "../components/dashboard/DashboardSkeletonEnhanced";

const Dashboard = () => {
  // State untuk menyimpan data yang diambil dari API
  const [data, setData] = useState<DatabaseData | null>(null);
  // State untuk menyimpan waktu terakhir update
  const [lastUpdated, setLastUpdated] = useState<string>('');
  // State untuk menandakan proses loading
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect untuk mengambil data saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dbData = await getDatabaseData();
        setData(dbData);
        setLastUpdated(''); // Or set to a default value if needed
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Array kosong berarti efek ini hanya berjalan sekali

  // Tampilkan skeleton loading jika data belum siap
  if (loading) {
    return <DashboardSkeletonEnhanced />;
  }

  // Tampilkan pesan error jika data gagal dimuat
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto text-red-500">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Gagal Memuat Data</h2>
            <p className="text-gray-600 mb-4">Terjadi kesalahan saat mengambil data dari server.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render komponen jika data sudah siap
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <StatSection stats={data.stats} />
          
          <StudentSection 
            byYear={data.students.byYear}
            byProdi={data.students.byProdi}
            byLevel={data.students.byLevel}
          />
          
          <ProfessorSection 
            byEducation={data.professors.byEducation}
            byPosition={data.professors.byPosition}
            byStatus={data.professors.byStatus}
            // byFaculty={data.professors.byEducation}
            profiles={data.professors.profiles}
          />
          
          <Footer lastUpdated={lastUpdated} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
