
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { StudentByYear } from "../../utils/databaseService";

interface StudentYearChartProps {
  data: StudentByYear[];
}

const StudentYearChart = ({ data }: StudentYearChartProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        Jumlah Mahasiswa Berdasarkan Tahun Angkatan
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#9b87f5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentYearChart;
