import { useState } from 'react';
import { AppContext } from './appContextSetup';

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({
    name: 'Guest User',
    phone: '',
    balance: 499,
    operator: 'Airtel',
    isLoggedIn: false,
  });

  const [cart, setCart] = useState([]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  const loginUser = (name, phone) => {
    setUser((prev) => ({
      ...prev,
      name,
      phone,
      isLoggedIn: true,
    }));
  };

  const logoutUser = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
      phone: '',
      cart: [],
    }));
    setCart([]);
  };

  const addToCart = (plan) => {
    setCart((prev) => [...prev, plan]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    theme,
    toggleTheme,
    user,
    updateUser,
    loginUser,
    logoutUser,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
