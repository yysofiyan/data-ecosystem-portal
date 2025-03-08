
import React from "react";
import { motion } from "framer-motion";
import { StudentByYear, DataByName } from "../../utils/databaseService";
import StudentYearChart from "../charts/StudentYearChart";
import HorizontalBarChart from "../charts/HorizontalBarChart";
import PieChartComponent from "../charts/PieChartComponent";
import FilterableDataTable from "./FilterableDataTable";

interface StudentSectionProps {
  byYear: StudentByYear[];
  byFaculty: DataByName[];
  byLevel: DataByName[];
}

const StudentSection = ({ byYear, byFaculty, byLevel }: StudentSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold mb-6">Data Mahasiswa</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudentYearChart data={byYear} />
        <HorizontalBarChart 
          data={byFaculty} 
          title="Sebaran Mahasiswa Berdasarkan Fakultas" 
        />
        <PieChartComponent 
          data={byLevel} 
          title="Berdasarkan Jenjang" 
        />
        <FilterableDataTable 
          data={byFaculty}
          title="Data Mahasiswa Berdasarkan Fakultas"
        />
      </div>
    </motion.div>
  );
};

export default StudentSection;
