
import database from '../data/database.json';

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
    byFaculty: DataByName[];
    byLevel: DataByName[];
  };
  professors: {
    byEducation: DataByName[];
    byPosition: DataByName[];
    byStatus: DataByName[];
    byFaculty: DataByName[];
    profiles: ProfessorProfile[];
  };
  stats: Stats;
  lastUpdated: string;
}
// Impor file JSON database yang berisi semua data
// Database import moved to top of file to avoid duplicate identifier

// Interface untuk mendapatkan data lengkap database
export const getDatabaseData = (): DatabaseData => {
  return database as DatabaseData;
};

// Fungsi untuk mendapatkan timestamp terakhir diperbarui yang diformat
export const getFormattedLastUpdated = (): string => {
  const lastUpdated = new Date(database.lastUpdated);
  const now = new Date();
  
  const diffInHours = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} hari yang lalu`;
  }
};

// Fungsi untuk mendapatkan data mahasiswa berdasarkan tahun
export const getStudentsByYear = (): StudentByYear[] => {
  return database.students.byYear;
};

// Fungsi untuk mendapatkan data mahasiswa berdasarkan fakultas
export const getStudentsByFaculty = (): DataByName[] => {
  return database.students.byFaculty;
};

// Fungsi untuk mendapatkan data mahasiswa berdasarkan tingkat
export const getStudentsByLevel = (): DataByName[] => {
  return database.students.byLevel;
};

// Fungsi untuk mendapatkan data dosen berdasarkan pendidikan
export const getProfessorsByEducation = (): DataByName[] => {
  return database.professors.byEducation;
};

// Fungsi untuk mendapatkan data dosen berdasarkan posisi
export const getProfessorsByPosition = (): DataByName[] => {
  return database.professors.byPosition;
};

// Fungsi untuk mendapatkan data dosen berdasarkan status
export const getProfessorsByStatus = (): DataByName[] => {
  return database.professors.byStatus;
};

// Fungsi untuk mendapatkan data dosen berdasarkan fakultas
export const getProfessorsByFaculty = (): DataByName[] => {
  return database.professors.byFaculty;
};

// Fungsi untuk mendapatkan semua profil dosen
export const getProfessorProfiles = (): ProfessorProfile[] => {
  return database.professors.profiles;
};

// Fungsi untuk mendapatkan profil dosen berdasarkan posisi tertentu
export const getProfessorProfilesByPosition = (position: string): ProfessorProfile[] => {
  return database.professors.profiles.filter(profile => 
    profile.position.toLowerCase() === position.toLowerCase()
  );
};

// Fungsi untuk mendapatkan data statistik
export const getStats = (): Stats => {
  return database.stats;
};
