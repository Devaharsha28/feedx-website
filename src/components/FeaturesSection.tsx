import { Check } from 'lucide-react';

const features = [
  {
    title: 'Submit Anonymously',
    description: 'Share feedback, report issues, and make suggestions without revealing your identity.',
    highlight: true,
  },
  {
    title: 'Auto-Generated IDs',
    description: 'Each submission gets a unique tracking ID for easy follow-up and status checks.',
    highlight: false,
  },
  {
    title: 'Track & Escalate',
    description: 'Monitor pending issues and automatic escalation for critical concerns.',
    highlight: false,
  },
  {
    title: 'Transparency & Accountability',
    description: 'Ensure institutional accountability while protecting reporter anonymity.',
    highlight: true,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Powerful Features for
            <span className="text-gradient"> Safe Communication</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            FX Bot combines advanced AI with robust privacy features to create a trusted feedback ecosystem
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative group bg-card border border-border rounded-2xl p-8 hover-lift ${
                feature.highlight ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              {feature.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-brand text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Popular
                  </span>
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
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

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Anonymous</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient mb-2">Instant</div>
            <div className="text-sm text-muted-foreground">Tracking</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient mb-2">Secure</div>
            <div className="text-sm text-muted-foreground">Platform</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;