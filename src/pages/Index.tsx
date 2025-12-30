import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ImageCarousel from '@/components/ImageCarousel';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import EventsSection from '@/components/EventsSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 space-y-12">
        <HeroSection />
        {/* Image Carousel - shows below notifications on mobile */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Gallery
            </h2>
          </div>
          <ImageCarousel className="max-w-5xl mx-auto" />
        </div>
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