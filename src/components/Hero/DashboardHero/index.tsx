export default function DashboardHero() {
    return (
        <div className='max-w-5xl mx-auto text-center mb-16'>
            <div className='2xl:max-w-4xl xl:max-w-3xl lg:max-w-2xl max-w-xl h-full relative'>
                <img src="/assets/DashboardHero/dashboard-hero-main.png" alt="desktop-hero" className='w-full h-full object-cover' />

                {/* Top-left decorative image - progressively smaller on smaller screens */}
                <div className='absolute xl:-left-22 xl:top-8 lg:-left-16 lg:top-6 md:-left-12 md:top-4 -left-8 top-2'>
                    <img
                        src="/assets/DashboardHero/top-left.png"
                        alt="desktop-hero"
                        className='2xl:w-60 xl:w-52 lg:w-40 md:w-32 sm:w-28 w-24'
                    />
                </div>

                {/* Bottom-left decorative image - progressively smaller on smaller screens */}
                <div className='absolute xl:-left-14 xl:bottom-8 lg:-left-10 lg:bottom-6 md:-left-8 md:bottom-4 -left-6 bottom-2'>
                    <img
                        src="/assets/DashboardHero/bottom-left.png"
                        alt="desktop-hero"
                        className='2xl:w-38 xl:w-40 lg:w-32 md:w-28 sm:w-24 w-20'
                    />
                </div>

                {/* Right decorative image - progressively smaller on smaller screens */}
                <div className='absolute xl:-right-24 xl:top-30 lg:-right-20 lg:top-24 md:-right-16 md:top-20 -right-12 top-12'>
                    <img
                        src="/assets/DashboardHero/right.png"
                        alt="desktop-hero"
                        className='2xl:w-48 xl:w-36 lg:w-32 md:w-28 sm:w-24 w-20'
                    />
                </div>
            </div>
        </div>
    )
}