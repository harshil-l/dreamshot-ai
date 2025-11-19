export default function HowItWorkCard() {
    return (
        <div className="flex flex-col border border-gray-200 rounded-lg p-5 gap-3" style={{ backgroundColor: '#F5F5F5' }}>
            <div className="flex items-center justify-start rounded-md">
                <span className="bg-white rounded px-2 py-1">
                    Step 1
                </span>
            </div>
            <h1 className="text-xl md:text-xl lg:text-2xl text-start font-semibold">
                Upload Your Photo
            </h1>
            <p className="text-gray-500 text-start">
                Upload an image or drag and drop it directly from your device.
            </p>
        </div>
    )
}