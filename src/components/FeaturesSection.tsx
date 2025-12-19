import { motion } from 'framer-motion';
import AnniversaryPopup from '@/components/AnniversaryPopup';

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
    <section id="features" className="py-24 bg-[#111112] relative overflow-hidden">
      <AnniversaryPopup />
      {/* Anniversary gold confetti effect */}
      <div className="pointer-events-none select-none absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-black/80 via-[#222]/90 to-yellow-900/40 opacity-80" />
        <div className="absolute top-0 left-0 w-full flex justify-center mt-8 animate-bounce">
          <span className="text-3xl md:text-4xl font-bold text-gold drop-shadow-gold-glow">🎉 1st Anniversary Edition 🎉</span>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-gold drop-shadow-gold-glow">The SOK Model</span>
          </h2>
          <p className="text-lg text-gold/80">
            A career-driven approach for Polytechnic students: <span className="font-bold text-gold">Skills, Opportunities, and Knowledge</span> — powered by <span className="font-bold text-gold">X</span>.<br/>
            <span className="text-gold/70 font-semibold">Celebrating 1 Year of FEEDX!</span>
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
              whileHover={{ scale: 1.04, boxShadow: '0 0 32px 0 #FFD70055' }}
              className={`relative group bg-[#18181b] border border-gold/30 rounded-2xl p-8 shadow-xl transition-all duration-300 ${
                feature.highlight ? 'ring-2 ring-gold/40 glow-gold-soft' : ''
              }`}
            >
              {feature.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="bg-gold text-black text-xs font-semibold px-3 py-1 rounded-full shadow-gold-glow animate-pulse">
                    Popular
                  </span>
                </div>
              )}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <motion.div
                    className="w-12 h-12 bg-gold/90 rounded-lg flex items-center justify-center text-3xl font-extrabold text-black shadow-gold-glow border-2 border-gold/80"
                    whileHover={{ rotate: [0, 10, -10, 0], scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {feature.key}
                  </motion.div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-smooth">
                    {feature.title}
                  </h3>
                  <p className="text-gold/80">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Anniversary gold theme styles */}
        <style>{`
          .text-gold { color: #FFD700; }
          .bg-gold { background: #FFD700; }
          .shadow-gold-glow { box-shadow: 0 0 16px 0 #FFD70088, 0 2px 8px 0 #0002; }
          .glow-gold-soft { box-shadow: 0 0 32px 0 #FFD70033; }
          .ring-gold\/40 { box-shadow: 0 0 0 4px #FFD70066; }
          .drop-shadow-gold-glow { filter: drop-shadow(0 2px 8px #FFD70088); }
        `}</style>
      </div>
    </section>
  );
};

export default FeaturesSection;