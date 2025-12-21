import { motion } from 'framer-motion';

const features = [
  {
    key: 'S',
    title: 'S — Skills',
    description: 'Training, certifications, freelancing, and projects to become job-ready.',
    highlight: true,
  },
  {
    key: 'O',
    title: 'O — Opportunities',
    description: 'Jobs, startups, internships, and industrial visits to build real exposure.',
    highlight: false,
  },
  {
    key: 'K',
    title: 'K — Knowledge',
    description: 'Notes, resources, workshops, and feedback sharing to learn continuously.',
    highlight: false,
  },
  {
    key: 'X',
    title: 'X — Exchange & Exposure',
    description: 'Exchange, exposure, and the X-Factor: limitless growth, innovation, and career possibilities.',
    highlight: true,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
            The SOK Model
          </h2>
          <p className="text-lg text-muted-foreground">
            A career-driven approach for Polytechnic students: <span className="font-bold text-primary">Skills, Opportunities, and Knowledge</span> — powered by <span className="font-bold text-primary">X</span>.<br />
            <span className="text-primary/80 font-semibold">Celebrating 1 Year of FEEDX!</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className={`relative group bg-white/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${feature.highlight ? 'border-primary/50 bg-primary/5' : ''
                }`}
            >
              {feature.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20">
                    Popular
                  </span>
                </div>
              )}
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-smooth">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;