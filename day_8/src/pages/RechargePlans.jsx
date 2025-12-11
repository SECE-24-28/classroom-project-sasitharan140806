import { useMemo, useState } from 'react'
import { PlanCard } from '../components/PlanCard.jsx'
import { Sidebar } from '../components/Sidebar.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const plansData = [
  {
    name: 'Unlimited 719',
    price: 719,
    validity: '84 days',
    type: 'Unlimited + Data',
    benefits: ['1.5 GB/day', 'Unlimited calls', '100 SMS/day', 'Airtel Xstream Play'],
    popular: true,
  },
  {
    name: 'Data Booster 181',
    price: 181,
    validity: '30 days',
    type: 'Data Add-on',
    benefits: ['1 GB/day extra', 'Works with active base plan'],
  },
  {
    name: 'OTT Combo 399',
    price: 399,
    validity: '28 days',
    type: 'Unlimited + OTT',
    benefits: ['2.5 GB/day', 'Unlimited calls', '100 SMS/day', 'Disney+ Hotstar Mobile'],
    popular: true,
  },
  {
    name: 'Value 179',
    price: 179,
    validity: '28 days',
    type: 'Unlimited',
    benefits: ['2 GB total data', 'Unlimited calls', '300 SMS'],
  },
  {
    name: 'Annual 2999',
    price: 2999,
    validity: '365 days',
    type: 'Unlimited',
    benefits: ['2 GB/day', 'Unlimited calls', '100 SMS/day', 'Apollo 24/7, Wynk Premium'],
  },
  {
    name: 'Student Saver 155',
    price: 155,
    validity: '24 days',
    type: 'Budget',
    benefits: ['1 GB total data', 'Unlimited calls', '300 SMS'],
  },
]

const categories = ['All', 'Unlimited', 'Data Add-on', 'Budget', 'Unlimited + OTT']

const RechargePlans = () => {
  const { isLoggedIn } = useAuth()
  const [category, setCategory] = useState('All')
  const filtered = useMemo(() => (
    category === 'All'
      ? plansData
      : plansData.filter((p) => p.type.toLowerCase().includes(category.toLowerCase()))
  ), [category])

  const handleSelect = (plan) => {
    const message = isLoggedIn
      ? `Proceeding to recharge with ${plan.name}`
      : 'Please login or sign up to continue with recharge.'
    alert(message)
  }

  return (
    <div className="bg-airtel-light min-h-[70vh]">
      <div className="container-page py-10 grid gap-8 lg:grid-cols-[3fr_1fr] items-start">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm text-gray-600">Choose a plan that fits you</p>
              <h1 className="text-3xl font-bold text-airtel-dark">Recharge Plans</h1>
            </div>
            <div className="flex gap-2 bg-white p-1 rounded-xl shadow-soft">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                    category === cat
                      ? 'bg-airtel-primary text-white'
                      : 'text-airtel-dark hover:bg-airtel-light'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((plan) => (
              <PlanCard key={plan.name} plan={plan} onSelect={handleSelect} />
            ))}
          </div>
        </div>

        <Sidebar />
      </div>
    </div>
  )
}

export default RechargePlans
