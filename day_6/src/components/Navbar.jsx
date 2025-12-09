import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar({ toggleSidebar, appName = 'Airtel', isLoggedIn, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="menu-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <span className="menu-icon">☰</span>
        </button>

        <Link to="/" className="navbar-logo">
          <div className="logo-icon">📱</div>
          <span className="logo-text">{appName}</span>
        </Link>

        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recharge">Recharge</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/signup">Offers</Link></li>
        </ul>

        <div className="navbar-actions">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn-secondary">Login</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </>
          ) : (
            <div className="user-chip">
              <div className="user-initial">{user?.name?.[0]?.toUpperCase() || 'A'}</div>
              <div className="user-info">
                <span className="user-name">{user?.name || 'Airtel User'}</span>
                <button className="logout-btn" onClick={onLogout}>Logout</button>
              </div>
            </div>
          )}

          <Link to="/recharge" className="cta-recharge">Recharge</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
