import React, { useState, useEffect } from 'react';
import { DataByName, ProfessorProfile } from '../utils/databaseService';
import ProfessorDetail from './ProfessorDetail';
import ProfessorAvatar from './ProfessorAvatar';

// Definisi interface untuk props komponen
interface ProfessorsByPositionProps {
  data: DataByName[];
  profiles: ProfessorProfile[];
}

// Definisi komponen fungsional dengan props
const ProfessorsByPosition: React.FC<ProfessorsByPositionProps> = ({ data, profiles }) => {
  // State untuk menyimpan posisi yang dipilih
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  // State untuk menyimpan profil dosen yang dipilih
  const [selectedProfessor, setSelectedProfessor] = useState<ProfessorProfile | null>(null);
  // State untuk menyimpan profil dosen berdasarkan posisi yang dipilih
  const [positionProfiles, setPositionProfiles] = useState<ProfessorProfile[]>([]);

  // Fungsi untuk menangani klik pada posisi
  const handlePositionClick = (position: string) => {
    // Mendapatkan profil dosen berdasarkan posisi
    const filteredProfiles = profiles.filter(p => p.position === position);
    // Mengatur posisi yang dipilih
    setSelectedPosition(position);
    // Mengatur profil dosen berdasarkan posisi yang dipilih
    setPositionProfiles(filteredProfiles);
    // Secara otomatis pilih dosen pertama di daftar baru
    if (filteredProfiles.length > 0) {
      setSelectedProfessor(filteredProfiles[0]);
    } else {
      setSelectedProfessor(null); // Kosongkan detail jika tidak ada dosen
    }
  };

  // Fungsi untuk menangani klik pada tabel dosen
  const handleProfessorClick = (professor: ProfessorProfile) => {
    // Mengatur profile dosen yang dipilih
    setSelectedProfessor(professor);
  };

  // Efek untuk memilih item pertama saat komponen pertama kali dimuat
  useEffect(() => {
    if (data.length > 0 && !selectedPosition) {
      handlePositionClick(data[0].name);
    }
  }, [data, profiles]); // Bergantung pada data dan profiles

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Kolom Kiri: Navigasi Jabatan dan Daftar Nama */}
      <div className="lg:col-span-1 space-y-4">
        {/* Daftar Jabatan */}
        <div>
          <h4 className="text-md font-semibold mb-2 text-gray-600">Pilih Jabatan</h4>
          <div className="space-y-2">
            {data.map((item) => (
              <button
                key={item.name}
                onClick={() => handlePositionClick(item.name)}
                className={`w-full flex justify-between items-center p-3 rounded-lg text-left transition-all duration-200 ${
                  selectedPosition === item.name
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span className="font-semibold">{item.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-sm ${
                  selectedPosition === item.name ? 'bg-blue-400' : 'bg-gray-300'
                }`}>
                  {item.value}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Daftar Nama Dosen dengan Scroll */}
        {selectedPosition && (
          <div>
            <h4 className="text-md font-semibold mb-2 text-gray-600">Daftar Dosen</h4>
            <div className="bg-gray-50 rounded-lg p-2 max-h-[450px] overflow-y-auto border">
              <ul className="space-y-1">
                {positionProfiles.map((professor) => (
                  <li key={professor.id}>
                    <button
                      onClick={() => handleProfessorClick(professor)}
                      className={`w-full text-left p-2 rounded-md transition-colors text-sm flex items-center gap-3 ${
                        selectedProfessor?.id === professor.id
                          ? 'bg-blue-100 text-blue-700 font-bold'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      <ProfessorAvatar
                        name={professor.name}
                        photoUrl={professor.photoUrl}
                        size="sm"
                      />
                      <span className="flex-1">{professor.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Kolom Kanan: Detail Dosen */}
      <div className="lg:col-span-2">
        {selectedProfessor ? (
          <ProfessorDetail professor={selectedProfessor} />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50 rounded-xl">
            <p className="text-gray-500">Pilih dosen untuk melihat detail.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessorsByPosition;