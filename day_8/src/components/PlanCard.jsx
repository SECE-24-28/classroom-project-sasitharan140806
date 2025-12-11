export const PlanCard = ({ plan, onSelect }) => (
  <div className="bg-white rounded-2xl shadow-soft p-5 flex flex-col gap-3 border border-gray-100 hover:-translate-y-1 transition-transform">
    {plan.popular && (
      <span className="self-start text-xs font-semibold bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
        Popular
      </span>
    )}
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold text-airtel-dark">{plan.name}</h3>
        <p className="text-sm text-gray-500">{plan.validity} validity</p>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-airtel-primary">₹{plan.price}</p>
        <p className="text-xs text-gray-500">{plan.type}</p>
      </div>
    </div>
    <ul className="text-sm text-gray-600 space-y-1">
      {plan.benefits?.map((item, idx) => (
        <li key={idx}>• {item}</li>
      ))}
    </ul>
    {onSelect && (
      <button
        onClick={() => onSelect(plan)}
        className="mt-auto w-full bg-airtel-primary text-white font-semibold py-2.5 rounded-lg hover:bg-red-700 transition"
      >
        Select Plan
      </button>
    )}
  </div>
)
