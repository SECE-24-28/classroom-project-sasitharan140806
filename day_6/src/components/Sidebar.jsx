import { Link } from 'react-router-dom'
import './Sidebar.css'

function Sidebar({ isOpen, toggleSidebar, isLoggedIn, user, onLogout }) {
  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={toggleSidebar}
        aria-hidden={!isOpen}
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Airtel Menu</h3>
          <button className="close-btn" onClick={toggleSidebar} aria-label="Close sidebar">
            ✕
          </button>
        </div>

        <nav className="sidebar-nav" onClick={toggleSidebar}>
          <Link to="/" className="sidebar-link">
            <span className="link-icon">🏠</span>
            <span>Home</span>
          </Link>
          <Link to="/recharge" className="sidebar-link">
            <span className="link-icon">💳</span>
            <span>Recharge</span>
          </Link>
          <Link to="/dashboard" className="sidebar-link">
            <span className="link-icon">📊</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/signup" className="sidebar-link">
            <span className="link-icon">🎁</span>
            <span>Offers</span>
          </Link>
          <Link to="/login" className="sidebar-link">
            <span className="link-icon">💬</span>
            <span>Support</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="sidebar-btn" onClick={toggleSidebar}>Login</Link>
              <Link to="/signup" className="sidebar-btn primary" onClick={toggleSidebar}>Sign Up</Link>
            </>
          ) : (
            <div className="sidebar-user">
              <div className="user-circle">{user?.name?.[0]?.toUpperCase() || 'A'}</div>
              <div className="user-meta">
                <strong>{user?.name || 'Airtel User'}</strong>
                <small>{user?.email}</small>
                <button className="logout-link" onClick={onLogout}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar
