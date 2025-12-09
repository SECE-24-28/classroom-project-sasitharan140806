import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import { RechargePage } from './components/RechargePage';
import { CartPage } from './components/CartPage';
import { Footer } from './components/Footer';
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLoginSuccess={() => setCurrentPage('home')} />;
      case 'recharge':
        return <RechargePage />;
      case 'cart':
        return <CartPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Navigation Buttons */}
      <div className="bg-gray-100 border-b border-gray-300 px-4 py-3 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === 'home'
                ? 'bg-airtel-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            🏠 Home
          </button>
          <button
            onClick={() => setCurrentPage('login')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === 'login'
                ? 'bg-airtel-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            🔑 Login
          </button>
          <button
            onClick={() => setCurrentPage('recharge')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === 'recharge'
                ? 'bg-airtel-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            📱 Recharge
          </button>
          <button
            onClick={() => setCurrentPage('cart')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === 'cart'
                ? 'bg-airtel-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            🛒 Cart
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
