'use client'

interface PricingToggleProps {
    billingPeriod: 'monthly' | 'annually';
    setBillingPeriod: (period: 'monthly' | 'annually') => void;
}

export default function PricingToggle({ billingPeriod, setBillingPeriod }: PricingToggleProps) {
    return (
        <div className="relative h-12 bg-gray-100 rounded-lg p-1 flex items-center">
            {/* Selected Indicator - moves based on selection */}
            <div
                className={`absolute top-1 bottom-1 rounded-md bg-black shadow-sm transition-all duration-300 ease-in-out 
                    ${billingPeriod === 'monthly'
                        ? 'left-1 right-[calc(50%+0.25rem)]'
                        : 'left-[calc(50%+0.25rem)] right-1'
                    }`}
            />

            {/* Monthly Option */}
            <button
                onClick={() => setBillingPeriod('monthly')}
                className={`relative z-10 flex-1 h-full px-6 py-2 text-sm font-medium transition-colors duration-200 ${billingPeriod === 'monthly'
                        ? 'text-white'
                        : 'text-gray-500'
                    }`}
            >
                Monthly
            </button>

            {/* annually Option */}
            <button
                onClick={() => setBillingPeriod('annually')}
                className={`relative z-10 flex-1 h-full px-6 py-2 text-sm font-medium transition-colors duration-200 ${billingPeriod === 'annually'
                        ? 'text-white'
                        : 'text-black'
                    }`}
            >
                Annually
                <span
                    className="text-white ml-2 text-[12px] p-2 rounded-full"
                    style={{ backgroundColor: "#364050" }}
                > -20%</span>
            </button>
        </div>
    );
}

