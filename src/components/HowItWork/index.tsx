'use client';

import TextSeparator from "../TextSeparator";
import HowItWorkCard from "./HowItWorkCard";
import { useToolConfig } from "@/hooks/useToolConfig";
import { STATIC_HOW_IT_WORKS } from "@/constants/static.content.constants";

/**
 * HowItWork component that displays step-by-step instructions
 * Uses tool config from context if on dynamic tool page, otherwise uses static constants
 */
export default function HowItWork() {
    const toolConfig = useToolConfig();

    // If on tool page but no howItWorks data, don't render
    if (toolConfig && !toolConfig.howItWorks) {
        return null;
    }

    // Use dynamic data from tool config if available, otherwise use static data
    const howItWorks = toolConfig?.howItWorks || STATIC_HOW_IT_WORKS;

    return (
        <div className="flex flex-col items-center gap-10 justify-center mt-15 px-4">
            <TextSeparator textSeparatorText="How It Work" />

            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                {('title' in howItWorks && howItWorks.title)
                    ? (howItWorks.title as string).split('\n').map((line: string, index: number, arr: string[]) => (
                        <span key={index}>
                            {line}
                            {index < arr.length - 1 && <br />}
                        </span>
                    ))
                    : howItWorks.heading
                }
            </h1>

            {howItWorks.description && (
                <p className="text-gray-500 text-center max-w-2xl">
                    {howItWorks.description}
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-5xl">
                {howItWorks.steps.map((step) => (
                    <HowItWorkCard
                        key={step.step}
                        step={step.step}
                        title={step.title}
                        bulletPoints={step.bulletPoints}
                    />
                ))}
            </div>
        </div>
    );
}