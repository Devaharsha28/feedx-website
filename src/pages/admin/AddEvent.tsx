import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { eventsAPI, Event } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { X, Link as LinkIcon, Plus } from "lucide-react";

export default function AddEvent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    registerLink: "",
    image: "",
    files: [] as string[],
  });
  const [currentFileLink, setCurrentFileLink] = useState("");

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin-login';
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Convert Google Drive share link to direct viewable link
  const convertGDriveLink = (url: string): string => {
    if (!url) return url;
    
    // Format: https://drive.google.com/file/d/FILE_ID/view
    let match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    
    // Format: https://drive.google.com/open?id=FILE_ID
    match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    
    // Format: https://drive.google.com/uc?id=FILE_ID
    if (url.includes('drive.google.com/uc')) {
      return url.replace('export=download', 'export=view');
    }
    
    return url;
  };

  const handleImageLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = convertGDriveLink(e.target.value);
    setFormData((prev) => ({ ...prev, image: link }));
  };

  const handleAddFile = () => {
    if (currentFileLink.trim()) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, currentFileLink.trim()],
      }));
      setCurrentFileLink("");
      toast({ title: "File link added" });
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await eventsAPI.create({
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        registerLink: formData.registerLink || "#",
        image: formData.image,
        files: formData.files,
      });

      toast({
        title: "Success",
        description: "Event created successfully!",
      });

      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        registerLink: "",
        image: "",
        files: [],
      });
      setImagePreview(null);
      fetchEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const data = await eventsAPI.getAll();
      setEvents(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await eventsAPI.delete(id);
      toast({
        title: "Success",
        description: "Event deleted successfully!",
      });
      fetchEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/admin")}
            className="mb-4"
          >
            ← Back to Admin Panel
          </Button>
          <h1 className="text-3xl font-bold mb-2">Manage Upcoming Events</h1>
          <p className="text-muted-foreground">
            Create and manage upcoming events and webinars
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Add Event</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Event title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Event description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Event location or Online"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="registerLink">Registration Link</Label>
                    <Input
                      id="registerLink"
                      name="registerLink"
                      type="url"
                      placeholder="https://example.com/register"
                      value={formData.registerLink}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Event Image Link (Google Drive or URL)</Label>
                    <Input
                      id="image"
                      placeholder="Paste Google Drive or image URL"
                      value={formData.image}
                      onChange={handleImageLinkChange}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Share image from Google Drive → "Anyone with link" → Paste here
                    </p>
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="mt-2 h-32 w-full object-cover rounded-md"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    )}
                  </div>

                  <div>
                    <Label htmlFor="fileLink">Event Files Link (Google Drive PDF, etc.)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="fileLink"
                        placeholder="Paste Google Drive file link"
                        value={currentFileLink}
                        onChange={(e) => setCurrentFileLink(e.target.value)}
                      />
                      <Button type="button" onClick={handleAddFile} size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Share file from Google Drive → "Anyone with link" → Paste here
                    </p>
                    {formData.files.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {formData.files.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
                            <LinkIcon className="w-4 h-4 text-blue-500" />
                            <a href={file} target="_blank" rel="noopener noreferrer" className="text-sm flex-1 truncate text-blue-500 hover:underline">
                              {file.length > 50 ? file.substring(0, 50) + '...' : file}
                            </a>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)} className="h-6 w-6 p-0 text-destructive">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Event"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>All Events</CardTitle>
              </CardHeader>
              <CardContent>
                <button
                  onClick={fetchEvents}
                  className="text-blue-500 hover:underline mb-4 text-sm"
                >
                  Refresh List
                </button>
                <div className="space-y-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border rounded-lg hover:bg-secondary/50 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{event.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {event.description}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-2">
                            <div>📅 {event.date}</div>
                            <div>⏰ {event.time}</div>
                            <div className="col-span-2">📍 {event.location}</div>
                          </div>
                          {event.image && (
                            <img
                              src={event.image}
                              alt={event.title}
                              className="h-12 w-12 object-cover rounded mb-2"
                            />
                          )}
                          {event.files && event.files.length > 0 && (
                            <div className="mb-2">
                              <p className="text-xs text-muted-foreground mb-1">Files:</p>
                              <div className="flex flex-wrap gap-1">
                                {event.files.map((file, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs"
                                  >
                                    File {idx + 1}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {event.registerLink !== "#" && (
                            <a
                              href={event.registerLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-500 hover:underline"
                            >
                              Registration Link
                            </a>
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(event.id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
