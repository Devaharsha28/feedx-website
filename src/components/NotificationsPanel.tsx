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
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await notificationsAPI.getAll();
        setNotifications(data);

        // Calculate unread count
        const lastSeen = localStorage.getItem('lastSeenNotification');
        if (!lastSeen) {
          setUnreadCount(data.length);
        } else {
          const lastSeenDate = new Date(lastSeen);
          const unread = data.filter(n => new Date(n.timestamp) > lastSeenDate).length;
          setUnreadCount(unread);
        }
      } catch (error) {
        console.error('Failed to load notifications:', error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const markAsRead = () => {
    if (notifications.length > 0) {
      const latestTimestamp = notifications[0].timestamp;
      localStorage.setItem('lastSeenNotification', latestTimestamp);
      setUnreadCount(0);
    }
  };

  const handleNotificationClick = (notification: NotificationLocal) => {
    setSelectedNotification(notification);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className="w-full max-w-[400px] bg-white/60 backdrop-blur-xl border-white/20 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
        {/* Header */}
        <CardHeader className="pb-3 px-5 py-4 bg-muted/30 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive rounded-full text-[10px] font-bold text-destructive-foreground flex items-center justify-center shadow-sm animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-foreground">
                  Notifications
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Stay updated with latest news</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-[420px]">
            <div className="p-2">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Bell className="h-8 w-8 text-muted-foreground/50" />
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
                      bg-background hover:bg-muted/50 border border-border hover:border-primary/20
                      hover:shadow-md hover:scale-[1.01]`}
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
                            <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                              {notification.title}
                            </h3>
                            <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap bg-muted px-2 py-0.5 rounded-full">
                              {formatRelativeTime(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground/80 mt-1.5 line-clamp-2 leading-relaxed">
                            {notification.description
                              .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // Remove links but keep text
                              .replace(/[#*`~_[]]/g, '') // Remove other markdown
                              .substring(0, 100)}...
                          </p>
                        </div>

                        {/* Arrow */}
                        <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-border bg-muted/10">
              <Button
                variant="ghost"
                className="w-full hover:bg-muted text-primary hover:text-primary/80 font-semibold rounded-xl border border-transparent hover:border-border transition-all duration-300 h-11"
                onClick={() => {
                  markAsRead();
                  navigate('/notifications');
                }}
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
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden bg-card border-border p-0">
          {/* Header */}
          <div className="bg-muted/30 p-6 border-b border-border">
            <DialogHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-xl font-bold text-foreground leading-tight">
                    {selectedNotification?.title}
                  </DialogTitle>
                  <DialogDescription className="flex items-center gap-2 mt-2 text-muted-foreground">
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
                  className="text-foreground/90 prose-sm"
                />
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/10">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="w-full border-border hover:bg-muted rounded-xl h-11"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
