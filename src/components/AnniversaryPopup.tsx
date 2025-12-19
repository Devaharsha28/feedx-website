import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnniversaryPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // show on first load per session
    const seen = sessionStorage.getItem('anniv_shown');
    if (!seen) {
      setShow(true);
      sessionStorage.setItem('anniv_shown', '1');
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
            className="relative w-[90vw] max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Gold fluid background using SVG gradient */}
            <div className="w-full h-72 bg-gradient-to-br from-[#2b2b2b] to-[#0b0b0b] flex items-center justify-center">
              <svg viewBox="0 0 800 300" className="w-full h-full">
                <defs>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffd54a" />
                    <stop offset="50%" stopColor="#ffb300" />
                    <stop offset="100%" stopColor="#ffeb3b" />
                  </linearGradient>
                  <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="10" result="b" />
                    <feBlend in="SourceGraphic" in2="b" />
                  </filter>
                </defs>
                <motion.path
                  d="M0,120 C150,200 300,40 450,120 C600,200 750,40 900,120 L900,400 L0,400 Z"
                  fill="url(#g1)"
                  filter="url(#f1)"
                  animate={{ d: [
                    'M0,120 C150,200 300,40 450,120 C600,200 750,40 900,120 L900,400 L0,400 Z',
                    'M0,100 C150,180 300,80 450,140 C600,200 750,60 900,140 L900,400 L0,400 Z',
                    'M0,120 C150,200 300,40 450,120 C600,200 750,40 900,120 L900,400 L0,400 Z'
                  ] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <img src="/feedx-logo.png" alt="FEEDX" className="w-36 h-36 mb-4 drop-shadow-xl" />
                <h2 className="text-3xl md:text-4xl font-extrabold text-black bg-gold/90 px-4 py-2 rounded-md">FEEDX — 1st Anniversary</h2>
                <p className="mt-3 text-sm text-black/80">Celebrating one year of listening, responding, and resolving.</p>
              </div>
            </div>

            <div className="p-6 bg-[#070707] flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Enjoy the celebrations — explore the special edition theme across the site.</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShow(false)}
                  className="px-4 py-2 rounded-md bg-white/90 text-black font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnniversaryPopup;
