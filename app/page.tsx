"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import NumbersSection from "@/components/NumbersSection"
import ProblemSection from "@/components/ProblemSection"
import ServicesSection from "@/components/ServicesSection"
import HowItWorks from "@/components/HowItWorks"
import PricingSection from "@/components/PricingSection"
import CaseStudies from "@/components/CaseStudies"
import TechStack from "@/components/TechStack"
import AboutSection from "@/components/AboutSection"
import FooterCTA from "@/components/FooterCTA"
import Footer from "@/components/Footer"

// Lazy-load the heavy 3D background mesh for performance (#14)
const BackgroundMesh = dynamic(() => import("@/components/3d/BackgroundMesh"), {
  ssr: false,
})

export default function HomePage() {
  return (
    <main className="relative">
      {/* Interactive Background Mesh (#14) — behind all sections */}
      <Suspense fallback={null}>
        <BackgroundMesh />
      </Suspense>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <NumbersSection />
        <ProblemSection />
        <ServicesSection />
        <HowItWorks />
        <PricingSection />
        <CaseStudies />
        <TechStack />
        <AboutSection />
        <FooterCTA />
        <Footer />
      </div>
    </main>
  )
}
