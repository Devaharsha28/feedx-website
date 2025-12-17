import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { noDataIllustration } from '@/lib/illustrations';
import { testimonialsAPI, Testimonial } from '@/lib/api';
import { Marquee } from '@/components/ui/marquee';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialsAPI.getAll();
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        setTestimonials([]);
      }
    };
    fetchTestimonials();
  }, []);

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <Card className="w-56 bg-card/80 backdrop-blur-sm border-white/10">
      <CardContent className="p-4">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9">
            <AvatarImage src={testimonial.image} alt={testimonial.name} />
            <AvatarFallback className="bg-primary/20 text-primary text-sm">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-foreground flex items-center gap-1">
              {testimonial.name}
            </figcaption>
            <p className="text-xs font-medium text-muted-foreground">{testimonial.title}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm text-muted-foreground line-clamp-3">
          "{testimonial.content}"
        </blockquote>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What students are saying about FeedX Nexus
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="flex flex-col items-center text-center text-muted-foreground space-y-4">
            <img src={noDataIllustration} alt="No testimonials" className="w-full max-w-md" />
            <p>Testimonials will appear here.</p>
          </div>
        ) : (
          <div className="border border-border rounded-lg relative flex h-96 w-full max-w-4xl mx-auto flex-row items-center justify-center overflow-hidden gap-1.5 [perspective:300px]">
            <div
              className="flex flex-row items-center gap-4"
              style={{
                transform:
                  'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
              }}
            >
              {/* Vertical Marquee (downwards) */}
              <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={`col1-${testimonial.id}`} testimonial={testimonial} />
                ))}
              </Marquee>
              {/* Vertical Marquee (upwards) */}
              <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:40s]">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={`col2-${testimonial.id}`} testimonial={testimonial} />
                ))}
              </Marquee>
              {/* Vertical Marquee (downwards) */}
              <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={`col3-${testimonial.id}`} testimonial={testimonial} />
                ))}
              </Marquee>
              {/* Vertical Marquee (upwards) */}
              <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:40s]">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={`col4-${testimonial.id}`} testimonial={testimonial} />
                ))}
              </Marquee>
              {/* Gradient overlays for vertical marquee */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
