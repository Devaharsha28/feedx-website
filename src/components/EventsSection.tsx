import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { noDataIllustration } from '@/lib/illustrations';
import { eventsAPI, Event } from '@/lib/api';

const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsAPI.getAll();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Workshops and campus updates will be posted here.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full flex flex-col items-center text-center text-muted-foreground space-y-4">
              <p>Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="col-span-full flex flex-col items-center text-center text-muted-foreground space-y-4">
              <img src={noDataIllustration} alt="No events" className="w-full max-w-md" />
              <p>No events posted yet.</p>
            </div>
          ) : (
            events.map((event) => (
              <Card key={event.id} className="bg-card hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Event Image - 16:9 aspect ratio */}
                <div className="relative overflow-hidden">
                  <img
                    src={event.image || noDataIllustration}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = noDataIllustration;
                    }}
                  />
                </div>

                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {event.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Event Details */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>

                  {/* Action Button */}
                  {event.registerLink && event.registerLink !== '#' && (
                    <Button 
                      className="w-full bg-gradient-brand hover:opacity-90 transition-smooth"
                      onClick={() => window.open(event.registerLink, '_blank')}
                    >
                      Register Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default EventsSection;