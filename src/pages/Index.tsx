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
      <div className="relative mt-20 space-y-12">
        <div className="[content-visibility:auto] [contain-intrinsic-size:1px_800px]"><HeroSection /></div>
        <div className="[content-visibility:auto] [contain-intrinsic-size:1px_800px]"><FeaturesSection /></div>
        <div className="[content-visibility:auto] [contain-intrinsic-size:1px_800px]"><FXBotSection /></div>
        <div className="[content-visibility:auto] [contain-intrinsic-size:1px_800px]"><TestimonialsSection /></div>
        <div className="[content-visibility:auto] [contain-intrinsic-size:1px_800px]"><EventsSection /></div>
        <div className="[content-visibility:auto] [contain-intrinsic-size:1px_800px]"><AboutSection /></div>
        <Footer />
      </div>
    </GlassmorphismBackground>
  );
};

export default Index;