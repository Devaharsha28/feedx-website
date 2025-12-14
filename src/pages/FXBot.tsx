import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageCircle, ShieldCheck, Timer } from 'lucide-react';
import fxbotIcon from '@/assets/fxbot-icon.svg';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FXBot = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="border-b border-border bg-white pt-24 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-brand rounded-full blur-2xl opacity-30" />
            <img src={fxbotIcon} alt="FX Bot" className="relative h-20 w-20 rounded-2xl" />
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <h1 className="text-4xl sm:text-5xl font-bold">FX Bot</h1>
              <Badge className="bg-blue-500 text-white">In progress</Badge>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              FX Bot is an anonymous student feedback platform for TG Polytechnic students—share issues, suggestions,
              and concerns without revealing your identity.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                What FX Bot will do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-muted/40 p-5">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <MessageCircle className="w-4 h-4" />
                    Feedback first, simple flow
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Submit feedback in a clear format so it’s easy to understand and act on.
                  </p>
                </div>
                <div className="rounded-2xl bg-muted/40 p-5">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    Anonymous + trackable
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Designed around reference IDs so updates can be followed without exposing personal details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                FX Bot is currently in development. No interactive demo is available on this page yet.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FXBot;