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
      className="relative min-h-screen flex items-start overflow-hidden pt-16 pb-8 sm:pb-16 bg-slate-50/50"
    >
      {/* Glow Effects (matching reference image) */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-indigo-400/15 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[5%] right-[20%] w-[350px] h-[350px] bg-fuchsia-400/15 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] bg-teal-400/15 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '4s' }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-start">
          {/* Main Content */}
          <div className="lg:col-span-7 text-center lg:text-left order-1">
            <div className="rounded-3xl p-6 sm:p-8 lg:p-0">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-xs text-slate-600 font-medium lowercase">
                  Anonymous & Secure Feedback System
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-[1.1]"
              >
                <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
                  FEEDX
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-slate-500 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                A student community that supports Polytechnic learners with Skills, Opportunities, and Knowledge (SOK)
                through curated resources, guidance, and structured updates.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4 mb-12"
              >
                <Link to="/resources" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-14 px-8 shadow-lg shadow-teal-600/20 transition-all hover:scale-[1.02]">
                    Start learning
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/about" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full bg-white/50 backdrop-blur-sm border-slate-200 text-slate-600 rounded-xl h-14 px-8 hover:bg-slate-50 transition-all">
                    Learn More
                  </Button>
                </Link>
              </motion.div>

              {/* Feature Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {[
                  { icon: MessageSquare, title: "Anonymous Submission", desc: "Submit feedback completely anonymously." },
                  { icon: Shield, title: "Track Issues", desc: "Monitor your submissions with unique IDs." },
                  { icon: TrendingUp, title: "Real-time Updates", desc: "Get instant updates on status." },
                ].map((item, i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-sm border border-slate-100 rounded-2xl p-5 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-tight">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-2 pt-8 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full max-w-sm"
            >
              <div className="absolute inset-0 bg-blue-400/10 blur-3xl -z-10 rounded-full" />
              <NotificationsPanel />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
