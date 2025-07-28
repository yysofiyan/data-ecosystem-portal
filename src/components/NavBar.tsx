import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">Data Ecosystem Portal</div>
          <div className="flex space-x-4">
            <a href="/" className="px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="/satudata" className="px-3 py-2 rounded-md text-sm font-medium">Satu Data</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;