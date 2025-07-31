
import React from "react";
import { Home, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            <span className="font-medium">Home</span>
          </Link>
          
          <Link
            to="/admin"
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-3 py-2 rounded-lg"
          >
            <Shield className="h-4 w-4 mr-2" />
            <span className="font-medium">Admin Portal</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
