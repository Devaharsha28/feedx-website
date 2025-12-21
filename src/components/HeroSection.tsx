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
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16"
    >
      {/* Refined Gradient Background with Blobs to match image */}
      <div className="absolute inset-0 bg-[#f8fafc]" />

      {/* Large blobs matching the reference image */}
      <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-blue-100/40 rounded-full blur-[100px] animate-float-slow" />
      <div className="absolute top-[40%] right-[10%] w-[35rem] h-[35rem] bg-purple-100/30 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-teal-100/40 rounded-full blur-[100px] animate-float-slow" style={{ animationDelay: '1s' }} />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-2 mb-8 shadow-sm"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-slate-600">Anonymous & Secure Feedback System</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-slate-900"
            >
              Your Voice Matters,<br />
              <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 bg-clip-text text-transparent">Your Identity Protected</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl leading-relaxed"
            >
              FeedX Portal empowers students to share feedback, report issues, and drive positive change while maintaining complete anonymity with our AI-powered FX Bot.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-16"
            >
              <Link to="/join">
                <Button size="lg" className="h-12 px-8 bg-[#3a8abf] hover:bg-[#327aab] text-white rounded-xl shadow-lg shadow-blue-500/20 group">
                  Submit Feedback
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="h-12 px-8 border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-white text-slate-600 rounded-xl">
                  Learn More
                </Button>
              </Link>
            </motion.div>

            {/* Feature Cards at Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full"
            >
              {[
                {
                  icon: <MessageSquare className="w-5 h-5 text-blue-600" />,
                  title: "Anonymous Submission",
                  desc: "Submit feedback completely anonymously with auto-generated IDs"
                },
                {
                  icon: <Shield className="w-5 h-5 text-blue-600" />,
                  title: "Track Issues",
                  desc: "Monitor your submissions with unique tracking IDs"
                },
                {
                  icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
                  title: "Real-time Updates",
                  desc: "Get instant updates on issue status and resolutions"
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white/70 backdrop-blur-md border border-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Notifications Panel - Right Side */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full max-w-sm"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-purple-100 blur-3xl rounded-full -z-10 opacity-60" />
              <NotificationsPanel />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
