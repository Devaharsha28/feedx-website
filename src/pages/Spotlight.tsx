import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Calendar, MapPin, Users, Instagram, Heart, MessageCircle, Share2 } from 'lucide-react';
import GlassmorphismBackground from '@/components/GlassmorphismBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Spotlight = () => {
  const events = [
    {
      id: 1,
      title: "Industrial Visit to TCS",
      date: "March 15, 2024",
      location: "TCS Hyderabad Campus",
      attendees: 45,
      category: "Industrial Visit",
      images: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
      ],
      description: "Students visited TCS Hyderabad campus for an industrial exposure program."
    },
    {
      id: 2,
      title: "Technical Workshop on IoT",
      date: "March 10, 2024",
      location: "FEEDX Polytechnic Lab",
      attendees: 32,
      category: "Workshop",
      images: [
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop"
      ],
      description: "Hands-on workshop on Internet of Things applications and implementations."
    },
    {
      id: 3,
      title: "Annual Sports Meet 2024",
      date: "February 28, 2024",
      location: "College Ground",
      attendees: 120,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=400&h=300&fit=crop"
      ],
      description: "Annual sports meet with various athletic events and competitions."
    },
    {
      id: 4,
      title: "Cultural Fest - Rangoli Competition",
      date: "February 20, 2024",
      location: "College Auditorium",
      attendees: 85,
      category: "Cultural",
      images: [
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
      ],
      description: "Traditional rangoli competition showcasing Telangana culture and art."
    }
  ];

  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop",
      likes: 245,
      comments: 12,
      caption: "Exciting workshop on emerging technologies! 🚀 #FEEDX #Polytechnic #TechWorkshop",
      date: "2 days ago"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop",
      likes: 189,
      comments: 8,
      caption: "Students learning practical skills in our state-of-the-art labs 💡 #Engineering #Learning",
      date: "5 days ago"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop",
      likes: 312,
      comments: 15,
      caption: "Annual day celebrations! Celebrating achievements and talents 🎉 #AnnualDay #FEEDX",
      date: "1 week ago"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop",
      likes: 156,
      comments: 6,
      caption: "Industrial visit to leading tech companies. Great learning experience! 🏭 #IndustrialVisit",
      date: "2 weeks ago"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Industrial Visit': return 'bg-blue-500';
      case 'Workshop': return 'bg-green-500';
      case 'Sports': return 'bg-orange-500';
      case 'Cultural': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <GlassmorphismBackground intensity="medium" className="bg-gradient-mesh">
      <Navbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 py-20 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-slide-up">
              <span className="text-gradient">Spotlight</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Capturing moments, celebrating achievements, and showcasing our vibrant community
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Event Spotlight
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center gap-2">
              <Instagram className="w-4 h-4" />
              Instagram Feed
            </TabsTrigger>
          </TabsList>

          {/* Events Gallery */}
          <TabsContent value="events" className="space-y-8">
            {events.map((event, index) => (
              <Card key={event.id} className="overflow-hidden glass-card hover-glass animate-fade-in hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Event Images */}
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {event.images.map((image, imgIndex) => (
                        <div key={imgIndex} className="relative group cursor-pointer">
                          <img
                            src={image}
                            alt={`${event.title} - Image ${imgIndex + 1}`}
                            className="w-full h-32 sm:h-40 object-cover rounded-lg transition-transform group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${getCategoryColor(event.category)} text-white text-xs`}>
                          {event.category}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-smooth">
                      View All Photos
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Instagram Feed */}
          <TabsContent value="instagram" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Follow Us on Instagram</h2>
              <p className="text-muted-foreground mb-6">
                Stay updated with our latest activities, achievements, and community events
              </p>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-smooth">
                <Instagram className="w-4 h-4 mr-2" />
                Follow @feedx_polytechnic
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {instagramPosts.map((post, index) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative">
                    <img
                      src={post.image}
                      alt="Instagram post"
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm mb-2 line-clamp-2">{post.caption}</p>
                        <div className="flex items-center gap-4 text-white text-sm">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
                <Instagram className="w-4 h-4 mr-2" />
                View More on Instagram
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <Camera className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-4">Share Your Moments</h2>
              <p className="text-muted-foreground mb-6">
                Have photos from our events or activities? Share them with the community!
                Tag us on Instagram or send them to our email.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-brand hover:opacity-90 transition-smooth">
                  Upload Photos
                </Button>
                <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </GlassmorphismBackground>
  );
};

export default Spotlight;
