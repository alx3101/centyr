import Link from 'next/link'

export default function Pricing() {
  const plans = [
    {
      name: 'FREE',
      price: '$0',
      period: '/month',
      features: [
        '10 images/month',
        'Basic alignment',
        'Standard templates',
        'Community support',
      ],
      cta: 'Start Free',
      highlighted: false,
      badge: null,
    },
    {
      name: 'BASIC',
      price: '$19',
      period: '/month',
      features: [
        '100 images/month',
        'All features',
        'Priority queue',
        'Email support',
      ],
      cta: 'Start 14-Day Trial',
      highlighted: true,
      badge: '⭐ Most Popular',
    },
    {
      name: 'GROWTH',
      price: '$39',
      period: '/month',
      features: [
        '500 images/month',
        'Auto-sync',
        'Bulk processing',
        'Custom templates',
        'Priority support',
      ],
      cta: 'Start 14-Day Trial',
      highlighted: false,
      badge: null,
    },
    {
      name: 'SCALE',
      price: '$99',
      period: '/month',
      features: [
        'Unlimited images',
        'API access',
        'White-label option',
        'Dedicated support',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      highlighted: false,
      badge: null,
    },
  ]

  return (
    <section id="pricing" className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-fuchsia-200 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            Start free. Upgrade when you need more. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 relative transform hover:scale-105 transition-all duration-300 animate-fade-in-up ${
                plan.highlighted
                  ? 'gradient-animated text-white ring-4 ring-fuchsia-400 ring-offset-4 shadow-2xl glow-purple-strong'
                  : 'bg-white/80 backdrop-blur-sm border-2 border-purple-200 hover:border-fuchsia-400'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#F59E0B] text-white px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap animate-bounce-slow">
                  {plan.badge}
                </div>
              )}
              <h3 className={`text-sm font-bold mb-3 ${plan.highlighted ? 'text-purple-100' : 'text-gray-600'}`}>
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                <span className={plan.highlighted ? 'text-purple-100' : 'text-gray-600'}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm animate-fade-in" style={{ animationDelay: `${(index * 0.1) + (idx * 0.05)}s` }}>
                    <span className={`mr-2 flex-shrink-0 ${plan.highlighted ? 'text-white' : 'text-[#10B981]'}`}>
                      ✓
                    </span>
                    <span className={plan.highlighted ? 'text-purple-50' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.cta === 'Contact Sales' ? '#contact' : '/upload'}
                className={`block w-full text-center px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 ${
                  plan.highlighted
                    ? 'bg-white text-primary-600 hover:shadow-xl'
                    : 'gradient-purple-fuchsia text-white hover:glow-purple'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Money-Back Guarantee */}
        <div className="text-center bg-white/80 backdrop-blur-sm border-2 border-secondary rounded-2xl p-6 max-w-2xl mx-auto hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl animate-bounce-slow">💰</span>
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-lg">30-Day Money-Back Guarantee</h3>
              <p className="text-gray-600">Not happy? Get a full refund, no questions asked.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
