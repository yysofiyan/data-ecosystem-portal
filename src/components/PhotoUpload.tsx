import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Link } from 'lucide-react';
import { toast } from 'sonner';

interface PhotoUploadProps {
    value: string;
    onChange: (url: string) => void;
    placeholder?: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ value, onChange, placeholder }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState<string>(value || '');
    const [uploadType, setUploadType] = useState<'url' | 'file'>('url');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle file upload
    const handleFileUpload = async (file: File) => {
        // Validasi file
        if (!file.type.startsWith('image/')) {
            toast.error('File Tidak Valid', {
                description: 'Hanya file gambar yang diperbolehkan (JPG, PNG, GIF, WebP)',
                duration: 4000,
            });
            return;
        }

        // Validasi ukuran file (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File Terlalu Besar', {
                description: 'Ukuran file maksimal 5MB',
                duration: 4000,
            });
            return;
        }

        setIsUploading(true);
        const loadingToast = toast.loading('Mengunggah foto...');

        try {
            // Upload file ke server
            const formData = new FormData();
            formData.append('photo', file);
            
            const response = await fetch('http://localhost:3001/api/upload-photo', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (result.success) {
                // Update preview dan form value dengan URL dari server
                const photoUrl = result.data.url;
                setPreview(`http://localhost:3001${photoUrl}`);
                onChange(photoUrl);
                
                toast.success('Upload Berhasil!', {
                    description: `Foto ${file.name} berhasil diunggah`,
                    duration: 3000,
                });
            } else {
                toast.error('Upload Gagal', {
                    description: result.error,
                    duration: 4000,
                });
            }

        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Upload Gagal', {
                description: 'Terjadi kesalahan saat mengunggah foto',
                duration: 4000,
            });
        } finally {
            setIsUploading(false);
            toast.dismiss(loadingToast);
        }
    };

    // Handle drag and drop
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    // Handle file input change
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    // Handle URL input change
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        onChange(url);
        setPreview(url);
    };

    // Clear photo
    const handleClear = () => {
        onChange('');
        setPreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        toast.info('Foto Dihapus', {
            description: 'Foto dosen telah dihapus',
            duration: 2000,
        });
    };

    return (
        <div className="space-y-4">
            {/* Toggle Upload Type */}
            <div className="flex space-x-2">
                <button
                    type="button"
                    onClick={() => setUploadType('url')}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        uploadType === 'url'
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-gray-100 text-gray-600 border border-gray-300'
                    }`}
                >
                    <Link className="w-4 h-4 inline mr-1" />
                    URL
                </button>
                <button
                    type="button"
                    onClick={() => setUploadType('file')}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        uploadType === 'file'
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-gray-100 text-gray-600 border border-gray-300'
                    }`}
                >
                    <Upload className="w-4 h-4 inline mr-1" />
                    Upload
                </button>
            </div>

            {/* URL Input */}
            {uploadType === 'url' && (
                <div>
                    <input
                        type="url"
                        value={value}
                        onChange={handleUrlChange}
                        placeholder={placeholder || "https://example.com/photo.jpg atau /images/professors/name.jpg"}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            )}

            {/* File Upload */}
            {uploadType === 'file' && (
                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                    />
                    
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current?.click()}
                        className={`
                            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                            ${isUploading 
                                ? 'border-blue-300 bg-blue-50' 
                                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                            }
                        `}
                    >
                        {isUploading ? (
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                                <p className="text-sm text-gray-600">Mengunggah foto...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600 mb-1">
                                    Klik untuk memilih foto atau drag & drop
                                </p>
                                <p className="text-xs text-gray-500">
                                    JPG, PNG, GIF, WebP (Max: 5MB)
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Preview */}
            {preview && (
                <div className="relative">
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-16 h-16 object-cover rounded-lg border"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                                <div className="hidden w-16 h-16 bg-gray-200 rounded-lg border items-center justify-center">
                                    <ImageIcon className="w-6 h-6 text-gray-400" />
                                </div>
                            </div>
                            <div className="flex-grow min-w-0">
                                <p className="text-sm font-medium text-gray-900">Preview Foto</p>
                                <p className="text-xs text-gray-500 truncate">{value}</p>
                            </div>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Instructions */}
            <div className="text-xs text-gray-500">
                <p><strong>URL:</strong> Masukkan link foto yang sudah tersedia online</p>
                <p><strong>Upload:</strong> Upload foto baru dari komputer Anda</p>
            </div>
        </div>
    );
};

export default PhotoUpload;
