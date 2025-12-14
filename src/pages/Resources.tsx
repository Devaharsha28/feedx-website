import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ExternalLink, Search, BookOpen, Award, Users, Briefcase, FileText, GraduationCap, ClipboardList } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { noDataIllustration, resourcesIllustration } from '@/lib/illustrations';
import { resourcesAPI, Resource as AdminResource } from '@/lib/api';

const Resources = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [adminResources, setAdminResources] = useState<AdminResource[]>([]);

  useEffect(() => {
    const fetchAdminResources = async () => {
      try {
        const data = await resourcesAPI.getAll();
        setAdminResources(data);
      } catch (error) {
        console.error('Failed to fetch admin resources:', error);
      }
    };
    fetchAdminResources();
  }, []);

  const resources = useMemo(
    () => [
      {
        id: 'gioe-qps',
        title: 'GIOE — Question Papers',
        description: 'Previous question papers and exam-focused materials.',
        category: 'Exams',
        type: 'Website',
        href: 'https://gioe.netlify.app/question-papers',
        icon: <FileText className="w-5 h-5" />,
      },
      {
        id: 'gioe-notes',
        title: 'GIOE — Lecture Notes',
        description: 'Notes and subject-wise learning materials.',
        category: 'Training',
        type: 'Website',
        href: 'https://gioe.netlify.app/notes',
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        id: 'gioe-courses',
        title: 'GIOE — Free Courses',
        description: 'Free courses and curated learning paths.',
        category: 'Training',
        type: 'Website',
        href: 'https://gioe.netlify.app/free-courses',
        icon: <GraduationCap className="w-5 h-5" />,
      },
      {
        id: 'gioe-jobs',
        title: 'GIOE — Job Openings',
        description: 'Job openings and career opportunities.',
        category: 'Career',
        type: 'Website',
        href: 'https://gioe.netlify.app/job-openings',
        icon: <Briefcase className="w-5 h-5" />,
      },
      {
        id: 'gioe-interview',
        title: 'GIOE — Interview Preparation',
        description: 'Interview prep resources for placements and internships.',
        category: 'Career',
        type: 'Website',
        href: 'https://gioe.netlify.app/interview-prep',
        icon: <Award className="w-5 h-5" />,
      },
      {
        id: 'gioe-studybuddy',
        title: 'StudyBuddy AI (GIOE)',
        description: 'AI-powered study buddy experience from the GIOE portal.',
        category: 'Information',
        type: 'Website',
        href: 'https://gioe.netlify.app/studybuddy',
        icon: <Users className="w-5 h-5" />,
      },
      {
        id: 'ecetrix',
        title: 'ECETRIX',
        description: 'External portal for ECET resources and related tools.',
        category: 'Exams',
        type: 'Website',
        href: 'https://ecetrix.netlify.app',
        icon: <ClipboardList className="w-5 h-5" />,
      },
      {
        id: 'cvgen',
        title: 'CV Generator',
        description: 'Generate a clean CV/resume quickly.',
        category: 'Career',
        type: 'Website',
        href: 'https://cv-generator-v1.netlify.app/',
        icon: <FileText className="w-5 h-5" />,
      },
      {
        id: 'student-analytics-demo',
        title: 'Student Analytics (Demo)',
        description: 'Demo build of Student Analytics UI for review and testing.',
        category: 'Projects',
        type: 'Website',
        href: 'https://ideal-meme-69wvggpj5x993r565-8080.app.github.dev/student-analytics',
        icon: <ExternalLink className="w-5 h-5" />,
      },
      {
        id: 'gioe-home',
        title: 'GIOE Portal (Home)',
        description: 'Government Institute of Electronics portal — papers, notes, courses, jobs.',
        category: 'Official',
        type: 'Website',
        href: 'https://gioe.netlify.app/',
        icon: <ExternalLink className="w-5 h-5" />,
      },
    ],
    []
  );

  const quickLinks = useMemo(
    () => [
      {
        title: 'GIOE Portal',
        description: 'Papers, notes, courses, and job openings.',
        href: 'https://gioe.netlify.app/',
      },
      {
        title: 'Student Analytics (Demo)',
        description: 'Preview the analytics UI.',
        href: 'https://ideal-meme-69wvggpj5x993r565-8080.app.github.dev/student-analytics',
      },
    ],
    []
  );

  const filteredResources = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return resources;
    return resources.filter((r) => {
      const hay = `${r.title} ${r.description} ${r.category} ${r.type}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, resources]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Training': return 'bg-blue-500';
      case 'Projects': return 'bg-green-500';
      case 'Official': return 'bg-red-500';
      case 'Career': return 'bg-purple-500';
      case 'Exams': return 'bg-orange-500';
      case 'Information': return 'bg-teal-500';
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
          <div className="flex flex-col items-center text-center gap-6">
            <img src={resourcesIllustration} alt="Resources" className="w-full max-w-md" />
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold mb-3">
                Resources & Materials
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Access study materials, guides, tools, and important links to support your academic journey
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search resources..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Admin Resources Section */}
        {adminResources.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="border border-border transition-all duration-300 hover:shadow-lg cursor-pointer"
                  onClick={() => navigate(`/resources/${resource.id}`)}
                >
                  <CardHeader>
                    {resource.images.length > 0 && (
                      <img
                        src={resource.images[0]}
                        alt={resource.title}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                    )}
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                    {resource.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {resource.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-brand hover:opacity-90 transition-smooth">
                      View Details
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Resources Grid */}
        {adminResources.length === 0 ? (
          <div className="col-span-full flex flex-col items-center text-center text-muted-foreground space-y-4 py-12">
            <img src={noDataIllustration} alt="No resources" className="w-full max-w-md" />
            <p>No resources added yet. Go to Admin Panel to create resources.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-8">Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {adminResources.map((resource, index) => (
                <Card key={resource.id} className="border border-border transition-all duration-300 animate-fade-in hover:shadow-md cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => navigate(`/resources/${resource.id}`)}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-gradient-brand text-white text-xs">
                        Resource
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-brand hover:opacity-90 transition-smooth">
                      View Details
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        {filteredResources.length > 0 && (
          <div className="text-center">
            <Card className="max-w-2xl mx-auto glass-card border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Need Help Finding Resources?</h2>
                <p className="text-muted-foreground mb-6">
                  Can't find what you're looking for? Let us know what resources you need,
                  and we'll help you find the right materials for your branch and semester.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-brand hover:opacity-90 transition-smooth glow-primary">
                    Request Resource
                  </Button>
                  <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Resources;