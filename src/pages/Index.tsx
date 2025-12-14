import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ImageCarousel from '@/components/ImageCarousel';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import EventsSection from '@/components/EventsSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import homeImage from '../../images/image.png';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 space-y-12">
        <HeroSection />
        <ImageCarousel />
        <FeaturesSection />
        <section className="bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-border bg-white overflow-hidden flex justify-center">
              <img
                src={homeImage}
                alt="FeedX"
                className="max-w-md h-auto rounded-xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>
        <TestimonialsSection />
        <EventsSection />
        <AboutSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;