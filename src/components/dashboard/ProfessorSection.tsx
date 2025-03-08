
import React from "react";
import { motion } from "framer-motion";
import PieChartComponent from "../charts/PieChartComponent";
import VerticalBarChart from "../charts/VerticalBarChart";
import HorizontalBarChart from "../charts/HorizontalBarChart";
import FilterableDataTable from "./FilterableDataTable";
import { DataByName, ProfessorProfile, getProfessorProfilesByPosition } from "../../utils/databaseService";

interface ProfessorSectionProps {
  byEducation: DataByName[];
  byPosition: DataByName[];
  byStatus: DataByName[];
  byFaculty: DataByName[];
}

const ProfessorSection = ({
  byEducation,
  byPosition,
  byStatus,
  byFaculty,
}: ProfessorSectionProps) => {
  // Get professor profiles for each position
  const getProfessorsByPositionName = (positionName: string): ProfessorProfile[] => {
    return getProfessorProfilesByPosition(positionName);
  };

  // Get all profiles for all positions
  const getAllProfessorProfiles = (): ProfessorProfile[] => {
    return byPosition.flatMap(position => getProfessorsByPositionName(position.name));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold mb-6">Data Dosen</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartComponent
          data={byEducation}
          title="Berdasarkan Jenjang Pendidikan Tertinggi"
        />
        <VerticalBarChart
          data={byPosition}
          title="Berdasarkan Jabatan Fungsional"
        />
        <PieChartComponent
          data={byStatus}
          title="Berdasarkan Status Kepegawaian"
        />
        <HorizontalBarChart
          data={byFaculty}
          title="Berdasarkan Fakultas"
          color="#9b87f5"
        />
        <FilterableDataTable
          data={getAllProfessorProfiles()}
          title="Data Dosen Berdasarkan Jabatan"
          className="lg:col-span-2"
          type="profile"
        />
        <FilterableDataTable
          data={byFaculty}
          title="Data Dosen Berdasarkan Fakultas"
          className="lg:col-span-2"
          type="summary"
        />
      </div>
    </motion.div>
  );
};

export default ProfessorSection;
