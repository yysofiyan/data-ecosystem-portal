import React, { useState, useEffect } from "react";
import { DataByName, ProfessorProfile } from "../../utils/databaseService";
import HorizontalBarChart from "../charts/HorizontalBarChart";
import ProfessorsByPosition from "../ProfessorsByPosition";

// Interface HANYA untuk ProfessorSection
interface ProfessorSectionProps {
  byEducation: DataByName[];
  byPosition: DataByName[];
  byStatus: DataByName[];
 // byFaculty: DataByName[];
  profiles: ProfessorProfile[];
}

// Definisi HANYA untuk komponen ProfessorSection
const ProfessorSection = ({
  byEducation,
  byPosition,
  byStatus,
  // byFaculty,
  profiles,
}: ProfessorSectionProps) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Data Dosen</h2>
      {/* Chart Section */}
      {/* Mengubah lg:grid-cols-4 menjadi lg:grid-cols-3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <HorizontalBarChart data={byEducation} title="Berdasarkan Pendidikan" />
        <HorizontalBarChart data={byPosition} title="Berdasarkan Jabatan" color="#A78BFA" />
        <HorizontalBarChart data={byStatus} title="Berdasarkan Status" color="#FBBF24" />
        {/* <HorizontalBarChart data={byFaculty} title="Berdasarkan Fakultas" color="#34D399" /> */}
      </div>
      {/* Detail Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Detail Dosen Berdasarkan Jabatan</h3>
        <ProfessorsByPosition data={byPosition} profiles={profiles} />
      </div>
    </div>
  );
};

export default ProfessorSection;
