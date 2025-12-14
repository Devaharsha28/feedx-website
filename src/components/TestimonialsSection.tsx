import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';
import { noDataIllustration } from '@/lib/illustrations';
import { testimonialsAPI, Testimonial } from '@/lib/api';

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

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What students are saying about FeedX Nexus
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.length === 0 ? (
            <div className="col-span-full flex flex-col items-center text-center text-muted-foreground space-y-4">
              <img src={noDataIllustration} alt="No testimonials" className="w-full max-w-md" />
              <p>Testimonials will appear here.</p>
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-card hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  {/* Quote */}
                  <Quote className="w-8 h-8 text-primary mb-4 opacity-50" />

                  {/* Content */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
