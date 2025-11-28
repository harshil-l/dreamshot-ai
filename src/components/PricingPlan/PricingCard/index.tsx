import { Plan } from "@/types";
import { CoinIcon } from "@/components/Icons";
import { FeatureStarIcon } from "@/components/Icons";
import { PlanActionButton } from "../PlanActionButton";
import { formatBillingPeriod } from "@/utils/formatPricing";
import { STATIC_FEATURES } from "@/constants/static.content.constants";

/**
 * PricingCard Component
 * Displays a single pricing plan card with plan details and checkout button
 * 
 * @param plan - Plan object containing all plan information including Stripe IDs
 */
export default function PricingCard({ plan }: { plan: Plan }) {
    return (
        <div className="p-7 mb-10 bg-white/50 border rounded-lg flex flex-col gap-4 relative" style={{ borderColor: "#E4E8EF" }}>
            {/* Credits badge - top right */}
            <div className="absolute top-4 right-4 flex items-center gap-1 text-sm font-medium text-gray-600">
                <CoinIcon />
                <span>{plan.credits}</span>
            </div>

            {/* Section 1: Title and Description */}
            <div className="flex flex-col justify-center gap-2">
                <h2 className="text-2xl md:text-2xl lg:text-3xl text-semibold">{plan.name}</h2>
                <p className="text-gray-500">{plan.description}</p>
            </div>

            {/* Section 2: Price */}
            <div className="flex items-center gap-2">
                <div className="text-5xl font-semibold">${plan.price}</div>
                <div className="text-gray-500 text-sm translate-y-2">{formatBillingPeriod(plan.duration)}</div>
            </div>

            {/* Section 3: Checkout Button */}
            <div className="flex flex-col w-full items-center gap-2">
                {/* Checkout button - triggers Stripe checkout */}
                <PlanActionButton
                    priceId={plan.priceId}
                    planId={plan.id}
                    planName={plan.name}
                    billingPeriod={plan.duration}
                    price={plan.price}
                    buttonText="Get Started"
                    variant="dark"
                />
            </div>

            {/* Section 4: Features */}
            <div className="flex flex-col gap-2">
                <div className=" font-semibold text-sm">Our {plan.name} plan includes</div>
                <div className="flex flex-col  gap-2">
                    {STATIC_FEATURES.map((feature) => (
                        <div key={feature} className="text-gray-600 text-sm flex gap-2"><FeatureStarIcon /> {feature}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}