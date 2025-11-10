import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction, Rocket, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import fxbotIcon from '@/assets/fxbot-icon.jpg';

const UnderDevelopment = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* FXBot Icon */}
          <div className="flex justify-center mb-8 animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-brand rounded-full blur-2xl opacity-50 animate-pulse-glow" />
              <img
                src={fxbotIcon}
                alt="FX Bot"
                className="relative w-32 h-32 rounded-full shadow-glow"
              />
            </div>
          </div>

          {/* Icon Grid */}
          <div className="flex justify-center items-center space-x-4 mb-6 animate-slide-down">
            <Construction className="w-12 h-12 text-primary animate-float" />
            <Rocket className="w-12 h-12 text-secondary animate-float" style={{ animationDelay: '0.5s' }} />
            <Sparkles className="w-12 h-12 text-primary animate-float" style={{ animationDelay: '1s' }} />
          </div>

          {/* Main Content */}
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 animate-slide-up">
            <span className="text-gradient">FX Bot</span> is Coming Soon!
          </h1>

          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            We're working hard to bring you an amazing AI-powered WhatsApp chatbot experience. 
            FX Bot will revolutionize how you submit anonymous feedback and track your issues.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-scale-in">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Anonymous Messaging
            </span>
            <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
              Real-time Tracking
            </span>
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              AI-Powered Responses
            </span>
            <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
              WhatsApp Integration
            </span>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
            <Link to="/">
              <Button size="lg" className="bg-gradient-brand hover:opacity-90 transition-smooth group">
                <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="hover-lift">
              Notify Me When Ready
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-12 animate-fade-in">
            <p className="text-sm text-muted-foreground mb-3">Development Progress</p>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-brand h-full rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">75% Complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;