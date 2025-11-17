import { DashboardPopularTool } from "@/types";
import Image from "next/image";

interface ToolCardProps {
    tool: DashboardPopularTool;
}

export default function ToolCard({ tool }: ToolCardProps) {
    return (
        <div className="flex flex-col items-center w-full max-w-[296px] mx-auto">
            {/* Image container - Responsive square, maintains 296px max */}
            <div className="w-full aspect-square max-w-[296px] relative rounded-lg overflow-hidden">
                <Image
                    src={tool.imageUrl}
                    alt={tool.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 296px"
                />
            </div>

            {/* Title - centered below image */}
            <h3 className="mt-4 text-center font-medium text-base sm:text-lg">
                {tool.title}
            </h3>
        </div>
    )
}