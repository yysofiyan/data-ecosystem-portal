import React from 'react';
import { Skeleton } from '../ui/skeleton';

// Enhanced Skeleton dengan shimmer effect
const ShimmerSkeleton: React.FC<{
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}> = ({
    className,
    children,
    style
}) => (
        <div className={`relative overflow-hidden ${className}`} style={style}>
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            {children}
        </div>
    );

// Skeleton untuk StatCard dengan shimmer
const StatCardSkeletonEnhanced: React.FC = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between">
            <div className="space-y-3">
                <ShimmerSkeleton className="h-4 w-24" />
                <ShimmerSkeleton className="h-8 w-16" />
            </div>
            <ShimmerSkeleton className="h-12 w-12 rounded-lg" />
        </div>
        <div className="mt-4 flex items-center space-x-2">
            <ShimmerSkeleton className="h-3 w-3" />
            <ShimmerSkeleton className="h-3 w-32" />
        </div>
    </div>
);

// Skeleton untuk Chart dengan bar placeholders
const ChartSkeletonEnhanced: React.FC = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
        <ShimmerSkeleton className="h-6 w-48 mb-6" />
        <div className="space-y-4">
            {[100, 80, 60, 40].map((width, i) => (
                <div key={i} className="flex items-center space-x-3">
                    <ShimmerSkeleton className="h-4 w-20" />
                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                        <ShimmerSkeleton className={`h-full rounded-full`} style={{ width: `${width}%` }} />
                    </div>
                    <ShimmerSkeleton className="h-4 w-12" />
                </div>
            ))}
        </div>
    </div>
);

// Skeleton untuk Avatar dengan placeholder
const AvatarSkeletonEnhanced: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-48 h-48'
    };

    return (
        <div className={`${sizeClasses[size]} rounded-xl bg-gray-200 relative overflow-hidden`}>
            <ShimmerSkeleton className="w-full h-full rounded-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1/2 h-1/2 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    );
};

// Skeleton untuk Professor List Item
const ProfessorListItemSkeleton: React.FC = () => (
    <div className="flex items-center space-x-3 p-2 rounded-md">
        <AvatarSkeletonEnhanced size="sm" />
        <div className="flex-1">
            <ShimmerSkeleton className="h-4 w-full mb-1" />
            <ShimmerSkeleton className="h-3 w-2/3" />
        </div>
    </div>
);

// Main Dashboard Skeleton Enhanced
const DashboardSkeletonEnhanced: React.FC = () => (
    <div className="min-h-screen bg-gray-50">
        {/* NavBar Skeleton */}
        <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <ShimmerSkeleton className="h-8 w-48" />
                    <div className="flex items-center space-x-4">
                        <ShimmerSkeleton className="h-8 w-8 rounded-full" />
                        <ShimmerSkeleton className="h-8 w-24" />
                    </div>
                </div>
            </div>
        </div>

        <div className="p-6">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Stats Section */}
                <div>
                    <ShimmerSkeleton className="h-8 w-32 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <StatCardSkeletonEnhanced key={i} />
                        ))}
                    </div>
                </div>

                {/* Student Section */}
                <div className="mt-6">
                    <ShimmerSkeleton className="h-8 w-40 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {[...Array(3)].map((_, i) => (
                            <ChartSkeletonEnhanced key={i} />
                        ))}
                    </div>
                </div>

                {/* Professor Section */}
                <div className="mt-6">
                    <ShimmerSkeleton className="h-8 w-32 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {[...Array(3)].map((_, i) => (
                            <ChartSkeletonEnhanced key={i} />
                        ))}
                    </div>

                    {/* Professor Detail Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <ShimmerSkeleton className="h-6 w-64 mb-6" />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left side - Position and Professor list */}
                            <div className="space-y-6">
                                {/* Position buttons */}
                                <div>
                                    <ShimmerSkeleton className="h-5 w-24 mb-3" />
                                    <div className="space-y-2">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                                                <ShimmerSkeleton className="h-4 w-32" />
                                                <ShimmerSkeleton className="h-6 w-8 rounded-full" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Professor list */}
                                <div>
                                    <ShimmerSkeleton className="h-5 w-24 mb-3" />
                                    <div className="bg-gray-50 rounded-lg p-2 max-h-[450px] overflow-hidden">
                                        <div className="space-y-1">
                                            {[...Array(6)].map((_, i) => (
                                                <ProfessorListItemSkeleton key={i} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right side - Professor detail */}
                            <div className="lg:col-span-2">
                                <div className="flex flex-col md:flex-row gap-6 mb-8">
                                    {/* Avatar */}
                                    <div className="flex-shrink-0">
                                        <AvatarSkeletonEnhanced size="xl" />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 space-y-4">
                                        <div className="space-y-2">
                                            <ShimmerSkeleton className="h-8 w-64" />
                                            <ShimmerSkeleton className="h-6 w-20 rounded-full" />
                                        </div>

                                        <div className="space-y-3">
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className="flex items-center">
                                                    <ShimmerSkeleton className="h-4 w-24" />
                                                    <span className="mx-2">:</span>
                                                    <ShimmerSkeleton className="h-4 w-40" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Additional info sections */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="bg-gray-50 p-6 rounded-lg">
                                            <ShimmerSkeleton className="h-6 w-32 mb-4" />
                                            <div className="space-y-3">
                                                {[...Array(3)].map((_, j) => (
                                                    <div key={j} className="flex items-center">
                                                        <ShimmerSkeleton className="h-4 w-20" />
                                                        <span className="mx-2">:</span>
                                                        <ShimmerSkeleton className="h-4 w-32" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-8">
                    <ShimmerSkeleton className="h-4 w-64 mx-auto" />
                </div>
            </div>
        </div>
    </div>
);

export {
    DashboardSkeletonEnhanced,
    ShimmerSkeleton,
    StatCardSkeletonEnhanced,
    ChartSkeletonEnhanced,
    AvatarSkeletonEnhanced,
    ProfessorListItemSkeleton
};
