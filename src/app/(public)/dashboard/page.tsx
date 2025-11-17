'use client'

import { useState } from "react"
import Hero from "@/components/Hero"
import PopularTool from "@/components/PopularTool"
import OurFeatures from "@/components/OurFeatures"
import Testimonials from "@/components/Testimonials"
import Inspiration from "@/components/Inspiration"
import FAQs from "@/components/FAQs"
import CurvedCarousel from "@/components/CurvedCarousel"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-10 ">
      {/* Hero */}
      <Hero />

      {/* Popular Tools */}
      <PopularTool />

      {/* Our Features */}
      <OurFeatures />

      {/* Testimonials */}
      <Testimonials />

      {/* Inspiration */}
      <Inspiration />

      {/* FAQ */}
      <FAQs />

      {/* Curved Carousel */}
      <CurvedCarousel />

    </div>
  )
}
