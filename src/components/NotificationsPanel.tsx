import { useState } from 'react';
import { Bell, Calendar, ChevronRight, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Notification {
  id: number;
  activity: string;
  location: string;
  date: string;
  description?: string;
  details?: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    activity: "AI & ML Workshop",
    location: "Registration Open",
    date: "21 Nov",
    description: "Join our comprehensive AI & Machine Learning workshop designed for students",
    details: "📅 Date: November 25-27, 2025\n⏰ Time: 10:00 AM - 4:00 PM\n📍 Venue: Computer Lab A\n\n🎯 Topics Covered:\n• Introduction to AI & ML\n• Python for Machine Learning\n• Neural Networks Basics\n• Hands-on Projects\n\n👨‍🏫 Instructor: Industry experts from leading tech companies\n\n💰 Registration Fee: Free for FEEDX students\n🎓 Certificate: Provided upon completion\n\n📝 Register at: feedx.edu/workshops"
  },
  {
    id: 2,
    activity: "FXBot v2.0 Release",
    location: "New Features",
    date: "18 Nov",
    description: "FXBot gets a major upgrade with AI-powered responses and new capabilities",
    details: "🤖 What's New in FXBot v2.0:\n\n✨ Enhanced Features:\n• Improved natural language understanding\n• Faster response times\n• Voice message support\n• Multi-language support\n• Integration with attendance system\n• Real-time notifications\n\n🚀 Performance:\n• 3x faster response time\n• 95% accuracy improvement\n• 24/7 availability\n\n💬 Try it now: Visit the FXBot page or chat on WhatsApp\n\n📱 Access: feedx.edu/fxbot"
  },
  {
    id: 3,
    activity: "Project Showcase",
    location: "Special Submissions",
    date: "15 Nov",
    description: "Submit your innovative projects for the annual FEEDX Project Showcase 2025",
    details: "🏆 FEEDX Project Showcase 2025\n\n📅 Submission Deadline: December 15, 2025\n📅 Showcase Event: January 10, 2026\n\n🎯 Categories:\n• Web Development\n• Mobile Applications\n• AI/ML Projects\n• IoT & Hardware\n• Data Science\n\n🎁 Prizes:\n• 1st Place: ₹50,000\n• 2nd Place: ₹30,000\n• 3rd Place: ₹20,000\n• Special Mentions: ₹5,000 each\n\n📝 Submission Guidelines:\n• Team size: 2-4 members\n• Original work only\n• Working prototype required\n• Presentation & demo\n\n🔗 Submit at: feedx.edu/showcase"
  },
  {
    id: 4,
    activity: "Community Milestone",
    location: "1000+ Members",
    date: "12 Nov",
    description: "FEEDX community reaches 1000+ active members!",
    details: "🎉 Celebrating 1000+ Members!\n\nThank you for making FEEDX Polytechnic community one of the most vibrant student communities!\n\n📊 Community Stats:\n• Active Members: 1,247\n• Projects Completed: 156\n• Resources Shared: 892\n• Events Hosted: 47\n• Success Stories: 89\n\n🌟 What's Next:\n• Exclusive member benefits\n• Priority access to events\n• Special workshops\n• Networking opportunities\n• Mentorship programs\n\n💙 Thank you for being part of this journey!\n\n#FEEDXFamily #1000Strong"
  },
  {
    id: 5,
    activity: "New Resources Added",
    location: "React & TypeScript",
    date: "10 Nov",
    description: "Fresh learning resources for React and TypeScript added to the library",
    details: "📚 New Learning Resources Available!\n\n🎓 React Fundamentals:\n• React Hooks Deep Dive\n• Context API Patterns\n• Performance Optimization\n• Testing Best Practices\n• Real-world Projects\n\n💻 TypeScript Essentials:\n• Type Safety Basics\n• Advanced Types\n• Generics & Utility Types\n• Integration with React\n• Migration Strategies\n\n📦 Includes:\n• Video tutorials (12+ hours)\n• Code examples & exercises\n• Project templates\n• Cheat sheets\n• Best practices guide\n\n🔗 Access: feedx.edu/resources/web-development"
  },
  {
    id: 6,
    activity: "Career Fair 2025",
    location: "Top Companies",
    date: "8 Nov",
    description: "Annual Career Fair with 50+ top companies hiring for internships and jobs",
    details: "💼 FEEDX Career Fair 2025\n\n📅 Date: December 5-6, 2025\n⏰ Time: 9:00 AM - 5:00 PM\n📍 Venue: Main Campus Auditorium\n\n🏢 Participating Companies (50+):\n• Google • Microsoft • Amazon\n• Infosys • TCS • Wipro\n• Cognizant • Accenture\n• Startups & Product companies\n\n🎯 Opportunities:\n• Full-time positions\n• Summer internships\n• Final year projects\n• Training programs\n\n📋 What to Bring:\n• Updated resume (5 copies)\n• Portfolio/projects\n• Photo ID\n• Professional attire\n\n✨ Benefits:\n• Direct interaction with recruiters\n• On-spot interviews\n• Career guidance sessions\n• Resume review\n\n🎫 Registration: Free | Required\n🔗 Register: feedx.edu/career-fair"
  }
];

export function NotificationsPanel() {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDialogOpen(true);
  };

  return (
    <>
    <Card className="w-full max-w-[440px] border-primary/10 bg-card shadow-lg">
      <CardHeader className="pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg font-semibold">
            Notifications
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[480px]">
          <div className="divide-y divide-border/50">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-[70px] pt-0.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                    {notification.date}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-foreground leading-relaxed">
                    {notification.activity}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {notification.location}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-3 border-t border-border/50 bg-muted/20">
          <Button 
            variant="ghost" 
            className="w-full text-primary hover:text-primary hover:bg-primary/10 font-medium"
          >
            View All Notifications
          </Button>
        </div>
      </CardContent>
    </Card>

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">
                  {selectedNotification?.activity}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {selectedNotification?.date} • {selectedNotification?.location}
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {selectedNotification?.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selectedNotification.description}
            </p>
          )}
          
          {selectedNotification?.details && (
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                {selectedNotification.details}
              </pre>
            </div>
          )}
          
          <div className="flex gap-3 pt-4">
            <Button className="flex-1">
              Learn More
            </Button>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
