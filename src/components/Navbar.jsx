import "./Navbar.css"
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Home className="h-6 w-6 text-purple-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">DevHire</span>
            </Link>
          </div>
          <div className="flex space-x-6"> {/* This adds spacing between the links */}
            <Link to="/" className="linkMargin text-gray-700 hover:text-purple-600">Jobs</Link>
            <Link to="/dashboard" className="linkMargin text-gray-700 hover:text-purple-600">Dashboard</Link>
            <Link to="/about" className="linkMargin text-gray-700 hover:text-purple-600">About</Link>
            <Link to="/contact" className="linkMargin text-gray-700 hover:text-purple-600">Contact</Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
