import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Bell, AlertTriangle, Info, BookOpen, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { noDataIllustration, updatesIllustration } from '@/lib/illustrations';
import { updatesAPI, Update } from '@/lib/api';

const Updates = () => {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const data = await updatesAPI.getAll();
        setUpdates(data);
      } catch (error) {
        console.error('Failed to fetch updates:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exam': return <BookOpen className="w-5 h-5" />;
      case 'circular': return <Info className="w-5 h-5" />;
      case 'result': return <Award className="w-5 h-5" />;
      case 'announcement': return <Bell className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-blue-500';
      case 'circular': return 'bg-purple-500';
      case 'result': return 'bg-green-500';
      case 'announcement': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <div className="border-b border-border bg-white pt-24 pb-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              ← Back
            </Button>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold mb-3">
                  Latest Updates
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Stay informed with the latest announcements, exam schedules, and important notifications
                </p>
              </div>
              <img src={updatesIllustration} alt="Updates" className="w-full max-w-md" />
            </div>
          </div>
        </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        {updates.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-red-500">3</h3>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-blue-500">2</h3>
              <p className="text-sm text-muted-foreground">Exam Updates</p>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-green-500">1</h3>
              <p className="text-sm text-muted-foreground">Results</p>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-purple-500">6</h3>
              <p className="text-sm text-muted-foreground">Total Updates</p>
            </CardContent>
          </Card>
        </div>
        )}

        {/* Updates List */}
        <div className="space-y-6">
          {updates.length === 0 ? (
            <div className="flex flex-col items-center text-center text-muted-foreground space-y-4">
              <img src={noDataIllustration} alt="No updates" className="w-full max-w-md" />
              <p>No updates available.</p>
            </div>
          ) : (
          updates.map((update, index) => (
            <Card key={update.id} className="border border-border animate-fade-in hover:shadow-md transition-shadow" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${getTypeColor(update.type)} text-white`}>
                      {getTypeIcon(update.type)}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{update.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(update.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={`${getPriorityColor(update.priority)} text-white`}>
                      {update.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">
                      {update.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{update.description}</p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                  <Button variant="outline" size="sm">
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto glass-card border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-6">
                Want to get instant notifications for all updates? Subscribe to our newsletter and never miss important announcements.
              </p>
              <Button size="lg" className="bg-gradient-brand hover:opacity-90 transition-smooth glow-primary">
                Subscribe for Updates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Updates;