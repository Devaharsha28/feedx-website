import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bell,
  BookOpen,
  Calendar,
  Sparkles,
  MessageSquare,
  Newspaper,
  AlertCircle,
  Users,
  Activity,
  Globe,
  LogOut,
  Building2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPanel() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (!token || !userData) {
      window.location.href = '/admin-login';
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully',
    });
    navigate('/admin-login');
  };

  const [isAuthenticated] = useState(true);

  const adminSections = [
    {
      id: "notifications",
      title: "Notifications",
      description: "Manage system notifications and alerts",
      icon: Bell,
      color: "bg-blue-500",
      route: "/admin/notifications",
    },
    {
      id: "updates",
      title: "Updates",
      description: "Post platform updates and announcements",
      icon: Newspaper,
      color: "bg-green-500",
      route: "/admin/updates",
    },
    {
      id: "resources",
      title: "Resources",
      description: "Add learning materials and resources",
      icon: BookOpen,
      color: "bg-purple-500",
      route: "/admin/resources",
    },
    {
      id: "events",
      title: "Upcoming Events",
      description: "Manage upcoming events and webinars",
      icon: Calendar,
      color: "bg-orange-500",
      route: "/admin/events",
    },
    {
      id: "spotlight",
      title: "Spotlight",
      description: "Feature spotlights and success stories",
      icon: Sparkles,
      color: "bg-pink-500",
      route: "/admin/spotlight",
    },
    {
      id: "testimonials",
      title: "Testimonials",
      description: "Manage user testimonials and reviews",
      icon: MessageSquare,
      color: "bg-indigo-500",
      route: "/admin/testimonials",
    },
    {
      id: "institutes",
      title: "Institute Profiles",
      description: "Add details and images for college profiles",
      icon: Building2,
      color: "bg-teal-500",
      route: "/admin/institutes",
    },
    {
      id: "users",
      title: "User Management",
      description: "Create and manage admin users",
      icon: Users,
      color: "bg-cyan-500",
      route: "/admin/users",
    },
    {
      id: "logs",
      title: "Login Activity",
      description: "View user login history and attempts",
      icon: Activity,
      color: "bg-yellow-500",
      route: "/admin/logs",
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You need to be authenticated to access the admin panel.
            </p>
            <Button onClick={() => navigate("/signin")} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">
              Manage all content sections for the FeedX Nexus platform
            </p>
            {user && <p className="text-sm text-muted-foreground mt-2">Welcome, {user.name}!</p>}
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500/50 text-red-500 hover:bg-red-500/10 self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.id}
                className="hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => navigate(section.route)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`${section.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                    variant="outline"
                  >
                    Manage
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
