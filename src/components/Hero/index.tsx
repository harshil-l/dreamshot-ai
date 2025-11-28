import DashboardPlayground from "../DashboardPlayground";
import TrustedByTile from "./TrustedByTile";
import DashboardHero from "./DashboardHero";

export default function Hero() {
    return (
        <div className="flex flex-col gap-10" style={{
            backgroundImage: 'url(/assets/main-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
            
        }}>
            <TrustedByTile />
            <DashboardPlayground />      
            {/* Image */}
            <div className=" gap-4 w-full h-full mx-auto hidden md:flex">
                <DashboardHero />
              </div>
        </div>
    )
}