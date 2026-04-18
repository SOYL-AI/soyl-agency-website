import Hero         from "@/components/sections/Hero"
import Marquee      from "@/components/sections/Marquee"
import SelectedWork from "@/components/sections/SelectedWork"
import Services     from "@/components/sections/Services"
import Philosophy   from "@/components/sections/Philosophy"
import Stats        from "@/components/sections/Stats"
import Contact      from "@/components/sections/Contact"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <SelectedWork />
      <Services />
      <Philosophy />
      <Stats />
      <Contact />
    </main>
  )
}
