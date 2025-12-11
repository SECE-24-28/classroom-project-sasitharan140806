import { Link } from 'react-router-dom'

const highlights = [
  {
    title: 'Fast & secure recharges',
    desc: 'Complete a recharge in under 30 seconds with secure payment options.',
  },
  {
    title: 'Smart recommendations',
    desc: 'Get plan suggestions tailored to your usage and budget.',
  },
  {
    title: 'Rewards & cashback',
    desc: 'Unlock offers, coupons, and loyalty points on every successful recharge.',
  },
]

const LandingPage = () => (
  <div className="bg-gradient-to-b from-white to-airtel-light">
    <section className="container-page py-12 grid gap-10 lg:grid-cols-2 items-center">
      <div className="space-y-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white shadow-soft text-sm font-semibold text-airtel-primary">
          Airtel Recharge Portal
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-airtel-dark leading-tight">
          Recharge faster. Earn rewards. Stay connected.
        </h1>
        <p className="text-lg text-gray-600 max-w-xl">
          Discover curated prepaid plans, seamless payments, and a personalized dashboard to keep your number active and your benefits tracked.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/plans"
            className="px-6 py-3 rounded-xl bg-airtel-primary text-white font-semibold shadow-lg hover:bg-red-700 transition"
          >
            View Recharge Plans
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 rounded-xl bg-white text-airtel-primary font-semibold shadow-soft hover:-translate-y-0.5 transition"
          >
            Create Account
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {highlights.map((item) => (
            <div key={item.title} className="bg-white p-4 rounded-2xl shadow-soft">
              <h3 className="font-bold text-airtel-dark">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-red-100 blur-3xl rounded-full" aria-hidden />
        <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-red-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Primary number</p>
              <p className="text-2xl font-bold text-airtel-dark">+91 98765 43210</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Active</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-xl bg-airtel-light text-airtel-dark">
              <p className="text-gray-600">Data</p>
              <p className="text-lg font-bold">1.5 GB/day</p>
            </div>
            <div className="p-3 rounded-xl bg-airtel-light text-airtel-dark">
              <p className="text-gray-600">Voice</p>
              <p className="text-lg font-bold">Unlimited</p>
            </div>
            <div className="p-3 rounded-xl bg-airtel-light text-airtel-dark">
              <p className="text-gray-600">SMS</p>
              <p className="text-lg font-bold">100/day</p>
            </div>
            <div className="p-3 rounded-xl bg-airtel-light text-airtel-dark">
              <p className="text-gray-600">Validity</p>
              <p className="text-lg font-bold">28 days</p>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="flex-1 bg-airtel-primary text-white font-semibold py-3 rounded-xl hover:bg-red-700 transition">
              Recharge Now
            </button>
            <button className="flex-1 bg-white text-airtel-primary font-semibold py-3 rounded-xl shadow-soft hover:-translate-y-0.5 transition">
              View History
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
)

export default LandingPage
