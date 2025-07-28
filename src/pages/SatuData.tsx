import { Database, BarChart2, FileText, Users, Home, GraduationCap, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "@/components/dashboard/StatCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

const SatuData = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                        <Link
                            to="/"
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <Home className="h-5 w-5 mr-2" />
                            <span className="font-medium">Home</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header Section */}
            <section className="section-padding bg-portal-teal/5">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-4"
                    >
                        <div className="h-12 w-12 bg-portal-teal/10 rounded-lg flex items-center justify-center">
                            <Database className="h-6 w-6 text-portal-teal" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-portal-dark">Satu Data</h1>
                            <p className="text-gray-600">
                                Platform terintegrasi untuk pengelolaan dan akses data fakultas
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section-padding">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Paten"
                            value={20}
                            icon={Users}
                            iconBgColor="bg-portal-teal/10"
                            iconColor="text-portal-teal"
                            percentageChange={12}
                            trend="up"
                        />
                        <StatCard
                            title="Haki"
                            value={150}
                            icon={GraduationCap}
                            iconBgColor="bg-portal-teal/10"
                            iconColor="text-portal-teal"
                            percentageChange={12}
                            trend="up"
                            trendValue="2% S3"
                        />
                        <StatCard
                            title="Tingkat Kelulusan"
                            value={100}
                            icon={Award}
                            iconBgColor="bg-portal-teal/10"
                            iconColor="text-portal-teal"
                            percentageChange={100}
                            subtitle=""
                        />
                        <StatCard
                            title="Publikasi"
                            value={200}
                            icon={BookOpen}
                            iconBgColor="bg-portal-teal/10"
                            iconColor="text-portal-teal"
                            trend="down"
                            subtitle="50 terindeks scopus"
                            percentageChange={12}
                            trendValue="50 terindeks"
                        />
                        {/* Add more StatCard components as needed */}
                    </div>
                </div>
            </section>

            {/* Data Content */}
            <section className="section-padding bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <ScrollArea className="h-[600px] rounded-lg border bg-white p-6">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-portal-dark">Kategori Data</h2>
                            <p className="text-gray-600">
                                Berikut adalah daftar dataset yang tersedia dalam platform Satu Data
                            </p>
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-portal-dark">Publikasi</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white p-4 rounded-lg border">
                                        <h4 className="font-medium text-gray-700 mb-2">Total Publikasi</h4>
                                        <p className="text-3xl font-bold text-portal-teal">42</p>
                                        <p className="text-sm text-gray-500 mt-1">Fakultas Teknologi Informasi</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border">
                                        <h4 className="font-medium text-gray-700 mb-2">Jenis Publikasi</h4>
                                        <ul className="space-y-1">
                                            <li className="flex justify-between">
                                                <span>Jurnal</span>
                                                <span className="font-medium">30</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Prosiding</span>
                                                <span className="font-medium">10</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Buku</span>
                                                <span className="font-medium">2</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border">
                                    <h4 className="font-medium text-gray-700 mb-4">Tren Publikasi Tahunan</h4>
                                    <div className="flex space-x-4 overflow-x-auto pb-2">
                                        {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                                            <div key={year} className="flex flex-col items-center">
                                                <div className="h-24 w-8 bg-portal-teal/10 rounded-t flex items-end">
                                                    <div
                                                        className="w-full bg-portal-teal rounded-t"
                                                        style={{ height: `${year === 2020 ? 12 : year === 2021 ? 16 : year === 2022 ? 19 : year === 2023 ? 28 : 24}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs mt-1">{year}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </section>
        </div>
    );
};

export default SatuData;