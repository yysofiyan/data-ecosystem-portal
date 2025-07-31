import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { cn } from '@/lib/utils';

// Interface untuk props komponen ProfessorAvatar
interface ProfessorAvatarProps {
    name: string;
    photoUrl?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

// Fungsi untuk menghasilkan inisial dari nama
const generateInitials = (name: string): string => {
    return name
        .split(' ')
        .filter(word => word.length > 0)
        .map(word => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
};

// Fungsi untuk memproses URL foto
const processPhotoUrl = (photoUrl?: string): string | undefined => {
    if (!photoUrl) return undefined;
    
    // Jika sudah URL lengkap (http/https), gunakan langsung
    if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
        return photoUrl;
    }
    
    // Jika path relatif, pastikan dimulai dengan /
    if (!photoUrl.startsWith('/')) {
        return `/${photoUrl}`;
    }
    
    return photoUrl;
};

// Definisi ukuran avatar
const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-48 h-48 text-3xl'
};

// Komponen ProfessorAvatar dengan fallback
const ProfessorAvatar: React.FC<ProfessorAvatarProps> = ({
    name,
    photoUrl,
    size = 'md',
    className
}) => {
    const processedUrl = processPhotoUrl(photoUrl);
    
    return (
        <Avatar className={cn(sizeClasses[size], 'rounded-xl shadow-md', className)}>
            <AvatarImage
                src={processedUrl}
                alt={name}
                className="object-cover"
                onError={() => {
                    // Optional: Log errors for debugging
                    if (process.env.NODE_ENV === 'development') {
                        console.warn(`Failed to load image for ${name}:`, processedUrl);
                    }
                }}
            />
            <AvatarFallback className={cn(
                'font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white',
                size === 'xl' ? 'text-3xl' : size === 'lg' ? 'text-lg' : size === 'md' ? 'text-sm' : 'text-xs'
            )}>
                {generateInitials(name)}
            </AvatarFallback>
        </Avatar>
    );
};

export default ProfessorAvatar;
