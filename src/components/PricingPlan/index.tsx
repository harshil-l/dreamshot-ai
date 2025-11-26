import PricingToggle from "./PricingToggle";
import { useState, useMemo } from "react";
import PricingCard from "./PricingCard";
import { PRICING_PLANS } from "@/constants/pricing.constants";


export default function PricingPlan() {

    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');

    // Filter plans based on selected billing period
    const filteredPlans = useMemo(() => {
        return PRICING_PLANS.filter(plan => plan.duration === billingPeriod);
    }, [billingPeriod]);

    return (
        <div className="flex flex-col mb-15 items-center gap-10 justify-center" style={{
            backgroundImage: 'url(/assets/cloud-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>

            {/* Title and Description */}
            <div className="flex flex-col text-center items-center gap-10 justify-center mt-15 px-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold px-4">
                    Pricing
                </h1>
                <p className=" text-gray-500 max-w-xl">Upgrade to unlock exclusive features, faster results, and limitless transformations. Flexible pricing plans designed to give you maximum value.</p>
            </div>

            <div className="w-full max-w-sm mx-auto px-4">
                <PricingToggle
                    billingPeriod={billingPeriod}
                    setBillingPeriod={setBillingPeriod}
                />
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-4">
                {filteredPlans.map((plan, index) => (
                    <PricingCard key={`${plan.name}-${plan.duration}-${index}`} plan={plan} />
                ))}
            </div>
        </div>
    )
}