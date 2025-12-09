import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

function Dashboard({ user }) {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('transactions') || '[]')
    setTransactions(saved)
  }, [])

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <p className="welcome">Welcome back,</p>
            <h1>{user?.name || 'Airtel User'}</h1>
            <p className="muted">Manage your recharges and payments</p>
          </div>
          <div className="cta-buttons">
            <Link to="/recharge" className="btn btn-primary">Recharge Now</Link>
            <Link to="/" className="btn btn-secondary">View Plans</Link>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Recharges</div>
            <div className="stat-value">{transactions.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Last Recharge</div>
            <div className="stat-value">
              {transactions[0]?.date || '—'}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Spent</div>
            <div className="stat-value">
              ₹{transactions.reduce((sum, t) => sum + (t.amount || 0), 0)}
            </div>
          </div>
        </div>

        <div className="card transactions-card">
          <div className="card-header">
            <div>
              <h2>Recent Transactions</h2>
              <p className="muted">Your latest recharges and payments</p>
            </div>
            <Link to="/recharge" className="btn btn-secondary">Recharge</Link>
          </div>

          {transactions.length === 0 ? (
            <div className="empty-state">
              <p>No transactions yet.</p>
              <Link to="/recharge" className="btn btn-primary">Recharge Now</Link>
            </div>
          ) : (
            <div className="transactions-table">
              <div className="table-head">
                <span>Mobile</span>
                <span>Plan</span>
                <span>Amount</span>
                <span>Status</span>
                <span>Date</span>
              </div>
              {transactions.map(tx => (
                <div className="table-row" key={tx.id}>
                  <span>{tx.mobile}</span>
                  <span>{tx.plan ? `${tx.plan.data} / ${tx.plan.validity}` : '—'}</span>
                  <span>₹{tx.amount}</span>
                  <span className={`status ${tx.status?.toLowerCase()}`}>{tx.status}</span>
                  <span>{tx.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
