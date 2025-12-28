import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CelebrationEffects from './CelebrationEffects';

const AnniversaryPopup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // show on first load per session
    const seen = sessionStorage.getItem('anniv_shown');
    if (!seen) {
      setShow(true);
      sessionStorage.setItem('anniv_shown', '1');
    }
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShow(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-start sm:justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-8 overflow-y-auto"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            className="relative w-full max-w-lg bg-card border-none rounded-2xl overflow-hidden shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Celebration Header */}
            <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-primary p-1">
              <div className="bg-background w-full h-full rounded-t-xl" />
            </div>

            {/* Close Button */}
            <button
              aria-label="Close"
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-muted/80 hover:bg-muted text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>

            <div className="flex flex-col items-center text-center p-8 pt-10">
              {/* Animated Icon or Image */}
              <div className="w-20 h-20 mb-6 rounded-full bg-blue-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-400/20 animate-pulse" />
                <span className="text-4xl">🎉</span>
              </div>

              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                FEEDX turns 1!
              </h2>

              <p className="text-muted-foreground mb-6">
                Celebrating one year of listening, responding, and resolving. Thank you for being part of our journey.
              </p>

              {/* Special Image - Full Size Display */}
              <div className="rounded-xl overflow-hidden shadow-lg border border-border mb-6 w-full relative group bg-white">
                <img src="/images/1stanniversary.jpg" alt="1st Anniversary" className="w-full h-auto object-contain" />
              </div>

              <button
                onClick={() => {
                  setShow(false);
                  navigate('/celebrations');
                }}
                className="w-full sm:w-auto px-8 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium shadow-md transition-all transform hover:scale-105"
              >
                Join the Celebration
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnniversaryPopup;
