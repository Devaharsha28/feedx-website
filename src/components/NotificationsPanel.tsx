import { useState, useEffect } from 'react';
import { Bell, Calendar, ChevronRight, Sparkles, TrendingUp, AlertCircle, Info, Megaphone } from 'lucide-react';
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
import { notificationsAPI, Notification } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

interface NotificationLocal {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category?: 'announcement' | 'update' | 'alert' | 'info';
}

// Category styling inspired by Shiksha.com
const getCategoryStyle = (category?: string, index?: number) => {
  const categories = [
    { icon: Megaphone, color: 'from-orange-500 to-amber-500', bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
    { icon: TrendingUp, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    { icon: AlertCircle, color: 'from-red-500 to-rose-500', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
    { icon: Info, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  ];
  
  const idx = index !== undefined ? index % categories.length : 0;
  return categories[idx];
};

const formatRelativeTime = (timestamp: string) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<NotificationLocal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState<NotificationLocal | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await notificationsAPI.getAll();
        setNotifications(data);
      } catch (error) {
        console.error('Failed to load notifications:', error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const handleNotificationClick = (notification: NotificationLocal) => {
    setSelectedNotification(notification);
    setIsDialogOpen(true);
  };

  return (
    <>
    <Card className="w-full max-w-[400px] glass-card border-white/10 shadow-2xl overflow-hidden">
      {/* Shiksha-inspired gradient header */}
      <CardHeader className="pb-3 px-5 py-4 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/25">
                <Bell className="h-5 w-5 text-white" />
              </div>
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-lg animate-pulse">
                  {notifications.length > 9 ? '9+' : notifications.length}
                </span>
              )}
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-white">
                Notifications
              </CardTitle>
              <p className="text-xs text-white/60 mt-0.5">Stay updated with latest news</p>
            </div>
          </div>
          <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[420px]">
          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                  <Bell className="h-8 w-8 text-cyan-400/50" />
                </div>
                <p className="text-muted-foreground text-sm">
                  {loading ? 'Loading notifications...' : 'No notifications yet'}
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  New updates will appear here
                </p>
              </div>
            ) : (
              notifications.map((notification, index) => {
                const style = getCategoryStyle(notification.category, index);
                const IconComponent = style.icon;
                
                return (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`group relative p-4 mb-2 rounded-xl cursor-pointer transition-all duration-300 
                      bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10
                      hover:shadow-lg hover:shadow-cyan-500/5 hover:scale-[1.02]`}
                  >
                    {/* Category indicator line */}
                    <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b ${style.color}`} />
                    
                    <div className="flex gap-3 pl-3">
                      {/* Icon */}
                      <div className={`p-2 rounded-lg ${style.bg} shrink-0`}>
                        <IconComponent className={`h-4 w-4 ${style.text}`} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2 group-hover:text-cyan-300 transition-colors">
                            {notification.title}
                          </h3>
                          <span className="text-[10px] font-medium text-white/40 whitespace-nowrap bg-white/5 px-2 py-0.5 rounded-full">
                            {formatRelativeTime(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs text-white/50 mt-1.5 line-clamp-2 leading-relaxed">
                          {notification.description.replace(/[#*`_~\[\]]/g, '').substring(0, 100)}...
                        </p>
                      </div>
                      
                      {/* Arrow */}
                      <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
        
        {notifications.length > 0 && (
          <div className="p-3 border-t border-white/10 bg-gradient-to-r from-cyan-600/5 to-blue-600/5">
            <Button 
              variant="ghost" 
              className="w-full bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 
                text-cyan-400 hover:text-cyan-300 font-semibold rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 
                transition-all duration-300 h-11"
              onClick={() => navigate('/notifications')}
            >
              <span className="flex items-center gap-2">
                View All Notifications
                <ChevronRight className="h-4 w-4" />
              </span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>

    {/* Enhanced Dialog with Markdown support */}
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden glass-card border-white/10 p-0">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 p-6 border-b border-white/10">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/25">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl font-bold text-white leading-tight">
                  {selectedNotification?.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-2 text-white/60">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {selectedNotification ? new Date(selectedNotification.timestamp).toLocaleString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : ''}
                  </span>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>
        
        {/* Content with Markdown rendering */}
        <ScrollArea className="max-h-[50vh]">
          <div className="p-6">
            {selectedNotification && (
              <MarkdownRenderer 
                content={selectedNotification.description} 
                className="text-white/80"
              />
            )}
          </div>
        </ScrollArea>
        
        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/5 flex gap-3">
          <Button 
            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl h-11"
          >
            Learn More
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setIsDialogOpen(false)}
            className="border-white/20 hover:bg-white/10 rounded-xl h-11 px-6"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
