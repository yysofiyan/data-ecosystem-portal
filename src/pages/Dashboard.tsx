import { useEffect, useState } from 'react';
import { getDatabaseData, DatabaseData } from "../utils/databaseService";
import NavBar from "../components/dashboard/NavBar";
import StatSection from "../components/dashboard/StatSection";
import StudentSection from "../components/dashboard/StudentSection";
import ProfessorSection from "../components/dashboard/ProfessorSection";
import Footer from "../components/dashboard/Footer";

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

  // Tampilkan pesan loading jika data belum siap
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-semibold text-gray-600">Memuat data dasbor...</p>
      </div>
    );
  }

  // Tampilkan pesan error jika data gagal dimuat
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl font-semibold text-red-500">Gagal memuat data.</p>
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
