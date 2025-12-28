import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { notificationsAPI, Notification } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Bell, RefreshCcw, Trash2, Eye, EyeOff, ArrowLeft, Info, FileText, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AddNotification() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin-login';
    }
    fetchNotifications();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await notificationsAPI.create({
        title: formData.title,
        description: formData.description,
      });

      toast({
        title: "Success",
        description: "Notification created successfully!",
      });

      setFormData({ title: "", description: "" });
      setShowPreview(false);
      fetchNotifications();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create notification",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const data = await notificationsAPI.getAll();
      setNotifications(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch notifications",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await notificationsAPI.delete(id);
      toast({
        title: "Success",
        description: "Notification deleted successfully!",
      });
      fetchNotifications();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete notification",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin")}
            className="mb-4 gap-2 hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin Panel
          </Button>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Manage Notifications</h1>
              <p className="text-muted-foreground mt-1">
                Create and manage notifications with Markdown support
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-card border-border/30 bg-card/90">
              <CardHeader className="border-b border-border/30">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <FileText className="w-5 h-5 text-cyan-600" />
                  Add Notification
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Use Markdown formatting for rich content
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-foreground/80">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter notification title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border focus:border-cyan-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="description" className="text-foreground/80">Description (Markdown)</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPreview(!showPreview)}
                        className="h-8 text-cyan-600 hover:text-cyan-500 hover:bg-muted"
                      >
                        {showPreview ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                        {showPreview ? 'Edit' : 'Preview'}
                      </Button>
                    </div>

                    {showPreview ? (
                      <div className="min-h-[200px] p-4 rounded-lg bg-muted/30 border border-border">
                        <MarkdownRenderer content={formData.description || '*Start typing to preview...*'} />
                      </div>
                    ) : (
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="# Heading&#10;**Bold text** and *italic text*&#10;&#10;- List item 1&#10;- List item 2&#10;&#10;[Link text](https://example.com)&#10;&#10;> Blockquote&#10;&#10;`inline code`"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={10}
                        className="bg-background border-border focus:border-cyan-500/50 font-mono text-sm"
                      />
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Notification"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Markdown Guide */}
            <Card className="glass-card border-border/30 bg-card/90">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm text-foreground/80">
                  <Info className="w-4 h-4 text-cyan-600" />
                  Markdown Quick Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-muted p-2 rounded"><code># Heading 1</code></div>
                  <div className="bg-muted p-2 rounded"><code>## Heading 2</code></div>
                  <div className="bg-muted p-2 rounded"><code>**bold**</code></div>
                  <div className="bg-muted p-2 rounded"><code>*italic*</code></div>
                  <div className="bg-muted p-2 rounded"><code>- list item</code></div>
                  <div className="bg-muted p-2 rounded"><code>1. numbered</code></div>
                  <div className="bg-muted p-2 rounded col-span-2"><code>[link](https://url.com)</code></div>
                  <div className="bg-muted p-2 rounded"><code>`code`</code></div>
                  <div className="bg-muted p-2 rounded"><code>&gt; quote</code></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-border/30 bg-card/90">
              <CardHeader className="border-b border-border/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Sparkles className="w-5 h-5 text-cyan-600" />
                      All Notifications
                      <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-2">
                        {notifications.length}
                      </span>
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-1">
                      Click on a notification to view its markdown rendering
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchNotifications}
                    className="border-border hover:bg-muted"
                  >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="p-4 space-y-3">
                    {notifications.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No notifications yet</p>
                        <p className="text-sm mt-1">Create your first notification above</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="group p-5 rounded-xl bg-muted/30 hover:bg-muted/50 border border-border/50 transition-all"
                        >
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground text-lg">{notification.title}</h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(notification.timestamp).toLocaleString('en-IN', {
                                  dateStyle: 'medium',
                                  timeStyle: 'short'
                                })}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(notification.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Rendered Markdown Preview */}
                          <div className="mt-3 pt-3 border-t border-border/50">
                            <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                            <div className="bg-muted/30 rounded-lg p-3">
                              <MarkdownRenderer
                                content={notification.description.length > 300
                                  ? notification.description.substring(0, 300) + '...'
                                  : notification.description
                                }
                                className="text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
