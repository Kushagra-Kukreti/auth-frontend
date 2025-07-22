import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          AuthApp
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-4">
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/account-settings"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Settings
          </Link>
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Signup
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
