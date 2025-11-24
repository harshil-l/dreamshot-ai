import FAQs from "@/components/FAQs";
import CurvedCarousel from "@/components/CurvedCarousel";
import Footer from "@/components/Footer";
import ContactUsPoster from "@/components/ContactUsPoster";

export default function ContactUs() {
    return (
        <div className="pt-20 min-h-screen">
            <ContactUsPoster />

            <FAQs />
            <CurvedCarousel />
            <Footer />
        </div>
    )
}