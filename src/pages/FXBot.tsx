import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageCircle, ShieldCheck, Timer } from 'lucide-react';
import fxbotIcon from '@/assets/fxbot-icon.svg';
import Navbar from '@/components/Navbar';


const FXBot = () => {
  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div className="h-[70px] sm:h-[80px] lg:h-[85px] w-full flex-shrink-0" />

      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <iframe
          src="/fxbot-app/"
          className="w-full h-full border-0"
          title="FX Bot"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </main>
    </div>
  );
};

export default FXBot;