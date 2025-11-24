'use client'

import { useState } from "react";
import Footer from "@/components/Footer";
import PricingPlan from "@/components/PricingPlan";
import FAQs from "@/components/FAQs";
import CurvedCarousel from "@/components/CurvedCarousel";

export default function Pricing() {
    // Track selected billing period: 'monthly' or 'annually'

    return (
        <div className="pt-20 min-h-screen">

            {/* Pricing Toggle - Classic CSS with Math */}
            <PricingPlan />

            <FAQs />
            <CurvedCarousel />
            <Footer />
        </div>
    )
}