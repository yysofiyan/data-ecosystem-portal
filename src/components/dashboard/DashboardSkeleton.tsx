import React from 'react';
import { Skeleton } from '../ui/skeleton';

// Skeleton untuk StatCard
const StatCardSkeleton: React.FC = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton className="h-12 w-12 rounded-lg" />
        </div>
        <div className="mt-4">
            <Skeleton className="h-3 w-32" />
        </div>
    </div>
);

// Skeleton untuk Chart
const ChartSkeleton: React.FC = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-12" />
                </div>
            ))}
        </div>
    </div>
);

// Skeleton untuk Table
const TableSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
            <Skeleton className="h-6 w-64 mb-4" />

            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 pb-3 border-b">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                ))}
            </div>

            {/* Table Rows */}
            <div className="space-y-3 mt-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="grid grid-cols-5 gap-4">
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// Skeleton untuk Professor Detail
const ProfessorDetailSkeleton: React.FC = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Skeleton */}
            <div className="flex-shrink-0">
                <Skeleton className="w-48 h-48 rounded-xl" />
            </div>

            {/* Info Skeleton */}
            <div className="flex-1 space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                </div>

                <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-2 mx-2" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// Main Dashboard Skeleton
const DashboardSkeleton: React.FC = () => (
    <div className="min-h-screen bg-gray-50">
        {/* NavBar Skeleton */}
        <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-48" />
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-24" />
                    </div>
                </div>
            </div>
        </div>

        <div className="p-6">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Stats Section Skeleton */}
                <div>
                    <Skeleton className="h-8 w-32 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <StatCardSkeleton key={i} />
                        ))}
                    </div>
                </div>

                {/* Student Section Skeleton */}
                <div>
                    <Skeleton className="h-8 w-40 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {[...Array(3)].map((_, i) => (
                            <ChartSkeleton key={i} />
                        ))}
                    </div>
                    <TableSkeleton />
                </div>

                {/* Professor Section Skeleton */}
                <div>
                    <Skeleton className="h-8 w-32 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {[...Array(3)].map((_, i) => (
                            <ChartSkeleton key={i} />
                        ))}
                    </div>

                    {/* Professor Detail Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <Skeleton className="h-6 w-64 mb-4" />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left side - Position list */}
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
                                    <div className="bg-gray-50 rounded-lg p-2 space-y-1">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="flex items-center space-x-2 p-2">
                                                <Skeleton className="h-8 w-8 rounded-full" />
                                                <Skeleton className="h-4 w-40" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right side - Professor detail */}
                            <div className="lg:col-span-2">
                                <ProfessorDetailSkeleton />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Skeleton */}
                <div className="text-center">
                    <Skeleton className="h-4 w-64 mx-auto" />
                </div>
            </div>
        </div>
    </div>
);

export {
    DashboardSkeleton,
    StatCardSkeleton,
    ChartSkeleton,
    TableSkeleton,
    ProfessorDetailSkeleton
};
