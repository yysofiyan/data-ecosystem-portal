import React from "react";
import {
  BarChart, // Komponen untuk membuat bar chart
  Bar, // Komponen untuk membuat bar dalam chart
  XAxis, // Komponen untuk sumbu X
  YAxis, // Komponen untuk sumbu Y
  CartesianGrid, // Komponen untuk grid kartesian
  Tooltip, // Komponen untuk tooltip (informasi saat hover)
  ResponsiveContainer, // Komponen untuk membuat chart responsif
} from "recharts";
import { DataByName } from "../../utils/databaseService"; // Mengimpor tipe data dari service

// Mendefinisikan tipe properti untuk komponen HorizontalBarChart
interface HorizontalBarChartProps {
  data: DataByName[]; // Data untuk chart
  title: string; // Judul chart
  color?: string; // Warna bar, opsional
}

// Komponen HorizontalBarChart
const HorizontalBarChart = ({ 
  data, // Data untuk chart
  title, // Judul chart
  color = "#4FD1C5" // Warna default bar
}: HorizontalBarChartProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm"> {/* Container dengan styling */}
      <h3 className="text-lg font-semibold mb-4">{title}</h3> {/* Judul chart */}
      <div className="h-[300px]"> {/* Container untuk chart dengan tinggi 300px */}
        <ResponsiveContainer width="100%" height="100%"> {/* Membuat chart responsif */}
          <BarChart data={data} layout="vertical"> {/* Membuat bar chart dengan layout vertikal */}
            <CartesianGrid strokeDasharray="3 3" /> {/* Menambahkan grid dengan garis putus-putus */}
            <XAxis type="number" /> {/* Sumbu X dengan tipe angka */}
            <YAxis dataKey="name" type="category" width={100} /> {/* Sumbu Y dengan tipe kategori dan lebar 100 */}
            <Tooltip /> {/* Menambahkan tooltip */}
            <Bar dataKey="value" fill={color} /> {/* Menambahkan bar dengan warna yang ditentukan */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HorizontalBarChart; // Mengekspor komponen
