import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { NotificationsPanel } from '@/components/NotificationsPanel';
import { GraduationCap, Briefcase, BookOpen, ArrowRight, Youtube, Instagram, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/socialLinks';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative pb-16 pt-12 bg-slate-950 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_25%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(59,130,246,0.05)_0%,rgba(14,165,233,0.05)_40%,transparent_55%),linear-gradient(300deg,rgba(56,189,248,0.06)_0%,transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-screen" />
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Content - Left/Center */}
          <div className="lg:col-span-7 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-card ">
            
            
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 px-2 text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            FEEDX
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 mb-6 sm:mb-8 max-w-2xl">
            A student community that supports Polytechnic learners with Skills, Opportunities, and Knowledge (SOK)
            through curated resources, guidance, and structured updates.
          </p>

          {/* Mission */}
          <p className="text-sm sm:text-base text-slate-300 mb-6 sm:mb-8 max-w-2xl">
            <span className="font-semibold text-white">Mission:</span> Make student support and growth easier to access,
            faster to coordinate, and transparent to track.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-3 sm:gap-4 mb-6 px-4">
            <Link to="/resources">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-6 rounded-full transition-smooth group w-full sm:w-auto shadow-[0_12px_30px_rgba(37,99,235,0.35)]">
                Start learning
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-300 text-blue-200 hover:bg-blue-500/10 rounded-full">
                About
              </Button>
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-10 sm:mb-12 px-4">
            <a 
              href={SOCIAL_LINKS.whatsappChannel} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/40 rounded-full text-green-400 hover:text-green-300 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
            <a 
              href={SOCIAL_LINKS.youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 rounded-full text-red-400 hover:text-red-300 transition-all"
            >
              <Youtube className="w-5 h-5" />
              <span className="text-sm font-medium">YouTube</span>
            </a>
            <a 
              href={SOCIAL_LINKS.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 rounded-full text-pink-400 hover:text-pink-300 transition-all"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-medium">Instagram</span>
            </a>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-12 px-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600/20 border border-blue-500/40 rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <GraduationCap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-blue-100">S — Skills</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Training, certifications, freelancing, and projects.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600/20 border border-blue-500/40 rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-blue-100">O — Opportunities</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Jobs, startups, internships, and industrial visits.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 sm:col-span-2 lg:col-span-1 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600/20 border border-blue-500/40 rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-blue-100">K — Knowledge</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Notes, resources, workshops, and feedback sharing.
              </p>
            </div>
          </div>
        </div>

        {/* Notifications Panel - Right Side */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-sm lg:max-w-xs xl:max-w-sm">
            <NotificationsPanel />
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default HeroSection;