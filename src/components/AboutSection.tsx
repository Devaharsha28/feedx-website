import { BriefcaseBusiness, BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import feedxLogo from '@/assets/feedx-logo.png';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="text-gradient">FeedX Polytechnic</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A student community built for Polytechnic learners.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto mb-16">
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-4">
              <img src={feedxLogo} alt="FeedX Logo" className="h-14 w-14" />
              <div>
                <h3 className="text-2xl font-bold">FEEDX POLYTECHNIC</h3>
                <p className="text-sm text-muted-foreground">A student community for Polytechnic learners</p>
              </div>
            </div>

            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                FeedX Polytechnic is built around Skills, Opportunities, and Knowledge — with practical support to help
                students learn, connect, and move forward.
              </p>
              <p>
                FeedX = Feed + X (Exchange & Exposure).
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-2">FeedX Vision</h4>
              <p className="text-sm text-muted-foreground">
                “To transform Polytechnic education into a career-driven journey where every student graduates not
                just with a diploma, but with the skills, knowledge, and confidence to earn, innovate, and lead.”
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h4 className="text-lg font-semibold">Skills • Opportunities • Knowledge</h4>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-muted/60 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <p className="font-semibold text-foreground">S — Skills</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Training, certifications, freelancing, projects.</p>
                </div>
                <div className="rounded-xl bg-muted/60 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BriefcaseBusiness className="w-5 h-5 text-primary" />
                    <p className="font-semibold text-foreground">O — Opportunities</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Jobs, startups, internships, industrial visits.</p>
                </div>
                <div className="rounded-xl bg-muted/60 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <p className="font-semibold text-foreground">K — Knowledge</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Notes, resources, workshops, feedback sharing.</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-3">FeedX Mission</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Prepare every student to become job-ready, entrepreneur-ready, or freelancer-ready by the end of their diploma.</li>
                <li>Ensure industrial exposure through mandatory visits and collaborations with industries.</li>
                <li>Make final projects the foundation of career opportunities—turning ideas into jobs, startups, or real-world solutions.</li>
                <li>Provide continuous academic, mental health, and career support while fostering independence and innovation.</li>
                <li>Create a unique identity for Polytechnic students, beyond just preparing for ECET or B.Tech.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;