import OurFeatureCard from "./OurFeatureCard";
import TextSeparator from "../TextSeparator";
import { DASHBOARD_OUR_FEATURES } from "@/constants/dashboard.constants";

export default function OurFeatures() {
    return (
        <div className="flex flex-col items-center gap-10 justify-center px-4">
            <TextSeparator textSeparatorText="Our Features" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">
                What Makes Us Magical
            </h1>

            {/* Feature cards container */}
            <div className="flex flex-col gap-12 md:gap-16 w-full max-w-6xl">
                {DASHBOARD_OUR_FEATURES.map((feature, index) => (
                    <OurFeatureCard index={index} key={index} feature={feature} />
                ))}
            </div>
        </div>
    )
}