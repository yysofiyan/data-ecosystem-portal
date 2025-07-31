import React from 'react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser
} from '@clerk/clerk-react';
import { Shield, Lock } from 'lucide-react';

// Komponen untuk tombol sign in yang stylish
const AdminSignInButton: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-10 h-10 text-white" />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600">
            Data Ecosystem Portal - Fakultas Teknologi Informasi
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Lock className="w-4 h-4" />
            <span>Akses terbatas untuk administrator</span>
          </div>
          
          <SignInButton mode="modal">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>Masuk sebagai Admin</span>
            </button>
          </SignInButton>
        </div>
        
        <div className="text-xs text-gray-400 text-center">
          Sistem autentifikasi dikelola oleh Clerk
        </div>
      </div>
    </div>
  </div>
);

// Komponen untuk admin yang sudah login
const AdminNavBar: React.FC = () => {
  const { user } = useUser();
  
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">Admin Portal</h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Administrator
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
            </div>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen utama Authentication Wrapper
const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <SignedOut>
        <AdminSignInButton />
      </SignedOut>
      
      <SignedIn>
        <div className="min-h-screen bg-gray-50">
          <AdminNavBar />
          {children}
        </div>
      </SignedIn>
    </>
  );
};

export { AuthWrapper, AdminSignInButton, AdminNavBar };
