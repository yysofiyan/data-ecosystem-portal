// Import library dan komponen yang dibutuhkan
import React from 'react';
import { ProfessorProfile } from '../utils/databaseService';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CheckCircle, User } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bookmark, Award, Star, BarChart2 } from 'lucide-react';

// Interface untuk tipe data gambar statis
interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}

// Komponen Image untuk menampilkan gambar dengan berbagai properti
const Image = ({ src, alt, fill, className, onError }: { 
  src: string | StaticImageData, 
  alt: string,
  fill?: boolean,
  className?: string,
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void 
}) => (
  <img 
    src={typeof src === 'string' ? src : src.src}
    alt={alt}
    className={className}
    style={fill ? { width: '100%', height: '100%', objectFit: 'cover' } : undefined}
    onError={onError}
  />
);

// Interface untuk props komponen ProfessorDetail
interface ProfessorDetailProps {
  professor: ProfessorProfile;
}

// Komponen utama untuk menampilkan detail profil profesor
const ProfessorDetail: React.FC<ProfessorDetailProps> = ({ professor }) => {
  // Fungsi untuk memformat tanggal ke format yang diinginkan
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'd MMM yyyy', { locale: id });
  };
  const getMetricsChartData = () => {
    if (!professor.sintaProfile?.metrics) return [];
    
    return [
      {
        name: 'Artikel',
        Scopus: professor.sintaProfile.metrics.scopus.articles,
        'Google Scholar': professor.sintaProfile.metrics.googleScholar.articles,
      },
      {
        name: 'Sitasi',
        Scopus: professor.sintaProfile.metrics.scopus.citations,
        'Google Scholar': professor.sintaProfile.metrics.googleScholar.citations,
      },
      {
        name: 'Dokumen Dikutip',
        Scopus: professor.sintaProfile.metrics.scopus.citedDocuments,
        'Google Scholar': professor.sintaProfile.metrics.googleScholar.citedDocuments,
      },
      {
        name: 'h-index',
        Scopus: professor.sintaProfile.metrics.scopus.hIndex,
        'Google Scholar': professor.sintaProfile.metrics.googleScholar.hIndex,
      },
      {
        name: 'i10-index',
        Scopus: professor.sintaProfile.metrics.scopus.i10Index,
        'Google Scholar': professor.sintaProfile.metrics.googleScholar.i10Index,
      },
      {
        name: 'g-index',
        Scopus: professor.sintaProfile.metrics.scopus.gIndex,
        'Google Scholar': professor.sintaProfile.metrics.googleScholar.gIndex,
      },
    ];
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white rounded-xl shadow-lg">
      {/* Bagian header dengan foto dan informasi dasar */}
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        {/* Container foto profil */}
        <div className="flex-shrink-0 w-full md:w-auto relative">
          <div className="w-full md:w-48 h-48 relative">
            <Image
              src={professor.photoUrl || '/images/default-avatar.jpg'}
              alt={professor.name}
              fill
              className="rounded-xl object-cover shadow-md hover:shadow-xl transition-shadow duration-300"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = '/images/default-avatar.jpg';
              }}
            />
          </div>
        </div>
        
        {/* Informasi dasar dosen */}
        <div className="flex-grow space-y-4">
          {/* Nama dan status verifikasi */}
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {professor.name}
            </h2>
            {professor.verified && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-1" />
                Terverifikasi
              </span>
            )}
          </div>
          
          {/* Detail informasi dasar */}
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold w-32">NUPTK</span>
              <span className="flex-1">: {professor.nuptk}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Jabatan</span>
              <span className="flex-1">: {professor.position}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Tanggal mulai</span>
              <span className="flex-1">: {formatDate(professor.startDate)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid untuk informasi akademis dan kepangkatan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Bagian profil akademis */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              Data Profil Akademis
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Rumpun Ilmu</h4>
                <p className="text-gray-600 ml-4">{professor.academicProfile.fieldOfScience}</p>
              </div>
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-medium w-32">Pohon Ilmu</span>
                  <span className="flex-1">: {professor.academicProfile.knowledgeTree}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-32">Cabang Ilmu</span>
                  <span className="flex-1">: {professor.academicProfile.branch}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bagian kepangkatan */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2 flex items-center">
              <Award className="w-5 h-5 mr-2 text-gray-600" />
              Kepangkatan
            </h3>
            <div className="space-y-3">
              <p className="text-gray-600">{professor.rank.title}</p>
              <div className="flex">
                <span className="font-medium w-32">Tanggal mulai</span>
                <span className="flex-1">: {formatDate(professor.rank.startDate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian status sertifikasi dosen */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
            Status Serdos
          </h3>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-medium w-32">Bidang Studi</span>
              <span className="flex-1">: {professor.certification.fieldOfStudy || '-'}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-32">No. Registrasi</span>
              <span className="flex-1">: {professor.certification.educatorRegistrationNumber || '-'}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-32">No. SK</span>
              <span className="flex-1">: {professor.certification.decreNumber || '-'}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-32">Tahun Serdos</span>
              <span className="flex-1">: {professor.certification.certificationYear || '-'}</span>
            </div>
          </div>
        </div>
      </div>
      {professor.sintaProfile && (
        <div className="mt-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2 flex items-center">
              <img src="https://sinta.kemdikbud.go.id/public/assets/img/brand_sinta.png" alt="SINTA" className="h-6 mr-2" />
              Profil SINTA
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <User className="w-5 h-5 mr-2 text-gray-600" />
                    <h4 className="font-semibold text-gray-700">SINTA ID</h4>
                  </div>
                  <p className="text-gray-600 ml-7">{professor.sintaProfile.id}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-500">SINTA Score</p>
                        <p className="font-semibold text-gray-700">{professor.sintaProfile["SINTA Score Overall"]}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-500">3 Years</p>
                        <p className="font-semibold text-gray-700">{professor.sintaProfile["SINTA Score 3Yr"]}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-500">Affl Score</p>
                        <p className="font-semibold text-gray-700">{professor.sintaProfile["Affl Score"]}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-500">Affl 3Yr</p>
                        <p className="font-semibold text-gray-700">{professor.sintaProfile["Affl Score 3Yr"]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Summary</h4>
                  <div className="w-full overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Metric</th>
                          <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">Scopus</th>
                          <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">GScholar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium text-gray-700">Article</td>
                          <td className="px-4 py-2 text-center text-sm text-gray-600">{professor.sintaProfile?.metrics.scopus.articles}</td>
                          <td className="px-4 py-2 text-center text-sm text-gray-600">{professor.sintaProfile?.metrics.googleScholar.articles}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium text-gray-700">Citation</td>
                          <td className="px-4 py-2 text-center text-sm text-gray-600">{professor.sintaProfile?.metrics.scopus.citations}</td>
                          <td className="px-4 py-2 text-center text-sm text-gray-600">{professor.sintaProfile?.metrics.googleScholar.citations}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium text-gray-700">Cited Document</td>
                          <td className="px-4 py-2 text-center text-sm text-gray-600">{professor.sintaProfile?.metrics.scopus.citedDocuments}</td>
                          <td className="px-4 py-2 text-center text-sm text-gray-600">{professor.sintaProfile?.metrics.googleScholar.citedDocuments}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium text-gray-700">H-Index</td>
                          <td className="px-4 py-2 text-center text-sm text-gray-600">{professor.sintaProfile?.metrics.scopus.hIndex}</td>
                          <td className="px-4 py-2 text-center text-sm text-gray-600">{professor.sintaProfile?.metrics.googleScholar.hIndex}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium text-gray-700">i10-Index</td>
                          <td className="px-4 py-2 text-center text-sm text-gray-600">{professor.sintaProfile?.metrics.scopus.i10Index}</td>
                          <td className="px-4 py-2 text-center text-sm text-gray-600">{professor.sintaProfile?.metrics.googleScholar.i10Index}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm font-medium text-gray-700">G-Index</td>
                          <td className="px-4 py-2 text-center text-sm text-gray-600">{professor.sintaProfile?.metrics.scopus.gIndex}</td>
                          <td className="px-4 py-2 text-center text-sm text-gray-600">{professor.sintaProfile?.metrics.googleScholar.gIndex}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-blue-600">
              <a 
                href={professor.sintaProfile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Lihat profil lengkap di SINTA →
              </a>
            </div>
          </div>
        </div>
      )}
      {/* Footer dengan informasi waktu pengambilan data */}
      <div className="mt-8 text-sm text-gray-500 border-t pt-4">
        {`Data diambil dari SISTER pada ${format(new Date(), 'd MMM yyyy')} ${format(new Date(), 'HH:mm')}`}
      </div>
    </div>
  );
};

export default ProfessorDetail;