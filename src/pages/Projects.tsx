import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Users, Megaphone, Lightbulb, Code, Target, ArrowRight } from 'lucide-react';
import GlassmorphismBackground from '@/components/GlassmorphismBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "FX BOT",
      subtitle: "Smart Feedback Assistant",
      description: "An AI-powered chatbot that helps students submit anonymous feedback, track issues, and get instant responses to their queries.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=250&fit=crop",
      status: "Active",
      category: "Technology",
      features: ["Anonymous Feedback", "Real-time Tracking", "AI Responses", "WhatsApp Integration"],
      icon: <Bot className="w-8 h-8" />
    },
    {
      id: 2,
      title: "Industrial Training Support",
      subtitle: "Internship Guidance & Documentation",
      description: "Comprehensive support system for industrial training including documentation help, internship opportunities, and training guidance.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      status: "Active",
      category: "Career",
      features: ["Documentation Help", "Internship Listings", "Training Guidance", "Progress Tracking"],
      icon: <Users className="w-8 h-8" />
    },
    {
      id: 3,
      title: "Awareness Drives",
      subtitle: "Info Campaigns & Motivational Initiatives",
      description: "Educational campaigns about exam alerts, training opportunities, career guidance, and motivational content for students.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      status: "Active",
      category: "Education",
      features: ["Exam Alerts", "Career Guidance", "Motivational Content", "Training Updates"],
      icon: <Megaphone className="w-8 h-8" />
    },
    {
      id: 4,
      title: "Startups Hub",
      subtitle: "Entrepreneurship & Innovation",
      description: "Platform for students to collaborate on innovative projects, explore entrepreneurship, and connect with like-minded innovators.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop",
      status: "Coming Soon",
      category: "Innovation",
      features: ["Project Collaboration", "Mentorship", "Funding Guidance", "Innovation Challenges"],
      icon: <Lightbulb className="w-8 h-8" />
    },
    {
      id: 5,
      title: "Free Courses Platform",
      subtitle: "Skill Development & Certification",
      description: "Curated collection of free online courses with certificates, specially designed for polytechnic students across all branches.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
      status: "Coming Soon",
      category: "Education",
      features: ["Branch-specific Courses", "Free Certificates", "Progress Tracking", "Industry Recognition"],
      icon: <Code className="w-8 h-8" />
    },
    {
      id: 6,
      title: "Career Development Program",
      subtitle: "Job Readiness & Skill Enhancement",
      description: "Comprehensive program to prepare students for careers with resume building, interview preparation, and skill development workshops.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      status: "Planning",
      category: "Career",
      features: ["Resume Building", "Interview Prep", "Skill Workshops", "Career Counseling"],
      icon: <Target className="w-8 h-8" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Coming Soon': return 'bg-yellow-500';
      case 'Planning': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technology': return 'bg-blue-500';
      case 'Career': return 'bg-green-500';
      case 'Education': return 'bg-purple-500';
      case 'Innovation': return 'bg-orange-500';
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
              Projects & <span className="text-gradient">Initiatives</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Innovative solutions and programs designed to empower polytechnic students and enhance their learning experience
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={project.id} className="overflow-hidden glass-card hover-glass group animate-fade-in hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`${getCategoryColor(project.category)} text-white`}>
                    {project.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className={`${getStatusColor(project.status)} text-white`}>
                    {project.status}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {project.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.subtitle}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-gradient-brand hover:opacity-90 transition-smooth group-hover:scale-105">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Have a Project Idea?</h2>
              <p className="text-muted-foreground mb-6">
                We're always looking for innovative ideas to help polytechnic students.
                Share your project proposal and let's build something amazing together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-brand hover:opacity-90 transition-smooth">
                  Submit Project Idea
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
                  Join Development Team
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

export default Projects;