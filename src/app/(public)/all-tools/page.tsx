import ToolCard from "@/components/PopularTool/ToolCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import { DASHBOARD_POPULAR_TOOLS } from "@/constants/dashboard.constants";
import Footer from "@/components/Footer";


export default function AllTools() {
    return (
        <div className="flex flex-col items-center gap-10 justify-center">

            {/* Title and Description */}
            <div className="flex flex-col text-center items-center gap-10 justify-center mt-15 px-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold px-4">
                    Discover Our Full Toolkit
                </h1>
                <p className=" text-gray-500 max-w-xl">Discover the complete collection of AI filters and effects. Whatever your style, we’ve got a tool to bring your vision to life.</p>
            </div>

            {/* Filters and Search */}
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex items-center gap-4 justify-between md:flex-row flex-col">
                    <div className="flex items-center gap-4">
                        <Button variant='dark' className='py-3 px-6 h-10 rounded-sm'>All</Button>
                        <Button variant='outline' className='py-3 px-6 h-10 rounded-sm'>Image Tools</Button>
                        <Button variant='outline' className='py-3 px-6 h-10 rounded-sm'>Video Tools</Button>
                    </div>
                    <div className="relative w-full max-w-md">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2  pointer-events-none">
                            <Search className="w-4 h-4" />
                        </span>
                        <Input
                            type="text"
                            placeholder="Search"
                            className="w-full h-10 pl-10 max-w-xl text-black shadow-none rounded-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full max-w-7xl px-4">
                {DASHBOARD_POPULAR_TOOLS.map((tool, index) => (
                    <ToolCard key={index} tool={tool} />
                ))}
            </div>

            <Footer />
        </div>
    );
}