import React, { useState, useEffect } from 'react';
import {
    Users,
    GraduationCap,
    Database,
    Plus,
    Edit,
    Trash2,
    Save,
    X
} from 'lucide-react';
import { toast } from 'sonner';
import { ProfessorProfile } from '../utils/databaseService';
import ProfessorAvatar from '../components/ProfessorAvatar';
import PhotoUpload from '../components/PhotoUpload';

// Interface untuk form data professor
interface ProfessorFormData {
    name: string;
    photoUrl: string;
    nuptk: string;
    position: string;
    startDate: string;
    verified: boolean;
    faculty: string;
    homebase: string;
}

const AdminDashboard: React.FC = () => {
    const [professors, setProfessors] = useState<ProfessorProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<ProfessorFormData>({
        name: '',
        photoUrl: '',
        nuptk: '',
        position: '',
        startDate: '',
        verified: false,
        faculty: 'Fakultas Teknologi Informasi',
        homebase: 'Informatika'
    });
    const [showAddForm, setShowAddForm] = useState(false);

    // Fetch data professors
    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/all-data');
                if (response.ok) {
                    const data = await response.json();
                    setProfessors(data.professors.profiles);
                    
                    toast.success('Data Dimuat', {
                        description: `${data.professors.profiles.length} dosen berhasil dimuat`,
                        duration: 2000,
                    });
                } else {
                    toast.error('Gagal Memuat Data', {
                        description: 'Tidak dapat mengambil data dari server',
                        duration: 4000,
                    });
                }
            } catch (error) {
                console.error('Error fetching professors:', error);
                toast.error('Koneksi Error', {
                    description: 'Tidak dapat terhubung ke server',
                    duration: 4000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfessors();
    }, []);

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi form
        if (!formData.name.trim() || !formData.nuptk.trim() || !formData.position || !formData.startDate) {
            toast.error('Field Wajib', {
                description: 'Nama, NUPTK, Jabatan, dan Tanggal Mulai wajib diisi!',
                duration: 4000,
            });
            return;
        }

        const loadingToast = toast.loading(editingId ? 'Mengupdate data dosen...' : 'Menambahkan dosen baru...');

        try {
            if (editingId) {
                // Update existing professor
                const response = await fetch(`http://localhost:3001/api/professors/${editingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name.trim(),
                        photo_url: formData.photoUrl.trim(),
                        nuptk: formData.nuptk.trim(),
                        position: formData.position,
                        start_date: formData.startDate,
                        verified: formData.verified,
                        faculty: formData.faculty,
                        homebase: formData.homebase
                    })
                });

                const result = await response.json();
                if (result.success) {
                    // Update local state
                    setProfessors(professors.map(p =>
                        p.id === editingId
                            ? { ...p, ...formData, photoUrl: formData.photoUrl }
                            : p
                    ));
                    toast.success('Berhasil!', {
                        description: 'Data dosen berhasil diupdate',
                        duration: 3000,
                    });
                } else {
                    toast.error('Update Gagal', {
                        description: result.error,
                        duration: 4000,
                    });
                }
            } else {
                // Create new professor
                const response = await fetch('http://localhost:3001/api/professors', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name.trim(),
                        photo_url: formData.photoUrl.trim(),
                        nuptk: formData.nuptk.trim(),
                        position: formData.position,
                        start_date: formData.startDate,
                        verified: formData.verified,
                        faculty: formData.faculty,
                        homebase: formData.homebase,
                        academic_profile: {},
                        rank: {},
                        certification: {},
                        sinta_profile: null
                    })
                });

                const result = await response.json();
                if (result.success) {
                    // Refresh data from server
                    const fetchResponse = await fetch('http://localhost:3001/api/all-data');
                    if (fetchResponse.ok) {
                        const data = await fetchResponse.json();
                        setProfessors(data.professors.profiles);
                    }
                    toast.success('Berhasil!', {
                        description: 'Dosen baru berhasil ditambahkan',
                        duration: 3000,
                    });
                } else {
                    toast.error('Tambah Dosen Gagal', {
                        description: result.error,
                        duration: 4000,
                    });
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Koneksi Error', {
                description: 'Terjadi kesalahan saat menyimpan data. Pastikan backend server berjalan.',
                duration: 5000,
            });
        } finally {
            toast.dismiss(loadingToast);
        }

        // Reset form
        setFormData({
            name: '',
            photoUrl: '',
            nuptk: '',
            position: '',
            startDate: '',
            verified: false,
            faculty: 'Fakultas Teknologi Informasi',
            homebase: 'Informatika'
        });
        setShowAddForm(false);
        setEditingId(null);
    };

    // Handle edit professor
    const handleEdit = (professor: ProfessorProfile) => {
        setFormData({
            name: professor.name,
            photoUrl: professor.photoUrl || '',
            nuptk: professor.nuptk,
            position: professor.position,
            startDate: professor.startDate,
            verified: professor.verified,
            faculty: professor.faculty,
            homebase: professor.homebase || 'Informatika'
        });
        setEditingId(professor.id);
        setShowAddForm(true);
        
        toast.info('Mode Edit', {
            description: `Mengedit data: ${professor.name}`,
            duration: 2000,
        });
    };

    // Handle delete professor
    const handleDelete = async (id: number) => {
        // Custom confirmation toast dengan action buttons
        toast('Konfirmasi Hapus', {
            description: 'Apakah Anda yakin ingin menghapus data dosen ini?',
            action: {
                label: 'Hapus',
                onClick: async () => {
                    const loadingToast = toast.loading('Menghapus data dosen...');
                    
                    try {
                        const response = await fetch(`http://localhost:3001/api/professors/${id}`, {
                            method: 'DELETE'
                        });

                        const result = await response.json();
                        if (result.success) {
                            // Remove from local state
                            setProfessors(professors.filter(p => p.id !== id));
                            toast.success('Berhasil!', {
                                description: 'Data dosen berhasil dihapus',
                                duration: 3000,
                            });
                        } else {
                            toast.error('Hapus Gagal', {
                                description: result.error,
                                duration: 4000,
                            });
                        }
                    } catch (error) {
                        console.error('Error deleting professor:', error);
                        toast.error('Koneksi Error', {
                            description: 'Terjadi kesalahan saat menghapus data',
                            duration: 4000,
                        });
                    } finally {
                        toast.dismiss(loadingToast);
                    }
                },
            },
            cancel: {
                label: 'Batal',
                onClick: () => {
                    toast.info('Dibatalkan', {
                        description: 'Penghapusan data dibatalkan',
                        duration: 2000,
                    });
                }
            },
            duration: 5000,
        });
    };

    // Cancel form
    const handleCancel = () => {
        setFormData({
            name: '',
            photoUrl: '',
            nuptk: '',
            position: '',
            startDate: '',
            verified: false,
            faculty: 'Fakultas Teknologi Informasi',
            homebase: 'Informatika'
        });
        setShowAddForm(false);
        setEditingId(null);
        
        toast.info('Dibatalkan', {
            description: 'Perubahan dibatalkan',
            duration: 2000,
        });
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Data Management</h1>
                        <p className="text-gray-600">Kelola data dosen dan informasi akademik</p>
                    </div>

                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Dosen</span>
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <GraduationCap className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Total Dosen</p>
                                <p className="text-2xl font-semibold text-gray-900">{professors.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Users className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Verified</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {professors.filter(p => p.verified).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Database className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Database</p>
                                <p className="text-2xl font-semibold text-gray-900">Neon</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add/Edit Form */}
                {showAddForm && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">
                                {editingId ? 'Edit Dosen' : 'Tambah Dosen Baru'}
                            </h2>
                            <button
                                onClick={handleCancel}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Lengkap/Gelar
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Yanyan Sofiyan, M.Kom."
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    NUPTK
                                </label>
                                <input
                                    type="text"
                                    value={formData.nuptk}
                                    onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Jabatan
                                </label>
                                <select
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Pilih Jabatan</option>
                                    <option value="Profesor">Profesor</option>
                                    <option value="Lektor Kepala">Lektor Kepala</option>
                                    <option value="Lektor">Lektor</option>
                                    <option value="Asisten Ahli">Asisten Ahli</option>
                                    <option value="Tenaga Pengajar">Tenaga Pengajar</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tanggal Mulai
                                </label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Homebase
                                </label>
                                <select
                                    value={formData.homebase}
                                    onChange={(e) => setFormData({ ...formData, homebase: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Pilih Homebase</option>
                                    <option value="Informatika">Informatika</option>
                                    <option value="Sistem Informasi">Sistem Informasi</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Foto Dosen
                                </label>
                                <PhotoUpload
                                    value={formData.photoUrl}
                                    onChange={(url) => setFormData({ ...formData, photoUrl: url })}
                                    placeholder="https://example.com/photo.jpg atau /images/professors/name.jpg"
                                />
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.verified}
                                        onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                                        className="mr-2"
                                    />
                                    <span className="text-sm text-gray-700">Verified</span>
                                </label>
                            </div>

                            <div className="md:col-span-2 flex space-x-3">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{editingId ? 'Update' : 'Simpan'}</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Professors Table */}
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold">Daftar Dosen</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Dosen
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Jabatan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Homebase
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NUPTK
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {professors.map((professor) => (
                                    <tr key={professor.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <ProfessorAvatar
                                                    name={professor.name}
                                                    photoUrl={professor.photoUrl}
                                                    size="sm"
                                                />
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {professor.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {professor.faculty}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {professor.position}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                professor.homebase === 'Informatika' 
                                                    ? 'bg-blue-100 text-blue-800' 
                                                    : 'bg-purple-100 text-purple-800'
                                            }`}>
                                                {professor.homebase || 'Belum diset'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {professor.nuptk}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${professor.verified
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {professor.verified ? 'Verified' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(professor)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(professor.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
