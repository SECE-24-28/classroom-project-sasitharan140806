import { useAppContext } from '../context/useAppContext';
import { useState } from 'react';

const PLANS = [
  {
    id: 1,
    operator: 'Airtel',
    name: 'Basic',
    price: 99,
    validity: '28 days',
    data: '1.5GB',
    calls: 'Unlimited',
    sms: '100 SMS',
    popular: false,
  },
  {
    id: 2,
    operator: 'Airtel',
    name: 'Pro',
    price: 199,
    validity: '28 days',
    data: '3GB',
    calls: 'Unlimited',
    sms: '300 SMS',
    popular: true,
  },
  {
    id: 3,
    operator: 'Airtel',
    name: 'Premium',
    price: 499,
    validity: '84 days',
    data: '9GB',
    calls: 'Unlimited',
    sms: '1000 SMS',
    popular: false,
  },
];

// Reusable PlanCard Component (with Props)
const PlanCard = ({ plan, onBuyClick }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden transition transform hover:scale-105 ${
        plan.popular
          ? 'bg-gradient-to-br from-airtel-primary to-red-600 text-white shadow-xl scale-105'
          : 'bg-white text-gray-900 shadow-lg hover:shadow-xl'
      }`}
    >
      {plan.popular && (
        <div className="bg-yellow-400 text-black text-center py-2 font-bold text-sm">
          MOST POPULAR
        </div>
      )}

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-sm opacity-75 mb-4">{plan.operator}</p>

        <div className="mb-6">
          <span className="text-4xl font-bold">₹{plan.price}</span>
          <p className="text-sm opacity-75">for {plan.validity}</p>
        </div>

        <ul className="space-y-3 mb-6 text-sm">
          <li className="flex items-center">
            <span className="mr-3">📱</span>
            <span>{plan.data} Data</span>
          </li>
          <li className="flex items-center">
            <span className="mr-3">☎️</span>
            <span>{plan.calls} Calls</span>
          </li>
          <li className="flex items-center">
            <span className="mr-3">💬</span>
            <span>{plan.sms}</span>
          </li>
        </ul>

        <button
          onClick={() => onBuyClick(plan)}
          className={`w-full font-bold py-3 rounded-lg transition ${
            plan.popular
              ? 'bg-white text-airtel-primary hover:bg-gray-100'
              : 'bg-gradient-to-r from-airtel-primary to-red-600 text-white hover:shadow-lg'
          }`}
        >
          Recharge Now
        </button>
      </div>
    </div>
  );
};

export const RechargePage = () => {
  const { user, addToCart } = useAppContext();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleBuyClick = (plan) => {
    setSelectedPlan(plan);
    setShowConfirm(true);
  };

  const handleConfirmPurchase = () => {
    if (selectedPlan) {
      addToCart(selectedPlan);
      setShowConfirm(false);
      setSelectedPlan(null);
    }
  };

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-airtel-light to-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-airtel-dark mb-4">Please Login First</h1>
          <p className="text-gray-600">Login to view and recharge plans.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-airtel-light via-white to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-airtel-dark mb-4">
            Airtel Recharge Plans
          </h1>
          <p className="text-gray-600 text-lg">
            For {user.name} ({user.phone})
          </p>
          <p className="text-gray-500 mt-2">
            Current Balance: <span className="font-bold text-airtel-primary">₹{user.balance}</span>
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onBuyClick={handleBuyClick}
            />
          ))}
        </div>

        {/* Confirmation Modal */}
        {showConfirm && selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-up">
              <h2 className="text-2xl font-bold text-airtel-dark mb-4">Confirm Recharge</h2>
              
              <div className="bg-gradient-to-br from-airtel-light to-gray-100 rounded-lg p-6 mb-6">
                <p className="text-gray-600 mb-2">Plan:</p>
                <p className="text-2xl font-bold text-airtel-primary mb-4">
                  {selectedPlan.name} - ₹{selectedPlan.price}
                </p>
                
                <div className="space-y-2 text-sm text-gray-700">
                  <p>📱 Data: {selectedPlan.data}</p>
                  <p>☎️ Calls: {selectedPlan.calls}</p>
                  <p>💬 SMS: {selectedPlan.sms}</p>
                  <p>📅 Validity: {selectedPlan.validity}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPurchase}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-airtel-primary to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
