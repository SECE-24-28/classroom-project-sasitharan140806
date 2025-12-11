import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg text-sm font-semibold transition ${
    isActive
      ? 'bg-white text-airtel-primary shadow-soft'
      : 'text-white/90 hover:bg-white/10'
  }`

export const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth()

  return (
    <header className="bg-gradient-to-r from-airtel-primary to-red-700 text-white shadow-lg">
      <nav className="container-page h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="text-white">Airtel</span>
          <span className="text-yellow-200">Recharge</span>
        </Link>

        <div className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/plans" className={navLinkClass}>
            Recharge Plans
          </NavLink>
          {!isLoggedIn && (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/signup" className={navLinkClass}>
                Signup
              </NavLink>
            </>
          )}
          {isLoggedIn && (
            <button
              onClick={logout}
              className="px-3 py-2 rounded-lg text-sm font-semibold bg-white text-airtel-primary hover:bg-gray-100 transition shadow-soft"
            >
              Logout{user?.name ? ` (${user.name})` : ''}
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
