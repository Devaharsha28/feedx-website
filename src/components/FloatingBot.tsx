import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fxbotIcon from '@/assets/fxbot-icon.svg';

const FloatingBot = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: 80 });
  const [isMoving, setIsMoving] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const moveBot = () => {
      if (isMobile) return; // Don't move on mobile

      setIsMoving(true);
      
      // Random position on screen
      const newX = Math.random() * (window.innerWidth - 80);
      const newY = Math.random() * (window.innerHeight - 80);
      
      setTargetPosition({ x: newX, y: newY });
      setPosition({ x: newX, y: newY });

      // After 3 seconds, return to menu area (top right)
      setTimeout(() => {
        setTargetPosition({ x: window.innerWidth - 100, y: 80 });
        setPosition({ x: window.innerWidth - 100, y: 80 });
        setIsMoving(false);
      }, 3000);
    };

    // Start moving after initial load (only on desktop)
    if (!isMobile) {
      const initialTimeout = setTimeout(moveBot, 2000);
      
      // Continue moving every 8 seconds
      const interval = setInterval(moveBot, 8000);

      return () => {
        clearTimeout(initialTimeout);
        clearInterval(interval);
      };
    }
  }, [isMobile]);

  return (
    <div
      className={`fixed z-50 cursor-pointer group ${isMobile ? 'bottom-4 right-4' : ''}`}
      onClick={() => navigate('/fxbot')}
      style={!isMobile ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isMoving ? 'all 2s cubic-bezier(0.4, 0, 0.2, 1)' : 'all 0.3s ease-out',
      } : {}}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full bg-gradient-brand opacity-50 blur-xl animate-pulse-glow ${isMobile ? 'w-16 h-16' : 'w-20 h-20'}`} />
        
        {/* Bot icon - default state */}
        <img
          src={fxbotIcon}
          alt="FX Bot"
          className={`relative rounded-full shadow-glow transform transition-all duration-300 group-hover:opacity-0 group-hover:scale-90 ${!isMoving && !isMobile ? 'animate-idle-bounce' : ''} ${isMobile ? 'w-16 h-16' : 'w-20 h-20'}`}
        />
        
        {/* Hover state uses the same icon (no separate character asset) */}
        <img
          src={fxbotIcon}
          alt="FX Bot Character"
          className={`absolute inset-0 object-contain opacity-0 scale-90 transform transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12 ${isMobile ? 'w-16 h-16' : 'w-20 h-20'}`}
        />
        
        {/* Hover tooltip */}
        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-card rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10 ${isMobile ? 'hidden' : ''}`}>
          <p className="text-sm font-medium text-foreground">FX Bot Assistant</p>
        </div>
      </div>
    </div>
  );
};

export default FloatingBot;