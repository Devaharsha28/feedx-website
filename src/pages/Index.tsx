import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import FXBotSection from '@/components/FXBotSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import EventsSection from '@/components/EventsSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import GlassmorphismBackground from '@/components/GlassmorphismBackground';

const Index = () => {
  return (
    <GlassmorphismBackground intensity="medium" className="bg-gradient-mesh">
      <Navbar />
      <div className="relative mt-20">
        <HeroSection />
        <FeaturesSection />
        <FXBotSection />
        <TestimonialsSection />
        <EventsSection />
        <AboutSection />
        <Footer />
      </div>
    </GlassmorphismBackground>
  );
};

export default Index;