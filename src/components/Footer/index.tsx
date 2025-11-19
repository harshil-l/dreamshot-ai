const FOOTER_BACKGROUND_COLOR = "var(--footer-primary)"; // Centralized to keep footer aligned with theme tokens

export default function Footer() {
    return (
        <footer
            className="w-full p-12 flex-1 grow h-full justify-between max-h-full mt-20 sm:flex md:flex-col lg:flex-row gap-10"
            style={{ backgroundColor: FOOTER_BACKGROUND_COLOR }} // Use design token to avoid hard-coded colors
        >
            {/* Left Section */}
            <div className="space-y-6 pt-12 pr-12 pl-12 flex flex-1 flex-col min-h-0 max-h-full justify-between">
                <div>
                    <div className="text-2xl font-bold text-white">LOGO</div>
                    <h2 className="text-gray-400 pt-4">
                        Access AI-powered tools in one place for
                        enhanced productivity, creativity, and efficiency—
                        no platform switching needed.
                    </h2>
                </div>
                <p className="text-gray-500">Copyright © 2025 All Rights Reserved by RemixAI</p>
            </div>

            {/* Right Section */}
            <div className="flex flex-2 justify-between min-h-0 max-h-full">

                <div className="flex flex-col justify-between h-full">
                    <h1 className="text-white text-xl mb-4 font-bold">All Tools</h1>
                    <h3 className="text-gray-400">Photo into Sketch</h3>
                    <h3 className="text-gray-400">Age Changer</h3>
                    <h3 className="text-gray-400">AI Attractiveness Checker</h3>
                    <h3 className="text-gray-400">Baby Generator</h3>
                    <h3 className="text-gray-400">Body Shaper</h3>
                    <h3 className="text-gray-400">Curtain Bangs</h3>
                    <h3 className="text-gray-400">Image Enhancer</h3>
                    <h3 className="text-gray-400">AI Face Swap</h3>
                    <h3 className="text-gray-400">AI Similar Image Generator</h3>
                    <h3 className="text-gray-400">Unblur Image</h3>
                    <h3 className="text-gray-400">BG Remover</h3>
                </div>

                <div className="flex flex-col justify-between min-h-0 max-h-full">
                    <h1 className="text-white text-xl mb-4 font-bold">All Filters</h1>
                    <h3 className="text-gray-400">Cyberpunk Filter</h3>
                    <h3 className="text-gray-400">Spider Man Filter</h3>
                    <h3 className="text-gray-400">Anime Filter</h3>
                    <h3 className="text-gray-400">AI Bald Filter</h3>
                    <h3 className="text-gray-400">Ghibli Filter</h3>
                    <h3 className="text-gray-400">Cartoon Filter</h3>
                    <h3 className="text-gray-400">Watercolor Filter</h3>
                    <h3 className="text-gray-400">Color Restore Filter</h3>
                </div>

                <div className="space-y-6 flex flex-col justify-between h-full">
                    <div>
                        <h1 className="text-white text-xl mb-4 font-bold">Business</h1>
                        <h3 className="text-gray-400">About Us</h3>
                        <h3 className="text-gray-400">Pricing</h3>
                        <h3 className="text-gray-400">Affiliate</h3>
                        <h3 className="text-gray-400">Contact Us</h3>
                    </div>

                    <div>
                        <h1 className="text-white text-xl mb-4 font-bold">Legal</h1>
                        <h3 className="text-gray-400">Privacy Policy</h3>
                        <h3 className="text-gray-400">Terms & Conditions</h3>
                        <h3 className="text-gray-400">Cancellation & Refund</h3>
                    </div>
                </div>
            </div>
        </footer>
    )
}