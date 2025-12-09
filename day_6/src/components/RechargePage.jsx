import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './RechargePage.css'

function RechargePage({ user }) {
  const navigate = useNavigate()
  const [mobileNumber, setMobileNumber] = useState('')
  const [selectedOperator, setSelectedOperator] = useState('airtel')
  const [selectedPlanType, setSelectedPlanType] = useState('prepaid')
  const [plans, setPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const operators = [
    { id: 'airtel', name: 'Airtel', logo: '📱' },
    { id: 'jio', name: 'Jio', logo: '📞' },
    { id: 'vi', name: 'VI (Vodafone Idea)', logo: '📳' },
    { id: 'bsnl', name: 'BSNL', logo: '📲' }
  ]

  const allPlans = [
    { id: 1, price: 299, validity: '28 Days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', type: 'prepaid', operator: 'airtel', popular: true },
    { id: 2, price: 499, validity: '56 Days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', type: 'prepaid', operator: 'airtel', popular: false },
    { id: 3, price: 839, validity: '84 Days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', type: 'prepaid', operator: 'airtel', popular: false },
    { id: 4, price: 199, validity: '28 Days', data: '1GB/day', calls: 'Unlimited', sms: '100/day', type: 'prepaid', operator: 'airtel', popular: false },
    { id: 5, price: 666, validity: '56 Days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', type: 'prepaid', operator: 'airtel', popular: false },
    { id: 6, price: 399, validity: 'Monthly', data: 'Unlimited', calls: 'Unlimited', sms: 'Unlimited', type: 'postpaid', operator: 'airtel', popular: true },
    { id: 7, price: 599, validity: 'Monthly', data: 'Unlimited', calls: 'Unlimited', sms: 'Unlimited', type: 'postpaid', operator: 'airtel', popular: false },
  ]

  useEffect(() => {
    loadPlans()
  }, [selectedOperator, selectedPlanType])

  const loadPlans = () => {
    setLoading(true)
    setTimeout(() => {
      const filteredPlans = allPlans.filter(
        plan => plan.operator === selectedOperator && plan.type === selectedPlanType
      )
      setPlans(filteredPlans)
      setLoading(false)
    }, 500)
  }

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10)
    setMobileNumber(value)
    setError('')
  }

  const handlePlanSelect = (plan) => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }
    setSelectedPlan(plan)
  }

  const handleProceedToPayment = () => {
    if (!user) {
      navigate('/login')
      return
    }

    // Save transaction to localStorage
    const transaction = {
      id: Date.now(),
      mobile: mobileNumber,
      operator: selectedOperator,
      plan: selectedPlan,
      amount: selectedPlan.price,
      date: new Date().toLocaleString(),
      status: 'Completed'
    }

    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]')
    transactions.unshift(transaction)
    localStorage.setItem('transactions', JSON.stringify(transactions))

    alert(`Recharge Successful! ₹${selectedPlan.price} has been recharged to ${mobileNumber}`)
    setSelectedPlan(null)
    setMobileNumber('')
    navigate('/dashboard')
  }

  return (
    <div className="recharge-page">
      <div className="container">
        <div className="page-header">
          <h1>Mobile Recharge</h1>
          <p>Recharge your mobile instantly with exciting offers</p>
        </div>

        {/* Recharge Form */}
        <div className="recharge-form-section">
          <div className="recharge-form card">
            <h2>Enter Mobile Details</h2>
            
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={handleMobileChange}
                placeholder="Enter 10-digit mobile number"
                className={error ? 'input-error' : ''}
              />
              {error && <div className="error">{error}</div>}
            </div>

            <div className="form-group">
              <label>Select Operator</label>
              <div className="operator-grid">
                {operators.map(op => (
                  <div
                    key={op.id}
                    className={`operator-card ${selectedOperator === op.id ? 'active' : ''}`}
                    onClick={() => setSelectedOperator(op.id)}
                  >
                    <div className="operator-logo">{op.logo}</div>
                    <div className="operator-name">{op.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Plan Type</label>
              <div className="plan-type-toggle">
                <button
                  className={`toggle-btn ${selectedPlanType === 'prepaid' ? 'active' : ''}`}
                  onClick={() => setSelectedPlanType('prepaid')}
                >
                  Prepaid
                </button>
                <button
                  className={`toggle-btn ${selectedPlanType === 'postpaid' ? 'active' : ''}`}
                  onClick={() => setSelectedPlanType('postpaid')}
                >
                  Postpaid
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Plans Section */}
        <div className="plans-section">
          <h2>Available Plans</h2>
          {loading ? (
            <div className="loading">Loading plans...</div>
          ) : (
            <div className="plans-container">
              {plans.map(plan => (
                <div key={plan.id} className={`plan-card-recharge ${plan.popular ? 'popular' : ''}`}>
                  {plan.popular && <div className="popular-badge">Popular</div>}
                  <div className="plan-price">₹{plan.price}</div>
                  <div className="plan-validity">{plan.validity}</div>
                  <div className="plan-details">
                    <div className="detail-item">
                      <span className="detail-icon">📊</span>
                      <span className="detail-text">{plan.data} Data</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📞</span>
                      <span className="detail-text">{plan.calls} Calls</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">💬</span>
                      <span className="detail-text">{plan.sms} SMS</span>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => handlePlanSelect(plan)}
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment Modal */}
        {selectedPlan && (
          <div className="modal-overlay" onClick={() => setSelectedPlan(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Confirm Recharge</h2>
                <button className="close-btn" onClick={() => setSelectedPlan(null)}>×</button>
              </div>
              <div className="modal-body">
                <div className="summary-item">
                  <span>Mobile Number:</span>
                  <strong>{mobileNumber}</strong>
                </div>
                <div className="summary-item">
                  <span>Operator:</span>
                  <strong>{selectedOperator.toUpperCase()}</strong>
                </div>
                <div className="summary-item">
                  <span>Plan:</span>
                  <strong>₹{selectedPlan.price} - {selectedPlan.validity}</strong>
                </div>
                <div className="summary-item">
                  <span>Data:</span>
                  <strong>{selectedPlan.data}</strong>
                </div>
                <div className="summary-item total">
                  <span>Total Amount:</span>
                  <strong>₹{selectedPlan.price}</strong>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedPlan(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleProceedToPayment}>
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RechargePage
