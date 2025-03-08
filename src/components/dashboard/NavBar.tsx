
import React from "react";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            <span className="font-medium">Home</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
