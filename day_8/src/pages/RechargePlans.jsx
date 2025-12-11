import { useMemo, useState } from 'react'
import { PlanCard } from '../components/PlanCard.jsx'
import { PlanDetailsModal } from '../components/PlanDetailsModal.jsx'
import { Sidebar } from '../components/Sidebar.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { Link } from 'react-router-dom'

const plansData = [
  {
    name: 'Unlimited 719',
    price: 719,
    originalPrice: 799,
    validity: '84 days',
    type: 'Unlimited + Data',
    benefits: ['1.5 GB/day', 'Unlimited calls', '100 SMS/day', 'Airtel Xstream Play'],
    popular: true,
    discount: '10% OFF',
    badge: '⭐ Best Seller',
  },
  {
    name: 'Data Booster 181',
    price: 181,
    originalPrice: 199,
    validity: '30 days',
    type: 'Data Add-on',
    benefits: ['1 GB/day extra', 'Works with active base plan', 'No expiry within 30 days'],
    discount: '9% OFF',
  },
  {
    name: 'OTT Combo 399',
    price: 399,
    originalPrice: 449,
    validity: '28 days',
    type: 'Unlimited + OTT',
    benefits: ['2.5 GB/day', 'Unlimited calls', '100 SMS/day', 'Disney+ Hotstar Mobile'],
    popular: true,
    discount: '11% OFF',
    badge: '🎬 OTT Special',
  },
  {
    name: 'Value 179',
    price: 179,
    originalPrice: 199,
    validity: '28 days',
    type: 'Unlimited',
    benefits: ['2 GB total data', 'Unlimited calls', '300 SMS'],
    discount: '10% OFF',
  },
  {
    name: 'Annual 2999',
    price: 2999,
    originalPrice: 3499,
    validity: '365 days',
    type: 'Unlimited',
    benefits: ['2 GB/day', 'Unlimited calls', '100 SMS/day', 'Apollo 24/7, Wynk Premium'],
    discount: '14% OFF',
    badge: '💰 Best Value',
  },
  {
    name: 'Student Saver 155',
    price: 155,
    originalPrice: 199,
    validity: '24 days',
    type: 'Budget',
    benefits: ['1 GB total data', 'Unlimited calls', '300 SMS'],
    discount: '22% OFF',
    badge: '🎓 Student Plan',
  },
]

const categories = ['All', 'Unlimited', 'Data Add-on', 'Budget', 'Unlimited + OTT']

const RechargePlans = () => {
  const { isLoggedIn } = useAuth()
  const [category, setCategory] = useState('All')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const filtered = useMemo(() => (
    category === 'All'
      ? plansData
      : plansData.filter((p) => p.type.toLowerCase().includes(category.toLowerCase()))
  ), [category])

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
  }

  return (
    <div className="bg-airtel-light min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-airtel-primary to-red-700 text-white py-8">
        <div className="container-page">
          <h1 className="text-4xl font-bold mb-2">Recharge Plans</h1>
          <p className="text-white/90">Find the perfect plan for your needs. All plans include 5G support.</p>
        </div>
      </section>

      {/* Discount Banners */}
      <section className="container-page py-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm font-semibold text-white/80 mb-1">🎉 Limited Time Offer</p>
            <h3 className="text-2xl font-bold mb-2">20% Extra Data</h3>
            <p className="text-sm text-white/90">On all plans above ₹299</p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm font-semibold text-white/80 mb-1">💳 Cashback Available</p>
            <h3 className="text-2xl font-bold mb-2">Get ₹100 Back</h3>
            <p className="text-sm text-white/90">With UPI & Debit Card payments</p>
          </div>
        </div>
      </section>

      <div className="container-page py-8 grid gap-8 lg:grid-cols-[3fr_1fr] items-start">
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex items-center justify-between gap-4 flex-wrap bg-white p-4 rounded-2xl shadow-soft">
            <div>
              <p className="text-sm text-gray-600">Choose a plan that fits you</p>
              <h2 className="text-2xl font-bold text-airtel-dark">All Plans</h2>
            </div>
            <div className="flex gap-2 bg-airtel-light p-1 rounded-xl flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                    category === cat
                      ? 'bg-airtel-primary text-white'
                      : 'text-airtel-dark hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((plan) => (
              <div key={plan.name} onClick={() => handleSelectPlan(plan)} className="cursor-pointer">
                <PlanCard plan={plan} onSelect={() => handleSelectPlan(plan)} />
              </div>
            ))}
          </div>

          {/* Modal for Plan Details */}
          {selectedPlan && (
            <PlanDetailsModal
              plan={selectedPlan}
              onClose={() => setSelectedPlan(null)}
              isLoggedIn={isLoggedIn}
            />
          )}

          {/* CTA to Payment */}
          {isLoggedIn && (
            <div className="bg-gradient-to-r from-airtel-primary to-red-700 rounded-2xl p-6 text-white text-center">
              <h3 className="text-2xl font-bold mb-2">Ready to recharge?</h3>
              <Link
                to="/payment"
                className="inline-block px-6 py-3 rounded-xl bg-white text-airtel-primary font-bold hover:bg-gray-100 transition"
              >
                Go to Payment
              </Link>
            </div>
          )}
        </div>

        <Sidebar />
      </div>
    </div>
  )
}

export default RechargePlans
