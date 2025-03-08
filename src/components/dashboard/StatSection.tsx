
import React from "react";
import { BookOpen, GraduationCap, Users } from "lucide-react";
import StatCard from "./StatCard";
import { Stats } from "../../utils/databaseService";

interface StatSectionProps {
  stats: Stats;
}

const StatSection = ({ stats }: StatSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Dosen"
        value={stats.professors.total}
        subtitle={`${stats.professors.s3Percentage}% Kualifikasi S3`}
        icon={BookOpen}
        iconBgColor="bg-purple-100"
        iconColor="text-purple-600"
      />
      <StatCard
        title="Mahasiswa"
        value={stats.students.total}
        percentageChange={stats.students.yearlyIncreasePercentage}
        increaseIsGood={true}
        icon={Users}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
        delay={0.1}
      />
      <StatCard
        title="Wisuda 2025"
        value={stats.graduation.total}
        percentageChange={stats.graduation.yearlyDecreasePercentage}
        increaseIsGood={false}
        icon={GraduationCap}
        iconBgColor="bg-red-100"
        iconColor="text-red-600"
        delay={0.2}
      />
      <StatCard
        title="Peminat 2024"
        value={stats.applicants.total}
        percentageChange={stats.applicants.yearlyDecreasePercentage}
        increaseIsGood={false}
        icon={Users}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        delay={0.3}
      />
    </div>
  );
};

export default StatSection;
