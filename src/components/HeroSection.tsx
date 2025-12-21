import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { NotificationsPanel } from '@/components/NotificationsPanel';
import { MessageSquare, Shield, TrendingUp, ArrowRight, Youtube, Instagram, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/socialLinks';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start overflow-hidden pt-16 pb-8 sm:pb-16"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />

      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 sm:w-[32rem] sm:h-[32rem] bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-start">
          {/* Main Content - Left/Center - Shows FIRST on mobile */}
          <div className="lg:col-span-7 text-center lg:text-left order-1">
            {/* Glassmorphism wrapper for mobile */}
            <div className="glass-card border-white/20 rounded-3xl p-6 sm:p-8 lg:p-0 lg:bg-transparent lg:border-0 lg:backdrop-blur-none">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 glass-card border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8"
              >
                <span className="text-xs bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-700 font-semibold px-2 py-1 rounded-full border border-yellow-400/30">🎉 1st Anniversary</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 px-2"
              >
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">FEEDX</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 px-4"
              >
                A student community that supports Polytechnic learners with Skills, Opportunities, and Knowledge (SOK)
                through curated resources, guidance, and structured updates.
              </motion.p>

              {/* Mission */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 px-4"
              >
                <span className="font-semibold text-foreground">Mission:</span> Make student support and growth easier to access,
                faster to coordinate, and transparent to track.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4 mb-8 px-4"
              >
                <Link to="/resources" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-gradient-brand hover:opacity-90 transition-smooth group shadow-lg">
                    Start learning
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/about" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full hover-lift border-primary/20">
                    About
                  </Button>
                </Link>
                <Link to="/celebrations" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:opacity-90 transition-smooth shadow-md border-0">
                    🎉 1st Anniversary Special
                  </Button>
                </Link>
              </motion.div>

              {/* Social Media Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 px-4 sm:px-0"
              >
                <a
                  href={SOCIAL_LINKS.whatsappChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-green-50 border border-green-200 rounded-full text-green-700 hover:text-green-800 transition-all w-full sm:w-auto justify-center shadow-sm"
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">WhatsApp</span>
                </a>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-red-50 border border-red-200 rounded-full text-red-700 hover:text-red-800 transition-all w-full sm:w-auto justify-center shadow-sm"
                >
                  <Youtube className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium">YouTube</span>
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-pink-50 border border-pink-200 rounded-full text-pink-700 hover:text-pink-800 transition-all w-full sm:w-auto justify-center shadow-sm"
                >
                  <Instagram className="w-5 h-5 text-pink-600" />
                  <span className="text-sm font-medium">Instagram</span>
                </a>
              </motion.div>
            </div>
            {/* End glassmorphism wrapper */}
          </div>

          {/* Notifications Panel - Right Side - Shows SECOND on mobile */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full max-w-sm lg:max-w-xs xl:max-w-sm"
            >
              <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-full opacity-0 lg:opacity-100" />
              <NotificationsPanel />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
