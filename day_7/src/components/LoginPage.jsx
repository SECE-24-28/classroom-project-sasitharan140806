import { useAppContext } from '../context/useAppContext';
import { useState } from 'react';

export const LoginPage = ({ onLoginSuccess }) => {
  const { loginUser, user } = useAppContext();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError('Phone number must be 10 digits');
      return;
    }

    loginUser(name, phone);
    setName('');
    setPhone('');
    setError('');
    onLoginSuccess?.();
  };

  if (user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-airtel-light to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-3xl font-bold text-airtel-primary mb-2">Welcome!</h2>
          <p className="text-gray-700 mb-4">
            Logged in as <span className="font-semibold text-airtel-dark">{user.name}</span>
          </p>
          <p className="text-gray-600 mb-6">
            Phone: <span className="font-semibold">{user.phone}</span>
          </p>
          <div className="bg-gradient-to-r from-green-100 to-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-700 font-semibold">You're all set to recharge!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-airtel-primary via-red-600 to-airtel-dark flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-airtel-primary to-red-700 p-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Airtel Recharge</h1>
            <p className="text-red-100">Recharge fast, save more!</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-airtel-primary transition"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.slice(0, 10))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-airtel-primary transition"
                placeholder="10-digit mobile number"
                maxLength="10"
              />
            </div>

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 font-semibold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-airtel-primary to-red-700 text-white font-bold py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-300"
            >
              Login to Recharge
            </button>

            <p className="text-center text-gray-600 text-sm">
              Enter your details to get started with Airtel Recharge
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
