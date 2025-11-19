import DashboardPlayground from "../DashboardPlayground";
import TrustedByTile from "./TrustedByTile";

export default function Hero() {
    return (
        <div className="flex flex-col gap-10 mt-15">
            <TrustedByTile />
            <DashboardPlayground/>      
            {/* Image */}
        </div>
    )
}