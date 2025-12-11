export const Footer = () => (
  <footer className="bg-airtel-dark text-gray-200 mt-12">
    <div className="container-page py-10 grid gap-8 md:grid-cols-3">
      <div>
        <h3 className="text-lg font-bold text-white mb-2">Airtel Recharge</h3>
        <p className="text-sm text-gray-400">Fast, secure, and rewarding recharges for everyone.</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white mb-2">Quick Links</h4>
        <ul className="space-y-1 text-sm text-gray-300">
          <li>Home</li>
          <li>Recharge Plans</li>
          <li>Login</li>
          <li>Signup</li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white mb-2">Support</h4>
        <p className="text-sm text-gray-300">Call 121 or email support@airtelrecharge.com</p>
      </div>
    </div>
    <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
      © 2025 Airtel Recharge. All rights reserved.
    </div>
  </footer>
)
