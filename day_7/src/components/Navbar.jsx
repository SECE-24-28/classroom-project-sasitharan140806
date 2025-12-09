import { useAppContext } from '../context/useAppContext';
import { useState } from 'react';

export const Navbar = () => {
  const { user, toggleTheme, theme, logoutUser } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="bg-gradient-to-r from-airtel-primary to-red-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-white text-2xl font-bold">
              Airtel
            </div>
            <span className="text-white text-xs font-semibold">Recharge</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            
            {user.isLoggedIn ? (
              <>
                <span className="text-white font-semibold">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-airtel-primary px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <span className="text-white">Please Login</span>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:bg-red-600 px-2 py-2 rounded-md"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              {theme === 'light' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
            </button>
            {user.isLoggedIn && (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
