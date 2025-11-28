import Footer from "@/components/Footer";
import PricingPlan from "@/components/PricingPlan";
import FAQs from "@/components/FAQs";
import CurvedCarousel from "@/components/CurvedCarousel";

export default function PricingPage() {
    return (
        <div className="pt-20 min-h-screen" >
            {/* Pricing Toggle - Plans fetched client-side */}
            <PricingPlan />

            <FAQs />
            <CurvedCarousel />
            <Footer />
        </div>
    )
}