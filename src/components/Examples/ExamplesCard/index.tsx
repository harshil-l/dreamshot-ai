import { TransformationArrowIcon } from "@/components/Icons";

interface ExamplesCardProps {
    beforeImageUrl: string;
    afterImageUrl: string;
}

export default function ExamplesCard({ beforeImageUrl, afterImageUrl }: ExamplesCardProps) {
    return (
        <div className="flex flex-row items-center justify-center relative">
            <div className="flex flex-col items-center">
                <img
                    src={beforeImageUrl}
                    alt="Before"
                    className="w-40 h-36 md:w-[220px] md:h-[220px] lg:w-[220px] lg:h-[220px] object-cover border shadow rounded-l-lg"
                />
            </div>
            <div className="flex flex-col items-center">
                <img
                    src={afterImageUrl}
                    alt="After"
                    className="w-40 h-36 md:w-[220px] md:h-[220px] lg:w-[220px] lg:h-[220px] object-cover border shadow rounded-r-lg"
                />
            </div>
            <div className="absolute left-0 bottom-0 w-full flex justify-center items-end pb-2 pointer-events-none">
                <TransformationArrowIcon />
            </div>
        </div>
    );
}