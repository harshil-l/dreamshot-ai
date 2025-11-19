import FAQs from "@/components/FAQs";
import CurvedCarousel from "@/components/CurvedCarousel";
import Footer from "@/components/Footer";
import ContactUsPoster from "@/components/ContactUsPoster";

export default function ContactUs() {
    return (
        <div>
            <ContactUsPoster />

            <FAQs />
            <CurvedCarousel />
            <Footer />
        </div>
    )
}