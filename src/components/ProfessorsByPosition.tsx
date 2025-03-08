import React, { useState } from 'react';
import { DataByName, getProfessorProfilesByPosition, ProfessorProfile } from '../utils/databaseService';
import ProfessorDetail from './ProfessorDetail';

interface ProfessorsByPositionProps {
  data: DataByName[];
}

const ProfessorsByPosition: React.FC<ProfessorsByPositionProps> = ({ data }) => {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedProfessor, setSelectedProfessor] = useState<ProfessorProfile | null>(null);
  const [positionProfiles, setPositionProfiles] = useState<ProfessorProfile[]>([]);

  const handlePositionClick = (position: string) => {
    const profiles = getProfessorProfilesByPosition(position);
    setSelectedPosition(position);
    setPositionProfiles(profiles);
    setSelectedProfessor(null);
  };

  const handleProfessorClick = (professor: ProfessorProfile) => {
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