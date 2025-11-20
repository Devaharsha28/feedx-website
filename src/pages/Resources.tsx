import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, Download, ExternalLink, Search, BookOpen, Calculator, Award, Users } from 'lucide-react';
import GlassmorphismBackground from '@/components/GlassmorphismBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Resources = () => {
  const resources = [
    {
      id: 1,
      title: "Industrial Training Guidelines",
      description: "Complete guide for industrial training including documentation, report writing, and assessment criteria.",
      type: "PDF Guide",
      size: "2.5 MB",
      downloads: 1250,
      category: "Training",
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 2,
      title: "Project Ideas Collection",
      description: "Curated collection of innovative project ideas for diploma students across all branches.",
      type: "PDF Document",
      size: "1.8 MB",
      downloads: 890,
      category: "Projects",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 3,
      title: "SBTET Circulars Archive",
      description: "Complete archive of all SBTET circulars, notifications, and important announcements.",
      type: "PDF Archive",
      size: "5.2 MB",
      downloads: 2100,
      category: "Official",
      icon: <Award className="w-5 h-5" />
    },
    {
      id: 4,
      title: "Resume Building Guide",
      description: "Step-by-step guide to create professional resumes tailored for polytechnic graduates.",
      type: "PDF Guide",
      size: "1.2 MB",
      downloads: 675,
      category: "Career",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 5,
      title: "POLYCET Prediction Tool",
      description: "Interactive tool to predict POLYCET ranks based on practice test scores.",
      type: "Web Tool",
      size: "Online",
      downloads: 450,
      category: "Exams",
      icon: <Calculator className="w-5 h-5" />
    },
    {
      id: 6,
      title: "College Information Directory",
      description: "Comprehensive directory of all polytechnic colleges in Telangana with contact details.",
      type: "PDF Directory",
      size: "3.1 MB",
      downloads: 980,
      category: "Information",
      icon: <FileText className="w-5 h-5" />
    }
  ];

  const quickLinks = [
    {
      title: "SBTET Official Portal",
      url: "https://www.sbtet.telangana.gov.in",
      description: "Official website for State Board of Technical Education & Training"
    },
    {
      title: "T-Engage Platform",
      url: "https://tengage.gov.in",
      description: "Telangana government's engagement platform for students"
    },
    {
      title: "E-Learning Portal",
      url: "https://elearning.sbtet.telangana.gov.in",
      description: "Online learning resources and course materials"
    },
    {
      title: "Scholarship Portal",
      url: "https://telanganaepass.cgg.gov.in",
      description: "Apply for various scholarships and financial aid"
    }
  ];

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
    <GlassmorphismBackground intensity="light" className="bg-gradient-flow">
      <Navbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 py-20 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-slide-up">
              Resources & <span className="text-gradient">Materials</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Access study materials, guides, tools, and important links to support your academic journey
            </p>
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
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {resources.map((resource, index) => (
            <Card key={resource.id} className="glass-card hover-glass transition-all duration-300 animate-fade-in hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {resource.icon}
                    </div>
                    <Badge className={`${getCategoryColor(resource.category)} text-white text-xs`}>
                      {resource.category}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {resource.type}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>Size: {resource.size}</span>
                  <span>{resource.downloads} downloads</span>
                </div>
                <Button className="w-full bg-gradient-brand hover:opacity-90 transition-smooth">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickLinks.map((link, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    {link.title}
                  </CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-smooth">
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
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
      </div>
      <Footer />
    </GlassmorphismBackground>
  );
};

export default Resources;