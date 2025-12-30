import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users, FileText, Image as ImageIcon, Download } from 'lucide-react';
import { noDataIllustration } from '@/lib/illustrations';
import { eventsAPI, Event } from '@/lib/api';

const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsAPI.getAll();
        // Ensure all events have a status property (migration for existing data)
        const normalizedData = data.map(e => ({
          ...e,
          status: e.status || 'upcoming'
        }));
        setEvents(normalizedData);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const conductedEvents = events.filter(e => e.status === 'conducted');

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
        <div className="space-y-16">
          {isLoading ? (
            <div className="flex flex-col items-center text-center text-muted-foreground space-y-4">
              <p>Loading events...</p>
            </div>
          ) : (
            <>
              {/* Upcoming Events Section */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium mb-6">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Live & Upcoming
                </div>
                {upcomingEvents.length === 0 ? (
                  <div className="flex flex-col items-center text-center text-muted-foreground space-y-4 py-10 bg-muted/30 rounded-2xl border border-dashed">
                    <p>No upcoming events scheduled yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </div>

              {/* Conducted Events Section */}
              {conductedEvents.length > 0 && (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-6">
                    <Users className="w-4 h-4" />
                    Conducted Events
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {conductedEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              )}

              {events.length === 0 && !isLoading && (
                <div className="flex flex-col items-center text-center text-muted-foreground space-y-4">
                  <img src={noDataIllustration} alt="No events" className="w-full max-w-md" />
                  <p>No events posted yet.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const EventCard = ({ event }: { event: Event }) => (
  <Card className="bg-card hover:shadow-xl transition-all duration-300 overflow-hidden group">
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
      <div className="absolute top-3 right-3">
        <Badge className={event.status === 'upcoming' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}>
          {event.status === 'upcoming' ? 'Upcoming' : 'Conducted'}
        </Badge>
      </div>
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
        <div className="flex items-center text-sm font-medium">
          <Calendar className="w-4 h-4 mr-2 text-primary" />
          {event.date === "Coming Soon" ? (
            <span className="text-primary animate-pulse">Coming Soon</span>
          ) : (
            <span className="text-muted-foreground">{event.date}</span>
          )}
        </div>
        <div className="flex items-center text-sm font-medium">
          <Clock className="w-4 h-4 mr-2 text-primary" />
          {event.time === "TBA" ? (
            <span className="text-primary italic">To be announced</span>
          ) : (
            <span className="text-muted-foreground">{event.time}</span>
          )}
        </div>
        <div className="flex items-center text-sm font-medium text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          {event.location}
        </div>
      </div>

      {/* Event Files / Gallery */}
      {event.files && event.files.length > 0 && (
        <div className="space-y-3 pt-2">
          {/* Images Gallery */}
          {event.files.filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f)).length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                Event Gallery
              </p>
              <div className="grid grid-cols-4 gap-2">
                {event.files.filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f)).map((file, idx) => (
                  <div key={idx} className="aspect-square rounded-md overflow-hidden border border-border cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.open(file, '_blank')}>
                    <img src={file} alt={`Event ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Files */}
          {event.files.filter(f => !/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f)).length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                <FileText className="w-3 h-3" />
                Resources
              </p>
              <div className="flex flex-wrap gap-2">
                {event.files.filter(f => !/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f)).map((file, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    size="sm"
                    className="h-7 text-[10px] bg-secondary/50 hover:bg-secondary"
                    onClick={() => window.open(file, '_blank')}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    {file.split('/').pop()?.substring(0, 15)}...
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Button */}
      {event.registerLink && event.registerLink !== '#' && event.status === 'upcoming' && (
        <Button
          className="w-full bg-gradient-brand hover:opacity-90 transition-smooth"
          onClick={() => window.open(event.registerLink, '_blank')}
        >
          Register Now
        </Button>
      )}
      {event.status === 'conducted' && (
        <Button
          variant="outline"
          className="w-full transition-smooth"
          onClick={() => window.open(event.registerLink, '_blank')}
        >
          View Details
        </Button>
      )}
    </CardContent>
  </Card>
);

export default EventsSection;