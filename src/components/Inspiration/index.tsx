import { DASHBOARD_INSPIRATION_LINE_1, DASHBOARD_INSPIRATION_LINE_2 } from "@/constants/dashboard.constants";
import TextSeparator from "../TextSeparator";

export default function Inspiration() {
    // Duplicate arrays to create seamless infinite scroll effect
    // Each carousel needs duplicate content to loop seamlessly - when animation completes 50%,
    // it resets to 0% creating the illusion of infinite scrolling
    const duplicatedLine1 = [...DASHBOARD_INSPIRATION_LINE_1, ...DASHBOARD_INSPIRATION_LINE_1, ...DASHBOARD_INSPIRATION_LINE_1, ...DASHBOARD_INSPIRATION_LINE_1];
    const duplicatedLine2 = [...DASHBOARD_INSPIRATION_LINE_2, ...DASHBOARD_INSPIRATION_LINE_2];

    return (
        <div className="flex flex-col items-center gap-10 justify-center mt-15 px-4">
            <TextSeparator textSeparatorText="Inspiration" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                Created with DreamShot
            </h1>

            {/* Line 1 - Linear Infinite Carousel (moves from right to left) */}
            <div className="carousel-track animate gap-3 md:gap-6 select-none">
                {duplicatedLine1.map((inspiration, idx) => (
                    <div
                        key={`line1-${idx}`}
                        className="w-[200px] h-[200px] shrink-0 rounded-lg overflow-hidden"
                        aria-hidden={idx >= (duplicatedLine1.length / 2) ? "true" : "false"}
                    >
                        <img
                            src={inspiration.imageUrl}
                            alt={`Inspiration ${idx + 1}`}
                            className="w-full h-full object-cover"
                            width={200}
                            height={200}
                            loading="lazy"
                        />
                    </div>
                ))}
                {duplicatedLine1.map((inspiration, idx) => (
                    <div
                        key={`line1-${idx}`}
                        className="w-[200px] h-[200px] shrink-0 rounded-lg overflow-hidden"
                        aria-hidden={idx >= (duplicatedLine1.length / 2) ? "true" : "false"}
                    >
                        <img
                            src={inspiration.imageUrl}
                            alt={`Inspiration ${idx + 1}`}
                            className="w-full h-full object-cover"
                            width={200}
                            height={200}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
            {/* Line 2 - Reverse Linear Infinite Carousel (moves from left to right) */}
            <div className="relative w-full overflow-hidden">
                <div className="flex gap-4 animate-[slide-right_20s_linear_infinite]">
                    {duplicatedLine2.map((inspiration, idx) => (
                        <div
                            key={`line2-${idx}`}
                            className="w-[200px] h-[200px] shrink-0 rounded-lg overflow-hidden"
                            aria-hidden={idx >= (duplicatedLine2.length / 2) ? "true" : "false"}
                        >
                            <img
                                src={inspiration.imageUrl}
                                alt={`Inspiration ${idx + 1}`}
                                className="w-full h-full object-cover"
                                width={200}
                                height={200}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}