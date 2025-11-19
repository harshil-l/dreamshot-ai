import TextSeparator from "../TextSeparator";
import ToolCard from "../PopularTool/ToolCard";

import { DASHBOARD_POPULAR_TOOLS } from "@/constants/dashboard.constants";

export default function SimilarTools() {
    return (
        <div className="flex flex-col items-center gap-10 justify-center mt-15 px-4">
            <TextSeparator textSeparatorText="Similar Tools" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold px-4">
                Recommended for You
            </h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full max-w-7xl px-4">
                {DASHBOARD_POPULAR_TOOLS.map((tool, index) => (
                    <ToolCard key={index} tool={tool} />
                ))}
            </div>
        </div>
    )
}