import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Navbar />
      <div className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">About FEEDX</h1>
            <AboutSection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
