import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
// ImageCarousel removed per request
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import EventsSection from '@/components/EventsSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 space-y-12">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <EventsSection />
        <AboutSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;