import React from 'react';
import ProfessorAvatar from '../components/ProfessorAvatar';

// Demo untuk test avatar dengan berbagai kondisi
const AvatarDemo: React.FC = () => {
    const testCases = [
        {
            name: "Yanyan Sofiyan, M.Kom.",
            photoUrl: "/images/professors/yanyan-sofiyan.jpeg",
            description: "With existing photo"
        },
        {
            name: "John Doe, Ph.D.",
            photoUrl: "/images/professors/non-existent.jpg",
            description: "With broken photo URL"
        },
        {
            name: "Jane Smith",
            photoUrl: undefined,
            description: "Without photo"
        }
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center">Professor Avatar Demo</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testCases.map((testCase, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4">{testCase.description}</h3>
                        <div className="flex flex-col items-center space-y-4">
                            {/* Size XL */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600 mb-2">Size XL</p>
                                <ProfessorAvatar
                                    name={testCase.name}
                                    photoUrl={testCase.photoUrl}
                                    size="xl"
                                />
                            </div>

                            {/* Size LG */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600 mb-2">Size LG</p>
                                <ProfessorAvatar
                                    name={testCase.name}
                                    photoUrl={testCase.photoUrl}
                                    size="lg"
                                />
                            </div>

                            {/* Size MD */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600 mb-2">Size MD</p>
                                <ProfessorAvatar
                                    name={testCase.name}
                                    photoUrl={testCase.photoUrl}
                                    size="md"
                                />
                            </div>

                            {/* Size SM */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600 mb-2">Size SM</p>
                                <ProfessorAvatar
                                    name={testCase.name}
                                    photoUrl={testCase.photoUrl}
                                    size="sm"
                                />
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-600">
                            <p><strong>Name:</strong> {testCase.name}</p>
                            <p><strong>Photo URL:</strong> {testCase.photoUrl || 'None'}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Fallback to initials when photo is not available or fails to load</li>
                    <li>Beautiful gradient background for fallback</li>
                    <li>Multiple sizes: sm, md, lg, xl</li>
                    <li>Automatic initial generation from professor name</li>
                    <li>Responsive design with Tailwind CSS</li>
                </ul>
            </div>
        </div>
    );
};

export default AvatarDemo;
