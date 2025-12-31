import { useEffect, useState } from 'react';
import { Play, Quote } from 'lucide-react';
import { testimonialsAPI, Testimonial } from '@/lib/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialsAPI.getAll();
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);

  const videoIds = [
    "10NvrXXcPTPK_wm3khDXsGmIZh12QS7mZ",
    "1sQu23bgk4AgjzNUc2oDl5CpZGH_wtAwr"
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 border border-primary/20">
            <Play className="size-3 fill-current" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">Testimonials</span>
          </h2>

        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto mb-24">
          {videoIds.map((id) => (
            <div key={id} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-black shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                <iframe
                  src={`https://drive.google.com/file/d/${id}/preview`}
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  onError={(e) => {
                    console.warn('Drive video embed failed, falling back to link');
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.fallback-link') as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                ></iframe>
                <a
                  href={`https://drive.google.com/file/d/${id}/view`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fallback-link w-full h-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-colors"
                  style={{ display: 'none' }}
                >
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                    <p className="text-lg font-semibold">Watch Testimonial</p>
                    <p className="text-sm opacity-75">Opens in Google Drive</p>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Testimonials Grid */}
        {testimonials.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                What Students Are Saying
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors group">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-primary/20 mb-4 group-hover:text-primary/40 transition-colors" />
                    <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center gap-4 mt-auto">
                      <Avatar className="h-10 w-10 border border-primary/10">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground leading-none mb-1">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
