'use client'
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface SingleFaqProps {
    answer: string;
    question: string;
    value: string;
}

export const SingleFaq = ({ answer, question, value }: SingleFaqProps) => {
    return (
        <>
            <AccordionItem value={value} className="w-full">
                <AccordionTrigger className="text-base hover:cursor-pointer font-medium text-headerBG tracking-tight w-full">
                    {question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-500 tracking-tight">
                    {answer}
                </AccordionContent>
            </AccordionItem>
            <div className="border-gray-50" />
        </>
    );
};
