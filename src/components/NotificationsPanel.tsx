import { useState, useEffect } from 'react';
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
import { notificationsAPI, Notification } from '@/lib/api';

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDialogOpen(true);
  };

  return (
    <>
    <Card className="w-full max-w-[380px] border border-border bg-background shadow-md">
      <CardHeader className="pb-2 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Bell className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base font-semibold">
            Notifications
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[480px]">
          <div className="divide-y divide-border">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground text-sm">
                {loading ? 'Loading notifications...' : 'No notifications available.'}
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 min-w-[70px] pt-0.5">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-foreground leading-relaxed">
                      {notification.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {notification.description}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        {notifications.length > 0 && (
          <div className="p-3 border-t border-border bg-muted/20">
            <Button 
              variant="ghost" 
              className="w-full text-primary hover:text-primary hover:bg-primary/10 font-medium"
            >
              View All Notifications
            </Button>
          </div>
        )}
      </CardContent>
    </Card>

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto border border-border">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 bg-transparent rounded-lg">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">
                  {selectedNotification?.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {selectedNotification ? new Date(selectedNotification.timestamp).toLocaleString() : ''}
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {selectedNotification?.description}
          </p>
          
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
