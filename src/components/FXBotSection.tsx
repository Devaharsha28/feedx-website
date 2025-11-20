import { Button } from '@/components/ui/button';
import fxbotIcon from '@/assets/fxbot-icon.svg';
import { Bot, MessageCircle, Shield, Zap } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const FXBotSection = () => {
  const [sectionRef, isInView] = useInView();

  return (
    <section ref={sectionRef} id="fxbot" className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className={`space-y-6 ${isInView ? 'animate-slide-up' : ''}`}>
            <div className="inline-flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2 animate-bounce-in glow-primary-soft">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Powered by AI</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Meet <span className="text-gradient">FX Bot</span>
              <br />
              Your Anonymous Assistant
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground">
              FX Bot is an AI-powered WhatsApp chatbot that ensures your feedback reaches the right people 
              while maintaining your complete anonymity. Listen, Respond, and Resolve - that's our promise.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 animate-slide-up group hover:bg-card/50 rounded-lg p-3 transition-all duration-300 hover-glow-primary" style={{ animationDelay: '0.2s' }}>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 glow-breath-primary">
                  <MessageCircle className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 transition-colors duration-300 group-hover:text-primary">WhatsApp Integration</h4>
                  <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                    Submit feedback directly through WhatsApp for maximum convenience
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 animate-slide-up group hover:bg-card/50 rounded-lg p-3 transition-all duration-300 hover-glow-secondary" style={{ animationDelay: '0.4s' }}>
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-secondary/20 group-hover:scale-110 glow-breath-secondary">
                  <Shield className="w-5 h-5 text-secondary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 transition-colors duration-300 group-hover:text-primary">Complete Privacy</h4>
                  <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                    Advanced encryption ensures your identity remains protected
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 animate-slide-up group hover:bg-card/50 rounded-lg p-3 transition-all duration-300 hover-glow-accent" style={{ animationDelay: '0.6s' }}>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 glow-breath-accent">
                  <Zap className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 transition-colors duration-300 group-hover:text-primary">Instant Response</h4>
                  <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                    Get immediate acknowledgment and tracking ID for your submission
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button className="bg-gradient-brand hover:opacity-90 hover:scale-105 transition-all duration-300 group w-full sm:w-auto hover-glow-primary glow-primary-soft">
                Start Chatting with FX Bot
                <MessageCircle className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              </Button>
              <Button variant="outline" className="hover-lift hover:scale-105 transition-all duration-300 w-full sm:w-auto hover-glow-secondary">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Content - Bot Showcase */}
          <div className={`relative ${isInView ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.5s' }}>
            <div className="relative z-10 bg-card border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-glow hover-glow-primary transition-all duration-300">
              {/* Bot Icon */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-brand rounded-full blur-2xl opacity-50 animate-pulse-glow glow-pulse-primary" />
                  <img
                    src={fxbotIcon}
                    alt="FX Bot"
                    className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Bot Info */}
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">FX Bot</h3>
                <p className="text-sm sm:text-base text-muted-foreground">WhatsApp Chatbot Assistant</p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2 sm:space-y-3">
                <button className="w-full bg-muted hover:bg-muted/80 rounded-lg sm:rounded-xl p-3 sm:p-4 text-left transition-all duration-300 hover-lift hover:scale-[1.02] group hover-glow-primary">
                  <div className="font-medium mb-1 text-sm sm:text-base">Registration</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Create your anonymous account</div>
                </button>

                <button className="w-full bg-muted hover:bg-muted/80 rounded-lg sm:rounded-xl p-3 sm:p-4 text-left transition-all duration-300 hover-lift hover:scale-[1.02] group hover-glow-secondary">
                  <div className="font-medium mb-1 text-sm sm:text-base">Anonymous Submission</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Submit feedback securely</div>
                </button>

                <button className="w-full bg-muted hover:bg-muted/80 rounded-lg sm:rounded-xl p-3 sm:p-4 text-left transition-all duration-300 hover-lift hover:scale-[1.02] group hover-glow-accent">
                  <div className="font-medium mb-1 text-sm sm:text-base">ID Tracking</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Track your submission status</div>
                </button>

                <button className="w-full bg-muted hover:bg-muted/80 rounded-lg sm:rounded-xl p-3 sm:p-4 text-left transition-all duration-300 hover-lift hover:scale-[1.02] group hover-glow-primary">
                  <div className="font-medium mb-1 text-sm sm:text-base">Action / Updates</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">View resolution progress</div>
                </button>
              </div>

              {/* Pilot Badge */}
              <div className="mt-6 text-center">
                <span className="inline-block bg-gradient-brand text-white text-sm font-semibold px-4 py-2 rounded-full glow-breath-primary hover-glow-primary transition-all duration-300">
                  PILOT VERSION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FXBotSection;