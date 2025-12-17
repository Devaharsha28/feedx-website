import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Info, BookOpen, Award, Share2, Download, Clock, X, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { noDataIllustration, updatesIllustration } from '@/lib/illustrations';
import { updatesAPI, Update } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const Updates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUpdate, setSelectedUpdate] = useState<Update | null>(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const data = await updatesAPI.getAll();
        console.log('Fetched updates:', data);
        setUpdates(data || []);
      } catch (error) {
        console.error('Failed to fetch updates:', error);
        setUpdates([]);
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

  const handleShare = async (updateId: string) => {
    const url = `${window.location.origin}/updates#${updateId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Update link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  const formatDate = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <div className="border-b border-border bg-background pt-24 pb-10">
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
        {/* Updates List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {updates.length === 0 ? (
            <div className="flex flex-col items-center text-center text-muted-foreground space-y-4 py-12">
              <img src={noDataIllustration} alt="No updates" className="w-full max-w-md" />
              <p>No updates available.</p>
            </div>
          ) : (
          updates.map((update, index) => (
            <Card key={update.id} className={`border transition-all ${index === 0 ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
              {index === 0 && (
                <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  MOST RECENT
                </div>
              )}
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-full ${getTypeColor(update.type || 'announcement')} text-white flex-shrink-0`}>
                      {getTypeIcon(update.type || 'announcement')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1">{update.title || 'Untitled'}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <span>{update.category || 'General'}</span>
                        <span>•</span>
                        <span>{formatDate(update.timestamp)}</span>
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-2">{update.description || 'No description available'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Badge className={`${getPriorityColor(update.priority || 'medium')} text-white`}>
                      {(update.priority || 'medium').toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedUpdate(update)}
                  >
                    Read More
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleShare(update.id)}
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
          )}
        </div>
      </div>

      {/* Detailed View Dialog */}
      {selectedUpdate && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedUpdate(null)}
        >
          <Card 
            className="max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="sticky top-0 bg-background border-b z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-full ${getTypeColor(selectedUpdate.type || 'announcement')} text-white flex-shrink-0`}>
                    {getTypeIcon(selectedUpdate.type || 'announcement')}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{selectedUpdate.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>{selectedUpdate.category || 'General'}</span>
                      <span>•</span>
                      <span>{formatDate(selectedUpdate.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedUpdate(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex gap-2">
                <Badge className={`${getPriorityColor(selectedUpdate.priority || 'medium')} text-white`}>
                  {(selectedUpdate.priority || 'medium').toUpperCase()}
                </Badge>
                <Badge variant="outline">
                  {selectedUpdate.type || 'announcement'}
                </Badge>
              </div>

              <p className="text-foreground">{selectedUpdate.description}</p>

              {/* Images */}
              {selectedUpdate.images && selectedUpdate.images.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Images</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedUpdate.images.map((img, idx) => (
                      <img 
                        key={idx} 
                        src={img} 
                        alt={`Image ${idx + 1}`} 
                        className="w-full h-auto rounded-lg border border-border cursor-pointer hover:opacity-90 transition"
                        onClick={() => window.open(img, '_blank')}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Files */}
              {selectedUpdate.files && selectedUpdate.files.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Attached Files</h4>
                  <div className="space-y-2">
                    {selectedUpdate.files.map((file, idx) => {
                      const fileName = file.split('/').pop() || `file-${idx + 1}`;
                      const extension = fileName.split('.').pop()?.toUpperCase() || 'FILE';
                      return (
                        <div 
                          key={idx} 
                          className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent transition cursor-pointer"
                          onClick={() => window.open(file, '_blank')}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{fileName}</p>
                              <Badge variant="secondary" className="text-xs mt-1">{extension}</Badge>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => handleShare(selectedUpdate.id)}
                  className="flex-1"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Updates;