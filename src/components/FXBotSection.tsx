import { Button } from '@/components/ui/button';
import fxbotIcon from '@/assets/fxbot-icon.jpg';
import { Bot, MessageCircle, Shield, Zap } from 'lucide-react';

const FXBotSection = () => {
  return (
    <section id="fxbot" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Powered by AI</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold">
              Meet <span className="text-gradient">FX Bot</span>
              <br />
              Your Anonymous Assistant
            </h2>

            <p className="text-lg text-muted-foreground">
              FX Bot is an AI-powered WhatsApp chatbot that ensures your feedback reaches the right people 
              while maintaining your complete anonymity. Listen, Respond, and Resolve - that's our promise.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">WhatsApp Integration</h4>
                  <p className="text-sm text-muted-foreground">
                    Submit feedback directly through WhatsApp for maximum convenience
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Complete Privacy</h4>
                  <p className="text-sm text-muted-foreground">
                    Advanced encryption ensures your identity remains protected
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Instant Response</h4>
                  <p className="text-sm text-muted-foreground">
                    Get immediate acknowledgment and tracking ID for your submission
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-gradient-brand hover:opacity-90 transition-smooth">
                Start Chatting with FX Bot
              </Button>
              <Button variant="outline" className="hover-lift">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Content - Bot Showcase */}
          <div className="relative">
            <div className="relative z-10 bg-card border border-border rounded-3xl p-8 shadow-glow">
              {/* Bot Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-brand rounded-full blur-2xl opacity-50 animate-pulse-glow" />
                  <img
                    src={fxbotIcon}
                    alt="FX Bot"
                    className="relative w-32 h-32 rounded-full shadow-lg"
                  />
                </div>
              </div>

              {/* Bot Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">FX Bot</h3>
                <p className="text-muted-foreground">WhatsApp Chatbot Assistant</p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <button className="w-full bg-muted hover:bg-muted/80 rounded-xl p-4 text-left transition-smooth hover-lift">
                  <div className="font-medium mb-1">Registration</div>
                  <div className="text-sm text-muted-foreground">Create your anonymous account</div>
                </button>

                <button className="w-full bg-muted hover:bg-muted/80 rounded-xl p-4 text-left transition-smooth hover-lift">
                  <div className="font-medium mb-1">Anonymous Submission</div>
                  <div className="text-sm text-muted-foreground">Submit feedback securely</div>
                </button>

                <button className="w-full bg-muted hover:bg-muted/80 rounded-xl p-4 text-left transition-smooth hover-lift">
                  <div className="font-medium mb-1">ID Tracking</div>
                  <div className="text-sm text-muted-foreground">Track your submission status</div>
                </button>

                <button className="w-full bg-muted hover:bg-muted/80 rounded-xl p-4 text-left transition-smooth hover-lift">
                  <div className="font-medium mb-1">Action / Updates</div>
                  <div className="text-sm text-muted-foreground">View resolution progress</div>
                </button>
              </div>

              {/* Pilot Badge */}
              <div className="mt-6 text-center">
                <span className="inline-block bg-gradient-brand text-white text-sm font-semibold px-4 py-2 rounded-full">
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