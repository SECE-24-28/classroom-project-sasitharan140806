import { useAppContext } from '../context/useAppContext';
import { useState } from 'react';

export const CartPage = () => {
  const { cart, removeFromCart, clearCart, user } = useAppContext();
  const [showCheckout, setShowCheckout] = useState(false);

  const totalAmount = cart.reduce((sum, plan) => sum + plan.price, 0);
  const discount = Math.floor(totalAmount * 0.05); // 5% discount
  const finalAmount = totalAmount - discount;

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePayment = () => {
    alert(`Payment of ₹${finalAmount} processed successfully! Your recharges will be applied shortly.`);
    clearCart();
    setShowCheckout(false);
  };

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-airtel-light to-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-airtel-dark mb-4">Please Login First</h1>
          <p className="text-gray-600">Login to view your cart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-airtel-light to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-airtel-dark">Your Cart</h1>
          <p className="text-gray-600 mt-2">
            {cart.length} {cart.length === 1 ? 'plan' : 'plans'} selected
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-airtel-dark mb-2">Your cart is empty</h2>
                <p className="text-gray-600">Start recharging to add plans to your cart!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((plan, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 animate-slide-up"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-airtel-dark">
                          {plan.name} Plan
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                          <p>📱 {plan.data}</p>
                          <p>☎️ {plan.calls}</p>
                          <p>💬 {plan.sms}</p>
                          <p>📅 {plan.validity}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-3xl font-bold text-airtel-primary mb-4">
                          ₹{plan.price}
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-20 animate-fade-in">
              <h2 className="text-2xl font-bold text-airtel-dark mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b-2 border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{totalAmount}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (5%)</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-2xl font-bold text-airtel-dark">
                  <span>Total</span>
                  <span>₹{finalAmount}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  For: <span className="font-semibold">{user.name}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Phone: <span className="font-semibold">{user.phone}</span>
                </p>
              </div>

              {cart.length > 0 && (
                <>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-airtel-primary to-red-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition mb-3"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => clearCart()}
                    className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
                  >
                    Clear Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-up">
              <h2 className="text-2xl font-bold text-airtel-dark mb-6">Payment Details</h2>

              <div className="bg-gradient-to-br from-airtel-light to-gray-100 rounded-lg p-6 mb-6">
                <p className="text-gray-600 mb-2">Amount to Pay</p>
                <p className="text-4xl font-bold text-airtel-primary">₹{finalAmount}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-airtel-primary transition cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                  <label className="flex-1 cursor-pointer">Credit/Debit Card</label>
                </div>
                <div className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-airtel-primary transition cursor-pointer">
                  <input type="radio" name="payment" className="w-4 h-4" />
                  <label className="flex-1 cursor-pointer">UPI</label>
                </div>
                <div className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-airtel-primary transition cursor-pointer">
                  <input type="radio" name="payment" className="w-4 h-4" />
                  <label className="flex-1 cursor-pointer">Net Banking</label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-airtel-primary to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
