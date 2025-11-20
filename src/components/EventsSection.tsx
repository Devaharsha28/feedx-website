import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit 2025",
      date: "December 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Main Auditorium",
      attendees: 250,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&h=360&fit=crop",
      description: "Join industry leaders and innovators for a day of cutting-edge technology discussions and networking opportunities."
    },
    {
      id: 2,
      title: "Career Development Workshop",
      date: "December 18, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Conference Room A",
      attendees: 80,
      category: "Career",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=640&h=360&fit=crop",
      description: "Learn essential skills for career advancement including resume building, interview techniques, and professional networking."
    },
    {
      id: 3,
      title: "Cultural Diversity Festival",
      date: "December 20, 2025",
      time: "10:00 AM - 8:00 PM",
      location: "Campus Grounds",
      attendees: 500,
      category: "Culture",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=640&h=360&fit=crop",
      description: "Celebrate diversity with performances, food stalls, and cultural exhibitions from around the world."
    },
    {
      id: 4,
      title: "AI & Machine Learning Conference",
      date: "December 22, 2025",
      time: "10:00 AM - 6:00 PM",
      location: "Tech Hub",
      attendees: 150,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=640&h=360&fit=crop",
      description: "Explore the latest developments in AI and ML with expert speakers and hands-on workshops."
    },
    {
      id: 5,
      title: "Entrepreneurship Bootcamp",
      date: "January 5, 2026",
      time: "9:00 AM - 5:00 PM",
      location: "Innovation Center",
      attendees: 60,
      category: "Business",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=640&h=360&fit=crop",
      description: "Transform your ideas into successful businesses with mentorship from experienced entrepreneurs."
    },
    {
      id: 6,
      title: "Mental Health Awareness Week",
      date: "January 12-16, 2026",
      time: "Various Times",
      location: "Student Center",
      attendees: 300,
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=640&h=360&fit=crop",
      description: "A week dedicated to mental health awareness with counseling sessions, workshops, and support groups."
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technology': return 'bg-blue-500';
      case 'Career': return 'bg-green-500';
      case 'Culture': return 'bg-purple-500';
      case 'Business': return 'bg-orange-500';
      case 'Wellness': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay connected with the latest campus events, workshops, and activities
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="bg-card hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Event Image - 16:9 aspect ratio */}
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`${getCategoryColor(event.category)} text-white`}>
                    {event.category}
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
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    {event.attendees} attending
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-gradient-brand hover:opacity-90 transition-smooth">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Want to stay updated with all events?
          </p>
          <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;