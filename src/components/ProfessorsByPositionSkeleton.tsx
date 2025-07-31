import React from 'react';
import { Skeleton } from './ui/skeleton';

// Skeleton untuk daftar posisi professor
const PositionListSkeleton: React.FC = () => (
    <div className="space-y-4">
        <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-6 w-8 rounded-full" />
                    </div>
                ))}
            </div>
        </div>

        <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <div className="bg-gray-50 rounded-lg p-2 max-h-[450px] overflow-hidden">
                <div className="space-y-1">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-3 p-2 rounded-md">
                            <Skeleton className="h-8 w-8 rounded-xl" />
                            <Skeleton className="h-4 flex-1" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// Skeleton untuk detail professor
const ProfessorDetailSkeleton: React.FC = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Avatar Skeleton */}
            <div className="flex-shrink-0">
                <Skeleton className="w-48 h-48 rounded-xl" />
            </div>

            {/* Info Skeleton */}
            <div className="flex-1 space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                </div>

                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-2 mx-2" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Additional sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-3">
                        {[...Array(3)].map((_, j) => (
                            <div key={j} className="flex">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-2 mx-2" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Skeleton untuk section professor by position
const ProfessorsByPositionSkeleton: React.FC = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Position navigation */}
        <div className="lg:col-span-1">
            <PositionListSkeleton />
        </div>

        {/* Right column - Professor detail */}
        <div className="lg:col-span-2">
            <ProfessorDetailSkeleton />
        </div>
    </div>
);

export {
    PositionListSkeleton,
    ProfessorDetailSkeleton,
    ProfessorsByPositionSkeleton
};
