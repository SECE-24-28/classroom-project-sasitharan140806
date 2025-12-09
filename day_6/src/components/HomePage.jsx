import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="airtel-brand">Airtel</span>
          </h1>
          <p className="hero-subtitle">
            India's Largest Telecom Network
          </p>
          <p className="hero-description">
            Recharge your prepaid mobile, pay postpaid bills, and enjoy exclusive offers
          </p>
          <div className="hero-buttons">
            <Link to="/recharge" className="btn btn-primary btn-large">
              Recharge Now
            </Link>
            <Link to="/signup" className="btn btn-secondary btn-large">
              Create Account
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="screen-gradient"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Airtel?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fastest Network</h3>
              <p>Experience lightning-fast 4G/5G speeds across India</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Offers</h3>
              <p>Exclusive recharge plans and cashback rewards</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payments</h3>
              <p>100% safe and encrypted payment gateway</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Recharge</h3>
              <p>Get recharged within seconds, 24/7</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy to Use</h3>
              <p>Simple and intuitive interface for everyone</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎁</div>
              <h3>Extra Benefits</h3>
              <p>Free subscriptions with select recharge plans</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Plans Section */}
      <section className="plans-section">
        <div className="container">
          <h2 className="section-title">Popular Recharge Plans</h2>
          <div className="plans-grid">
            <div className="plan-card popular">
              <div className="plan-badge">Most Popular</div>
              <div className="plan-price">₹299</div>
              <div className="plan-validity">28 Days</div>
              <ul className="plan-benefits">
                <li>✓ 1.5GB/day Data</li>
                <li>✓ Unlimited Calls</li>
                <li>✓ 100 SMS/day</li>
                <li>✓ Free Subscriptions</li>
              </ul>
              <Link to="/recharge" className="btn btn-primary btn-block">
                Recharge Now
              </Link>
            </div>
            <div className="plan-card">
              <div className="plan-price">₹ 499</div>
              <div className="plan-validity">56 Days</div>
              <ul className="plan-benefits">
                <li>✓ 2GB/day Data</li>
                <li>✓ Unlimited Calls</li>
                <li>✓ 100 SMS/day</li>
                <li>✓ Premium Subscriptions</li>
              </ul>
              <Link to="/recharge" className="btn btn-secondary btn-block">
                Recharge Now
              </Link>
            </div>
            <div className="plan-card">
              <div className="plan-price">₹839</div>
              <div className="plan-validity">84 Days</div>
              <ul className="plan-benefits">
                <li>✓ 2GB/day Data</li>
                <li>✓ Unlimited Calls</li>
                <li>✓ 100 SMS/day</li>
                <li>✓ All OTT Apps</li>
              </ul>
              <Link to="/recharge" className="btn btn-secondary btn-block">
                Recharge Now
              </Link>
            </div>
          </div>
          <div className="view-all-plans">
            <Link to="/recharge" className="btn btn-secondary">
              View All Plans →
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📲</div>
              <h3>Prepaid Recharge</h3>
              <p>Instant mobile recharge with exclusive offers</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💳</div>
              <h3>Postpaid Bill Payment</h3>
              <p>Pay your postpaid bills hassle-free</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🌐</div>
              <h3>DTH Recharge</h3>
              <p>Recharge your Airtel Digital TV instantly</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎵</div>
              <h3>Wynk Music</h3>
              <p>Stream unlimited music with premium plans</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience the Best Network?</h2>
            <p>Join millions of happy Airtel customers today</p>
            <Link to="/signup" className="btn btn-primary btn-large">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
