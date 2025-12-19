import { useState, useEffect } from 'react';
import { Heart, Instagram, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { noDataIllustration, spotlightIllustration } from '@/lib/illustrations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { spotlightAPI, Spotlight as SpotlightItem } from '@/lib/api';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

const Spotlight = () => {
  const [spotlights, setSpotlights] = useState<SpotlightItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpotlights = async () => {
      try {
        const data = await spotlightAPI.getAll();
        setSpotlights(data);
      } catch (error) {
        console.error('Failed to fetch spotlights:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSpotlights();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="relative border-b border-border bg-background pt-16 pb-8 sm:pt-24 sm:pb-10 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 opacity-80 blur-2xl" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-5 sm:gap-6">
          <img
            src={spotlightIllustration}
            alt="Spotlight"
            className="w-full max-w-sm sm:max-w-md animate-float"
            loading="eager"
            decoding="async"
            width={640}
            height={360}
          />
          <div className="flex-1">
            <h1 className="text-3xl sm:text-5xl font-bold mb-3 text-gradient">Spotlight</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Capturing moments, celebrating achievements, and showcasing our vibrant community
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Featured Spotlights */}
          {spotlights.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-8">Spotlight Moments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spotlights.map((spotlight, index) => (
                  <Card key={spotlight.id} className="overflow-hidden border border-border transition-all duration-300 animate-fade-in hover:shadow-lg" style={{ animationDelay: `${index * 0.1}s` }}>
                    {spotlight.images.length > 0 && (
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={spotlight.images[0]}
                          alt={spotlight.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg">{spotlight.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground mb-4">
                        <MarkdownRenderer content={spotlight.description || '*No description available.*'} />
                      </div>
                      {spotlight.images.length > 1 && (
                        <div className="flex gap-2 flex-wrap">
                          {spotlight.images.slice(1).map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`Spotlight ${idx}`}
                              className="h-16 w-16 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                            />
                          ))}
                        </div>
                      )}
                      <Button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-smooth">
                        View More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Follow Us on Instagram</h2>
            <p className="text-muted-foreground mb-6">
              Stay updated with our latest activities, achievements, and community posts.
            </p>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-smooth">
              <Instagram className="w-4 h-4 mr-2" />
              Follow @feedx_polytechnic
            </Button>
          </div>

          {spotlights.length === 0 && (
            <div className="flex flex-col items-center text-center text-muted-foreground space-y-4 py-12">
              <img
                src={noDataIllustration}
                alt="No spotlights"
                className="w-full max-w-md"
                loading="lazy"
                decoding="async"
                width={640}
                height={360}
              />
              <p>No spotlights available yet.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Spotlight;
