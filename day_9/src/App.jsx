import React, { useState } from 'react';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

function App() {
  const [view, setView] = useState('login');

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Day 9 — React Hook Form + Yup</p>
          <h1>Forms with validation, ready to submit</h1>
          <p className="lede">
            Swap between login and signup. Every field is registered, validated with Yup, and
            errors render inline. Submits simulate async work and reset on success.
          </p>
          <div className="tabs">
            <button
              className={view === 'login' ? 'tab active' : 'tab'}
              onClick={() => setView('login')}
            >
              Login
            </button>
            <button
              className={view === 'signup' ? 'tab active' : 'tab'}
              onClick={() => setView('signup')}
            >
              Signup
            </button>
          </div>
        </div>
      </header>

      <main className="layout">
        {view === 'login' ? <Login /> : <Signup />}
      </main>
    </div>
  );
}

export default App;
