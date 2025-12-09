import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import HomePage from './components/HomePage'
import RechargePage from './components/RechargePage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import Dashboard from './components/Dashboard'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser')
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
      setIsLoggedIn(true)
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
    localStorage.setItem('currentUser', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('currentUser')
  }

  return (
    <Router>
      <div className="app">
        <Navbar 
          toggleSidebar={toggleSidebar} 
          appName="Airtel" 
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={handleLogout}
        />
        <Sidebar 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar}
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={handleLogout}
        />
      
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recharge" element={<RechargePage user={user} />} />
            <Route path="/login" element={
              isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />
            } />
            <Route path="/signup" element={
              isLoggedIn ? <Navigate to="/dashboard" /> : <SignupPage onLogin={handleLogin} />
            } />
            <Route path="/dashboard" element={
              isLoggedIn ? <Dashboard user={user} /> : <Navigate to="/login" />
            } />
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} company="Airtel India" />
      </div>
    </Router>
  )
}

export default App 
