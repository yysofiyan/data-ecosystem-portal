import React, { useState, useEffect } from 'react';
import ProfessorAvatar from '../components/ProfessorAvatar';

// Komponen untuk debug dan test foto dari database
const PhotoDebugger: React.FC = () => {
    const [professors, setProfessors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/all-data');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProfessors(data.professors.profiles);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const testUrls = [
        {
            name: "Test Local Path",
            photoUrl: "/images/professors/yanyan-sofiyan.jpeg",
            description: "Path relatif dari public folder"
        },
        {
            name: "Test External URL",
            photoUrl: "https://fti.unsap.ac.id/wp-content/uploads/2024/11/8.png",
            description: "URL eksternal lengkap"
        },
        {
            name: "Test Broken URL",
            photoUrl: "/images/professors/non-existent.jpg",
            description: "URL yang tidak ada (test fallback)"
        },
        {
            name: "Test No URL",
            photoUrl: undefined,
            description: "Tanpa URL (test fallback)"
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading data from database...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-red-600">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center">Photo URL Debugger</h1>

            {/* Test URLs */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Test URLs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testUrls.map((test, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-4">{test.name}</h3>
                            <div className="flex justify-center mb-4">
                                <ProfessorAvatar
                                    name={test.name}
                                    photoUrl={test.photoUrl}
                                    size="lg"
                                />
                            </div>
                            <div className="text-sm text-gray-600">
                                <p><strong>Description:</strong> {test.description}</p>
                                <p><strong>URL:</strong> {test.photoUrl || 'None'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Data dari Database */}
            <div>
                <h2 className="text-2xl font-bold mb-6">Data dari Database NEON</h2>
                {professors.length === 0 ? (
                    <div className="text-center text-gray-600">No professors data found</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {professors.map((professor, index) => (
                            <div key={professor.id || index} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex items-center gap-4 mb-4">
                                    <ProfessorAvatar
                                        name={professor.name}
                                        photoUrl={professor.photoUrl}
                                        size="md"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{professor.name}</h3>
                                        <p className="text-sm text-gray-600">{professor.position}</p>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-600 space-y-2">
                                    <div>
                                        <strong>Photo URL from DB:</strong>
                                        <br />
                                        <code className="bg-gray-100 p-1 rounded text-xs break-all">
                                            {professor.photoUrl || 'null'}
                                        </code>
                                    </div>

                                    <div>
                                        <strong>Image Test:</strong>
                                        <div className="mt-2">
                                            {professor.photoUrl && (
                                                <img
                                                    src={professor.photoUrl}
                                                    alt={professor.name}
                                                    className="w-16 h-16 object-cover rounded border"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.nextElementSibling!.textContent = '❌ Failed to load';
                                                    }}
                                                    onLoad={(e) => {
                                                        e.currentTarget.nextElementSibling!.textContent = '✅ Loaded successfully';
                                                    }}
                                                />
                                            )}
                                            <div className="text-xs mt-1">Loading...</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Debug Info</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Backend mengambil <code>photo_url</code> dari database</li>
                    <li>Frontend menerima sebagai <code>photoUrl</code> (camelCase)</li>
                    <li>URL eksternal: dimulai dengan http:// atau https://</li>
                    <li>Path lokal: dimulai dengan / (dari public folder)</li>
                    <li>Fallback: Inisial nama dengan gradient background</li>
                </ul>
            </div>
        </div>
    );
};

export default PhotoDebugger;
