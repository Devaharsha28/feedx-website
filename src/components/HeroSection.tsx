import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, BriefcaseBusiness, GraduationCap, Sparkles } from 'lucide-react';
import { NotificationsPanel } from '@/components/NotificationsPanel';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative pb-12 pt-6 bg-background overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-16 -left-10 h-48 w-48 rounded-full bg-gradient-to-br from-primary/15 to-secondary/10 blur-3xl" />
        <div className="absolute bottom-0 right-[-60px] h-56 w-56 rounded-full bg-gradient-to-tl from-secondary/15 to-primary/10 blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content - Left/Center */}
          <div className="lg:col-span-7 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-card border border-border rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--primary))]" />
            <span className="text-xs sm:text-sm font-medium">Student-first platform for Polytechnic learners</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 px-2 text-foreground">
            FEEDX POLYTECHNIC
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
            A student community that supports Polytechnic learners with Skills, Opportunities, and Knowledge (SOK)
            through curated resources, guidance, and structured updates.
          </p>

          {/* Mission */}
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
            <span className="font-semibold text-foreground">Mission:</span> Make student support and growth easier to access,
            faster to coordinate, and transparent to track.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-4">
            <Link to="/resources">
              <Button size="lg" className="bg-gradient-brand hover:opacity-90 transition-smooth group w-full sm:w-auto">
                Start learning
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                About
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12 px-4">
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-[hsl(var(--primary))]">S — Skills</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Training, certifications, freelancing, and projects.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <BriefcaseBusiness className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-[hsl(var(--primary))]">O — Opportunities</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Jobs, startups, internships, and industrial visits.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 sm:col-span-2 lg:col-span-1 shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-[hsl(var(--primary))]">K — Knowledge</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
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