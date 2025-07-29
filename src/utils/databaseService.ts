export interface StudentByYear {
  year: string;
  count: number;
}

export interface DataByName {
  name: string;
  value: number;
}

export interface ProfessorRank {
  title: string;
  startDate: string;
}

export interface ProfessorCertification {
  fieldOfStudy: string;
  educatorRegistrationNumber: string;
  decreNumber: string;
  certificationYear: number | null;
}

export interface ProfessorAcademicProfile {
  fieldOfScience: string;
  knowledgeTree: string;
  branch: string;
}

export interface SintaMetrics {
  articles: number;
  citations: number;
  citedDocuments: number;
  hIndex: number;
  i10Index: number;
  gIndex: number;
}

export interface SintaProfile {
  id: string;
  url: string;
  "SINTA Score Overall": number;
  "SINTA Score 3Yr": number;
  "Affl Score": number;
  "Affl Score 3Yr": number;
  metrics: {
    scopus: SintaMetrics;
    googleScholar: SintaMetrics;
  };
}

/**
 * Represents the profile of a dosen.
 * 
 * @property {number} id - ID unik dari dosen.
 * @property {string} name - Nama lengkap dosen.
 * @property {string} nuptk - Nomor Unik Pendidik dan Tenaga Kependidikan.
 * @property {string} position - Posisi atau jabatan dosen.
 * @property {string} startDate - Tanggal mulai bekerja dosen.
 * @property {boolean} verified - Status verifikasi dosen.
 * @property {string} [photoUrl] - URL foto profil dosen (opsional).
 * @property {ProfessorAcademicProfile} academicProfile - Profil akademik dosen.
 * @property {ProfessorRank} rank - Peringkat atau pangkat dosen.
 * @property {ProfessorCertification} certification - Sertifikasi dosen.
 * @property {string} faculty - Fakultas tempat dosen bekerja.
 * @property {SintaProfile} [sintaProfile] - Profil Sinta dosen (opsional).
 */
export interface ProfessorProfile {
  id: number;
  name: string;
  nuptk: string;
  position: string;
  startDate: string;
  verified: boolean;
  photoUrl?: string;
  academicProfile: ProfessorAcademicProfile;
  rank: ProfessorRank;
  certification: ProfessorCertification;
  faculty: string;
  sintaProfile?: SintaProfile;
}

export interface Stats {
  professors: {
    total: number;
    s3Percentage: number;
  };
  students: {
    total: number;
    yearlyIncreasePercentage: number;
  };
  graduation: {
    total: number;
    yearlyDecreasePercentage: number;
  };
  applicants: {
    total: number;
    yearlyDecreasePercentage: number;
  };
}

export interface DatabaseData {
  students: {
    byYear: StudentByYear[];
    byProdi: DataByName[];
    byLevel: DataByName[];
  };
  professors: {
    byEducation: DataByName[];
    byPosition: DataByName[];
    byStatus: DataByName[];
    profiles: ProfessorProfile[];
  };
  stats: Stats;
  lastUpdated: string;
}

// Variabel untuk menyimpan cache data yang sudah diambil dari API
let cachedData: DatabaseData | null = null;

/**
 * Mengambil data dari backend API.
 * Menggunakan cache untuk menghindari permintaan berulang.
 */
async function fetchAndCacheData(): Promise<DatabaseData> {
  // Jika data sudah ada di cache, langsung kembalikan
  if (cachedData) {
    return cachedData;
  }
  
  try {
    // Panggil API backend
    const response = await fetch('http://localhost:3001/api/all-data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: DatabaseData = await response.json();
    cachedData = data; // Simpan data ke cache untuk panggilan berikutnya
    return data;
  } catch (error) {
    console.error("Gagal mengambil data dari API:", error);
    // Kembalikan struktur data kosong agar aplikasi tidak crash jika API gagal
    return {
      students: { byYear: [], byProdi: [], byLevel: [] },
      professors: { byEducation: [], byPosition: [], byStatus: [], profiles: [] },
      stats: { 
        professors: { total: 0, s3Percentage: 0 }, 
        students: { total: 0, yearlyIncreasePercentage: 0 }, 
        graduation: { total: 0, yearlyDecreasePercentage: 0 }, 
        applicants: { total: 0, yearlyDecreasePercentage: 0 } 
      },
      lastUpdated: new Date().toISOString(),
    };
  }
}

// --- Ubah semua fungsi `get...` menjadi async dan menggunakan data dari API ---

export const getDatabaseData = async (): Promise<DatabaseData> => {
  return await fetchAndCacheData();
};

export const getStats = async (): Promise<Stats> => {
  const data = await fetchAndCacheData();
  return data.stats;
};

export const getStudentsByYear = async (): Promise<StudentByYear[]> => {
  const data = await fetchAndCacheData();
  return data.students.byYear;
};

export const getStudentsByProdi = async (): Promise<DataByName[]> => {
  const data = await fetchAndCacheData();
  return data.students.byProdi;
};

export const getStudentsByLevel = async (): Promise<DataByName[]> => {
  const data = await fetchAndCacheData();
  return data.students.byLevel;
};

export const getProfessorsByEducation = async (): Promise<DataByName[]> => {
  const data = await fetchAndCacheData();
  return data.professors.byEducation;
};

export const getProfessorsByPosition = async (): Promise<DataByName[]> => {
  const data = await fetchAndCacheData();
  return data.professors.byPosition;
};

export const getProfessorsByStatus = async (): Promise<DataByName[]> => {
  const data = await fetchAndCacheData();
  return data.professors.byStatus;
};

export const getProfessorProfiles = async (): Promise<ProfessorProfile[]> => {
  const data = await fetchAndCacheData();
  return data.professors.profiles;
};

// Mengubah fungsi ini menjadi async juga untuk konsistensi
export const getProfessorProfilesByPosition = async (position: string): Promise<ProfessorProfile[]> => {
  const data = await fetchAndCacheData();
  return data.professors.profiles.filter(p => p.position === position);
};

// Anda mungkin perlu menambahkan fungsi lain di sini jika ada yang belum tercover
