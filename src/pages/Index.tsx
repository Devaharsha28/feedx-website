import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import FXBotSection from '@/components/FXBotSection';
import Footer from '@/components/Footer';
import FloatingBot from '@/components/FloatingBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingBot />
      <HeroSection />
      <FeaturesSection />
      <FXBotSection />
      <Footer />
    </div>
  );
};

export default Index;