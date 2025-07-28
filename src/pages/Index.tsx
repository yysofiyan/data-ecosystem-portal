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
              Portal Data terintegrasi untuk keterbukaan dan kemudahan akses data
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
              <h3 className="text-xl font-semibold mb-2">Satu Data</h3>
              <p className="text-gray-600 mb-4">
                Platform terintegrasi untuk pengelolaan dan akses data fakultas
                yang terstandarisasi
              </p>
              <Link
                to="/satu-data"
                className="inline-flex items-center text-portal-teal hover:text-portal-teal/80 transition-colors"
              >
                Pelajari Lebih Lanjut
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
              <h3 className="text-xl font-semibold mb-2">Ekosistem Data</h3>
              <p className="text-gray-600 mb-4">
                Berbicara dengan Data adalah semangat kami. Ekosistem Data FTI adalah
                portal terintegrasi untuk keterbukaan data
              </p>
              <a
                href="#"
                className="inline-flex items-center text-portal-purple hover:text-portal-purple/80 transition-colors"
              >
                Jelajahi Ekosistem
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
