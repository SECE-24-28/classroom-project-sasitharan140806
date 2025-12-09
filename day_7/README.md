# Airtel Recharge Web Application - Day 7

A modern, fully-featured Mobile Recharge Web Application built with **React**, **Tailwind CSS**, and **Context API** for global state management.

## 🎯 Features Implemented

### 1. **Tailwind CSS Integration**
- ✅ Complete Tailwind CSS setup with Vite
- ✅ Custom Airtel-themed color palette
- ✅ Responsive design across all pages
- ✅ Smooth animations and transitions
- ✅ Glass-morphism effects and gradients

### 2. **React State Management (useState)**
- ✅ **LoginPage**: Form state for name and phone number with validation
- ✅ **RechargePage**: Plan selection with modal confirmations
- ✅ **CartPage**: Dynamic cart management with item addition/removal
- ✅ **Navbar**: Mobile menu toggle state

### 3. **Context API (Global State)**
- ✅ **AppContext**: Manages global application state
  - User authentication and profile data
  - Theme toggle (light/dark mode support)
  - Shopping cart management
  - Plan selection and checkout

### 4. **Props-Driven Components**
- ✅ **PlanCard Component**: Receives plan data via props and renders dynamically
- ✅ **Feature Cards**: Props for customizable content
- ✅ **Modal Components**: Props for flexible dialogs and overlays

### 5. **Complete Component Structure**

```
src/
├── components/
│   ├── Navbar.jsx          (Navigation with theme toggle)
│   ├── LoginPage.jsx       (Authentication with form validation)
│   ├── HomePage.jsx        (Landing page with features)
│   ├── RechargePage.jsx    (Plan browsing & selection)
│   ├── CartPage.jsx        (Shopping cart with checkout)
│   └── Footer.jsx          (Footer with links)
├── context/
│   ├── appContextSetup.js  (Context creation)
│   ├── AppContext.jsx      (Provider component)
│   └── useAppContext.js    (Custom hook for consuming context)
├── App.jsx                 (Main app with page routing)
├── App.css                 (App-specific styles)
├── index.css               (Tailwind CSS directives)
└── main.jsx                (Entry point)
```

## 📊 Global State Management (Context API)

The `AppContext` provides:
- User authentication and profile management
- Theme toggling
- Shopping cart operations
- Plan selection

## 🔧 Key Components

### PlanCard (Props Example)
- Receives plan object with pricing and features
- Displays dynamically based on props data
- Triggers callbacks for user interaction

### LoginPage (useState Example)
- Form state management for inputs
- Validation error state handling
- Password/phone number validation

### CartPage (State + Context)
- Cart items from Context
- Checkout modal state
- Payment method selection

## 🚀 Getting Started

### Installation
```bash
cd day_7
npm install
```

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## 📱 Application Pages

1. **Home Page** - Hero section with features and CTA buttons
2. **Login Page** - User authentication form with validation
3. **Recharge Page** - Browse and select mobile recharge plans
4. **Cart Page** - View selected plans and checkout
5. **Navbar** - Navigation with theme toggle
6. **Footer** - Company info and links

## ✨ Tailwind CSS Features

- Custom Airtel-themed color palette
- Responsive mobile-first design
- Smooth animations and transitions
- Dark mode support
- Custom utility classes

## ✅ Assignment Completion

✅ Tailwind CSS Setup - Complete integration with custom theme  
✅ Responsive UI - Mobile-first design across all pages  
✅ Props Usage - Dynamic PlanCard and feature components  
✅ useState Hooks - Form validation, modal states, cart management  
✅ Context API - Global user, cart, and theme state  
✅ Complete Components - All required components built  
✅ Integration - All components integrated in App.jsx  
✅ Build Success - Production build verified and working

---

Built with ❤️ using React + Tailwind CSS + Context API
