import React, { useState } from 'react';
import { DataByName, getProfessorProfilesByPosition, ProfessorProfile } from '../utils/databaseService';
import ProfessorDetail from './ProfessorDetail';

// Definisi interface untuk props komponen
interface ProfessorsByPositionProps {
  data: DataByName[];
}

// Definisi komponen fungsional dengan props
const ProfessorsByPosition: React.FC<ProfessorsByPositionProps> = ({ data }) => {
  // State untuk menyimpan posisi yang dipilih
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  // State untuk menyimpan profil dosen yang dipilih
  const [selectedProfessor, setSelectedProfessor] = useState<ProfessorProfile | null>(null);
  // State untuk menyimpan profil dosen berdasarkan posisi yang dipilih
  const [positionProfiles, setPositionProfiles] = useState<ProfessorProfile[]>([]);

  // Fungsi untuk menangani klik pada posisi
  const handlePositionClick = (position: string) => {
    // Mendapatkan profil dosen berdasarkan posisi
    const profiles = getProfessorProfilesByPosition(position);
    // Mengatur posisi yang dipilih
    setSelectedPosition(position);
    // Mengatur profil dosen berdasarkan posisi yang dipilih
    setPositionProfiles(profiles);
    // Mengatur dosen yang dipilih menjadi null
    setSelectedProfessor(null);
  };

  // Fungsi untuk menangani klik pada tabel dosen
  const handleProfessorClick = (professor: ProfessorProfile) => {
    // Mengatur profile dosen yang dipilih
    setSelectedProfessor(professor);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Jabatan</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.name}>
                <td>
                  <button
                    onClick={() => handlePositionClick(item.name)}
                    className={`text-blue-600 hover:underline ${
                      selectedPosition === item.name ? 'font-bold' : ''
                    }`}
                  >
                    {item.name}
                  </button>
                </td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedPosition && positionProfiles.length > 0 && (
          <div>
            <h3 className="font-bold mb-3">Daftar Dosen {selectedPosition}</h3>
            <ul className="space-y-2">
              {positionProfiles.map((professor) => (
                <li key={professor.id}>
                  <button
                    onClick={() => handleProfessorClick(professor)}
                    className={`text-blue-600 hover:underline ${
                      selectedProfessor?.id === professor.id ? 'font-bold' : ''
                    }`}
                  >
                    {professor.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {selectedProfessor && (
        <div>
          <ProfessorDetail professor={selectedProfessor} />
        </div>
      )}
    </div>
  );
};

export default ProfessorsByPosition;