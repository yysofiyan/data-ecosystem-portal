
import React from "react";
import { motion } from "framer-motion";
import { getDatabaseData, getFormattedLastUpdated } from "../utils/databaseService";
import NavBar from "../components/dashboard/NavBar";
import StatSection from "../components/dashboard/StatSection";
import StudentSection from "../components/dashboard/StudentSection";
import ProfessorSection from "../components/dashboard/ProfessorSection";
import Footer from "../components/dashboard/Footer";

const Dashboard = () => {
  const data = getDatabaseData();
  const lastUpdated = getFormattedLastUpdated();

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
            byFaculty={data.professors.byEducation}
          />
          
          <Footer lastUpdated={lastUpdated} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
