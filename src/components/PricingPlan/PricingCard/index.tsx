import { Plan } from "@/types";
import { Button } from "@/components/ui/button";
import { CoinIcon } from "@/components/Icons";
import { FeatureStarIcon } from "@/components/Icons";

interface PricingCardProps {
    plan: Plan;
}

export default function PricingCard({ plan }: PricingCardProps) {
    return (
        <div className="p-7 bg-gray-100 rounded-lg flex flex-col gap-4">
            {/* Section 1: Title and Description */}
            <div className="flex flex-col justify-center gap-2">
                <h2 className="text-2xl md:text-2xl lg:text-3xl text-semibold">{plan.name}</h2>
                <p className="text-gray-500">{plan.description}</p>
            </div>

            {/* Section 2: Price */}
            <div className="flex items-center gap-2">
                <div className="text-5xl font-semibold">${plan.price}</div>
                <div className="text-gray-500 text-sm translate-y-2">{plan.duration === 'monthly' ? '/ month' : '/ year'}</div>
            </div>

            {/* Section 3: Buttons */}
            <div className="flex flex-col w-full items-center gap-2">
                <Button variant='outline' className='py-4 w-full h-12 group has-[>svg]:px-6! '><CoinIcon /> {plan.credits} CREDITS FOR THIS PLAN</Button>
                <Button variant='dark' className='py-4 w-full h-12 group has-[>svg]:px-6!'> Get 14 Days Free Trial </Button>
            </div>

            {/* Section 4: Features */}
            <div className="flex flex-col gap-2">
                <div className=" font-semibold text-sm">Our {plan.name} plan includes</div>
                <div className="flex flex-col  gap-2">
                    {plan.features.map((feature) => (
                        <div key={feature} className="text-gray-600 text-sm flex gap-2"><FeatureStarIcon /> {feature}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}