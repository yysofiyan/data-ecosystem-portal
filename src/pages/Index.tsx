import { ArrowRight, Database, Globe, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-portal-purple/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-portal-dark mb-6">
              Selamat Datang
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              di Portal Data terintegrasi untuk keterbukaan dan kemudahan akses data
              bagi sivitas akademika Fakultas Teknologi Informasi
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 card-hover border"
            >
              <div className="h-12 w-12 bg-portal-purple/10 rounded-lg flex items-center justify-center mb-4">
                <LayoutDashboard className="h-6 w-6 text-portal-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dashboard Data</h3>
              <p className="text-gray-600 mb-4">
                Dashboard interaktif yang menampilkan data Fakultas Teknologi Informasi
                dengan visualisasi yang informatif
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center text-portal-purple hover:text-portal-purple/80 transition-colors"
              >
                Lihat Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl p-6 card-hover border"
            >
              <div className="h-12 w-12 bg-portal-teal/10 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-portal-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Publikasi</h3>
              <p className="text-gray-600 mb-4">
                Akses data publikasi penelitian dan pengabdian masyarakat yang telah
                dilakukan oleh sivitas akademika.
              </p>
              <Link
                to="/publikasi"
                className="inline-flex items-center text-portal-teal hover:text-portal-teal/80 transition-colors"
              >
                Lihat Publikasi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 card-hover border"
            >
              <div className="h-12 w-12 bg-portal-purple/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-portal-purple" />
              </div>
                <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold">PERMOHONAN DATA</h3>
                <span className="ml-3 bg-yellow-200 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  Coming Soon
                </span>
                </div>
              <p className="text-gray-600 mb-4">
                Ajukan permohonan akses data dengan mudah melalui sistem yang
                transparan dan terintegrasi.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-portal-purple hover:text-portal-purple/80 transition-colors"
              >
                Ajukan Permohonan
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
