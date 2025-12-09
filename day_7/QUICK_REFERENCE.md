# Day 7 - Quick Reference Guide

## 🚀 Getting Started

```bash
cd day_7
npm install
npm run dev  # Start dev server
```

## 📦 What's Implemented

### ✅ Tailwind CSS Setup
- Custom Airtel theme colors
- Responsive mobile-first design
- Smooth animations and gradients
- Dark mode ready structure

### ✅ Context API for Global State
**File**: `src/context/AppContext.jsx`

```javascript
const { 
  user,           // { name, phone, balance, isLoggedIn }
  loginUser,      // Function to authenticate
  logoutUser,     // Function to logout
  cart,           // Array of selected plans
  addToCart,      // Function to add plan
  removeFromCart, // Function to remove plan
  theme,          // 'light' or 'dark'
  toggleTheme     // Function to toggle theme
} = useAppContext();
```

### ✅ Components Built

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **Navbar** | Top navigation | Theme toggle, user info, logout |
| **LoginPage** | Authentication | Form validation, phone number check |
| **HomePage** | Landing page | Hero, features, CTA buttons |
| **RechargePage** | Plan selection | PlanCard component, confirmation modal |
| **CartPage** | Shopping cart | Item management, checkout, discount |
| **Footer** | Footer section | Links, company info, social |

### ✅ State Management Examples

**useState in LoginPage**:
```jsx
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [error, setError] = useState('');
```

**useState in RechargePage**:
```jsx
const [selectedPlan, setSelectedPlan] = useState(null);
const [showConfirm, setShowConfirm] = useState(false);
```

**useState in Navbar**:
```jsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
```

### ✅ Props Usage (PlanCard)

```jsx
<PlanCard
  plan={{
    id: 1,
    name: 'Basic',
    price: 99,
    validity: '28 days',
    data: '1.5GB',
    calls: 'Unlimited',
    sms: '100 SMS',
    popular: false
  }}
  onBuyClick={(plan) => handleBuyClick(plan)}
/>
```

## 🎯 Key Files

```
day_7/
├── src/
│   ├── components/Navbar.jsx (165 lines) ⭐
│   ├── components/LoginPage.jsx (130 lines) ⭐
│   ├── components/HomePage.jsx (130 lines) ⭐
│   ├── components/RechargePage.jsx (170 lines) ⭐
│   ├── components/CartPage.jsx (185 lines) ⭐
│   ├── components/Footer.jsx (65 lines)
│   ├── context/AppContext.jsx (Provider) ⭐
│   ├── context/useAppContext.js (Hook) ⭐
│   └── App.jsx (Main component) ⭐
├── tailwind.config.js (Custom theme) ⭐
└── postcss.config.js
```

## 🔧 How to Use

### Add New Component with Context
```jsx
import { useAppContext } from '../context/useAppContext';

export const MyComponent = () => {
  const { user, cart, addToCart } = useAppContext();
  
  return (
    <div>
      <p>User: {user.name}</p>
      <p>Cart items: {cart.length}</p>
    </div>
  );
};
```

### Create Form with Validation
```jsx
const [input, setInput] = useState('');
const [error, setError] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  
  if (!input.trim()) {
    setError('Field is required');
    return;
  }
  
  setError(''); // Clear error
  // Process form
};
```

### Add Item to Global Cart
```jsx
const { addToCart } = useAppContext();

const handleBuy = (plan) => {
  addToCart(plan); // Adds to global cart
};
```

## 🎨 Tailwind CSS Classes Used

### Colors
```
bg-airtel-primary    (Red #E60000)
text-airtel-primary
bg-airtel-dark       (Dark #1a1a1a)
bg-airtel-light      (Light #f5f5f5)
```

### Responsive
```
sm:px-6        (Small screens)
md:flex        (Medium screens)
lg:px-8        (Large screens)
```

### Effects
```
hover:shadow-lg       (Hover shadow)
hover:scale-105       (Zoom on hover)
rounded-lg           (Rounded corners)
transition           (Smooth transition)
animate-fade-in      (Fade animation)
animate-slide-up     (Slide animation)
```

## 📊 Data Flow

```
User Input
    ↓
useState Hook (Local State)
    ↓
Validation
    ↓
Context Method (Global Update)
    ↓
All Components Re-render
    ↓
UI Updates
```

## 🧪 Testing the App

1. **Test Login**: Go to Login page, enter name and 10-digit phone
2. **Test Recharge**: Login first, then view plans and add to cart
3. **Test Cart**: View items in cart, remove items, see discount
4. **Test Theme**: Click theme toggle in navbar
5. **Test Logout**: Click logout button in navbar

## 📈 Component Hierarchy

```
App
├── AppProvider (Context)
│   ├── Navbar
│   ├── Navigation Buttons
│   ├── CurrentPage (LoginPage/HomePage/RechargePage/CartPage)
│   │   └── PlanCard (in RechargePage)
│   └── Footer
```

## 🚨 Common Issues & Solutions

**Issue**: "useAppContext must be used within AppProvider"
**Solution**: Make sure App.jsx wraps content in `<AppProvider>`

**Issue**: Cart not updating
**Solution**: Use `addToCart()` from context, not local state

**Issue**: Form not validating
**Solution**: Check error state is being set before form submission

## 💾 Build & Deploy

```bash
npm run build      # Creates optimized build in dist/
npm run preview    # Preview production build
```

**Build Output**:
- CSS: 20.51 kB (gzipped: 4.26 kB)
- JS: 217.43 kB (gzipped: 65.65 kB)

## ✨ Features Demonstrated

- ✅ Form validation with error handling
- ✅ Modal dialogs for confirmations
- ✅ Dynamic list rendering with maps
- ✅ Conditional rendering
- ✅ Event handling (onClick, onChange)
- ✅ State synchronization
- ✅ Responsive design
- ✅ Mobile menu toggle
- ✅ Shopping cart functionality
- ✅ Payment method selection

---

**Status**: ✅ COMPLETE AND READY TO USE
