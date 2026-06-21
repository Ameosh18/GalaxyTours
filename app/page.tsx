import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import BookingBar from '@/components/BookingBar'
import PopularRoutes from '@/components/PopularRoutes'
import Vehicles from '@/components/Vehicles'
import WhyGalaxy from '@/components/WhyGalaxy'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <BookingBar />
        <PopularRoutes />
        <Vehicles />
        <WhyGalaxy />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  )
}
