import { CreaditIcon, TransformationArrowIcon } from "../Icons";
import Image from "next/image";
import { Button } from "../ui/button";

export default function PlaygroundSection() {
    return (
        <div className="flex flex-col gap-5">
            {/* Title and Description */}
            <div className="flex flex-col text-center items-center gap-5 justify-center mt-15 px-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold px-4">
                    Ghibli Filter
                </h1>
                <p className=" text-gray-500 max-w-xl">Transform your photos into enchanting Ghibli-style artwork with AI. Relive your memories in a magical, hand-painted world.</p>
            </div>

            {/* Playground Card */}
            <div className="w-full mt-5 max-w-lg lg:max-w-3xl mx-auto p-0.5 rounded-md m-10 bg-white flex flex-col gap-10">
                <div className="border-3 m-2 border-dashed border-gray-300 rounded-md p-10 flex flex-col items-center justify-center bg-gray-50/50 min-h-[400px]">

                    {/* Images Container */}
                    <div className="flex items-center justify-center md:gap-12 mb-10">
                        {/* Centered images with overlap and rotation */}
                        <div className="relative flex items-center justify-center" style={{ minHeight: 160, minWidth: 320 }}>
                            {/* Use flex to center images exactly */}
                            <div className="flex items-center justify-center gap-0 relative" style={{ width: 250 }}>
                                {/* Left Image (Original) */}
                                <div className="-rotate-14 z-10 shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300 relative" style={{ left: 0 }}>
                                    <Image
                                        src="/assets/Playground/1.png"
                                        alt="Ghibli Style"
                                        width={125}
                                        height={160}
                                        className="object-cover w-[125px] h-[160px]"
                                    />
                                </div>

                                {/* Overlapped Right Image (Transformed) */}
                                <div className="rotate-14 z-20 shadow-2xl rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300 relative" style={{ marginLeft: -28 }}>
                                    <Image
                                        src="/assets/Playground/2.png"
                                        alt="Original"
                                        width={125}
                                        height={160}
                                        className="object-cover w-[125px] h-[160px]"
                                    />
                                </div>

                                {/* Transformation Arrow Icon - slightly shift left */}
                                <div className="absolute z-30 left-[46%] -translate-x-1/2 top-[60%]">
                                    <TransformationArrowIcon />
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Text Below */}
                    <div className="text-center space-y-3">
                        <p className="text-xl md:text-2xl  text-gray-900">Upload Your Original Image</p>
                        <p className="text-sm md:text-base text-gray-400">or drag and drop PNG, JPG or WEBP</p>
                    </div>

                </div>
            </div>

            <div className=" w-full flex items-center max-w-lg lg:max-w-3xl mx-auto justify-center mx-10">
                <Button
                    variant='dark'
                    className='w-full py-4 h-12 group has-[>svg]:px-6!'
                >
                    <span className="flex items-center bg-gray-600 text-white rounded-md px-2 py-1 mr-2">
                        <CreaditIcon />
                        <span className="ml-1">1</span>
                    </span>
                    Apply Ghibli Filter
                </Button>
            </div>

            {/* Sample Images */}
            <div className="w-full flex flex-col gap-5 items-center justify-center mx-10">
                <p className="text-center text-gray-500">Sample Images</p>
                <div className="flex items-center justify-center space-x-3">
                    <Image
                        src="/assets/SampleImages/1.png"
                        alt="Ghibli Style"
                        width={80}
                        height={100}
                        className="rounded shadow"
                    />
                    <Image
                        src="/assets/SampleImages/2.png"
                        alt="Original"
                        width={80}
                        height={100}
                        className="rounded shadow"
                    />
                    <Image
                        src="/assets/SampleImages/3.png"
                        alt="Original"
                        width={80}
                        height={100}
                        className="rounded shadow"
                    />
                    <Image
                        src="/assets/SampleImages/4.png"
                        alt="Original"
                        width={80}
                        height={100}
                        className="rounded shadow"
                    />
                    <Image
                        src="/assets/SampleImages/5.png"
                        alt="Original"
                        width={80}
                        height={100}
                        className="rounded shadow"
                    />
                </div>
            </div>
        </div>
    )
}   