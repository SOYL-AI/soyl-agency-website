"use client"

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

export default function HomePage() {
  return (
    <main className="relative">
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
    </main>
  )
}
