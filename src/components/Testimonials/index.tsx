import TextSeparator from "../TextSeparator";
import TestimonialCard from "./TestimonialCard";
import { DASHBOARD_TESTIMONIALS } from "@/constants/dashboard.constants";

export default function Testimonials() {
    return (
        <div className="flex flex-col items-center gap-10 justify-center mt-15 px-4">
            <TextSeparator textSeparatorText="Testimonials" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                What our customers say about<br />
                using DreamShot
            </h1>

            {/* <TestimonialCard testimonial={DASHBOARD_TESTIMONIALS[0]} /> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center w-full max-w-6xl">
                {DASHBOARD_TESTIMONIALS.map((testimonial, index) => (
                    <TestimonialCard key={index} testimonial={testimonial} />
                ))}
            </div>
        </div>
    )
}