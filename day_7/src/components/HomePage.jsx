import { useAppContext } from '../context/useAppContext';

export const HomePage = () => {
  const { user } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-b from-airtel-primary via-red-100 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Unlimited <br />
              Recharge, <br />
              <span className="text-yellow-300">Maximum</span> Savings
            </h1>
            <p className="text-xl text-red-100 mb-8 max-w-2xl">
              Recharge your Airtel mobile instantly with our fastest and most secure platform.
              Choose from 100+ plans and enjoy unbeatable offers.
            </p>
            
            {user.isLoggedIn ? (
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-white text-airtel-primary font-bold rounded-lg hover:shadow-xl hover:scale-105 transition">
                  Start Recharging
                </button>
                <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-airtel-primary transition">
                  View My Plans
                </button>
              </div>
            ) : (
              <button className="px-8 py-4 bg-yellow-400 text-airtel-dark font-bold rounded-lg hover:bg-yellow-300 hover:shadow-xl transition">
                Login to Recharge Now
              </button>
            )}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-300 opacity-5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-airtel-dark mb-12">
            Why Choose Airtel Recharge?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Instant Recharge',
                desc: 'Get recharged instantly, no waiting time',
              },
              {
                icon: '🛡️',
                title: '100% Secure',
                desc: 'Your payments are encrypted and safe',
              },
              {
                icon: '💰',
                title: 'Best Offers',
                desc: 'Get exclusive deals and cashback offers',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 bg-gradient-to-br from-airtel-light to-gray-100 rounded-xl hover:shadow-lg hover:scale-105 transition"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-airtel-dark mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Operators */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-airtel-dark mb-12">
            Support for All Operators
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Airtel', 'Jio', 'VI', 'BSNL'].map((operator) => (
              <div
                key={operator}
                className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition text-center"
              >
                <div className="text-4xl mb-3">📱</div>
                <h3 className="font-bold text-airtel-dark">{operator}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-airtel-primary to-red-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Recharge?</h2>
          <p className="text-red-100 text-lg mb-8">
            {user.isLoggedIn
              ? `Welcome ${user.name}! Start recharging your mobile now.`
              : 'Login now to access exclusive recharge offers and save more!'}
          </p>
          <button className="px-10 py-4 bg-white text-airtel-primary font-bold rounded-lg text-lg hover:shadow-xl hover:scale-105 transition">
            {user.isLoggedIn ? 'Go to Recharge' : 'Login Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
