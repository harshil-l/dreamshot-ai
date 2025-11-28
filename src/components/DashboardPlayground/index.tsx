'use client'

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IN_ARTICLE_META_DATA } from "@/constants/static.content.constants";

export default function DashboardPlayground() {
  const router = useRouter();

  const handleNavigateToAllTools = () => {
    router.push('/all-tools');
  };

  return (
    <div className="flex flex-col gap-5 mb-10 md:mb-0">
      <h1 className="text-4xl sm:text-5xl font-semibold text-center">
        {/* AI Without Limits –<span className="block lg:inline"></span> */}
        <span className="block lg:block">
          {/* Displays as block on all, but allows lg to remain block for forced line break */}
          {IN_ARTICLE_META_DATA.title}
        </span>
      </h1>
      <p className="text-center px-2 text-gray-500 max-w-3xl mx-auto ">
        {IN_ARTICLE_META_DATA.description}
      </p>
      <div className="flex items-center justify-center mt-7">
        <Button variant='dark' className='py-3 px-6 h-10' onClick={handleNavigateToAllTools}>Start Creating</Button>
      </div>
    </div>
  );
}
