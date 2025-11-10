import { Users, Target, Heart, Award } from 'lucide-react';
import feedxLogo from '@/assets/feedx-logo.png';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="text-gradient">FeedX Portal</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Building a safer, more transparent community where every voice matters
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <img src={feedxLogo} alt="FeedX Logo" className="h-16 w-16" />
              <div>
                <h3 className="text-2xl font-bold">FeedX Polytechnic</h3>
                <p className="text-muted-foreground">Anonymous Feedback System</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              FeedX Portal was created with a simple yet powerful mission: to give every student 
              a safe, anonymous platform to share their thoughts, concerns, and suggestions without 
              fear of identification or repercussion.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              We believe that transparency and accountability are the foundations of a healthy 
              educational institution. Through our AI-powered FX Bot and secure tracking system, 
              we ensure that every voice is heard and every issue is addressed.
            </p>

            <div className="flex items-center space-x-6 pt-4">
              <div>
                <div className="text-3xl font-bold text-gradient">100%</div>
                <div className="text-sm text-muted-foreground">Anonymous</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">Secure</div>
                <div className="text-sm text-muted-foreground">Platform</div>
              </div>
            </div>
          </div>

          {/* Right Content - Values */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Community First</h4>
              <p className="text-sm text-muted-foreground">
                Every feature is designed with the student community's needs and safety in mind.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Transparency</h4>
              <p className="text-sm text-muted-foreground">
                Track your submissions in real-time and see how issues are being resolved.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Privacy Protected</h4>
              <p className="text-sm text-muted-foreground">
                Your identity is never shared. We use advanced encryption to keep you safe.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover-lift">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Action-Oriented</h4>
              <p className="text-sm text-muted-foreground">
                We don't just collect feedback - we ensure it leads to real, meaningful change.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-brand rounded-3xl p-12 shadow-glow">
            <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-white/90 text-lg leading-relaxed">
              "To create an educational environment where students feel empowered to speak up, 
              institutions are held accountable, and positive change happens through open, 
              anonymous communication. Listen. Respond. Resolve."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;