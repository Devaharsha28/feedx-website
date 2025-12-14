import { Check } from 'lucide-react';

const features = [
  {
    title: 'S — Skills',
    description: 'Training, certifications, freelancing, and projects to become job-ready.',
    highlight: true,
  },
  {
    title: 'O — Opportunities',
    description: 'Jobs, startups, internships, and industrial visits to build real exposure.',
    highlight: false,
  },
  {
    title: 'K — Knowledge',
    description: 'Notes, resources, workshops, and feedback sharing to learn continuously.',
    highlight: false,
  },
  {
    title: 'X — Exchange & Exposure',
    description: 'Exchange, exposure, and the X-Factor: limitless growth, innovation, and career possibilities.',
    highlight: true,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            The <span className="text-gradient">SOK Model</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A career-driven approach for Polytechnic students: Skills, Opportunities, and Knowledge—powered by X.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative group bg-card border border-border rounded-2xl p-8 hover-lift hover-glow-primary transition-all duration-300 ${
                feature.highlight ? 'ring-2 ring-primary/20 glow-primary-soft' : ''
              }`}
            >
              {feature.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-brand text-white text-xs font-semibold px-3 py-1 rounded-full glow-breath-primary">
                    Popular
                  </span>
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-breath-primary">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-smooth">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Removed placeholder stats */}
      </div>
    </section>
  );
};

export default FeaturesSection;