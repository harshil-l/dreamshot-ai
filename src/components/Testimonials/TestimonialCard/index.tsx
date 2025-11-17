import { DashboardTestimonial } from "@/types";

interface TestimonialCardProps {
    testimonial: DashboardTestimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
    return (
        <div className="w-full max-w-md bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-md">
            {/* Top section: avatar + name + role */}
            <div className="flex items-center gap-4">
                <img src={testimonial.imageUrl} 
                    alt={testimonial.title}
                    className="w-10 h-10 rounded-lg"
                />
                <div>
                    <h3 className="text-lg font-semibold">{testimonial.title}</h3>
                    <p className="text-sm text-gray-500">{testimonial.subTitle}</p>
                </div>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200"></div>

            {/* Testimonial text */}
            <p className="text-sm text-gray-500">{testimonial.description}</p>
        </div>
    )
}
