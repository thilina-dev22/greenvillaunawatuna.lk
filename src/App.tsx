import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { RoomsSection } from './components/RoomsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';

export function App() {
  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col font-sans selection:bg-[#0F382C] selection:text-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <RoomsSection />
        <FacilitiesSection />
        <ReviewsSection />
        <LocationSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyMobileBar />
    </div>
  );
}

export default App;
