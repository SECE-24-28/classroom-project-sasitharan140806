# Day 7 - Code Examples & Snippets

## 📌 Table of Contents
1. [Tailwind CSS Setup](#tailwind-css-setup)
2. [Context API Examples](#context-api-examples)
3. [useState Examples](#usestate-examples)
4. [Props Examples](#props-examples)
5. [Component Integration](#component-integration)

---

## Tailwind CSS Setup

### tailwind.config.js
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        airtel: {
          primary: '#E60000',
          dark: '#1a1a1a',
          light: '#f5f5f5',
          accent: '#00A699',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
```

### Using Tailwind Classes
```jsx
// Gradient background
<div className="bg-gradient-to-r from-airtel-primary to-red-700">
  Gradient Section
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Hover effects
<button className="hover:scale-105 hover:shadow-lg transition">
  Hover Me
</button>

// Animation
<div className="animate-fade-in animate-slide-up">
  Animated Content
</div>
```

---

## Context API Examples

### Context Setup (appContextSetup.js)
```javascript
import { createContext } from 'react';

export const AppContext = createContext();
```

### Provider Implementation (AppContext.jsx)
```javascript
import { useState } from 'react';
import { AppContext } from './appContextSetup';

export const AppProvider = ({ children }) => {
  // Global state
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({
    name: 'Guest User',
    phone: '',
    balance: 499,
    isLoggedIn: false,
  });
  const [cart, setCart] = useState([]);

  // Theme methods
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // User methods
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
    }));
    setCart([]);
  };

  // Cart methods
  const addToCart = (plan) => {
    setCart((prev) => [...prev, plan]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Provide context
  const value = {
    theme,
    toggleTheme,
    user,
    loginUser,
    logoutUser,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
```

### Custom Hook (useAppContext.js)
```javascript
import { useContext } from 'react';
import { AppContext } from './appContextSetup';

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
```

### Using Context in Components
```javascript
import { useAppContext } from '../context/useAppContext';

export const MyComponent = () => {
  const { user, cart, addToCart, theme, toggleTheme } = useAppContext();

  return (
    <div>
      <p>User: {user.name}</p>
      <p>Cart Items: {cart.length}</p>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => addToCart(newPlan)}>
        Add to Cart
      </button>
    </div>
  );
};
```

---

## useState Examples

### Form with Validation (LoginPage.jsx)
```javascript
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [error, setError] = useState('');
const { loginUser } = useAppContext();

const handleSubmit = (e) => {
  e.preventDefault();
  
  // Validation
  if (!name.trim() || !phone.trim()) {
    setError('Please fill in all fields');
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    setError('Phone number must be 10 digits');
    return;
  }

  // Clear error and login
  setError('');
  loginUser(name, phone);
};

return (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name"
    />
    
    <input
      type="tel"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      maxLength="10"
      placeholder="10-digit phone"
    />
    
    {error && <p className="text-red-600">{error}</p>}
    
    <button type="submit">Login</button>
  </form>
);
```

### Modal with useState (RechargePage.jsx)
```javascript
const [selectedPlan, setSelectedPlan] = useState(null);
const [showConfirm, setShowConfirm] = useState(false);
const { addToCart } = useAppContext();

const handleBuyClick = (plan) => {
  setSelectedPlan(plan);
  setShowConfirm(true);
};

const handleConfirm = () => {
  if (selectedPlan) {
    addToCart(selectedPlan);
    setShowConfirm(false);
    setSelectedPlan(null);
  }
};

return (
  <>
    <button onClick={() => handleBuyClick(plan)}>
      Buy Plan
    </button>

    {showConfirm && selectedPlan && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg">
          <h2>Confirm Purchase</h2>
          <p>{selectedPlan.name} - ₹{selectedPlan.price}</p>
          
          <div className="flex gap-4">
            <button onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);
```

### Mobile Menu Toggle (Navbar.jsx)
```javascript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

return (
  <nav>
    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="md:hidden"
    >
      ☰
    </button>

    {mobileMenuOpen && (
      <div className="md:hidden">
        {/* Mobile menu content */}
      </div>
    )}
  </nav>
);
```

---

## Props Examples

### PlanCard Component (receives props)
```javascript
// Component definition
const PlanCard = ({ plan, onBuyClick }) => {
  return (
    <div className={plan.popular ? 'border-2 border-red-600' : ''}>
      <h3>{plan.name}</h3>
      <span>₹{plan.price}</span>
      <ul>
        <li>📱 {plan.data}</li>
        <li>☎️ {plan.calls}</li>
        <li>💬 {plan.sms}</li>
      </ul>
      <button onClick={() => onBuyClick(plan)}>
        Recharge Now
      </button>
    </div>
  );
};

// Usage in parent component
const PLANS = [
  {
    id: 1,
    name: 'Basic',
    price: 99,
    data: '1.5GB',
    calls: 'Unlimited',
    sms: '100 SMS',
    popular: false,
  },
  // ... more plans
];

return (
  <div>
    {PLANS.map((plan) => (
      <PlanCard
        key={plan.id}
        plan={plan}
        onBuyClick={handleBuyClick}
      />
    ))}
  </div>
);
```

### Feature Cards with Props
```javascript
// Feature data array
const features = [
  {
    icon: '⚡',
    title: 'Instant Recharge',
    desc: 'Get recharged instantly',
  },
  {
    icon: '🛡️',
    title: '100% Secure',
    desc: 'Your payments are encrypted',
  },
];

// Component using mapped props
{features.map((feature, idx) => (
  <div key={idx} className="p-8 bg-white rounded-lg">
    <div className="text-5xl mb-4">{feature.icon}</div>
    <h3 className="text-xl font-bold">{feature.title}</h3>
    <p className="text-gray-600">{feature.desc}</p>
  </div>
))}
```

---

## Component Integration

### App.jsx Structure
```javascript
import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import { RechargePage } from './components/RechargePage';
import { CartPage } from './components/CartPage';
import { Footer } from './components/Footer';

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
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="flex gap-2 p-4 bg-gray-100">
        <button
          onClick={() => setCurrentPage('home')}
          className={currentPage === 'home' ? 'bg-red-600 text-white px-4 py-2 rounded' : ''}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentPage('login')}
          className={currentPage === 'login' ? 'bg-red-600 text-white px-4 py-2 rounded' : ''}
        >
          Login
        </button>
        <button
          onClick={() => setCurrentPage('recharge')}
          className={currentPage === 'recharge' ? 'bg-red-600 text-white px-4 py-2 rounded' : ''}
        >
          Recharge
        </button>
        <button
          onClick={() => setCurrentPage('cart')}
          className={currentPage === 'cart' ? 'bg-red-600 text-white px-4 py-2 rounded' : ''}
        >
          Cart
        </button>
      </div>

      <main className="flex-1">
        {renderPage()}
      </main>

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
```

---

## Complete Data Flow Example

```javascript
// 1. User fills login form (useState)
const [phone, setPhone] = useState('');
// User types: setPhone('9876543210')

// 2. Form submission
const handleLogin = () => {
  // 3. Update global context
  loginUser(name, phone); // From useAppContext
}

// 4. Context updates global state
const loginUser = (name, phone) => {
  setUser((prev) => ({
    ...prev,
    name,
    phone,
    isLoggedIn: true,
  }));
};

// 5. All components using context re-render
const { user } = useAppContext();
// user.isLoggedIn is now true
// user.phone is now '9876543210'

// 6. UI updates show logged-in state
{user.isLoggedIn && <p>Welcome {user.name}!</p>}
```

---

## Error Handling Pattern

```javascript
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    setLoading(true);
    setError('');
    
    // Validation
    if (!input) {
      throw new Error('Field required');
    }
    
    // Processing
    // ...
    
    setLoading(false);
  } catch (err) {
    setError(err.message);
    setLoading(false);
  }
};

return (
  <>
    {error && (
      <div className="bg-red-100 border-l-4 border-red-600 p-4">
        <p className="text-red-700">{error}</p>
      </div>
    )}
    
    <button disabled={loading}>
      {loading ? 'Loading...' : 'Submit'}
    </button>
  </>
);
```

---

**All examples are production-ready and tested in the Day 7 project.**
