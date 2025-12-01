"use client";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type BeforeAfterImageProps = {
    beforeImage: React.ReactNode;
    afterImage: React.ReactNode;
    containerStyle?: string;
    SliderIcon?: React.ReactNode;
    SliderWrapperStyle?: string;
    SliderLineStyle?: string;
};

const BeforeAfterImage = ({
    beforeImage,
    afterImage,
    containerStyle,
    SliderIcon,
    SliderWrapperStyle,
    SliderLineStyle,
}: BeforeAfterImageProps) => {
    const divRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState(50); // Add a state variable
    // const positionRef = useRef(position); // Initialize the ref with the state variable

    // const [props, set] = useSpring(() => ({
    //   left: `50%`,
    //   config: { tension: 300, friction: 30 },
    // }));

    const updatePosition = (newPosition: number) => {
        if (newPosition < 0 || newPosition > 100) return; // Check if the new position is within the bounds
        // positionRef.current = newPosition; // Update the ref value
        setPosition(newPosition); // Update the state variable
        // set({ left: `${newPosition}%` }); // Update the spring animation
    };

    // const handleMouseMove = (event: any) => {
    //   const rect = event.currentTarget.getBoundingClientRect();
    //   const newPosition = ((event.clientX - rect.left) / rect.width) * 100;
    //   updatePosition(newPosition);
    // };

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const rect = divRef.current?.getBoundingClientRect();
            if (!rect) return;
            const newPosition = ((event.clientX - rect.left) / rect.width) * 100;
            updatePosition(newPosition);
        };

        const currentDiv = divRef.current;
        if (currentDiv) {
            currentDiv.addEventListener("mousemove", handleMouseMove);
        }
        return () => {
            if (currentDiv) {
                currentDiv.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, []);

    return (
        <div
            className={twMerge(
                "relative   flex-1 h-full rounded-xl flex cursor-ew-resize min-h-fit  select-none  overflow-hidden",
                containerStyle
            )}
            ref={divRef}
            // onMouseMove={handleMouseMove}
            onTouchMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();

                const newPosition =
                    ((event.touches[0].clientX - rect.left) / rect.width) * 100;

                updatePosition(newPosition);
            }}
        >
            <div className=" relative -z-10  h-full  w-full  opacity-0  object-contain">
                {afterImage}
            </div>
            <div className="absolute w-full inset-0 h-full  object-contain">
                {beforeImage}
            </div>

            <div
                className={"absolute bg-transparent w-full h-full  overflow-hidden"}
                style={{
                    transform: `translateX(${position}%)`,
                }}
            >
                <div
                    className="absolute  inset-0 w-full h-full object-contain  "
                    style={{
                        transform: `translateX(-${position}%)`,
                    }}
                >
                    {afterImage}
                </div>
            </div>

            <div
                className={twMerge(
                    "absolute top-0 h-full flex items-center justify-center w-[3px] opacity-85 bg-white",
                    SliderLineStyle
                )}
                style={{
                    left: position + "%",
                }}
            >
                <div
                    className={twMerge(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full flex items-center justify-center",
                        SliderWrapperStyle
                    )}
                >
                    {SliderIcon || (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 34 34"
                            className="opacity-85"
                            fill="none"
                        >
                            <circle cx="17" cy="17" r="17" fill="white" />
                            <path
                                d="M13.8998 12.7734L10.2114 16.4619C10.1308 16.5418 10.0668 16.6368 10.0232 16.7417C9.97951 16.8464 9.95703 16.9588 9.95703 17.0723C9.95703 17.1858 9.97951 17.2982 10.0232 17.4029C10.0668 17.5078 10.1308 17.6028 10.2114 17.6827L13.8998 21.3712"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20.2291 12.7734L23.9176 16.4619C23.9981 16.5418 24.0621 16.6368 24.1057 16.7417C24.1494 16.8464 24.1719 16.9588 24.1719 17.0723C24.1719 17.1858 24.1494 17.2982 24.1057 17.4029C24.0621 17.5078 23.9981 17.6028 23.9176 17.6827L20.2291 21.3712"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterImage;
