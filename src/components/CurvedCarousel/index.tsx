'use client'

import { useState } from "react";
import { CURVED_CAROUSEL_IMAGES } from "@/constants/dashboard.constants";

const IMAGE_WIDTH = 200;
const OVERLAP_PERCENT = 0.2; // 20% overlap

export default function CurvedCarousel() {
    // Track which image is currently being hovered for individual hover effects
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Calculate rotation angle for each image based on its position
    // Center image (index 3) has 0 rotation, edges have maximum rotation
    // This creates the fanned-out curved effect where images rotate away from center
    // Increased maxRotation for more pronounced curved arc effect
    const calculateRotation = (index: number, total: number): number => {
        const centerIndex = Math.floor(total / 2);
        const distanceFromCenter = index - centerIndex;
        // Maximum rotation angle in degrees - increased for more pronounced curve
        const maxRotation = 25;
        // Calculate rotation: center = 0, edges = ±maxRotation
        // Avoid division by zero if centerIndex is 0
        if (centerIndex === 0) return 0;
        return (distanceFromCenter / centerIndex) * maxRotation;
    };

    // Calculate left position for overlapping effect
    // Each image overlaps the previous by 20% of its width (40px for 200px images)
    // This creates a perfect stacked card effect where each right image overlaps 20% of the left image
    const calculateLeftPosition = (index: number): number => {
        // Each image starts at index * (imageWidth - overlapAmount)
        const overlapAmount = IMAGE_WIDTH * OVERLAP_PERCENT; // 40px
        return index * (IMAGE_WIDTH - overlapAmount);
    };

    // Calculate top position to create a curved arc from the top
    // Uses a circular arc: y = radius - sqrt(radius^2 - x^2)
    const calculateTopPosition = (index: number, total: number): number => {
        const centerIndex = Math.floor(total / 2);
        const distanceFromCenter = index - centerIndex;
        const overlapAmount = IMAGE_WIDTH * OVERLAP_PERCENT; // 40px
        const horizontalSpacing = IMAGE_WIDTH - overlapAmount; // effective spacing between card centers
        const arcRadius = 2000; // larger radius -> flatter curve
        const x = distanceFromCenter * horizontalSpacing;
        const radiusSquared = arcRadius * arcRadius;
        const inner = Math.max(radiusSquared - x * x, 0);
        const y = arcRadius - Math.sqrt(inner);
        return y;
    };

    return (
        <div className="flex flex-col items-center gap-10 justify-center mt-15 px-4 w-full">
            {/* Curved Carousel Container */}
            <div className="curved-carousel w-full flex justify-center items-center py-20">
                <div className="curved-carousel-wrapper relative">
                    {CURVED_CAROUSEL_IMAGES.map((image, index) => {
                        const totalCards = CURVED_CAROUSEL_IMAGES.length;
                        const rotation = calculateRotation(index, totalCards);
                        const isHovered = hoveredIndex === index;
                        const leftPosition = calculateLeftPosition(index);
                        const topPosition = calculateTopPosition(index, totalCards);
                        // Z-index increases with index so right images appear on top of left images
                        const baseZIndex = index + 1;

                        return (
                            <div
                                key={index}
                                className="curved-carousel-item absolute"
                                style={{
                                    left: `${leftPosition}px`,
                                    top: `${topPosition}px`,
                                    transform: isHovered
                                        ? `rotate(0deg) scale(1.3) translateY(-40px) translateZ(50px)`
                                        : `rotate(${rotation}deg) scale(1) translateY(0) translateZ(0)`,
                                    zIndex: isHovered ? 100 : baseZIndex,
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="curved-carousel-image-container">
                                    <img
                                        src={image.imageUrl}
                                        alt={`Carousel image ${index + 1}`}
                                        className="curved-carousel-image"
                                        width={200}
                                        height={200}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}