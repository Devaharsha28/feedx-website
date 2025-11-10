import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Shield, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-8 sm:pb-16">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      
      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 sm:w-[32rem] sm:h-[32rem] bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-card border border-border rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 animate-slide-down">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium">Anonymous & Secure Feedback System</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 px-2">
            <span className="animate-typing">Your Voice Matters,</span>
            <br />
            <span className="text-gradient animate-bounce-in" style={{ animationDelay: '3.5s' }}>Your Identity Protected</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4 animate-fade-in">
            FeedX Portal empowers students to share feedback, report issues, and drive positive change 
            while maintaining complete anonymity with our AI-powered FX Bot.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 animate-scale-in px-4">
            <Button size="lg" className="bg-gradient-brand hover:opacity-90 transition-smooth group w-full sm:w-auto">
              Submit Feedback
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="hover-lift w-full sm:w-auto">
              Learn More
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 px-4">
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 hover-lift hover:shadow-glow transition-all duration-500 animate-slide-up group" style={{ animationDelay: '0.1s' }}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">Anonymous Submission</h3>
              <p className="text-xs sm:text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                Submit feedback completely anonymously with auto-generated IDs
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 hover-lift hover:shadow-glow transition-all duration-500 animate-slide-up group" style={{ animationDelay: '0.2s' }}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">Track Issues</h3>
              <p className="text-xs sm:text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                Monitor your submissions with unique tracking IDs
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 hover-lift hover:shadow-glow transition-all duration-500 animate-slide-up group sm:col-span-2 lg:col-span-1" style={{ animationDelay: '0.3s' }}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">Real-time Updates</h3>
              <p className="text-xs sm:text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                Get instant updates on issue status and resolutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;