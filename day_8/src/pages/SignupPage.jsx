import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const SignupPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirm) {
      setError('Please fill in all fields.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setError('')
    login({ name, email })
    navigate('/plans')
  }

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="container-page py-12 grid gap-10 lg:grid-cols-[2fr_1fr] items-start">
        <div className="max-w-xl mx-auto w-full">
          <h1 className="text-3xl font-bold text-airtel-dark mb-2">Create your account</h1>
          <p className="text-gray-600 mb-6">Sign up to manage numbers, view history, and access exclusive offers.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-airtel-primary"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-airtel-primary"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-airtel-primary"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-airtel-primary"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full bg-airtel-primary text-white font-semibold py-3 rounded-xl hover:bg-red-700 transition shadow-lg"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-airtel-primary font-semibold">Login</Link>
          </p>
        </div>

        <div className="bg-airtel-light rounded-3xl p-6 shadow-soft border border-red-50 text-sm text-airtel-dark">
          <h2 className="font-bold text-lg mb-2">Perks you get</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Personalized plan alerts</li>
            <li>• Priority customer support</li>
            <li>• Early access to promotional offers</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
