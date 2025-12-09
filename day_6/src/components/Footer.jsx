import { Link } from 'react-router-dom'
import './Footer.css'

function Footer({ year = new Date().getFullYear(), company = 'Airtel India' }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Airtel Recharge</h4>
          <p>Fast, secure, and reliable mobile recharge services.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recharge">Recharge</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/signup">Offers</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#refund">Refund Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook">📘</a>
            <a href="#twitter" aria-label="Twitter">🐦</a>
            <a href="#instagram" aria-label="Instagram">📷</a>
            <a href="#linkedin" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} {company}. All rights reserved.</p>
        <p className="footer-tech">Built with React + Vite</p>
      </div>
    </footer>
  )
}

export default Footer
