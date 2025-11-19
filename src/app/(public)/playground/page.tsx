import Footer from "@/components/Footer";
import PlaygroundSection from "@/components/PlaygroundSection";
import HowItWork from "@/components/HowItWork";
import Examples from "@/components/Examples";
import OurFeatures from "@/components/OurFeatures";
import SimilarTools from "@/components/SimilarTools";
import FAQs from "@/components/FAQs";

export default function Playground() {
    // Track selected billing period: 'monthly' or 'annually'

    return (
        <div className="flex flex-col items-center justify-center gap-20 ">
            <PlaygroundSection />  
            <HowItWork />
            <Examples />
            <OurFeatures />
            <SimilarTools />
            <FAQs />
            <Footer />
        </div>
    )
}