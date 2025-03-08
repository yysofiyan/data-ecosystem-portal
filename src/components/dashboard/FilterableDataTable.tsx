
// Import komponen dan dependensi yang diperlukan
import React, { useState, useMemo } from "react";
import { DataByName, ProfessorProfile } from "../../utils/databaseService";
import SearchInput from "./SearchInput";
import FilterDropdown from "./FilterDropdown";
import { User, Calendar, Briefcase, CheckCircle, XCircle } from "lucide-react";
import ProfessorDetail from "../ProfessorDetail";
import { getProfessorProfilesByPosition } from "../../utils/databaseService";

// Mendefinisikan interface untuk props komponen
interface FilterableDataTableProps {
  data: DataByName[] | ProfessorProfile[]; // Data bisa berupa array DataByName atau ProfessorProfile
  title: string; // Judul tabel
  className?: string; // CSS class opsional
  type?: "summary" | "profile"; // Tipe tabel - ringkasan atau profil
}

// Komponen utama FilterableDataTable
const FilterableDataTable = ({
  data,
  title,
  className = "",
  type = "summary",
}: FilterableDataTableProps) => {
  // State untuk pencarian, pengurutan dan profesor yang dipilih
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedProfessor, setSelectedProfessor] = useState<ProfessorProfile | null>(null);

  // Opsi pengurutan untuk tampilan ringkasan
  const summaryOptions = [
    { value: "", label: "Default" },
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "value-desc", label: "Value (High-Low)" },
    { value: "value-asc", label: "Value (Low-High)" },
  ];

  // Opsi pengurutan untuk tampilan profil
  const profileOptions = [
    { value: "", label: "Default" },
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "startDate-asc", label: "Date (Oldest First)" },
    { value: "startDate-desc", label: "Date (Newest First)" },
  ];

  // Memilih opsi pengurutan berdasarkan tipe tabel
  const sortOptions = type === "summary" ? summaryOptions : profileOptions;

  // Menangani perubahan opsi pengurutan
  const handleSortChange = (sortValue: string) => {
    if (!sortValue) {
      setSortBy("");
      setSortOrder("desc");
      return;
    }
    
    const [field, order] = sortValue.split("-");
    setSortBy(field);
    setSortOrder(order as "asc" | "desc");
  };

  // Fungsi untuk memfilter dan mengurutkan data dengan useMemo untuk optimasi
  const filteredAndSortedData = useMemo(() => {
    let result = [...data];
    
    // Filter data berdasarkan kata kunci pencarian
    if (searchTerm) {
      const searchTerms = searchTerm.toLowerCase().split(' ').filter(term => term.length > 0);
      
      result = result.filter(item => {
        if (type === "summary") {
          const summaryItem = item as DataByName;
          return searchTerms.every(term => 
            summaryItem.name.toLowerCase().includes(term)
          );
        } else {
          const profileItem = item as ProfessorProfile;
          return searchTerms.every(term => 
            profileItem.name.toLowerCase().includes(term) ||
            profileItem.position.toLowerCase().includes(term) ||
            profileItem.faculty.toLowerCase().includes(term) ||
            new Date(profileItem.startDate).toLocaleDateString('id-ID').toLowerCase().includes(term)
          );
        }
      });
    }
    
    // Mengurutkan data yang sudah difilter
    if (sortBy) {
      result.sort((a, b) => {
        let comparison = 0;
        
        if (type === "summary") {
          const summaryA = a as DataByName;
          const summaryB = b as DataByName;
          
          if (sortBy === "name") {
            comparison = summaryA.name.localeCompare(summaryB.name);
          } else if (sortBy === "value") {
            comparison = (summaryA.value || 0) - (summaryB.value || 0);
          }
        } else {
          const profileA = a as ProfessorProfile;
          const profileB = b as ProfessorProfile;
          
          if (sortBy === "name") {
            comparison = profileA.name.localeCompare(profileB.name);
          } else if (sortBy === "startDate") {
            const dateA = profileA.startDate ? new Date(profileA.startDate).getTime() : 0;
            const dateB = profileB.startDate ? new Date(profileB.startDate).getTime() : 0;
            comparison = dateA - dateB;
          }
        }
        
        return sortOrder === "asc" ? comparison : -comparison;
      });
    }
    
    return result;
  }, [data, searchTerm, sortBy, sortOrder, type]);

  // Menangani klik pada item ringkasan
  const handleClick = (item: DataByName) => {
    if (type === "summary") {
      const profiles = getProfessorProfilesByPosition(item.name);
      if (profiles.length > 0) {
        setSelectedProfessor(profiles[0]);
      }
    }
  };

  // Menangani klik pada profil profesor
  const handleProfessorClick = (professor: ProfessorProfile) => {
    setSelectedProfessor(professor);
  };

  // Render tabel sesuai dengan tipenya
  const renderTable = () => {
    if (type === "summary") {
      return (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3 text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.length > 0 ? (
              (filteredAndSortedData as DataByName[]).map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <button
                      onClick={() => handleClick(item)}
                      className="text-blue-600 hover:underline"
                    >
                      {item.name}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {item.value.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      );
    }

    // Render tabel profil
    return (
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-3 py-3">Name</th>
            <th scope="col" className="px-3 py-3">Position</th>
            <th scope="col" className="px-3 py-3">Faculty</th>
            <th scope="col" className="px-3 py-3">Start Date</th>
            <th scope="col" className="px-3 py-3 text-center">Verified</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.length > 0 ? (
            (filteredAndSortedData as ProfessorProfile[]).map((item, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-3 py-3 font-medium text-gray-900">
                  <button
                    onClick={() => handleProfessorClick(item)}
                    className="flex items-center hover:text-blue-600"
                  >
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    {item.name}
                  </button>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                    {item.position}
                  </div>
                </td>
                <td className="px-3 py-3">{item.faculty}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    {new Date(item.startDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </td>
                <td className="px-3 py-3 text-center">
                  {item.verified ? (
                    <CheckCircle className="inline w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="inline w-5 h-5 text-red-500" />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  // Render komponen utama
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm ${className}`}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      {/* Kontrol pencarian dan filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <SearchInput
          placeholder="Cari..."
          value={searchTerm}
          onChange={setSearchTerm}
          className="sm:w-2/3"
        />
        <FilterDropdown
          options={sortOptions}
          value={sortBy && sortOrder ? `${sortBy}-${sortOrder}` : ""}
          onChange={handleSortChange}
          label="Sort by"
          className="sm:w-1/3"
        />
      </div>
      
      {/* Bagian tabel dan detail profesor */}
      <div className="grid grid-cols-1 gap-6">
        <div className="overflow-x-auto">
          {renderTable()}
        </div>
        
        {selectedProfessor && (
          <div className="border-t pt-6">
            <ProfessorDetail professor={selectedProfessor} />
          </div>
        )}
      </div>
      
      {/* Footer ringkasan data */}
      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredAndSortedData.length} of {data.length} entries
      </div>
    </div>
  );
};

export default FilterableDataTable;
