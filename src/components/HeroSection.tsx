import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Shield, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      
      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2 mb-8 animate-slide-down">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Anonymous & Secure Feedback System</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            Your Voice Matters,
            <br />
            <span className="text-gradient">Your Identity Protected</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            FeedX Portal empowers students to share feedback, report issues, and drive positive change 
            while maintaining complete anonymity with our AI-powered FX Bot.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-scale-in">
            <Button size="lg" className="bg-gradient-brand hover:opacity-90 transition-smooth group">
              Submit Feedback
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="hover-lift">
              Learn More
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
            <div className="bg-card border border-border rounded-2xl p-6 hover-lift animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-4 mx-auto">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Anonymous Submission</h3>
              <p className="text-sm text-muted-foreground">
                Submit feedback completely anonymously with auto-generated IDs
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover-lift animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Issues</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your submissions with unique tracking IDs
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover-lift animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
              <p className="text-sm text-muted-foreground">
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